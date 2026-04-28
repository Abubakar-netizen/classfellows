// ========== FOUNDEROS MOCK DATA ==========

export interface Email {
  id: string;
  from: string;
  fromRole: string;
  subject: string;
  preview: string;
  fullBody: string;
  date: string;
  priority: "urgent" | "high" | "medium" | "low";
  category: "investor" | "customer" | "team" | "accelerator";
  aiSummary: string;
  actionItems: string[];
  suggestedReply: string;
  isRead: boolean;
}

export interface Memory {
  id: string;
  type: "decision" | "promise" | "context" | "people";
  title: string;
  content: string;
  people: string[];
  date: string;
  tags: string[];
  source: string;
}

export interface Deadline {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: "accelerator" | "investor" | "customer" | "internal" | "grants";
  status: "on-track" | "at-risk" | "overdue" | "completed";
  progress: number;
  relatedMemories: string[];
}

export interface ActionItem {
  id: string;
  title: string;
  urgency: "critical" | "high" | "medium" | "low";
  source: string;
  dueDate: string;
  completed: boolean;
}

export interface FollowUp {
  id: string;
  person: string;
  role: string;
  context: string;
  lastContact: string;
  daysOverdue: number;
  avatar: string;
}

export interface InvestorCard {
  id: string;
  name: string;
  firm: string;
  status: "warm" | "cold" | "closing" | "committed";
  lastAction: string;
  nextStep: string;
  amount: string;
}

export interface TechAlert {
  id: string;
  title: string;
  description: string;
  type: "cost" | "deprecation" | "update" | "security";
  severity: "info" | "warning" | "critical";
  date: string;
}

