console.log("FounderOS: Content Script Loaded");

function getContext() {
  const url = window.location.href;
  let data = {
    url: url,
    title: document.title,
    type: url.includes("mail.google.com") ? "gmail" : (url.includes("slack.com") ? "slack" : "web"),
    content: "",
    subjects: []
  };

  if (data.type === "gmail") {
    // 1. Individual Email Body (for Popup Analysis)
    const bodyEls = document.querySelectorAll('.a3s.aiL, .adn.ads, [role="main"] .ii.gt');
    if (bodyEls.length > 0) {
      data.content = Array.from(bodyEls).map(el => el.innerText).join("\n---\n");
    } 
    
    // 2. Inbox Sync (for Dashboard)
    const rows = document.querySelectorAll('tr.zA');
    if (rows.length > 0) {
      const scraped = Array.from(rows).slice(0, 15).map(row => ({
        sender: row.querySelector('.yX')?.innerText?.trim() || "Unknown",
        subject: row.querySelector('.y6')?.innerText?.trim() || "No Subject",
        date: row.querySelector('.xW')?.innerText?.trim() || "Recent"
      }));
      
      fetch("http://localhost:3000/api/inbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails: scraped })
      }).catch(e => console.error("Sync Error:", e));

      // Fallback for analysis if not inside an email
      if (!data.content) {
        data.content = "INBOX OVERVIEW:\n" + scraped.map(s => `${s.sender}: ${s.subject}`).join("\n");
      }
    }
  }
 else {
    data.content = document.body.innerText.slice(0, 5000);
  }
  
  return data;
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log("FounderOS: Message Received", msg.type);
  
  if (msg.type === "PING") {
    sendResponse({ status: "alive" });
  } else if (msg.type === "GET_CONTEXT") {
    sendResponse(getContext());
  }
  return true;
});
