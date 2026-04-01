// netlify/functions/chat.js
exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  const API_KEY = process.env.GEMINI_API_KEY;
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: "Missing or invalid Gemini API Key in Environment Variables." })
    };
  }

  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  try {
    // The frontend sends the payload as a stringified JSON body
    // 'event.body' is precisely that string payload.
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: event.body 
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        statusCode: response.status,
        body: JSON.stringify(errorData)
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("Serverless Function Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to communicate with AI API." })
    };
  }
};