// ─── EMAILS ───
export const emails: Email[] = [
  {
    id: "e1",
    from: "Sarah Chen",
    fromRole: "Partner @ Sequoia Capital",
    subject: "Re: Series A - MRR Update Request",
    preview: "Hi Paul, following up on our call last week. Could you share the latest MRR numbers...",
    fullBody: "Hi Paul,\n\nFollowing up on our call last week. Could you share the latest MRR numbers and your customer acquisition breakdown for Q1? We're presenting to the partnership on Friday and want to include your traction data.\n\nAlso, I noticed you mentioned a new enterprise client - any signed LOIs we can reference?\n\nLooking forward to the update.\n\nBest,\nSarah",
    date: "2 hours ago",
    priority: "urgent",
    category: "investor",
    aiSummary: "Sarah from Sequoia needs MRR numbers for partnership meeting on Friday. She also wants enterprise LOI details. Your latest MRR from Sheets (Thursday) = $12,450. Enterprise LOI with TechCorp was signed April 20.",
    actionItems: [
      "Send Q1 MRR breakdown ($12,450 current)",
      "Attach TechCorp LOI (signed April 20)",
      "Include customer acquisition cost metrics",
    ],
    suggestedReply: "Hi Sarah,\n\nGreat timing! Here's the latest:\n\n• Current MRR: $12,450 (up 34% from last month)\n• Q1 customer acquisition: 23 new accounts, CAC of $180\n• Enterprise: TechCorp LOI signed April 20 ($50K ACV)\n\nI'll send the full deck by Thursday for your Friday meeting. Happy to jump on a quick call if you need anything else.\n\nBest,\nPaul",
    isRead: false,
  },
  {
    id: "e2",
    from: "James Rodriguez",
    fromRole: "CTO @ ClientFlow",
    subject: "Onboarding Issues - Urgent",
    preview: "Hey team, we've been stuck on the API integration for 3 days now...",
    fullBody: "Hey team,\n\nWe've been stuck on the API integration for 3 days now. The webhook endpoints keep returning 504 errors on batch operations above 1000 records.\n\nOur team is getting frustrated and we have a board meeting next week where we need to show this working. Can we get an engineer on a call today?\n\nThanks,\nJames",
    date: "4 hours ago",
    priority: "urgent",
    category: "customer",
    aiSummary: "ClientFlow (enterprise customer) has critical API integration issues - 504 errors on batch ops >1000 records. They have a board meeting next week. This is a $50K ACV account - needs immediate engineering attention.",
    actionItems: [
      "Schedule emergency call with ClientFlow engineering team",
      "Ask Sam to investigate batch API 504 errors",
      "Prepare fallback solution for batch size limits",
    ],
    suggestedReply: "Hi James,\n\nSorry about the friction. I've flagged this as P0 and our lead engineer Sam is looking into the 504 issues right now.\n\nCan your team hop on a call at 3 PM today? We'll have a fix or workaround ready.\n\nFor immediate relief, try batching in chunks of 500 - that should work while we fix the root cause.\n\nBest,\nPaul",
    isRead: false,
  },
  {
    id: "e3",
    from: "Sam (Co-founder)",
    fromRole: "CTO & Co-founder",
    subject: "Re: Pricing Model Decision",
    preview: "Paul, I've thought about it more. Let's go with usage-based pricing...",
    fullBody: "Paul,\n\nI've thought about it more. Let's go with usage-based pricing at $0.01/API call instead of flat tiers. Reasons:\n\n1. Better alignment with enterprise usage patterns\n2. Lower barrier for SMBs to start\n3. Revenue scales with customer success\n\nI'll build the billing dashboard by May 1. Let's revisit after we hit 100 customers and see if we need tier options.\n\nAlso - I deprioritized the mobile app. We need to focus on API reliability first (see ClientFlow issues).\n\n- Sam",
    date: "Yesterday",
    priority: "medium",
    category: "team",
    aiSummary: "Sam decided on usage-based pricing ($0.01/API call) over flat tiers. Billing dashboard due May 1. Mobile app deprioritized in favor of API reliability. Links to ClientFlow integration issues.",
    actionItems: [
      "Update pricing page to reflect usage-based model",
      "Inform investors about pricing strategy change",
      "Track: Sam's billing dashboard deadline (May 1)",
    ],
    suggestedReply: "",
    isRead: true,
  },
  {
    id: "e4",
    from: "YC Applications",
    fromRole: "Y Combinator",
    subject: "Reminder: S25 Application Deadline - April 29",
    preview: "Your YC Summer 2025 application is 60% complete. Deadline: April 29...",
    fullBody: "Hi Paul,\n\nThis is a reminder that your YC Summer 2025 application is currently 60% complete.\n\nDeadline: April 29, 2025 at 8:00 PM PT\n\nIncomplete sections:\n- 1-minute video\n- Revenue metrics\n- Technical architecture description\n\nDon't forget to submit before the deadline!\n\nBest,\nYC Team",
    date: "Yesterday",
    priority: "high",
    category: "accelerator",
    aiSummary: "YC S25 application is 60% complete. Deadline in 2 DAYS (April 29). Missing: 1-minute video, revenue metrics, technical architecture. This is your top priority.",
    actionItems: [
      "Record 1-minute YC video (script ready in Brain)",
      "Fill in revenue metrics ($12,450 MRR, 23 customers)",
      "Write technical architecture section",
      "Submit before April 29 8PM PT",
    ],
    suggestedReply: "",
    isRead: true,
  },
  {
    id: "e5",
    from: "Lisa Park",
    fromRole: "Program Director @ Singapore Global Founders",
    subject: "SGF Accelerator - Application Open",
    preview: "Hi Paul, I wanted to personally invite you to apply for the Singapore Global Founders...",
    fullBody: "Hi Paul,\n\nI wanted to personally invite you to apply for the Singapore Global Founders Accelerator. Based on your profile, I think you'd be a great fit.\n\nBenefits:\n- $150K equity-free grant\n- 6-month program in Singapore\n- Access to SEA market partnerships\n\nDeadline: May 15, 2025\n\nLet me know if you have questions!\n\nBest,\nLisa",
    date: "3 days ago",
    priority: "medium",
    category: "accelerator",
    aiSummary: "Singapore Global Founders Accelerator invitation - $150K equity-free grant, 6-month program. Deadline May 15. You haven't started this application yet.",
    actionItems: [
      "Review SGF application requirements",
      "Add May 15 deadline to Deadline Radar",
      "Reply to Lisa confirming interest",
    ],
    suggestedReply: "Hi Lisa,\n\nThank you for the personal invite! SGF sounds like an incredible opportunity. We're very interested in the SEA market.\n\nI'll review the application details this week and submit well before the May 15 deadline. Any tips for the application?\n\nBest,\nPaul",
    isRead: true,
  },
];

