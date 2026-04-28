"use client";

import { motion } from "framer-motion";
import {
  Brain,
  Mail,
  Clock,
  Cpu,
  Zap,
  ArrowRight,
  Sparkles,
  Shield,
  Target,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const features = [
  {
    icon: Mail,
    title: "Inbox Intelligence",
    desc: "AI summarizes threads, detects action items, and drafts responses. Never miss a follow-up.",
    color: "from-violet-500 to-purple-600",
    glow: "rgba(139,92,246,0.3)",
  },
  {
    icon: Brain,
    title: "Founder Brain",
    desc: '"What did Sam decide about pricing?" — Instant answers from your operational memory.',
    color: "from-cyan-500 to-blue-600",
    glow: "rgba(6,182,212,0.3)",
  },
  {
    icon: Clock,
    title: "Deadline Radar",
    desc: "YC deadlines, investor follow-ups, grant applications — all tracked with smart countdowns.",
    color: "from-amber-500 to-orange-600",
    glow: "rgba(245,158,11,0.3)",
  },
  {
    icon: Cpu,
    title: "Tech Stack Watch",
    desc: "API cost alerts, deprecation warnings, and pricing changes — stay ahead of technical debt.",
    color: "from-emerald-500 to-green-600",
    glow: "rgba(16,185,129,0.3)",
  },
];

const painPoints = [
  {
    icon: MessageSquare,
    stat: "6+",
    label: "Tools juggled daily",
    detail: "Gmail, Slack, Sheets, Notion, CRM, Calendar...",
  },
  {
    icon: Target,
    stat: "73%",
    label: "Context lost in switching",
    detail: "Critical decisions buried across threads",
  },
  {
    icon: Shield,
    stat: "5x",
    label: "Follow-ups forgotten weekly",
    detail: "Investors, customers, team promises",
  },
];

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-grid-pattern opacity-50" />
      <div className="fixed inset-0 bg-radial-glow" />
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] animate-float" />
      <div className="fixed bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-[120px] animate-float" style={{ animationDelay: "-3s" }} />

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold gradient-text">FounderOS</span>
        </div>
        <Link
          href="/dashboard"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 hover:scale-105"
        >
          Launch Dashboard
        </Link>
      </nav>

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center px-6 pt-16 md:pt-24 pb-20">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={0}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 text-violet-300 text-sm mb-8"
        >
          <Sparkles className="w-4 h-4" />
          AI-Powered Operational Compression
        </motion.div>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight max-w-5xl"
        >
          Your AI{" "}
          <span className="gradient-text">Chief of Staff</span>
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={2}
          className="text-lg md:text-xl text-slate-400 max-w-2xl mt-6 leading-relaxed"
        >
          FounderOS compresses 6 tools into one action brain. Context stitching,
          memory, deadlines, and AI-powered recommendations — all in one place.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={3}
          className="flex flex-col sm:flex-row gap-4 mt-10"
        >
          <Link
            href="/dashboard"
            className="group px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-lg hover:shadow-xl hover:shadow-violet-500/25 transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            Launch Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <button className="px-8 py-4 rounded-2xl border border-slate-700 text-slate-300 font-semibold text-lg hover:bg-slate-800/50 transition-all duration-300 hover:border-violet-500/50">
            Watch Demo
          </button>
        </motion.div>

        {/* Ask FounderOS Teaser */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={4}
          className="mt-16 w-full max-w-2xl"
        >
          <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm text-slate-500">Ask FounderOS</p>
              <p className="text-slate-300 typing-cursor">
                What am I forgetting right now?
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Pain Points */}
      <section className="relative z-10 px-6 md:px-12 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold text-center mb-4">
            The Founder <span className="gradient-text-warm">Overload</span> Problem
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
            Every day, founders lose hours to context switching and forgotten commitments
          </motion.p>
          <div className="grid md:grid-cols-3 gap-6">
            {painPoints.map((p, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 2}
                className="glass-card rounded-2xl p-8 text-center"
              >
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-rose-500/10 flex items-center justify-center">
                  <p.icon className="w-7 h-7 text-rose-400" />
                </div>
                <p className="text-4xl font-bold gradient-text-warm mb-2">{p.stat}</p>
                <p className="text-lg font-semibold text-slate-200 mb-2">{p.label}</p>
                <p className="text-sm text-slate-500">{p.detail}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 md:px-12 py-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2 variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold text-center mb-4">
            One Brain. <span className="gradient-text">Zero Chaos.</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-slate-400 text-center mb-12 max-w-xl mx-auto">
            FounderOS replaces your scattered workflow with an intelligent command center
          </motion.p>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                custom={i + 2}
                className="glass-card rounded-2xl p-8 group cursor-pointer"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                  style={{ boxShadow: `0 0 30px ${f.glow}` }}
                >
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-100 mb-2">{f.title}</h3>
                <p className="text-slate-400 leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 md:px-12 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.h2 variants={fadeUp} custom={0} className="text-4xl md:text-5xl font-bold mb-6">
            Stop juggling. <span className="gradient-text">Start operating.</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={1} className="text-slate-400 text-lg mb-10">
            Join the founders who replaced 6 tabs with one intelligent dashboard.
          </motion.p>
          <motion.div variants={fadeUp} custom={2}>
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 px-10 py-5 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-bold text-xl hover:shadow-2xl hover:shadow-violet-500/30 transition-all duration-300 hover:scale-105 animate-pulse-glow"
            >
              Launch FounderOS
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-slate-800/50 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold gradient-text">FounderOS</span>
          </div>
          <p className="text-sm text-slate-600">
            Built with 💜 for Hackathon 2025 — AI-Powered Operational Compression
          </p>
        </div>
      </footer>
    </div>
  );
}
