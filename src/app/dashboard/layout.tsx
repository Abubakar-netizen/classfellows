"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Mail,
  Brain,
  Clock,
  Zap,
  Sparkles,
  Settings,
  ChevronLeft,
  Search,
  Bell,
} from "lucide-react";
import { useState, useRef } from "react";
import { missedFollowUps } from "@/lib/mock-data";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Command Center" },
  { href: "/dashboard/inbox", icon: Mail, label: "Inbox Intelligence" },
  { href: "/dashboard/brain", icon: Brain, label: "Founder Brain" },
  { href: "/dashboard/deadlines", icon: Clock, label: "Deadline Radar" },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [askOpen, setAskOpen] = useState(false);
  const [askQuery, setAskQuery] = useState("");
  const [askAnswer, setAskAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAsk = async () => {
    if (!askQuery.trim()) return;
    setIsTyping(true);
    setAskAnswer("");
    
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: askQuery }),
      });
      
      const data = await res.json();
      const response = data.answer || data.error || "Sorry, I couldn't process that.";

      // Simulate typing effect
      let i = 0;
      const interval = setInterval(() => {
        setAskAnswer(response.slice(0, i));
        i += 3;
        if (i > response.length) {
          setAskAnswer(response);
          setIsTyping(false);
          clearInterval(interval);
        }
      }, 10);
    } catch (err) {
      setAskAnswer("Error connecting to AI service.");
      setIsTyping(false);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 border-r border-slate-800/60 bg-[rgba(8,6,20,0.9)] flex flex-col">
        {/* Logo */}
        <div className="p-5 flex items-center gap-2.5 border-b border-slate-800/40">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-violet-500/25 transition-all">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-lg font-bold gradient-text">FounderOS</span>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-violet-500/15 text-violet-300 border border-violet-500/20 shadow-lg shadow-violet-500/5"
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
                }`}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-violet-400" : ""}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="px-3 pb-4 space-y-2">
          <div className="glass-card rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              <span className="text-xs font-semibold text-violet-300">AI Status</span>
            </div>
            <p className="text-xs text-slate-500">Gemini 2.5 Flash</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="status-dot online" />
              <span className="text-xs text-emerald-400">Active & Ready</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="shrink-0 h-16 border-b border-slate-800/40 bg-[rgba(8,6,20,0.7)] backdrop-blur-xl flex items-center justify-between px-6">
          {/* Ask FounderOS */}
          <button
            onClick={() => {
              setAskOpen(true);
              setTimeout(() => inputRef.current?.focus(), 100);
            }}
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-slate-800/40 border border-slate-700/50 hover:border-violet-500/30 transition-all text-sm text-slate-500 w-full max-w-md cursor-text"
          >
            <Search className="w-4 h-4" />
            <span>Ask FounderOS anything...</span>
            <kbd className="ml-auto hidden md:inline text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-500 border border-slate-700">
              ⌘K
            </kbd>
          </button>

          <div className="flex items-center gap-3 ml-4">
            {/* Notifications */}
            <button className="relative p-2.5 rounded-xl hover:bg-slate-800/40 transition-colors">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-[#08061a]" />
            </button>
            {/* Avatar */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
              P
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-grid-pattern">
          <div className="bg-radial-glow min-h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Ask FounderOS Modal */}
      {askOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] bg-black/60 backdrop-blur-sm"
          onClick={(e) => { if (e.target === e.currentTarget) { setAskOpen(false); setAskAnswer(""); setAskQuery(""); } }}
        >
          <div className="w-full max-w-2xl glass-card rounded-2xl border border-violet-500/20 overflow-hidden shadow-2xl shadow-violet-500/10">
            {/* Input */}
            <div className="flex items-center gap-3 p-5 border-b border-slate-800/40">
              <Sparkles className="w-5 h-5 text-violet-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={askQuery}
                onChange={(e) => setAskQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleAsk(); }}
                placeholder='Try: "What am I forgetting right now?"'
                className="flex-1 bg-transparent outline-none text-slate-200 placeholder:text-slate-600 text-lg"
              />
              <button
                onClick={handleAsk}
                className="px-4 py-2 rounded-lg bg-violet-600 text-white text-sm font-medium hover:bg-violet-500 transition-colors"
              >
                Ask
              </button>
            </div>
            {/* Response */}
            {(askAnswer || isTyping) && (
              <div className="p-5 max-h-[50vh] overflow-y-auto">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1 text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                    {askAnswer}
                    {isTyping && <span className="typing-cursor" />}
                  </div>
                </div>
              </div>
            )}
            {/* Suggestions */}
            {!askAnswer && !isTyping && (
              <div className="p-5 space-y-2">
                <p className="text-xs text-slate-600 mb-3">Suggested questions</p>
                {[
                  "What am I forgetting right now?",
                  "What did Sam decide about pricing?",
                  "What is our MRR?",
                ].map((q) => (
                  <button
                    key={q}
                    onClick={async () => {
                      setAskQuery(q);
                      setIsTyping(true);
                      setAskAnswer("");
                      try {
                        const res = await fetch("/api/ai", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ query: q }),
                        });
                        const data = await res.json();
                        const response = data.answer || data.error || "Sorry, I couldn't process that.";
                        let i = 0;
                        const interval = setInterval(() => {
                          setAskAnswer(response.slice(0, i));
                          i += 3;
                          if (i > response.length) {
                            setAskAnswer(response);
                            setIsTyping(false);
                            clearInterval(interval);
                          }
                        }, 10);
                      } catch (err) {
                        setAskAnswer("Error connecting to AI service.");
                        setIsTyping(false);
                      }
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm text-slate-400 hover:bg-violet-500/10 hover:text-violet-300 transition-all border border-transparent hover:border-violet-500/20"
                  >
                    &quot;{q}&quot;
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
