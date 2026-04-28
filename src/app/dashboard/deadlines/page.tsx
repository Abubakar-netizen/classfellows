"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Clock,
  AlertTriangle,
  Calendar,
  Rocket,
  TrendingUp,
  Users,
  Building,
  Gift,
} from "lucide-react";
import { deadlines } from "@/lib/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const categoryIcons: Record<string, typeof Clock> = {
  accelerator: Rocket,
  investor: TrendingUp,
  customer: Users,
  internal: Building,
  grants: Gift,
};

const categoryColors: Record<string, string> = {
  accelerator: "from-violet-500 to-purple-600",
  investor: "from-emerald-500 to-green-600",
  customer: "from-cyan-500 to-blue-600",
  internal: "from-slate-400 to-slate-600",
  grants: "from-amber-500 to-orange-600",
};

const statusConfig: Record<string, { color: string; bg: string; label: string }> = {
  "on-track": { color: "text-emerald-400", bg: "bg-emerald-500", label: "On Track" },
  "at-risk": { color: "text-amber-400", bg: "bg-amber-500", label: "At Risk" },
  overdue: { color: "text-rose-400", bg: "bg-rose-500", label: "Overdue" },
  completed: { color: "text-slate-400", bg: "bg-slate-500", label: "Completed" },
  upcoming: { color: "text-cyan-400", bg: "bg-cyan-500", label: "Upcoming" },
};

function getTimeRemaining(dateStr: string): string {
  try {
    if (!dateStr || dateStr === "Recent") return "Upcoming";
    const target = new Date(dateStr);
    if (isNaN(target.getTime())) return "Upcoming";
    
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    if (diff < 0) return "OVERDUE";
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    if (days > 7) return `${days} days`;
    if (days > 0) return `${days}d ${hours}h`;
    return `${hours}h`;
  } catch (e) {
    return "Upcoming";
  }
}

function getCountdownColor(dateStr: string): string {
  try {
    const target = new Date(dateStr);
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    if (days < 0) return "text-rose-400";
    if (days < 3) return "text-amber-400";
    if (days < 7) return "text-cyan-400";
    return "text-emerald-400";
  } catch (e) {
    return "text-slate-400";
  }
}

export default function DeadlinesPage() {
  const [allDeadlines, setAllDeadlines] = useState(deadlines);

  useEffect(() => {
    fetch("/api/deadlines")
      .then(res => res.json())
      .then(newItems => {
        setAllDeadlines([...newItems.map((d: any) => ({
          ...d,
          dueDate: d.date || d.dueDate || "TBD",
          description: d.description || "Auto-discovered from Gmail sync",
          category: (d.category || "internal").toLowerCase(),
          source: d.id.startsWith('ai-det') ? "AI Detection" : "Manual Sync"
        })), ...deadlines]);
      });
  }, []);

  const sorted = [...allDeadlines].sort((a, b) => {
    const dateA = new Date(a.dueDate || a.date).getTime();
    const dateB = new Date(b.dueDate || b.date).getTime();
    return (isNaN(dateA) ? 9999999999999 : dateA) - (isNaN(dateB) ? 9999999999999 : dateB);
  });

  const atRiskCount = allDeadlines.filter((d) => d.status === "at-risk" || d.status === "overdue").length;
  const onTrackCount = allDeadlines.filter((d) => d.status === "on-track").length;

  return (
    <motion.div initial="hidden" animate="visible" className="p-6 lg:p-8 max-w-5xl mx-auto">
      <motion.div variants={fadeUp} custom={0} className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-100 flex items-center gap-3">
            <Clock className="w-8 h-8 text-amber-400" />
            Deadline Radar
          </h1>
          <p className="text-slate-500 mt-2 text-lg">
            Operational commitments across all stacks.
          </p>
        </div>
        <div className="text-right">
           <div className="text-xs text-slate-600 mb-1">HEALTH SCORE</div>
           <div className="text-2xl font-bold text-emerald-400">94%</div>
        </div>
      </motion.div>

      {/* Summary Stats */}
      <motion.div variants={fadeUp} custom={1} className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Active", value: allDeadlines.length, color: "text-slate-100" },
          { label: "At Risk", value: atRiskCount, color: "text-amber-400" },
          { label: "On Track", value: onTrackCount, color: "text-emerald-400" },
          { label: "Next Due", value: getTimeRemaining(sorted[0]?.dueDate || ""), color: "text-cyan-400" },
        ].map((s, i) => (
          <div key={i} className="glass-card rounded-2xl p-5 border-slate-800/50">
            <p className={`text-3xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-semibold">{s.label}</p>
          </div>
        ))}
      </motion.div>

      {/* Timeline Section */}
      <div className="space-y-6 relative before:absolute before:left-[23px] before:top-2 before:bottom-2 before:w-px before:bg-slate-800/50">
        {sorted.map((deadline, i) => {
          const Icon = categoryIcons[deadline.category] || Clock;
          const status = statusConfig[deadline.status] || statusConfig["upcoming"];
          const countdown = getTimeRemaining(deadline.dueDate);
          const isOverdue = countdown === "OVERDUE";

          return (
            <motion.div
              key={deadline.id}
              variants={fadeUp}
              custom={i + 2}
              className="relative pl-12 group"
            >
              {/* Timeline Dot */}
              <div className={`absolute left-4 top-6 w-5 h-5 rounded-full border-4 border-slate-900 z-10 transition-transform group-hover:scale-125 ${isOverdue ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]' : 'bg-slate-700'}`} />
              
              <div className="glass-card rounded-2xl p-6 hover:border-slate-600/50 transition-all">
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                       <div className={`p-2 rounded-lg bg-gradient-to-br ${categoryColors[deadline.category] || 'from-slate-700 to-slate-800'}`}>
                          <Icon className="w-4 h-4 text-white" />
                       </div>
                       <h3 className="text-lg font-bold text-slate-100 truncate">{deadline.title}</h3>
                       <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter border ${status.color} ${status.bg}/10 border-current`}>
                          {status.label}
                       </span>
                    </div>
                    <p className="text-sm text-slate-500 mb-4">{deadline.description}</p>
                    <div className="flex items-center gap-4">
                       <div className="flex items-center gap-1.5 text-xs text-slate-600">
                          <Calendar className="w-3.5 h-3.5" />
                          {deadline.dueDate}
                       </div>
                       <div className="h-1 w-1 rounded-full bg-slate-800" />
                       <div className="text-xs font-bold text-slate-400 uppercase">{deadline.category}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-8 shrink-0">
                    <div className="w-32 text-right">
                       <p className={`text-2xl font-bold ${isOverdue ? 'text-rose-500 animate-pulse' : 'text-slate-100'}`}>{countdown}</p>
                       <p className="text-[10px] text-slate-600 uppercase font-bold">Remaining</p>
                    </div>
                    <div className="w-24">
                       <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${deadline.progress}%` }}
                            className={`h-full ${status.bg}`} 
                          />
                       </div>
                       <p className="text-[10px] text-slate-500 mt-2 font-bold">{deadline.progress}% Complete</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