// ─── MEMORIES ───
export const memories: Memory[] = [
  {
    id: "m1",
    type: "decision",
    title: "Pricing Model: Usage-based at $0.01/API call",
    content: "Sam decided to go with usage-based pricing ($0.01/API call) instead of flat tier pricing. Reasons: better enterprise alignment, lower SMB barrier, revenue scales with success. Will revisit after 100 customers.",
    people: ["Sam"],
    date: "April 26, 2025",
    tags: ["pricing", "strategy", "revenue"],
    source: "Email thread with Sam",
  },
  {
    id: "m2",
    type: "promise",
    title: "Sam: Billing dashboard by May 1",
    content: "Sam committed to building the billing dashboard by May 1. This is critical for the new usage-based pricing to work.",
    people: ["Sam"],
    date: "April 26, 2025",
    tags: ["engineering", "billing", "deadline"],
    source: "Email from Sam",
  },
  {
    id: "m3",
    type: "decision",
    title: "Mobile app deprioritized",
    content: "Sam deprioritized the mobile app development. Reason: Need to focus on API reliability first, especially given ClientFlow's integration issues with batch operations.",
    people: ["Sam"],
    date: "April 26, 2025",
    tags: ["product", "mobile", "priorities"],
    source: "Email from Sam",
  },
  {
    id: "m4",
    type: "context",
    title: "Sequoia - Series A discussions",
    content: "Sarah Chen from Sequoia is evaluating us for Series A. Partnership meeting is this Friday. They want MRR data, customer acquisition metrics, and enterprise LOI details. Current MRR: $12,450.",
    people: ["Sarah Chen"],
    date: "April 27, 2025",
    tags: ["fundraising", "sequoia", "series-a"],
    source: "Email from Sarah Chen",
  },
  {
    id: "m5",
    type: "people",
    title: "ClientFlow - Enterprise customer at risk",
    content: "James Rodriguez (CTO) at ClientFlow is frustrated. 3 days stuck on API integration. 504 errors on batch ops >1000 records. They have a board meeting next week. $50K ACV account.",
    people: ["James Rodriguez"],
    date: "April 27, 2025",
    tags: ["customer", "enterprise", "churn-risk"],
    source: "Email from James Rodriguez",
  },
  {
    id: "m6",
    type: "decision",
    title: "TechCorp LOI signed - $50K ACV",
    content: "Enterprise LOI with TechCorp was signed on April 20. Annual contract value of $50K. This is our first enterprise deal and proof point for Sequoia.",
    people: ["TechCorp"],
    date: "April 20, 2025",
    tags: ["enterprise", "sales", "milestone"],
    source: "Sales pipeline",
  },
  {
    id: "m7",
    type: "context",
    title: "YC S25 Application Strategy",
    content: "Application is 60% complete. Missing: 1-minute video, revenue metrics, technical architecture. Video script drafted. Key narrative: 'AI-powered API platform that reduced enterprise integration time from weeks to hours.'",
    people: [],
    date: "April 25, 2025",
    tags: ["yc", "accelerator", "application"],
    source: "YC Application Portal",
  },
  {
    id: "m8",
    type: "promise",
    title: "Paul: Send Sequoia MRR update by Thursday",
    content: "Paul needs to send Sarah Chen the full MRR breakdown and enterprise traction data before the Sequoia partnership meeting on Friday.",
    people: ["Paul", "Sarah Chen"],
    date: "April 27, 2025",
    tags: ["fundraising", "sequoia", "metrics"],
    source: "Self-assigned",
  },
];

// ─── DEADLINES ───
export const deadlines: Deadline[] = [
  {
    id: "d1",
    title: "YC S25 Application",
    description: "Complete and submit YC Summer 2025 batch application",
    dueDate: "2025-04-29T20:00:00-07:00",
    category: "accelerator",
    status: "at-risk",
    progress: 60,
    relatedMemories: ["m7"],
  },
  {
    id: "d2",
    title: "Sequoia MRR Update",
    description: "Send Sarah Chen the full MRR breakdown for Friday partnership meeting",
    dueDate: "2025-04-28T17:00:00-07:00",
    category: "investor",
    status: "at-risk",
    progress: 30,
    relatedMemories: ["m4", "m8"],
  },
  {
    id: "d3",
    title: "Sam's Billing Dashboard",
    description: "Usage-based billing dashboard must be ready for new pricing model",
    dueDate: "2025-05-01T23:59:00-07:00",
    category: "internal",
    status: "on-track",
    progress: 45,
    relatedMemories: ["m1", "m2"],
  },
  {
    id: "d4",
    title: "ClientFlow Integration Fix",
    description: "Resolve batch API 504 errors before their board meeting",
    dueDate: "2025-05-02T09:00:00-07:00",
    category: "customer",
    status: "at-risk",
    progress: 10,
    relatedMemories: ["m5"],
  },
  {
    id: "d5",
    title: "Singapore Global Founders Application",
    description: "$150K equity-free grant application for SEA expansion",
    dueDate: "2025-05-15T23:59:00+08:00",
    category: "accelerator",
    status: "on-track",
    progress: 0,
    relatedMemories: [],
  },
  {
    id: "d6",
    title: "Q1 Board Update",
    description: "Prepare and send quarterly board update to all stakeholders",
    dueDate: "2025-05-05T17:00:00-07:00",
    category: "investor",
    status: "on-track",
    progress: 20,
    relatedMemories: [],
  },
];

