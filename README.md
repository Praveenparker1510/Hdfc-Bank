# HDFC Bank Website Replica

A full replica of the HDFC Bank website built in two stacks:
1. **HTML + CSS + Vanilla JS** (no build tools needed)
2. **React + Vite** (component-based, modern stack)

---

## 📁 Project Structure

```
hdfc-project/
├── html-version/          ← Plain HTML/CSS/JS
│   ├── index.html
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
│
├── react-version/         ← React + Vite app
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── styles/
│       │   └── global.css
│       └── components/
│           ├── Navbar.jsx + Navbar.css
│           ├── Hero.jsx + Hero.css
│           ├── QuickLinks.jsx + QuickLinks.css
│           ├── Products.jsx + Products.css
│           ├── Offers.jsx + Offers.css
│           ├── Stats.jsx + Stats.css
│           ├── Footer.jsx + Footer.css
│           └── LoginModal.jsx + LoginModal.css
│
└── README.md
```

---

## 🚀 How to Run

### HTML Version
Just open `html-version/index.html` in any browser. No setup needed.

### React Version

**Prerequisites:** Node.js 18+ installed

```bash
cd react-version
npm install
npm run dev
```

Then open: http://localhost:5173

**Build for production:**
```bash
npm run build
npm run preview
```

---

## ✅ Features Implemented

| Feature | HTML Version | React Version |
|---|---|---|
| Responsive Navbar | ✅ | ✅ |
| Mobile Hamburger Menu | ✅ | ✅ |
| Hero Carousel (3 slides, auto-play) | ✅ | ✅ |
| Quick Links Bar | ✅ | ✅ |
| Products & Services (tabbed) | ✅ | ✅ |
| Exclusive Offers Section | ✅ | ✅ |
| Animated Stats Counter | ✅ | ✅ |
| Net Banking Login Modal | ✅ | ✅ |
| Password Show/Hide Toggle | ✅ | ✅ |
| Scroll-reveal Animations | ✅ | ✅ |
| Fully Responsive (mobile) | ✅ | ✅ |
| Footer with all links | ✅ | ✅ |

---

## 🎨 Design System

| Token | Value |
|---|---|
| Primary Red | `#E31837` |
| Navy Blue | `#003366` |
| Dark Navy | `#002244` |
| Display Font | Playfair Display |
| Body Font | Source Sans 3 |

---

## ⚠️ Disclaimer

This project is created **for educational purposes only**.
It is a visual replica and is **not affiliated with, endorsed by, or associated with HDFC Bank Ltd.** in any way.
Do not use this for commercial purposes or to mislead users.
