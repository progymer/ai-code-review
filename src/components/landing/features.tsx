"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  ShieldCheck,
  MessageSquareText,
  GitPullRequest,
  Cpu,
  Sparkles,
} from "lucide-react";

const FEATURES = [
  {
    title: "Instant feedback",
    description:
      "Get comprehensive reviews in seconds, not hours. Keep your momentum without waiting for manual peer reviews.",
    icon: <Zap className="w-5 h-5 text-amber-500" />,
    gradient: "from-amber-500/10 to-orange-500/10",
  },
  {
    title: "Security scanning",
    description:
      "Detect vulnerabilities, leaked secrets, and OWASP risks automatically before they ever reach production.",
    icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
    gradient: "from-emerald-500/10 to-teal-500/10",
  },
  {
    title: "Clear suggestions",
    description:
      "Actionable feedback you can apply immediately with one click. AI that explains the 'why' behind every fix.",
    icon: <MessageSquareText className="w-5 h-5 text-blue-500" />,
    gradient: "from-blue-500/10 to-indigo-500/10",
  },
  {
    title: "PR integration",
    description:
      "Reviews appear right in your pull requests as comments. Works seamlessly with GitHub, GitLab, and Bitbucket.",
    icon: <GitPullRequest className="w-5 h-5 text-purple-500" />,
    gradient: "from-purple-500/10 to-pink-500/10",
  },
  {
    title: "Context aware",
    description:
      "Understands your unique codebase patterns, internal libraries, and style guides to provide relevant advice.",
    icon: <Cpu className="w-5 h-5 text-indigo-500" />,
    gradient: "from-indigo-500/10 to-cyan-500/10",
  },
  {
    title: "Always improving",
    description:
      "Powered by the latest LLMs. Our models learn from millions of high-quality commits to stay ahead of the curve.",
    icon: <Sparkles className="w-5 h-5 text-rose-500" />,
    gradient: "from-rose-500/10 to-orange-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      // Cast the array to let TS know it's a valid cubic-bezier tuple
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};

export default function FeaturesSection() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mb-6"
          >
            Everything you need for better reviews
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-500 max-w-2xl mx-auto"
          >
            Focus on building great products. Let our AI handle the repetitive,
            time-consuming parts of the code review process.          
            </motion.p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {FEATURES.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="relative group p-8 rounded-2xl border border-slate-100 bg-white hover:border-slate-200  transition-all duration-300"
            >
              {/* Icon Box */}
              <div
                className={`mb-6 inline-flex p-3 rounded-2xl bg-muted group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>

              {/* Text */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-500 leading-relaxed">
                {feature.description}
              </p>

              {/* Subtlest background glow on hover */}
              <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-transparent via-transparent to-slate-50/50 opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
