import { NextResponse } from "next/server";

if (!(global as any).deadlines) {
  (global as any).deadlines = [];
}

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function GET() {
  return NextResponse.json((global as any).deadlines, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const deadline = await req.json();
    const newDeadline = {
      id: Date.now().toString(),
      progress: 0,
      status: "upcoming",
      ...deadline
    };
    (global as any).deadlines.unshift(newDeadline);
    return NextResponse.json({ success: true, deadline: newDeadline }, { headers: corsHeaders });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save deadline" }, { status: 500, headers: corsHeaders });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