// ─── TODAY'S PRIORITIES ───
export const todaysPriorities: ActionItem[] = [
  {
    id: "a1",
    title: "Send Sequoia MRR update to Sarah Chen",
    urgency: "critical",
    source: "Email - Sarah Chen",
    dueDate: "Tomorrow",
    completed: false,
  },
  {
    id: "a2",
    title: "Fix ClientFlow batch API 504 errors",
    urgency: "critical",
    source: "Email - James Rodriguez",
    dueDate: "Today",
    completed: false,
  },
  {
    id: "a3",
    title: "Complete YC application (40% remaining)",
    urgency: "high",
    source: "YC Portal",
    dueDate: "April 29",
    completed: false,
  },
  {
    id: "a4",
    title: "Record 1-minute YC video",
    urgency: "high",
    source: "YC Application",
    dueDate: "April 29",
    completed: false,
  },
  {
    id: "a5",
    title: "Reply to Singapore Accelerator invitation",
    urgency: "medium",
    source: "Email - Lisa Park",
    dueDate: "This week",
    completed: false,
  },
];

// ─── FOLLOW-UPS ───
export const missedFollowUps: FollowUp[] = [
  {
    id: "f1",
    person: "Sarah Chen",
    role: "Partner @ Sequoia",
    context: "Waiting for MRR update for Friday partnership meeting",
    lastContact: "2 hours ago",
    daysOverdue: 0,
    avatar: "SC",
  },
  {
    id: "f2",
    person: "James Rodriguez",
    role: "CTO @ ClientFlow",
    context: "API integration broken — $50K account at churn risk",
    lastContact: "4 hours ago",
    daysOverdue: 3,
    avatar: "JR",
  },
  {
    id: "f3",
    person: "Lisa Park",
    role: "Director @ SGF Accelerator",
    context: "Hasn't replied to personal accelerator invitation",
    lastContact: "3 days ago",
    daysOverdue: 3,
    avatar: "LP",
  },
  {
    id: "f4",
    person: "David Kim",
    role: "Angel Investor",
    context: "Promised to send product roadmap after coffee meeting",
    lastContact: "5 days ago",
    daysOverdue: 5,
    avatar: "DK",
  },
];

// ─── INVESTOR PIPELINE ───
export const investorPipeline: InvestorCard[] = [
  {
    id: "i1",
    name: "Sarah Chen",
    firm: "Sequoia Capital",
    status: "closing",
    lastAction: "Requested MRR data",
    nextStep: "Send metrics before Friday",
    amount: "$2M Series A",
  },
  {
    id: "i2",
    name: "David Kim",
    firm: "Angel",
    status: "warm",
    lastAction: "Coffee meeting last week",
    nextStep: "Send product roadmap",
    amount: "$100K",
  },
  {
    id: "i3",
    name: "Mike Chen",
    firm: "a16z Scouts",
    status: "cold",
    lastAction: "Intro email sent 2 weeks ago",
    nextStep: "Follow up with traction update",
    amount: "$500K",
  },
  {
    id: "i4",
    name: "Priya Sharma",
    firm: "Accel Partners",
    status: "warm",
    lastAction: "Demo call completed",
    nextStep: "Send case study from TechCorp",
    amount: "$1.5M",
  },
];

// ─── TECH ALERTS ───
export const techAlerts: TechAlert[] = [
  {
    id: "t1",
    title: "Gemini 2.5 Flash cost reduced 18%",
    description: "Google reduced Gemini 2.5 Flash pricing. Your estimated monthly savings: $340. Consider migrating remaining Pro calls.",
    type: "cost",
    severity: "info",
    date: "Today",
  },
  {
    id: "t2",
    title: "Batch API 504 errors detected",
    description: "Your API is returning 504 errors on batch operations >1000 records. 23 failed requests in last 24 hours. ClientFlow affected.",
    type: "security",
    severity: "critical",
    date: "Today",
  },
  {
    id: "t3",
    title: "OpenAI deprecated text-davinci-003",
    description: "If you have any legacy endpoints using text-davinci-003, they will stop working June 1. Migration guide available.",
    type: "deprecation",
    severity: "warning",
    date: "Yesterday",
  },
  {
    id: "t4",
    title: "Firebase free tier limit approaching",
    description: "Firestore reads at 82% of free tier limit. At current growth rate, you'll need Blaze plan by May 10.",
    type: "cost",
    severity: "warning",
    date: "Yesterday",
  },
];

// ─── QUICK STATS ───
export const quickStats = {
  emailsProcessed: 47,
  actionsDetected: 12,
  memoriesStored: 34,
  deadlinesTracked: 6,
  followUpsNeeded: 4,
  aiQueriesAnswered: 89,
};

// AI responses are now handled by the real xAI (Grok) API via /api/ai
