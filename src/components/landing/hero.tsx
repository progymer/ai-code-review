"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { GitPullRequest, Github } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: EASE },
  }),
};


// ─── hero ─────────────────────────────────────────────────────────────────────

export function Hero() {
  const { data: session, isPending } = authClient.useSession();

  const ctalabel = session ? "Go to repositories" : "Start for free";  
  const ctalink = session ? "/repos" : "/sign-up";
  const ctaReady = !isPending;


  return (
    <section className="relative flex min-h-screen flex-col overflow-hidden bg-white">
      {/* dot grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          opacity: 0.03,
        }}
      />

      {/* nav */}
      <nav className="relative z-20 flex items-center justify-between border-b border-slate-100 px-6 py-4 md:px-10">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
          <GitPullRequest className="h-4 w-4" />
          PR Insights
        </div>
        <Link
          href={ctalink}
          className="flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-700"
        >
          {ctaReady ? ctalabel : "..."}
          <span aria-hidden>→</span>
        </Link>
      </nav>

      {/* content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-12 pt-16 text-center md:px-10">
        {/* badge */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.05}
          className="mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs text-slate-500 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Powered by Gemini 2.5 Flash
        </motion.div>

        {/* headline */}
        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.15}
          className="mb-5 font-serif text-6xl font-bold leading-[1.08] tracking-tight text-slate-900 md:text-7xl"
        >
          Every PR,
          <br />
          <span className="text-slate-400 italic">reviewed instantly.</span>
        </motion.h1>

        {/* subtitle */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.25}
          className="mb-9 max-w-sm text-base leading-relaxed text-slate-500 md:text-lg"
        >
          AI-powered code reviews that catch bugs, security issues, and logical
          flaws before they reach your main branch.
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0.35}
          className="mb-20 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            href={ctalink}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition-all hover:bg-slate-700 active:scale-95"
          >
            {ctaReady ? ctalabel : "..."}
            <span aria-hidden>→</span>
          </Link>
          <a
            href="https://github.com/progymer/ai-code-review"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
          >
            <Github className="h-4 w-4" />
            View source
          </a>
        </motion.div>
      </div>
    </section>
  );
}
