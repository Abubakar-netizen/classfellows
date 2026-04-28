const apiKey = "your-api-key-here"; // Replace with your actual API key

async function listModels() {
  try {
    const response = await fetch("https://api.x.ai/v1/models", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
      },
    });
    const data = await response.json();
    console.log("Status:", response.status);
    console.log("Models:", JSON.stringify(data, null, 2));
  } catch (e) {
    console.error("Fetch failed:", e);
  }
}

listModels();
