export const dynamic = "force-dynamic";

import { auth } from "@/server/auth";
import { db } from "@/lib/db";
import { ratelimit } from "@/lib/ratelimit";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { GitPullRequest, FolderGit2 } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const user = session.user;

  const [accounts, repoCount, reviewCount, { remaining, reset }] =
    await Promise.all([
      db.account.findMany({ where: { userId: user.id } }),
      db.repository.count({ where: { userId: user.id } }),
      db.review.count({ where: { userId: user.id } }),
      ratelimit.getRemaining(user.id),
    ]);

  const hasGithub = accounts.some((a) => a.providerId === "github");
  const hasGoogle = accounts.some((a) => a.providerId === "google");

  const DAILY_LIMIT = 25;
  const used = DAILY_LIMIT - remaining;
  const usedPercent = Math.min(100, (used / DAILY_LIMIT) * 100);
  const resetDate = new Date(reset);
  const resetTime = resetDate.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const initials = user.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : (user.email[0]?.toUpperCase() ?? "?");

  const barColor =
    remaining === 0
      ? "bg-red-500"
      : remaining <= 5
        ? "bg-orange-400"
        : "bg-emerald-500";

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account details and usage.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6 space-y-6">
          {/* Identity */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage
                src={user.image ?? undefined}
                alt={user.name ?? ""}
              />
              <AvatarFallback className="text-lg font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <p className="text-lg font-semibold leading-none">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>

          <Separator />

          {/* Connected accounts */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Connected Accounts
            </p>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-3">
                <FaGithub className="h-5 w-5" />
                <span className="text-sm font-medium">GitHub</span>
              </div>
              {hasGithub ? (
                <Badge variant="secondary">Connected</Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground">
                  Not connected
                </Badge>
              )}
            </div>
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-3">
                <FaGoogle className="h-5 w-5" />
                <span className="text-sm font-medium">Google</span>
              </div>
              {hasGoogle ? (
                <Badge variant="secondary">Connected</Badge>
              ) : (
                <Badge variant="outline" className="text-muted-foreground">
                  Not connected
                </Badge>
              )}
            </div>
          </div>

          <Separator />

          {/* Stats */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-3">
              Stats
            </p>
            <div className="grid grid-cols-1 gap-2">
              <div className="flex items-center gap-3">
                <FolderGit2 className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-lg font-semibold text-muted-foreground">
                      {repoCount}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Connected{" "}
                      {repoCount === 1 ? "Repository" : "Repositories"}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <GitPullRequest className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="flex items-center justify-between gap-1">
                    <p className="text-lg font-semibold text-muted-foreground">
                      {reviewCount}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total {reviewCount === 1 ? "Review" : "Reviews"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Rate limit */}
          <div className="space-y-3">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Daily Review Limit
            </p>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">
                {remaining} of {DAILY_LIMIT} requests remaining
              </span>
              <span className="text-muted-foreground text-xs">
                Resets at {resetTime}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                style={{ width: `${usedPercent}%` }}
              />
            </div>
            {remaining === 0 && (
              <p className="text-xs text-destructive">
                Limit reached. Your reviews will resume after {resetTime}.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
