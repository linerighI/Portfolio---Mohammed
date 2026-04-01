# Developer Portfolio & Helpyy AI Assistant

A modern, "Cyber-Premium" dark-mode developer portfolio featuring an integrated, Gemini-powered AI chatbot assistant. This system showcases projects, skills, and interactive 3D elements, all configurable from a single file.

## ✨ Features

- **Cyber-Premium UI**: Fully responsive, dark-mode-first aesthetic with glassmorphism and smooth animations.
- **Single Source of Truth**: Every text element, project card, and link is dynamically generated from `content.js`, making updates incredibly easy without touching HTML.
- **Helpyy AI Chatbot**: An integrated smart assistant powered by the Gemini API that understands the portfolio's context.
- **Interactive Project Modals**: Click on any project card to reveal an animated "paper-unfold" modal with a media gallery, features list, and full details.
- **Spline 3D Integration**: Support for embedding interactive Spline 3D backgrounds inside project cards seamlessly.

## 🚀 Getting Started

This project includes a lightweight Express.js backend Server specifically to securely interact with the Gemini AI API without exposing your API Key on the frontend.

### Prerequisites
- Node.js (v16+)
- A Gemini API Key from Google AI Studio.

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd <repo-name>
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure the Environment**
   Create a `.env` file in the root directory and add your Gemini API key:
   ```env
   GEMINI_API_KEY=your_actual_api_key_here
   ```

4. **Run the Project**
   ```bash
   node server.js
   ```
   The site will be available at `http://localhost:3000`.

## ✏️ Customizing Your Content

You never need to edit the `index.html` file to change your content! 
Open `content.js` and modify the `SITE` object to change your hero text, about section, add new projects, update media galleries, and more.

## ☁️ Deployment

Since this project uses a Node.js backend to protect the API key, you **cannot** host it on static hosting like GitHub Pages or Vercel's static tier. 

Recommended hosting platforms for Node.js apps:
- **Render** (Free tier available, very easy setup via connecting GitHub)
- **Railway**
- **Heroku**

*Make sure to add your `GEMINI_API_KEY` to the Environment Variables settings in whatever hosting provider you choose!*
