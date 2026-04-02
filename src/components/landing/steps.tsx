"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  GitBranch,
  GitPullRequest,
  Sparkles,
  CheckCircle2,
} from "lucide-react";

// ─── constants ────────────────────────────────────────────────────────────────

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ─── step visuals ─────────────────────────────────────────────────────────────

function ConnectRepoVisual() {
  const repos = [
    {
      name: "acme/frontend",
      lang: "TypeScript",
      color: "bg-blue-400",
      star: 12,
    },
    { name: "acme/api", lang: "Go", color: "bg-cyan-400", star: 8 },
    {
      name: "acme/design-system",
      lang: "TypeScript",
      color: "bg-blue-400",
      star: 34,
    },
  ];

  return (
    <div className="w-full space-y-3">
      <div className="mb-4 flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3.5 py-2.5">
        <svg
          className="h-4 w-4 text-slate-400"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="text-sm text-slate-400">Search repositories…</span>
      </div>

      {repos.map((r, i) => (
        <motion.div
          key={r.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12, duration: 0.45, ease: EASE }}
          className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100">
              <GitBranch className="h-4 w-4 text-slate-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-800">{r.name}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`h-2 w-2 rounded-full ${r.color}`} />
                <span className="text-xs text-slate-400">{r.lang}</span>
              </div>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-100"
          >
            Connect
          </motion.button>
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3"
      >
        <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
        <span className="text-sm text-green-700 font-medium">
          Webhook configured automatically
        </span>
      </motion.div>
    </div>
  );
}

function OpenPRVisual() {
  return (
    <div className="w-full space-y-3">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <div className="mb-3 flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
              <GitPullRequest className="h-3 w-3" /> Open
            </span>
            <span className="text-xs text-slate-400">#248</span>
          </div>
          <span className="text-xs text-slate-400">just now</span>
        </div>
        <p className="mb-1 text-sm font-semibold text-slate-800">
          feat: add OAuth2 support
        </p>
        <p className="text-xs text-slate-400">main ← feature/oauth2</p>
        <div className="mt-3 flex items-center gap-3 text-xs text-slate-400">
          <span className="text-green-600 font-medium">+142</span>
          <span className="text-red-500 font-medium">−38</span>
          <span>6 files</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.45, ease: EASE }}
        className="rounded-xl border border-blue-100 bg-blue-50 px-4 py-3"
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-blue-500" />
          </span>
          <span className="text-xs font-semibold text-blue-700 font-mono">
            pull_request.opened
          </span>
        </div>
        <p className="text-xs text-blue-600 pl-4">
          Webhook received → review queued
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
      >
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
            className="h-4 w-4 rounded-full border-2 border-blue-200 border-t-blue-500"
          />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-700">Analyzing PR…</p>
          <p className="text-xs text-slate-400">
            Gemini 2.5 Flash is reviewing your code
          </p>
        </div>
      </motion.div>
    </div>
  );
}

function GetReviewVisual() {
  const comments = [
    {
      sev: "CRITICAL",
      category: "security",
      msg: "OAuth token stored in localStorage",
      file: "lib/auth.ts",
      line: 34,
      sevColor: "text-red-600",
      sevBg: "bg-red-50",
      sevBorder: "border-red-200",
      dot: "bg-red-500",
    },
    {
      sev: "HIGH",
      category: "bug",
      msg: "Missing PKCE challenge verification",
      file: "api/oauth.ts",
      line: 78,
      sevColor: "text-orange-600",
      sevBg: "bg-orange-50",
      sevBorder: "border-orange-200",
      dot: "bg-orange-500",
    },
    {
      sev: "MEDIUM",
      category: "performance",
      msg: "Redundant token refresh on every render",
      file: "hooks/useAuth.ts",
      line: 12,
      sevColor: "text-yellow-600",
      sevBg: "bg-yellow-50",
      sevBorder: "border-yellow-200",
      dot: "bg-yellow-500",
    },
  ];

  return (
    <div className="w-full space-y-3">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
      >
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Risk Score
          </span>
          <span className="rounded-md border border-red-200 bg-red-50 px-2 py-0.5 text-sm font-bold text-red-600">
            84 <span className="text-xs font-normal text-slate-400">/ 100</span>
          </span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <motion.div
            className="h-full rounded-full bg-red-500"
            initial={{ width: 0 }}
            animate={{ width: "84%" }}
            transition={{ delay: 0.2, duration: 0.9, ease: EASE }}
          />
        </div>
        <p className="mt-1.5 text-right text-[10px] text-slate-400">
          High risk — review carefully
        </p>
      </motion.div>

      <div className="space-y-2">
        {comments.map((c, i) => (
          <motion.div
            key={c.sev + i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.14, duration: 0.4, ease: EASE }}
            className="flex items-start gap-2.5 rounded-xl border border-slate-100 bg-white p-3 shadow-sm"
          >
            <span className={`mt-0.5 h-2 w-2 shrink-0 rounded-full ${c.dot}`} />
            <div className="min-w-0 flex-1">
              <div className="mb-0.5 flex items-center gap-1.5">
                <span
                  className={`rounded border px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${c.sevColor} ${c.sevBg} ${c.sevBorder}`}
                >
                  {c.sev}
                </span>
                <span className="text-[10px] text-slate-400">{c.category}</span>
              </div>
              <p className="text-xs font-medium text-slate-700">{c.msg}</p>
              <p className="mt-0.5 font-mono text-[10px] text-slate-400">
                {c.file} : {c.line}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.75 }}
        className="flex items-center gap-2 rounded-xl border border-green-100 bg-green-50 px-4 py-3"
      >
        <Sparkles className="h-4 w-4 text-green-500 shrink-0" />
        <span className="text-xs font-medium text-green-700">
          AI Summary generated · 3 issues found
        </span>
      </motion.div>
    </div>
  );
}

