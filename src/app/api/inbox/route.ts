import { NextResponse } from "next/server";

if (!(global as any).realInbox) {
  (global as any).realInbox = [];
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function GET() {
  return NextResponse.json((global as any).realInbox, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const { emails } = await req.json();
    const aiccKey = process.env.AICC_API_KEY;
    let realData = [];
    
    if (Array.isArray(emails)) {
      realData = emails.map((e: any, i: number) => ({
        id: `real-${Date.now()}-${i}`,
        from: e.sender || "Unknown",
        subject: e.subject || "No Subject",
        preview: "New message synced from Gmail...",
        fullBody: "Analyzed via FounderOS Extension. Open Gmail for full thread.",
        aiSummary: "Important communication regarding operational updates.",
        actionItems: ["Review details", "Reply if necessary"],
        status: "unread",
        date: e.date || "Just now",
        priority: "high",
        category: "team",
        fromRole: "External Contact"
      }));
      (global as any).realInbox = realData;

      if (aiccKey && realData.length > 0) {
        const inboxSummary = realData.map(e => `${e.from}: ${e.subject}`).join("\n");
        try {
          const aiRes = await fetch("https://api.ai.cc/v1/chat/completions", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Authorization": `Bearer ${aiccKey}` },
            body: JSON.stringify({
              model: "gpt-4o-mini",
              messages: [{
                role: "system",
                content: "You are an AI assistant. Extract 2-3 specific deadlines from these email subjects. Return ONLY a JSON array of objects: [{title, date, category, description}]. Category must be 'internal', 'investor', or 'customer'. If no deadline found, return []."
              }, {
                role: "user", content: inboxSummary
              }]
            })
          });
          const aiData = await aiRes.json();
          const detected = JSON.parse(aiData.choices[0].message.content);
          if (Array.isArray(detected)) {
            (global as any).deadlines = [...detected.map(d => ({
              ...d,
              id: `ai-det-${Date.now()}-${Math.random()}`,
              progress: 0,
              status: "upcoming"
            })), ...((global as any).deadlines || [])];
          }
        } catch (e) { console.error("Magic extraction failed", e); }
      }
    }
    return NextResponse.json({ success: true, count: realData.length }, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update inbox" }, { status: 500, headers: corsHeaders });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
