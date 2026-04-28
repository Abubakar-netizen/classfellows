import { NextResponse } from "next/server";

// Global in-memory storage for the hackathon demo
// In a real app, this would be a database (Firestore/Supabase)
if (!(global as any).brainMemories) {
  (global as any).brainMemories = [];
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET() {
  return NextResponse.json((global as any).brainMemories, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const memory = await req.json();
    const newMemory = {
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      ...memory
    };
    (global as any).brainMemories.unshift(newMemory);
    return NextResponse.json({ success: true, memory: newMemory }, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save memory" }, { status: 500, headers: corsHeaders });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
