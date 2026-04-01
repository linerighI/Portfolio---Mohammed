// ╔══════════════════════════════════════════════════════════════╗
// ║  CONTENT.JS — Your single file to edit ALL site content     ║
// ║  Change text, projects, skills, experience, etc. here.      ║
// ║  The website reads from this file automatically.            ║
// ╚══════════════════════════════════════════════════════════════╝

const SITE = {

  // ─────────────────────────────────────────────
  // HERO SECTION
  // ─────────────────────────────────────────────
  hero: {
    available: true,                          // show "Available for projects" badge
    availableText: 'Available for projects',
    greeting: 'Hey,',
    nameFirst: 'Mohammed',
    nameLast: 'Abuhdaib',
    roles: ['Full-Stack Developer', 'Game Engineer', 'Manager'],
    description: `I build complete digital systems — from Roblox combat mechanics with physics-based knockback
      to AI-powered desktop tools and production web apps. Based in <strong>Amman, Jordan</strong>,
      currently Student at <strong>Zaha Cultural Center</strong>.`,
    photo: 'me.png',
    stats: [
      { value: 6, suffix: '+', label: 'Projects' },
      { value: 8, prefix: '+', label: 'Technologies' },
      { value: 3, prefix: '+', label: 'Years' }
    ]
  },

  // ─────────────────────────────────────────────
  // ABOUT SECTION
  // ─────────────────────────────────────────────
  about: {
    heading: `I don't build features.<br />I build <span style="color:var(--accent)">complete systems</span>.`,
    paragraphs: [
      `I'm <strong>Mohammed Abuhdaib</strong> — a versatile Full-Stack Developer and Manager based at
       <strong>Zaha Cultural Center</strong> in Amman, Jordan. I bridge administrative leadership with
       technical innovation. By day I lead teams and coordinate student programs;
       by night I engineer production-grade software.`,
      `My work spans <em>Roblox game engines</em>, <em>React/Electron</em> desktop apps, <em>Flutter</em> mobile apps,
       and <em>AI-powered tools</em> — always with a dark-mode-first, <strong>Cyber-Premium</strong> design
       philosophy. I think in architectures, not scripts.`
    ],
    cards: [
      { icon: 'fas fa-location-dot', title: 'Based in Amman, Jordan 🇯🇴', text: 'Working at the intersection of management and engineering.' },
      { icon: 'fas fa-moon', title: 'Cyber-Premium Aesthetic', text: 'Dark mode by default. Vibrant accents. Fluid motion. Always.' },
      { icon: 'fas fa-diagram-project', title: 'Systems Thinker', text: 'I care about architecture, data flow, and edge cases — not just making things work once.' }
    ]
  },

  // ─────────────────────────────────────────────
  // SERVICES / WHAT I BUILD
  // ─────────────────────────────────────────────
  services: [
    { icon: 'fas fa-gamepad', name: 'Roblox Game Systems', desc: 'Combat mechanics, multiplayer sync, inventory & placement systems — server-authoritative, exploit-resistant.', tags: ['Luau', 'RemoteEvents', 'TweenService'] },
    { icon: 'fas fa-desktop', name: 'Web & Desktop Apps', desc: 'Full-stack React/Vite web apps and Electron desktop tools with auto-update deployment.', tags: ['React', 'Electron', 'Vite'] },
    { icon: 'fas fa-mobile-alt', name: 'Mobile Apps', desc: 'Cross-platform Flutter apps with proper state management and responsive tablet layouts.', tags: ['Flutter', 'Dart', 'Provider'] },
    { icon: 'fas fa-robot', name: 'AI Integration', desc: 'Local LLM integration with Ollama & Qwen, Gemini API, smart assistants in production.', tags: ['Ollama', 'Gemini', 'LLMs'] },
    { icon: 'fas fa-server', name: 'Backend Systems', desc: 'Laravel & Node.js backends with MySQL, migrations, seeding, and REST APIs.', tags: ['Laravel', 'PHP', 'MySQL'] },
    { icon: 'fas fa-palette', name: 'UI/UX Design', desc: 'Premium dark interfaces with glassmorphism, neon accents, and micro-animations.', tags: ['Dark UI', 'Motion', 'Systems'] }
  ],

  // ─────────────────────────────────────────────
  // SKILLS (progress bars)
  // ─────────────────────────────────────────────
  skills: [
    { name: 'Roblox / Luau', percent: 92 },
    { name: 'React / Electron / Vite', percent: 85 },
    { name: 'UI/UX Design', percent: 88 },
    { name: 'AI / LLM Integration', percent: 80 },
    { name: 'Flutter / Dart', percent: 78 },
    { name: 'Laravel / PHP / MySQL', percent: 75 }
  ],

  // Tech wall badges
  techWall: [
    { icon: 'fas fa-gamepad', name: 'Roblox Studio' },
    { icon: 'fab fa-react', name: 'React' },
    { icon: 'fas fa-bolt', name: 'Vite' },
    { icon: 'fas fa-atom', name: 'Electron' },
    { icon: 'fas fa-mobile-screen', name: 'Flutter' },
    { icon: 'fab fa-node-js', name: 'Node.js' },
    { icon: 'fab fa-laravel', name: 'Laravel' },
    { icon: 'fas fa-database', name: 'MySQL' },
    { icon: 'fas fa-robot', name: 'AI / LLMs' },
    { icon: 'fab fa-git-alt', name: 'Git' },
    { icon: 'fas fa-cubes', name: 'UEFN / Verse' },
    { icon: 'fas fa-palette', name: 'UI/UX' }
  ],

  // ─────────────────────────────────────────────
  // PROJECTS — This controls BOTH the cards AND the popup modals
  // ─────────────────────────────────────────────
  //
  // For each project you can set:
  //   id:          unique key (used internally)
  //   num:         display number like "/01"
  //   title:       project name shown on card & modal
  //   cardDesc:    short description on the card
  //   modalDesc:   longer description in the popup
  //   tags:        tech tags array e.g. ['React', 'Node']
  //   role:        your role
  //   year:        year string
  //   status:      'Active', 'Published', 'Submitted', etc.
  //   features:    array of key feature strings (shown in modal)
  //   spline:      (optional) Spline 3D embed URL for the card background
  //   media:       array of 3 media objects for the gallery:
  //                  { type: 'image', src: 'path/to/img.png', label: 'Caption' }
  //                  { type: 'video', src: 'path/to/vid.mp4', label: 'Caption' }
  //                  { type: 'placeholder', label: 'Caption' }   ← empty slot
  //
  projects: [
    {
      id: 'zaha',
      num: '/01',
      title: 'Zaha Manager',
      tags: ['Electron', 'React', 'Vite'],
      cardDesc: 'Desktop management system I built for my own workplace — student registration, team tracking, admin workflows. Auto-update deployment via electron-updater. Solving real pain points with code.',
      modalDesc: 'A full-featured desktop management system built for Zaha Cultural Center. Handles student registration, team tracking, scheduling, and admin workflows — all in one app. Deployed with auto-update via electron-updater so the team always has the latest version.',
      role: 'Lead Dev',
      year: '2025',
      status: 'Active',
      features: [
        'Student registration system',
        'Team & schedule management',
        'Admin dashboard workflows',
        'Auto-update deployment',
        'Dark mode UI throughout',
        'Offline-first architecture'
      ],
      media: [
        { type: 'placeholder', label: 'No content' },
        { type: 'placeholder', label: 'No content' },
        { type: 'placeholder', label: 'No content' }
      ]
    },
    {
      id: 'helpyy',
      num: '/02',
      title: 'Helpyy AI',
      tags: ['AI / LLM', 'Custom UI'],
      cardDesc: 'Smart AI assistant equipped with local LLM integration and dynamic context. Features a custom neon-dark aesthetic frontend built for performance.',
      modalDesc: 'A smart AI assistant powered by local LLM integration with Ollama & Qwen, plus Gemini API. Features dynamic context awareness, a custom neon-dark chat interface with typing indicators, suggestion chips, and real-time streaming responses.',
      role: 'Creator',
      year: '2026',
      status: 'Active',
      spline: 'https://my.spline.design/happyrobotbutton-7Y95crXRYbCc46tMT2inBirn/',
      features: [
        'Local LLM via Ollama',
        'Gemini API integration',
        'Dynamic context system',
        'Streaming responses',
        'Custom chat UI',
        'Suggestion chips'
      ],
      media: [
        { type: 'placeholder', label: 'No content' },
        { type: 'placeholder', label: 'No content' },
        { type: 'placeholder', label: 'No content' }
      ]
    },
    {
      id: 'baseplate',
      num: '/03',
      title: 'Build a Baseplate',
      tags: ['Roblox', 'Luau'],
      cardDesc: 'Highly interactive furniture placement game featuring grid inventory, zone restrictions, and seamless server synchronization for multiplayer base building.',
      modalDesc: 'A highly interactive multiplayer furniture placement game on Roblox. Players build custom rooms using a grid-based inventory system with zone restrictions and real-time server synchronization. Designed for seamless multiplayer base building.',
      role: 'Game Developer',
      year: '2024',
      status: 'Published',
      features: [
        'Grid-based placement',
        'Inventory system',
        'Zone restrictions',
        'Server-authoritative sync',
        'Multiplayer co-building',
        'Save & load bases'
      ],
      media: [
        { type: 'placeholder', label: 'No content' },
        { type: 'placeholder', label: 'No content' },
        { type: 'placeholder', label: 'No content' }
      ]
    },
    {
      id: 'gamejam',
      num: '/04',
      title: 'Brackeys Game Jam 2025.2',
      tags: ['Roblox', 'Physics'],
      cardDesc: 'Street of biscuts is a game that i made in 2 weeks for the brackeys game jam 2025.2',
      modalDesc: 'Street of Biscuits — a game created in 2 weeks for the Brackeys Game Jam 2025.2. Built with tight physics-based mechanics, creative level design, and polished game feel under intense time pressure.',
      role: 'Game Developer',
      year: '2025',
      status: 'Submitted',
      features: [
        'Physics-based mechanics',
        'Creative level design',
        'Polished game feel',
        '2-week development sprint',
        'Game jam submission',
        'Original concept'
      ],
      media: [
        { type: 'placeholder', label: 'No content' },
        { type: 'placeholder', label: 'No content' },
        { type: 'placeholder', label: 'No content' }
      ]
    },
    {
      id: 'lana',
      num: '/05',
      title: 'Lana Platform',
      tags: ['Laravel', 'MySQL', 'React'],
      cardDesc: 'Comprehensive AI-driven educational app ecosystem. Features intelligent difficulty assessments, strict role-based access controls, and a bento-grid dashboard.',
      modalDesc: 'A comprehensive AI-driven educational app ecosystem. Features intelligent difficulty assessments that adapt to each student, strict role-based access controls for children, parents, and doctors, and a modern bento-grid dashboard with real-time analytics.',
      role: 'Full-Stack Dev',
      year: '2025',
      status: 'Active',
      spline: 'https://my.spline.design/keyboard-J4WmZhi82R8RvlzPii9FdaiM/',
      features: [
        'AI difficulty assessments',
        'Role-based access control',
        'Bento-grid dashboard',
        'Real-time analytics',
        'Parent & doctor portals',
        'Age-appropriate security'
      ],
      media: [
        { type: 'placeholder', label: 'No content' },
        { type: 'placeholder', label: 'No content' },
        { type: 'placeholder', label: 'No content' }
      ]
    },
    {
      id: 'fortnite',
      num: '/06',
      title: 'Fortnite Maps',
      tags: ['UEFN', 'Verse'],
      cardDesc: 'Large-scale, performant modular shopping mall design in UEFN. Features precise grid snapping architecture and custom Verse logic for interactive elements.',
      modalDesc: 'Large-scale, performant modular shopping mall designs in Unreal Editor for Fortnite (UEFN). Features precise grid snapping architecture, custom Verse scripting for interactive elements, and optimized asset management for smooth gameplay.',
      role: 'Level Designer',
      year: '2024',
      status: 'Published',
      features: [
        'Modular architecture',
        'Custom Verse scripts',
        'Grid snapping system',
        'Optimized performance',
        'Interactive elements',
        'Large-scale maps'
      ],
      media: [
        { type: 'placeholder', label: 'No content' },
        { type: 'placeholder', label: 'No content' },
        { type: 'placeholder', label: 'No content' }
      ]
    }
  ],

  // ─────────────────────────────────────────────
  // EXPERIENCE / JOURNEY
  // ─────────────────────────────────────────────
  experience: [
    { when: 'Now', role: 'Manager & Lead Developer', place: 'Zaha Cultural Center — Amman, Jordan', text: 'Leading instructional teams and student programs while developing the Zaha Manager desktop application. Solving real workplace problems with code.' },
    { when: 'Ongoing', role: 'Full-Stack Developer', place: 'Freelance — Web, Desktop & AI', text: 'React/Vite web apps, Electron desktop tools with auto-update, AI assistants using Ollama & Gemini API, Laravel backends with MySQL.' },
    { when: 'Ongoing', role: 'Game Systems Engineer', place: 'Roblox & UEFN', text: 'Combat mechanics with physics-based knockback, multiplayer server-authoritative architecture, inventory systems, Fortnite Creative design with Verse.' },
    { when: 'Ongoing', role: 'Mobile Developer', place: 'Flutter / Dart', text: 'Cross-platform apps with Provider state management, SharedPreferences, and responsive layouts for phones and tablets.' }
  ],

  // ─────────────────────────────────────────────
  // CONTACT
  // ─────────────────────────────────────────────
  contact: {
    heading: `Let's build<br />something <span style="color:var(--accent)">real</span>.`,
    description: "Got a project in mind? A game idea? An app concept? I'm Mohammed — always open to new challenges and collaborations.",
    email: 'lineright123@gmail.com',
    location: 'Amman, Jordan',
    status: 'Open for projects',
    web3formsKey: '16070136-7d6e-4e30-bc39-541576309c49' // Web3Forms Access Key
  },

  // ─────────────────────────────────────────────
  // SOCIAL LINKS (footer)
  // ─────────────────────────────────────────────
  socials: [
    { icon: 'fab fa-github', url: 'https://github.com/linerighI', label: 'GitHub' },
    { icon: 'fab fa-linkedin-in', url: 'https://www.linkedin.com/in/mohammed-abuhdaib-03005a358/', label: 'LinkedIn' },
  ]
};
