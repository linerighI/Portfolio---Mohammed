// ============================================
// HELPYY — Mohammed's AI Assistant
// ============================================

(() => {
  // ── CONFIG ──
  // The frontend now talks securely to our Netlify Serverless Function!
  // The Gemini API key is safely hidden in Netlify's Environment Variables.
  const API_URL = '/api/chat';

  // ── MOHAMMED'S KNOWLEDGE BASE ──
  const KNOWLEDGE = `
You are "Helpyy" — the personal AI assistant embedded in Mohammed Abuhdaib's portfolio website. You speak in a friendly, professional, and slightly witty tone. You use emojis occasionally but keep it professional. You're helpful and enthusiastic about Mohammed's work.

## About Mohammed Abuhdaib
- Full name: Mohammed Abuhdaib
- Based in: Amman, Jordan 🇯🇴
- Current role: Manager & Lead Developer at Zaha Cultural Center
- He bridges administrative leadership with technical innovation
- By day he leads teams and coordinates student programs, by night he engineers production-grade software
- He thinks in architectures, not scripts
- He has a "Cyber-Premium" design philosophy — dark mode first, vibrant accents, fluid motion
- He has 3+ years of experience and 6+ completed projects using 8+ technologies

## Skills & Technologies (with proficiency)
- Roblox / Luau: 92% — Combat mechanics, multiplayer sync, inventory & placement systems, server-authoritative, exploit-resistant
- React / Electron / Vite: 85% — Full-stack web apps and desktop tools with auto-update deployment
- UI/UX Design: 88% — Premium dark interfaces with glassmorphism, neon accents, and micro-animations
- AI / LLM Integration: 80% — Local LLM integration with Ollama & Qwen, Gemini API, smart assistants
- Flutter / Dart: 78% — Cross-platform mobile apps with Provider state management
- Laravel / PHP / MySQL: 75% — Backend systems with migrations, seeding, and REST APIs
- Also knows: Node.js, Git, UEFN / Verse (Fortnite Creative)

## Projects
1. **Zaha Manager** — Desktop management system built for his own workplace using Electron + React + Vite. Student registration, team tracking, admin workflows. Auto-update deployment via electron-updater. Role: Lead Dev.
2. **Helpyy AI** — Smart AI assistant with local LLM integration and dynamic context. Custom neon-dark aesthetic frontend built for performance. Role: Creator.
3. **Build a Baseplate** — Roblox furniture placement game featuring grid inventory, zone restrictions, and seamless server synchronization for multiplayer base building. Role: Game Developer.
4. **Combat System** — Advanced Roblox combat mechanics with physics-based knockback, dynamic ragdoll effects, frame-perfect animation syncing, and camera shake FX. Role: Systems Engineer.
5. **Lana Platform** — Comprehensive AI-driven educational app ecosystem with Laravel + MySQL + React. Features intelligent difficulty assessments, strict role-based access controls, and a bento-grid dashboard. Role: Full-Stack Dev.
6. **Fortnite Mall** — Large-scale UEFN shopping mall design with precise grid snapping architecture and custom Verse logic for interactive elements. Role: Level Designer.

## Experience Timeline
- NOW: Manager & Lead Developer at Zaha Cultural Center, Amman, Jordan — Leading instructional teams and student programs while developing the Zaha Manager desktop application
- ONGOING: Full-Stack Developer (Freelance) — React/Vite web apps, Electron desktop tools with auto-update, AI assistants using Ollama & Gemini API, Laravel backends with MySQL
- ONGOING: Game Systems Engineer — Roblox & UEFN — Combat mechanics with physics-based knockback, multiplayer server-authoritative architecture, inventory systems, Fortnite Creative design with Verse
- ONGOING: Mobile Developer — Flutter / Dart — Cross-platform apps with Provider state management, SharedPreferences, responsive layouts

## Services Mohammed Offers
1. Roblox Game Systems — Combat mechanics, multiplayer sync, inventory & placement systems
2. Web & Desktop Apps — Full-stack React/Vite web apps and Electron desktop tools
3. Mobile Apps — Cross-platform Flutter apps with proper state management
4. AI Integration — Local LLM integration, Gemini API, smart assistants
5. Backend Systems — Laravel & Node.js backends with MySQL, REST APIs
6. UI/UX Design — Premium dark interfaces with glassmorphism, neon accents, micro-animations

## Contact Information
- Email: hello@portfolio.dev
- Location: Amman, Jordan
- Status: Open for projects and collaborations
- Social: GitHub, LinkedIn, Twitter/X, Discord (links on the website)

## Response Guidelines
- Keep responses concise (2-4 sentences usually)
- Be warm and helpful
- If asked about something not related to Mohammed, politely redirect: "I'm Mohammed's personal assistant, so I'm best at answering questions about him! But I can try to help."
- If asked how to contact or hire Mohammed, encourage them to use the contact form on the website or email
- Highlight Mohammed's unique strengths: systems thinking, full-stack versatility, dark-premium design style
- Never make up information about Mohammed that isn't in this knowledge base
- If you don't know something specific, say so honestly and suggest they reach out directly
`;

  // ── DOM REFS ──
  const container = document.getElementById('helpyy');
  const fab = document.getElementById('helpyyFab');
  const fabIcon = document.getElementById('helpyyFabIcon');
  const win = document.getElementById('helpyyWindow');
  const messagesEl = document.getElementById('helpyyMessages');
  const input = document.getElementById('helpyyInput');
  const sendBtn = document.getElementById('helpyySend');
  const closeBtn = document.getElementById('helpyyClose');
  const clearBtn = document.getElementById('helpyyClear');
  const suggestionsEl = document.getElementById('helpyySuggestions');

  let chatHistory = [];
  let isTyping = false;

  // ── TOGGLE CHAT ──
  fab.addEventListener('click', () => {
    const isOpen = container.classList.toggle('open');
    fabIcon.className = isOpen ? 'fas fa-xmark helpyy__fab-icon' : 'fas fa-robot helpyy__fab-icon';
    if (isOpen) {
      input.focus();
    }
  });

  closeBtn.addEventListener('click', () => {
    container.classList.remove('open');
    fabIcon.className = 'fas fa-robot helpyy__fab-icon';
  });

  // ── CLEAR CHAT ──
  clearBtn.addEventListener('click', () => {
    chatHistory = [];
    messagesEl.innerHTML = `
      <div class="helpyy__welcome">
        <div class="helpyy__welcome-icon"><i class="fas fa-robot"></i></div>
        <div class="helpyy__welcome-title">Hey! I'm <span>Helpyy</span> 👋</div>
        <div class="helpyy__welcome-text">Mohammed's personal AI assistant. Ask me anything about his skills, projects, experience, or how to get in touch!</div>
        <div class="helpyy__suggestions" id="helpyySuggestions">
          <button class="helpyy__suggest" data-q="What skills does Mohammed have?">💡 Skills & Tech</button>
          <button class="helpyy__suggest" data-q="Tell me about Mohammed's projects">🚀 Projects</button>
          <button class="helpyy__suggest" data-q="Where is Mohammed based?">📍 Location</button>
          <button class="helpyy__suggest" data-q="How can I hire Mohammed?">🤝 Hire Me</button>
        </div>
      </div>`;
    bindSuggestions();
  });



  // ── SUGGESTIONS ──
  function bindSuggestions() {
    const btns = document.querySelectorAll('.helpyy__suggest');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        const q = btn.dataset.q;
        sendMessage(q);
      });
    });
  }
  bindSuggestions();

  // ── SEND ──
  sendBtn.addEventListener('click', () => {
    const text = input.value.trim();
    if (text && !isTyping) sendMessage(text);
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const text = input.value.trim();
      if (text && !isTyping) sendMessage(text);
    }
  });

  // ── MESSAGE HANDLING ──
  function sendMessage(text) {
    // Hide welcome
    const welcome = messagesEl.querySelector('.helpyy__welcome');
    if (welcome) welcome.remove();

    // Add user message
    addUserMessage(text);
    input.value = '';
    input.focus();

    // Get AI response via local backend proxy
    getAIResponse(text);
  }

  function addUserMessage(text) {
    const time = getTime();
    const div = document.createElement('div');
    div.className = 'helpyy__msg helpyy__msg--user';
    div.innerHTML = `
      <div class="helpyy__msg-bubble">${escapeHtml(text)}</div>
      <div class="helpyy__msg-time">${time}</div>
    `;
    messagesEl.appendChild(div);
    scrollToBottom();
  }

  function addBotMessage(text) {
    const time = getTime();
    const div = document.createElement('div');
    div.className = 'helpyy__msg helpyy__msg--bot';
    div.innerHTML = `
      <div class="helpyy__msg-bubble">${formatResponse(text)}</div>
      <div class="helpyy__msg-time">${time}</div>
    `;
    messagesEl.appendChild(div);
    scrollToBottom();
  }

  function showTyping() {
    isTyping = true;
    sendBtn.disabled = true;
    const div = document.createElement('div');
    div.className = 'helpyy__typing';
    div.id = 'helpyyTyping';
    div.innerHTML = `
      <div class="helpyy__typing-avatar"><i class="fas fa-robot"></i></div>
      <div class="helpyy__typing-dots"><span></span><span></span><span></span></div>
    `;
    messagesEl.appendChild(div);
    scrollToBottom();
  }

  function hideTyping() {
    isTyping = false;
    sendBtn.disabled = false;
    const el = document.getElementById('helpyyTyping');
    if (el) el.remove();
  }

  // ── AI API CALL ──
  async function getAIResponse(userText) {
    showTyping();

    chatHistory.push({ role: 'user', parts: [{ text: userText }] });

    const body = {
      contents: [
        { role: 'user', parts: [{ text: KNOWLEDGE }] },
        { role: 'model', parts: [{ text: "Understood! I'm Helpyy, Mohammed Abuhdaib's personal AI assistant. I'll answer questions about Mohammed using the knowledge you've provided. How can I help? 😊" }] },
        ...chatHistory,
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
        topP: 0.9,
      },
    };

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error?.message || err.error || 'Server request failed');
      }

      const data = await res.json();
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Hmm, I couldn't process that. Try again! 🤔";

      chatHistory.push({ role: 'model', parts: [{ text: reply }] });

      hideTyping();
      addBotMessage(reply);
    } catch (err) {
      hideTyping();
      console.error('Helpyy API Error:', err);
      addBotMessage(`Oops, something went wrong with my AI brain! 😅 Error: ${err.message}. You can still reach Mohammed directly through the contact form below.`);
    }
  }

  // ── FALLBACK (NO API KEY) ──
  function getFallbackResponse(userText) {
    showTyping();

    const q = userText.toLowerCase();
    let reply = '';

    setTimeout(() => {
      if (q.includes('skill') || q.includes('tech') || q.includes('know') || q.includes('stack')) {
        reply = "Mohammed is a versatile developer! 💪 His top skills include:\n• **Roblox/Luau** (92%) — combat systems, multiplayer sync\n• **UI/UX Design** (88%) — dark premium interfaces\n• **React/Electron/Vite** (85%) — web & desktop apps\n• **AI/LLM Integration** (80%) — Ollama, Gemini API\n• **Flutter/Dart** (78%) — cross-platform mobile apps\n• **Laravel/PHP/MySQL** (75%) — backend systems\n\nHe also works with Node.js, Git, and UEFN/Verse! 🚀";
      } else if (q.includes('project') || q.includes('work') || q.includes('built') || q.includes('portfolio')) {
        reply = "Mohammed has built some amazing projects! 🔥\n\n🏢 **Zaha Manager** — Desktop management system (Electron + React)\n🤖 **Helpyy AI** — That's me! Smart AI assistant\n🏗️ **Build a Baseplate** — Roblox placement game\n⚔️ **Combat System** — Advanced Roblox combat mechanics\n📚 **Lana Platform** — AI-driven educational ecosystem\n🏪 **Fortnite Mall** — UEFN level design\n\nCheck out the Projects section for more details! ⬇️";
      } else if (q.includes('where') || q.includes('location') || q.includes('based') || q.includes('live') || q.includes('country') || q.includes('city')) {
        reply = "Mohammed is based in **Amman, Jordan** 🇯🇴! He currently works at **Zaha Cultural Center** where he leads teams and builds software. He's open to remote collaborations worldwide! 🌍";
      } else if (q.includes('hire') || q.includes('contact') || q.includes('reach') || q.includes('email') || q.includes('work with') || q.includes('freelance')) {
        reply = "Great news — Mohammed is **open for projects**! 🎉 Here's how to reach him:\n\n📧 Email: hello@portfolio.dev\n📍 Location: Amman, Jordan\n\nYou can also use the **contact form** at the bottom of this page. He's available for freelance work, collaborations, and exciting new projects! 💼";
      } else if (q.includes('who') || q.includes('about') || q.includes('tell me about') || q.includes('mohammed')) {
        reply = "Mohammed Abuhdaib is a **Full-Stack Developer, Game Engineer & Manager** based in Amman, Jordan 🇯🇴. He's currently managing at **Zaha Cultural Center** while building production-grade software.\n\nHe specializes in Roblox game systems, React/Electron apps, Flutter mobile development, and AI integration — all with his signature **Cyber-Premium** dark aesthetic. He thinks in architectures, not scripts! 🧠✨";
      } else if (q.includes('experience') || q.includes('background') || q.includes('journey') || q.includes('career')) {
        reply = "Mohammed has **3+ years** of diverse experience:\n\n🏢 **Manager & Lead Dev** at Zaha Cultural Center (Current)\n💻 **Full-Stack Developer** (Freelance — Web, Desktop & AI)\n🎮 **Game Systems Engineer** (Roblox & UEFN)\n📱 **Mobile Developer** (Flutter/Dart)\n\nHe bridges leadership with engineering — a rare and powerful combo! 💪";
      } else if (q.includes('roblox') || q.includes('game') || q.includes('luau')) {
        reply = "Roblox development is one of Mohammed's strongest skills (92%)! 🎮 He builds:\n\n⚔️ Combat mechanics with physics-based knockback\n🔄 Server-authoritative multiplayer systems\n📦 Inventory & placement systems\n🛡️ Exploit-resistant architecture\n\nCheck out his **Build a Baseplate** and **Combat System** projects! 🚀";
      } else if (q.includes('hello') || q.includes('hi') || q.includes('hey') || q.includes('sup') || q.includes('yo')) {
        reply = "Hey there! 👋 Welcome to Mohammed's portfolio! I'm **Helpyy**, his personal AI assistant. I can tell you about his skills, projects, experience, or how to get in touch. What would you like to know? 😊";
      } else if (q.includes('thank') || q.includes('thanks') || q.includes('thx')) {
        reply = "You're welcome! 😊 If you have more questions about Mohammed or want to start a project with him, feel free to ask anytime. Have an awesome day! ✨";
      } else {
        reply = "Great question! 🤔 I know a lot about Mohammed's skills, projects, experience, and how to reach him. Could you ask something specific about those topics? Or check out the quick buttons for inspiration!\n\nIf you need something else, Mohammed would love to hear from you directly through the **contact form** below! 📩";
      }

      hideTyping();
      addBotMessage(reply);
    }, 800 + Math.random() * 600);
  }

  // ── HELPERS ──
  function scrollToBottom() {
    requestAnimationFrame(() => {
      messagesEl.scrollTop = messagesEl.scrollHeight;
    });
  }

  function getTime() {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function formatResponse(text) {
    // Convert markdown-like formatting
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br>')
      .replace(/• /g, '• ');
  }



})();
