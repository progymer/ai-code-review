import { inngest } from "../client";
import { db } from "@/lib/db";
import {
  fetchPullRequest,
  fetchPullRequestFiles,
  getGithubAccessToken,
} from "@/server/services/github";

export type ReviewPREvent = {
  name: "review/pr.requested";
  data: {
    reviewId: string;
    repositoryId: string;
    prNumber: number;
    userId: string;
  };
};

export const reviewPR = inngest.createFunction(
  {
    id: "review-pr",
    retries: 2,
    triggers: [{ event: "review/pr.requested" }], 
  },
  async ({ event, step }) => {
    const { reviewId, repositoryId, prNumber, userId } = event.data;

    await step.run("update-status-processing", async () => {
        await db.review.update({
            where: { id: reviewId },
            data: { status: "PROCESSING"}
        })
    })

    const repository = await step.run("get-repository", async () => {
        return db.repository.findUnique({
            where: { id: repositoryId}
        })
    })

    if(!repository) {
        await step.run("mark-failed-no-repo", async () => {
            await db.review.update({
                where: { id: reviewId },
                data: { status: "FAILED", error: "No repository found"}
            })
        })
        return { success: false, error: "No repository found" };
    }

    const accessToken = await step.run("get-access-token", async () => {
        return getGithubAccessToken(userId)
    })

    if (!accessToken) {
      await step.run("mark-failed-no-token", async () => {
        await db.review.update({
          where: { id: reviewId },
          data: {
            status: "FAILED",
            error: "GitHub access token not found",
          },
        });
      });
      return { success: false, error: "GitHub access token not found" };
    }

    const [owner, repo] = repository.fullName.split("/");
    if (!owner || !repo) {
      await step.run("mark-failed-invalid-repo", async () => {
        await db.review.update({
          where: { id: reviewId },
          data: {
            status: "FAILED",
            error: "Invalid repository name",
          },
        });
      });
      return { success: false, error: "Invalid repository name" };
    }

    const files = await step.run("fetch-pr-files", async () => {
      return fetchPullRequestFiles(accessToken, owner, repo, prNumber);
    });

    // todo : add ai review logic here

    const reviewResult = await step.run("generate-review", async () => {
        return {
            summary: `Reviewed ${files.length} files with ${files.reduce((sum, f) => sum + f.additions, 0)} additions and ${files.reduce((sum, f) => sum + f.deletions, 0)} deletions.`,
            riskScore: Math.floor(Math.random() * 100),
            comments: files.slice(0, 3).map((file) => ({
                file: file.filename,
                line: 1,
                severity: "low" as const,
                message: `File ${file.status}: ${file.additions} additions, ${file.deletions} deletions`,
            }))
        }
    })

    await step.run("save-review-result", async () => {
        await db.review.update({
            where: { id: reviewId },
            data: {
                status: "COMPLETED",
                summary: reviewResult.summary,
                riskScore: reviewResult.riskScore,
                comments: reviewResult.comments,
            }
        })
    })

    return { success: true, reviewId }
  },
);