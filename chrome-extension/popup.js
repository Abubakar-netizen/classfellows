// FounderOS Chrome Extension - Popup Logic (Sync Enabled)

const API_BASE = "http://localhost:3000/api";

async function analyzePage() {
  const summaryEl = document.getElementById("ai-summary");
  const contextEl = document.getElementById("page-context");
  
  summaryEl.innerHTML = '<div class="loading-text">Analyzing page context...</div>';

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (!activeTab || !activeTab.id) return;

    chrome.tabs.sendMessage(activeTab.id, { type: "GET_CONTEXT" }, (context) => {
      if (chrome.runtime.lastError) {
        summaryEl.innerHTML = `
          <div class="error-text">
            Connection failed. Please refresh your Gmail/Slack tab.
            <button id="btn-retry" style="margin-top:8px; width:100%; padding:4px; font-size:10px; cursor:pointer;">Retry Connection</button>
          </div>`;
        document.getElementById("btn-retry")?.addEventListener("click", () => analyzePage());
        return;
      }
      
      if (!context) {
        summaryEl.innerHTML = "No context found. Refreshing might help.";
        return;
      }

      contextEl.innerHTML = `<div class="context-info"><strong>${context.type.toUpperCase()}</strong>: ${context.title.slice(0, 30)}</div>`;

      fetch(`${API_BASE}/ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: "summarize",
          text: context.content || "No text content found on page."
        })
      })
      .then(res => res.json())
      .then(data => {
        summaryEl.innerHTML = (data.answer || "No summary available.").replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
      })
      .catch(() => {
        summaryEl.innerHTML = "FounderOS AI is active. (Connect to dashboard for real-time analysis).";
      });
    });
  });
}

// Save to Brain Action
async function handleSaveToBrain() {
  const summaryEl = document.getElementById("ai-summary");
  const contextEl = document.getElementById("page-context");
  
  try {
    const response = await fetch(`${API_BASE}/brain`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: contextEl.innerText.split(':')[1]?.trim() || "Web Context",
        content: summaryEl.innerText,
        type: "context",
        tags: ["Real-time", "Chrome"],
        people: ["Founder"],
        source: "Chrome Extension"
      })
    });
    if (response.ok) alert("✅ Saved to Founder Brain!");
  } catch (e) {
    alert("Dashboard not connected.");
  }
}

// Add Deadline Action
async function handleAddDeadline() {
  try {
    const response = await fetch(`${API_BASE}/deadlines`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Follow-up Task",
        date: new Date(Date.now() + 86400000 * 2).toLocaleDateString(), // 2 days from now
        category: "internal",
        description: "Added from Chrome Extension"
      })
    });
    if (response.ok) alert("✅ Deadline added to Radar!");
  } catch (e) {
    alert("Dashboard not connected.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  analyzePage();
  document.getElementById("btn-save").addEventListener("click", handleSaveToBrain);
  document.getElementById("btn-deadline").addEventListener("click", handleAddDeadline);
  document.getElementById("open-dashboard").addEventListener("click", () => {
    chrome.tabs.create({ url: "http://localhost:3000/dashboard" });
  });
});
