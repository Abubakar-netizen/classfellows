"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Circle,
  Clock,
  Mail,
  Brain,
  TrendingUp,
  Zap,
  Activity,
  Users,
  Target,
} from "lucide-react";
import Link from "next/link";
import {
  todaysPriorities,
  missedFollowUps,
  investorPipeline,
  techAlerts,
  quickStats,
  deadlines as mockDeadlines,
} from "@/lib/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const urgencyColors: Record<string, string> = {
  critical: "badge-urgent",
  high: "badge-high",
  medium: "badge-medium",
  low: "badge-low",
};

const statusColors: Record<string, string> = {
  closing: "text-emerald-400 bg-emerald-500/10 border-emerald-500/30",
  warm: "text-amber-400 bg-amber-500/10 border-amber-500/30",
  cold: "text-slate-400 bg-slate-500/10 border-slate-500/30",
  committed: "text-violet-400 bg-violet-500/10 border-violet-500/30",
};

const alertSeverityIcon: Record<string, string> = {
  critical: "status-dot critical",
  warning: "status-dot warning",
  info: "status-dot online",
};

export default function DashboardPage() {
  const [newMemories, setNewMemories] = useState([]);
  const [newDeadlines, setNewDeadlines] = useState([]);
  const [aiQueryCount, setAiQueryCount] = useState(42);
  const [mounted, setMounted] = useState(false);
  const [realInbox, setRealInbox] = useState([]);

  useEffect(() => {
    setMounted(true);
    const fetchData = () => {
      fetch("/api/brain").then(r => r.json()).then(setNewMemories);
      fetch("/api/deadlines").then(r => r.json()).then(setNewDeadlines);
      fetch("/api/inbox").then(r => r.json()).then(setRealInbox);
    };

    fetchData();
    const interval = setInterval(fetchData, 4000);
    
    const storedCount = localStorage.getItem('ai_query_count') || "42";
    setAiQueryCount(parseInt(storedCount));

    return () => clearInterval(interval);
  }, []);

  // AI-Detected Investor Pipeline from Real Inbox
  const detectedInvestors = realInbox
    .filter((e: any) => 
      /investor|vc|fund|seed|series|capital|check/i.test(e.subject) || 
      /investor|vc|fund|seed|series|capital|check/i.test(e.from)
    )
    .map((e: any) => ({
      id: e.id,
      name: e.from,
      firm: "Detected Lead",
      amount: "Evaluating...",
      status: "warm",
      nextStep: "Analyze thread for pitch deck request"
    }));

  const combinedPipeline = detectedInvestors.length > 0 ? detectedInvestors.slice(0, 4) : investorPipeline.slice(0, 4);

  // Operational Focus: Top 4 Urgent Tasks (Real + Mock)
  const realPriorities = newDeadlines.map((d: any) => ({
    id: d.id,
    title: d.title,
    source: "Real-time Sync",
    dueDate: d.date,
    urgency: "high"
  }));
  
  const combinedPriorities = realPriorities.length > 0 ? realPriorities.slice(0, 4) : todaysPriorities.slice(0, 4);

  const combinedDeadlines = [...newDeadlines.map((d: any) => ({
    ...d,
    dueDate: d.date,
    status: "upcoming",
    progress: 0,
    category: "internal"
  })), ...mockDeadlines];

  const totalMemories = quickStats.memoriesStored + newMemories.length;
  const totalDeadlines = combinedDeadlines.filter(d => d.status !== "completed").length;
  
  // Logic to prevent hydration mismatch
  const hour = mounted ? new Date().getHours() : 12;
  const greeting = !mounted ? "Welcome" : hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const timeString = mounted ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "--:--";

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="p-6 lg:p-8 space-y-6"
    >
      {/* Header */}
      <motion.div variants={fadeUp} custom={0} className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-100">
            {greeting}, <span className="gradient-text">Paul</span> 👋
          </h1>
          <p className="text-slate-500 mt-1">
            You have <span className="text-rose-400 font-semibold">{combinedDeadlines.filter(d => d.status === 'at-risk' || d.status === 'overdue').length} critical items</span> and{" "}
            <span className="text-cyan-400 font-semibold">{newMemories.length} new syncs</span> to review.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2 text-xs text-slate-600">
          <Activity className="w-3.5 h-3.5 text-emerald-400" />
          System Health: Optimal · {timeString}
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={fadeUp} custom={1} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Emails Processed", value: 124 + newMemories.length, icon: Mail, color: "text-violet-400" },
          { label: "Actions Detected", value: 8 + newDeadlines.length, icon: Target, color: "text-rose-400" },
          { label: "Memories Stored", value: totalMemories, icon: Brain, color: "text-cyan-400" },
          { label: "Deadlines Active", value: totalDeadlines, icon: Clock, color: "text-amber-400" },
          { label: "Follow-ups Due", value: 4, icon: Users, color: "text-orange-400" },
          { label: "AI Queries", value: aiQueryCount, icon: Zap, color: "text-emerald-400" },
        ].map((stat, i) => (
          <div key={i} className="glass-card rounded-xl p-4 text-center">
            <stat.icon className={`w-5 h-5 ${stat.color} mx-auto mb-2`} />
            <p className="text-2xl font-bold text-slate-100">{stat.value}</p>
            <p className="text-[11px] text-slate-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Latest Syncs from Browser */}
          <motion.div variants={fadeUp} custom={2} className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Zap className="w-5 h-5 text-violet-400" />
                Latest Syncs from Browser
              </h2>
              <Link href="/dashboard/brain" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
                View Brain <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {newMemories.length > 0 ? (
                newMemories.slice(0, 3).map((item: any) => (
                  <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl bg-violet-500/5 border border-violet-500/10 transition-colors">
                    <div className="mt-0.5 shrink-0">
                       <div className="w-8 h-8 rounded-lg bg-violet-500/20 flex items-center justify-center">
                          <Brain className="w-4 h-4 text-violet-400" />
                       </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-slate-200">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{item.content}</p>
                    </div>
                    <span className="text-[10px] font-semibold px-2.5 py-1 rounded-full badge-high shrink-0">NEW</span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-600 italic p-4 text-center">No real-time memories yet. Save something from the extension!</p>
              )}
            </div>
          </motion.div>

          {/* Operational Focus (Dynamic) */}
          <motion.div variants={fadeUp} custom={3} className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Target className="w-5 h-5 text-rose-400" />
                Operational Focus
              </h2>
            </div>
            <div className="space-y-3">
              {combinedPriorities.map((item, i) => (
                <div key={item.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-800/30 transition-colors group">
                  <div className="mt-0.5 shrink-0">
                    <Circle className={`w-5 h-5 ${item.urgency === 'high' ? 'text-rose-500' : 'text-slate-600'} group-hover:text-rose-400 transition-colors`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-200">{item.title}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{item.source} · {item.dueDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Column 2 */}
        <div className="space-y-6">
          {/* Investor Pipeline (AI Detected) */}
          <motion.div variants={fadeUp} custom={4} className="glass-card rounded-2xl p-6">
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2 mb-5">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Investor Pipeline
            </h2>
            <div className="space-y-3">
              {combinedPipeline.map((inv) => (
                <div key={inv.id} className="p-3 rounded-xl bg-slate-800/20 border border-slate-800/40 hover:border-violet-500/20 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-semibold text-slate-200">{inv.name}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${statusColors[inv.status]}`}>
                      {inv.status}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500">{inv.firm} · {inv.amount}</p>
                  <p className="text-xs text-cyan-400/80 mt-1.5 truncate">→ {inv.nextStep}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Deadlines (Combined) */}
          <motion.div variants={fadeUp} custom={5} className="glass-card rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
                <Clock className="w-5 h-5 text-amber-400" />
                Upcoming
              </h2>
              <Link href="/dashboard/deadlines" className="text-xs text-violet-400 hover:text-violet-300 flex items-center gap-1">
                View all <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="space-y-3">
              {combinedDeadlines.slice(0, 5).map((d: any) => {
                const statusCol = d.status === "at-risk" ? "text-amber-400" : d.status === "overdue" ? "text-rose-400" : "text-emerald-400";
                return (
                  <div key={d.id} className="flex items-center gap-3">
                    <div className={`w-1.5 h-8 rounded-full ${d.status === "at-risk" ? "bg-amber-500" : d.status === "overdue" ? "bg-rose-500" : "bg-emerald-500"}`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-slate-200 truncate">{d.title}</p>
                      <p className="text-[10px] text-slate-500">{d.dueDate}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
