"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Sparkles,
  CheckCircle2,
  Send,
  Copy,
  ArrowLeft,
  User,
  AlertCircle,
  Clock,
} from "lucide-react";
import { emails } from "@/lib/mock-data";
import type { Email } from "@/lib/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const priorityStyles: Record<string, string> = {
  urgent: "badge-urgent",
  high: "badge-high",
  medium: "badge-medium",
  low: "badge-low",
};

const categoryIcons: Record<string, string> = {
  investor: "💰",
  customer: "🏢",
  team: "👥",
  accelerator: "🚀",
};

export default function InboxPage() {
  const [selected, setSelected] = useState<Email | null>(null);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [realEmails, setRealEmails] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      fetch("/api/inbox")
        .then(res => res.json())
        .then(data => setRealEmails(data));
    };
    
    fetchData(); // Initial load
    const interval = setInterval(fetchData, 3000); // Poll every 3 seconds
    return () => clearInterval(interval);
  }, []);

  const combinedEmails = realEmails.length > 0 ? realEmails : emails;
  const filteredEmails = combinedEmails.filter((email) => {
    if (activeTab === "all") return true;
    const p = (email.priority || email.urgency || "").toLowerCase();
    return p === activeTab.toLowerCase();
  });

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div initial="hidden" animate="visible" className="p-6 lg:p-8">
      <motion.div variants={fadeUp} custom={0} className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
            <Mail className="w-6 h-6 text-violet-400" />
            Inbox Intelligence
          </h1>
          <p className="text-slate-500 mt-1">AI-powered email analysis with action detection and smart replies</p>
        </div>
        {realEmails.length > 0 && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-bold text-emerald-400">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            REAL-TIME SYNC ACTIVE
          </div>
        )}
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Email List */}
        <motion.div variants={fadeUp} custom={1} className="lg:col-span-2 space-y-3">
          {filteredEmails.map((email, i) => (
            <motion.button
              key={email.id}
              variants={fadeUp}
              custom={i + 2}
              onClick={() => setSelected(email)}
              className={`w-full text-left p-4 rounded-2xl transition-all duration-200 ${
                selected?.id === email.id
                  ? "glass-card border-violet-500/30 shadow-lg shadow-violet-500/5"
                  : "glass-card hover:border-violet-500/20"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600/30 to-cyan-600/30 border border-violet-500/20 flex items-center justify-center text-sm font-bold text-violet-300 shrink-0">
                  {email.from.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <p className="text-sm font-semibold text-slate-200 truncate">{email.from}</p>
                    <span className="text-[10px] text-slate-600 shrink-0">{email.date}</span>
                  </div>
                  <p className="text-sm text-slate-300 truncate">{email.subject}</p>
                  <p className="text-xs text-slate-500 truncate mt-1">{email.preview}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${priorityStyles[email.priority]}`}>
                      {email.priority.toUpperCase()}
                    </span>
                    <span className="text-[11px]">{categoryIcons[email.category]}</span>
                    {!email.isRead && <span className="w-2 h-2 rounded-full bg-violet-500" />}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        {/* Email Detail */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {selected ? (
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                {/* Email Header */}
                <div className="glass-card rounded-2xl p-6">
                  <button onClick={() => setSelected(null)} className="lg:hidden flex items-center gap-1 text-sm text-violet-400 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-600/30 to-cyan-600/30 border border-violet-500/20 flex items-center justify-center text-lg font-bold text-violet-300 shrink-0">
                      {selected.from.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-bold text-slate-100">{selected.subject}</h2>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-slate-400">{selected.from}</p>
                        <span className="text-xs text-slate-600">· {selected.fromRole}</span>
                      </div>
                    </div>
                    <span className={`text-[10px] font-semibold px-3 py-1 rounded-full ${priorityStyles[selected.priority]}`}>
                      {selected.priority.toUpperCase()}
                    </span>
                  </div>
                  <div className="mt-5 p-4 rounded-xl bg-slate-900/50 border border-slate-800/40">
                    <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{selected.fullBody}</p>
                  </div>
                </div>

                {/* AI Summary */}
                <div className="glass-card rounded-2xl p-6 border-violet-500/20">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <h3 className="text-sm font-bold text-violet-300">AI Summary</h3>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{selected.aiSummary}</p>
                </div>

                {/* Action Items */}
                <div className="glass-card rounded-2xl p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <AlertCircle className="w-5 h-5 text-amber-400" />
                    <h3 className="text-sm font-bold text-amber-300">Detected Action Items</h3>
                  </div>
                  <div className="space-y-2">
                    {selected.actionItems.map((item, i) => (
                      <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10">
                        <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        <p className="text-sm text-slate-300">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Suggested Reply */}
                {selected.suggestedReply && (
                  <div className="glass-card rounded-2xl p-6 border-emerald-500/20">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <Send className="w-5 h-5 text-emerald-400" />
                        <h3 className="text-sm font-bold text-emerald-300">Suggested Reply</h3>
                      </div>
                      <button
                        onClick={() => handleCopy(selected.suggestedReply)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium hover:bg-emerald-500/20 transition-colors"
                      >
                        {copied ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                      <p className="text-sm text-slate-300 whitespace-pre-wrap leading-relaxed">{selected.suggestedReply}</p>
                    </div>
                    <button className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-semibold text-sm hover:shadow-lg hover:shadow-violet-500/20 transition-all hover:scale-[1.02]">
                      Send Reply
                    </button>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="glass-card rounded-2xl p-12 text-center"
              >
                <div className="relative inline-block mb-4">
                  <Mail className="w-16 h-16 text-slate-700" />
                  {realEmails.length === 0 && (
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                      className="absolute -top-2 -right-2 bg-violet-500 rounded-full p-1"
                    >
                      <Sparkles className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-slate-400">
                  {realEmails.length > 0 ? "Select an email" : "Waiting for Sync..."}
                </h3>
                <p className="text-sm text-slate-600 mt-2 max-w-sm mx-auto">
                  {realEmails.length > 0 
                    ? "Click on an email to see AI analysis, action items, and suggested replies."
                    : "Open Gmail and use the FounderOS Extension to sync your real-time inbox intelligence."}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
