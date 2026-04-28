"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Brain,
  Search,
  Sparkles,
  Zap,
  Tag,
  User,
  FileText,
  Lightbulb,
  HandshakeIcon,
  Users,
  MessageSquare,
} from "lucide-react";
import { memories } from "@/lib/mock-data";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const typeIcons: Record<string, typeof Brain> = {
  decision: Lightbulb,
  promise: HandshakeIcon,
  context: FileText,
  people: Users,
};

const typeColors: Record<string, string> = {
  decision: "from-violet-500 to-purple-600",
  promise: "from-amber-500 to-orange-600",
  context: "from-cyan-500 to-blue-600",
  people: "from-emerald-500 to-green-600",
};

const typeBadge: Record<string, string> = {
  decision: "bg-violet-500/10 text-violet-400 border-violet-500/30",
  promise: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  context: "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
  people: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
};

export default function BrainPage() {
  const [query, setQuery] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [allMemories, setAllMemories] = useState(memories);

  useEffect(() => {
    fetch("/api/brain")
      .then(res => res.json())
      .then(newMemories => {
        // Merge with mock data, putting new ones first
        const merged = [...newMemories.map((m: any) => ({
          ...m,
          tags: ["Real-time", "Browser"],
          source: "Chrome Extension"
        })), ...memories];
        setAllMemories(merged);
      });
  }, []);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsTyping(true);
    setAiAnswer("");
    
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      
      const data = await res.json();
      const response = data.answer || "Sorry, I couldn't process that.";
      
      // Update query count for dashboard
      const currentCount = parseInt(localStorage.getItem('ai_query_count') || "42");
      localStorage.setItem('ai_query_count', (currentCount + 1).toString());
      
      let i = 0;
      const interval = setInterval(() => {
        setAiAnswer(response.slice(0, i));
        i += 4;
        if (i > response.length) {
          setAiAnswer(response);
          setIsTyping(false);
          clearInterval(interval);
        }
      }, 10);
    } catch (err) {
      setAiAnswer("Error connecting to AI service.");
      setIsTyping(false);
    }
  };

  const filteredMemories = activeFilter === "all"
    ? allMemories
    : allMemories.filter((m) => m.type === activeFilter);

  return (
    <motion.div initial="hidden" animate="visible" className="p-6 lg:p-8">
      <motion.div variants={fadeUp} custom={0} className="mb-6">
        <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
          <Brain className="w-6 h-6 text-cyan-400" />
          Founder Brain
        </h1>
        <p className="text-slate-500 mt-1">Your operational memory — search decisions, promises, and context</p>
      </motion.div>

      {/* AI Search */}
      <motion.div variants={fadeUp} custom={1} className="glass-card rounded-2xl p-6 mb-6 border-cyan-500/20">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-sm font-bold text-cyan-300">Ask Your Brain</h2>
        </div>
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") handleSearch(); }}
              placeholder='Try: "What did Sam decide about pricing?"'
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-slate-200 placeholder:text-slate-600 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-600 text-white font-medium text-sm hover:shadow-lg hover:shadow-violet-500/20 transition-all shrink-0"
          >
            Search
          </button>
        </div>
        {aiAnswer && (
          <div className="mt-5 p-5 rounded-xl bg-slate-900/50 border border-cyan-500/10">
            <div className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shrink-0 mt-0.5">
                <Zap className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="flex-1 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                {aiAnswer}
                {isTyping && <span className="typing-cursor" />}
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Memory Filters */}
      <motion.div variants={fadeUp} custom={2} className="flex items-center gap-2 mb-6 flex-wrap">
        {[
          { key: "all", label: "All Memories", count: allMemories.length },
          { key: "decision", label: "Decisions", count: allMemories.filter(m => m.type === "decision").length },
          { key: "promise", label: "Promises", count: allMemories.filter(m => m.type === "promise").length },
          { key: "context", label: "Context", count: allMemories.filter(m => m.type === "context").length },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setActiveFilter(f.key)}
            className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
              activeFilter === f.key
                ? "bg-violet-500/15 text-violet-300 border border-violet-500/30"
                : "bg-slate-800/30 text-slate-500 border border-transparent hover:border-slate-700/50 hover:text-slate-300"
            }`}
          >
            {f.label} ({f.count})
          </button>
        ))}
      </motion.div>

      {/* Memory Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredMemories.map((mem, i) => {
          const Icon = typeIcons[mem.type] || FileText;
          return (
            <motion.div
              key={mem.id}
              variants={fadeUp}
              custom={i + 3}
              className="glass-card rounded-2xl p-5 group"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${typeColors[mem.type] || "from-slate-500 to-slate-600"} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-slate-200">{mem.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${typeBadge[mem.type] || "bg-slate-500/10 text-slate-400 border-slate-500/30"}`}>
                      {mem.type}
                    </span>
                    <span className="text-[10px] text-slate-600">{mem.date}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-3">{mem.content}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {(mem.tags || []).slice(0, 3).map((tag: string) => (
                    <span key={tag} className="inline-flex items-center gap-1 text-[10px] text-slate-500 bg-slate-800/50 px-2 py-0.5 rounded-md">
                      <Tag className="w-2.5 h-2.5" />
                      {tag}
                    </span>
                  ))}
                </div>
                {(mem.people || []).length > 0 && (
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <User className="w-3 h-3" />
                    {mem.people.join(", ")}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1 mt-3 text-[10px] text-slate-600">
                <MessageSquare className="w-3 h-3" />
                Source: {mem.source}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
