# 🚀 FounderOS — AI Chief of Staff (Hackathon Project)

## 📌 Problem Statement: The "Founder's Chaos"
Startup founders are constantly overwhelmed by information fragmentation. Important decisions, deadlines, and investor updates are buried across Gmail, Slack, and browser tabs. Context switching leads to missed opportunities and operational friction.

**The Pain Points:**
- **Information Overload**: 100+ emails daily, many requiring urgent action.
- **Fragmented Memory**: Key context is scattered across different platforms.
- **Manual Overhead**: Founders spend hours manually tracking deadlines and drafting replies.

---

## 💡 The Solution: FounderOS
FounderOS is an **AI Chief of Staff** that sits inside your browser. It compresses operational chaos by syncing real-time data from your workspace into a unified, intelligent dashboard.

### 🛡️ Core Features
1. **Magic Sync (Chrome Extension)**:
   - Silently scrapes Gmail/Slack in the background.
   - Syncs real-time inbox data directly to the dashboard without manual input.
2. **Inbox Intelligence**:
   - AI-powered analysis of every email.
   - Automatically detects **Priority**, **Sender Role**, and **Action Items**.
   - Generates **Smart Replies** to save hours of drafting.
3. **Deadline Radar (Auto-Detection)**:
   - Uses AI to scan email subjects for deadlines (e.g., "Lab 14 Submission due Friday").
   - Automatically injects these into a visual timeline with "At-Risk" and "On-Track" statuses.
4. **Founder Brain**:
   - A central "Second Brain" that stores every synced context, memory, and decision.
   - Searchable repository of everything the founder has seen or discussed.
5. **Command Center**:
   - A high-level overview of **Investor Pipelines**, **Operational Focus**, and **System Stats**.

---

## 🛠️ Technology Stack
- **Frontend**: Next.js 15+, React 19, Tailwind CSS.
- **Animations**: Framer Motion (for a premium, high-end feel).
- **Icons**: Lucide React.
- **Extension**: Chrome Extension Manifest V3 (Vanilla JS).
- **AI Core**: OpenAI GPT-4o-mini (integrated via the AI.CC API).
- **Backend**: Next.js API Routes with Global In-Memory Store (Hackathon Optimized).

---

## 📖 How to Run the Project

### 1. Dashboard Setup
1. Open the project folder in your terminal.
2. Run `npm install` to install dependencies.
3. Create a `.env.local` file .
4. Run `npm run dev` to start the dashboard at `http://localhost:3000`.

### 2. Extension Setup
1. Open Google Chrome and go to `chrome://extensions/`.
2. Enable **Developer Mode** (top right).
3. Click **Load unpacked** and select the `chrome-extension` folder from the project directory.
4. Pin the **FounderOS** extension.

### 3. Using FounderOS
1. **Sync Data**: Open Gmail (`mail.google.com`). The extension will automatically sync your latest emails to the dashboard.
2. **Analyze Page**: Click the FounderOS icon while on a specific email to get an instant AI Summary and Action Items.
3. **Command Center**: Go to `http://localhost:3000/dashboard` to see your AI-detected deadlines, investor leads, and inbox intelligence live.

---

## 🏆 Innovation Points
- **Real-Time Polling**: The dashboard live-updates (no refresh needed) as soon as the extension scrapes new data.
- **Zero-Config Logic**: No complex setup; it works where the founder already spends their time (Gmail/Slack).
- **Design Excellence**: A custom-built, premium dark-mode UI designed to "WOW" judges at first glance.

---
**Developed with ❤️ for the Hackathon.**