// ─── steps data ───────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    title: "Connect your repository",
    description:
      "Link any GitHub repository in seconds. PR Insights automatically installs a webhook — no manual configuration needed.",
    cta: "Works with public and private repos.",
    visual: <ConnectRepoVisual />,
  },
  {
    number: "02",
    title: "Open a pull request",
    description:
      "Push your branch and open a PR as usual. The moment GitHub fires the event, your review is queued and processing begins automatically.",
    cta: "Zero extra steps for your team.",
    visual: <OpenPRVisual />,
  },
  {
    number: "03",
    title: "Get your AI review",
    description:
      "In seconds, a full review lands — risk score, severity-ranked comments, suggested fixes, and an AI summary. Every time, on every PR.",
    cta: "Powered by Gemini 2.5 Flash.",
    visual: <GetReviewVisual />,
  },
] as const;

// ─── single step row ──────────────────────────────────────────────────────────

function Step({
  step,
  index,
  activeIndex,
}: {
  step: (typeof STEPS)[number];
  index: number;
  activeIndex: number;
}) {
  const isActive = index === activeIndex;
  const isPast = index < activeIndex;

  return (
    <motion.div
      animate={{
        opacity: isActive ? 1 : 0.35,
      }}
      transition={{ duration: 0.5, ease: EASE }}
      className="flex gap-6 py-10 first:pt-0 last:pb-0"
    >
      <div className="flex flex-col items-center gap-0">
        <motion.div
          animate={{
            backgroundColor: isActive
              ? "#0f172a"
              : isPast
                ? "#94a3b8"
                : "#e2e8f0",
            color: isActive ? "#ffffff" : isPast ? "#ffffff" : "#94a3b8",
            scale: isActive ? 1.1 : 1,
          }}
          transition={{ duration: 0.4, ease: EASE }}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold"
        >
          {isPast ? <CheckCircle2 className="h-4 w-4" /> : step.number}
        </motion.div>
        {index < STEPS.length - 1 && (
          <motion.div
            animate={{ backgroundColor: isPast ? "#94a3b8" : "#e2e8f0" }}
            transition={{ duration: 0.4 }}
            className="mt-2 w-px flex-1"
            style={{ minHeight: 60 }}
          />
        )}
      </div>

      <div className="pb-4 pt-1">
        <h3
          className={`mb-2 text-xl font-semibold tracking-tight transition-colors duration-300 ${
            isActive ? "text-slate-900" : "text-slate-400"
          }`}
        >
          {step.title}
        </h3>
        <p
          className={`mb-3 text-sm leading-relaxed transition-colors duration-300 ${
            isActive ? "text-slate-600" : "text-slate-400"
          }`}
        >
          {step.description}
        </p>
        <motion.p
          animate={{ opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs font-medium text-slate-500"
        >
          {step.cta}
        </motion.p>
      </div>
    </motion.div>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export function ScrollySteps() {
  return (
    <section className="bg-white px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 text-center">
          <span className="mb-4 inline-block rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1 text-xs font-medium text-slate-500">
            How it works
          </span>
          <h2 className="font-serif text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
            Three steps. That&apos;s it.
          </h2>
          <p className="mx-auto mt-4 max-w-sm text-base text-slate-500">
            From zero to automated code reviews in under two minutes.
          </p>
        </div>

        <ScrollyContainer />
      </div>
    </section>
  );
}

// ─── scrolly container (with fixed ref hydration) ───────────────────────

function ScrollyContainer() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const activeIndexMV = useTransform(
    scrollYProgress,
    [0, 0.33, 0.34, 0.66, 0.67, 1],
    [0, 0, 1, 1, 2, 2],
  );

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = activeIndexMV.on("change", (v) => {
      setActiveIndex(Math.round(v));
    });
    return unsubscribe;
  }, [activeIndexMV]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: `${STEPS.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center">
        <div className="grid w-full grid-cols-1 gap-12 md:grid-cols-2 md:gap-20">
          <div className="flex flex-col justify-center">
            {STEPS.map((step, i) => (
              <Step
                key={step.number}
                step={step}
                index={i}
                activeIndex={activeIndex}
              />
            ))}
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              <div className="absolute inset-0 -z-10 rounded-2xl bg-slate-50 border border-slate-100" />

              <div className="rounded-2xl p-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -18, filter: "blur(4px)" }}
                    transition={{ duration: 0.45, ease: EASE }}
                  >
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-[10px] font-bold text-white">
                        {STEPS[activeIndex].number}
                      </div>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {STEPS[activeIndex].title}
                      </span>
                    </div>

                    {STEPS[activeIndex].visual}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
