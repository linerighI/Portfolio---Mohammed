require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/api/chat', async (req, res) => {
  const API_KEY = process.env.GEMINI_API_KEY;
  
  if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
    return res.status(401).json({ error: 'API Key is missing or invalid in server .env file.' });
  }

  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json(errorData);
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error('Server error talking to Gemini API:', err);
    res.status(500).json({ error: 'Failed to communicate with AI API.' });
  }
});

app.listen(port, () => {
  console.log(`✅ Helpyy Backend Server running on http://localhost:${port}`);
  console.log(`🤖 Using Gemini API Key from .env: ${process.env.GEMINI_API_KEY ? 'Present' : 'Missing'}`);
});
