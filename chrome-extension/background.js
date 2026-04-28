// FounderOS - Background Service Worker
chrome.runtime.onInstalled.addListener(() => {
  console.log("FounderOS Extension installed successfully!");
});

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "PAGE_CONTEXT") {
    // Store page context
    chrome.storage.local.set({ lastPageContext: message.data });
    sendResponse({ status: "ok" });
  }
  return true;
});
