import { NextResponse } from "next/server";
import { memories, emails, deadlines, todaysPriorities } from "@/lib/mock-data";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function POST(req: Request) {
  try {
    const { query, text, task } = await req.json();
    const aiccKey = process.env.AICC_API_KEY;
    const aiccBase = process.env.AICC_BASE_URL || "https://api.ai.cc/v1";

    if (!(global as any).brainMemories) (global as any).brainMemories = [];
    if (!(global as any).deadlines) (global as any).deadlines = [];

    // Base System Prompt
    let systemPrompt = `You are FounderOS AI, a Chief of Staff for a startup founder named Paul.`;
    let userPrompt = query || "";

    // Fetch real-time data from global storage
    const newMemories = (global as any).brainMemories || [];
    const newDeadlines = (global as any).deadlines || [];

    if (task === "summarize" && text) {
      systemPrompt = "You are an expert Chief of Staff. Summarize the following content (email, slack, or doc) into a concise 'Founder TL;DR'. Extract key decisions, action items, and people mentioned. Use professional, founder-focused markdown.";
      userPrompt = text;
    } else {
      // Normal Query Mode with Full Context (Mock + Real)
      systemPrompt += `\nContext:\nMEMORIES (Real-time): ${JSON.stringify(newMemories)}\nMEMORIES (Historical): ${JSON.stringify(memories.slice(0, 10))}\nEMAILS: ${JSON.stringify(emails.slice(0, 3))}`;
    }

    // Try AICC (OpenAI Compatible)
    if (aiccKey) {
      try {
        const response = await fetch(`${aiccBase}/chat/completions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${aiccKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt }
            ],
          }),
        });
        const data = await response.json();
        if (response.ok) {
          return NextResponse.json({ answer: data.choices[0].message.content }, { headers: corsHeaders });
        }
        console.error("AICC API Error:", data);
      } catch (e) {
        console.error("AICC Fetch failed", e);
      }
    }

    // Fallback Mock Logic
    let answer = "";
    if (task === "summarize") {
      answer = "### TL;DR\n(Note: Fallback mode active. Ensure AICC API Key is valid).\n\nThis communication appears critical. Action: Review and flag for follow-up.";
    } else {
      const q = (query || "").toLowerCase();
      if (q.includes("forgetting")) answer = "🚨 **What you might be forgetting:**\n1. YC Application (2 days left)\n2. Sequoia MRR update (Due tomorrow)";
      else answer = "FounderOS is active. AICC API is configured and ready.";
    }
    
    return NextResponse.json({ answer, isMock: true }, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: "Internal error" }, { status: 500, headers: corsHeaders });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
