# 🎓 Richfield Connect

> **An institution-focused academic social networking web app for Richfield College students.**

Richfield Connect is a privacy-first platform where students can create academic profiles, share ideas with peers, and build collaborative networks — all within the Richfield ecosystem. No backend required; it runs entirely in the browser.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Pages](#-pages)
- [Data Model](#-data-model)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [Known Limitations](#-known-limitations--future-improvements)

---

## ✨ Features

- 🧑‍🎓 Academic profile creation with live preview during sign-up
- 📰 Community feed — post, read, and engage with peers
- 🔒 Privacy-first: all data stays in the browser (localStorage)
- 🏫 Multi-campus support: Durban, Johannesburg, Pretoria, Cape Town, Distance Learning
- 📱 Responsive, mobile-friendly design
- ✅ Client-side form validation with inline error messages

---

## 🛠 Tech Stack

| Technology | Role |
|---|---|
| HTML5 | Page structure and semantic markup |
| CSS3 | Styling and responsive layout (`css/style.css`) |
| JavaScript (ES6+) | Application logic and DOM manipulation |
| jQuery 3.7.1 | DOM utilities and event handling |
| localStorage API | Client-side data persistence |

No build tools, frameworks, or server required.

---

## 📁 Project Structure

```
Richfield-Connect-Web-App-Development/
│
├── index.html          # Home / landing page
├── about.html          # About page — mission and features
├── signup.html         # Registration page with live profile preview
├── profile.html        # Student academic profile display
├── feed.html           # Community feed — create and view posts
│
├── css/
│   └── style.css       # Global stylesheet
│
└── js/
    ├── main.js         # Core logic: nav, profile, form validation, localStorage
    └── feed.js         # Feed-specific logic: post creation and rendering
```

---

## 📄 Pages

### 🏠 `index.html` — Home
The entry point of the app. Features a hero section with a toggleable info panel and three feature cards highlighting the platform's value proposition.

### ℹ️ `about.html` — About
Describes the platform's mission, core features, and privacy-first philosophy.

### 📝 `signup.html` — Sign Up
The registration page. Includes:
- A form with Full Name, Student Number, Email, Campus, Bio, Interests, and Password fields
- Real-time live profile preview that updates as you type
- Client-side validation with per-field error messages

### 👤 `profile.html` — Profile
Loads and displays the student's saved academic profile from localStorage. Includes a toggleable details panel.

### 📰 `feed.html` — Community Feed
The social hub. Students compose posts in a text area and submit them. Posts are saved to localStorage and rendered as a feed, newest first.

---

## 🗄 Data Model

All data is persisted client-side via the browser's `localStorage`. No server or database is needed.

| Key | Structure |
|---|---|
| `richfieldUser` | `{ fullName, studentNumber, email, campus, bio, interests[], password }` |
| `richfieldPosts` | `[{ author, content, timestamp }, ...]` |

> ⚠️ **Note:** Passwords are currently stored in plaintext. This is suitable for a prototype/academic project only. A production version must use server-side authentication with hashed passwords.

---

## 🚀 Getting Started

### Prerequisites
- Any modern web browser (Chrome, Firefox, Edge, Safari)
- An internet connection on first load (for the jQuery CDN)

### Run Locally

```bash
# 1. Clone the repository
git clone https://github.com/RissmanDrummerBoi/Richfield-Connect-Web-App-Development.git

# 2. Open the project folder
cd Richfield-Connect-Web-App-Development

# 3. Open index.html in your browser
# On macOS:
open index.html
# On Windows:
start index.html
# Or simply drag index.html into your browser
```

No `npm install`, no build step — it just works.

---

## 🌐 Deployment

Since the app is 100% static, it can be hosted anywhere:

**GitHub Pages**
1. Go to your repo → Settings → Pages
2. Set source to `main` branch, root folder
3. Your app will be live at `https://<username>.github.io/<repo-name>/`

**Netlify**
1. Go to [netlify.com](https://netlify.com) → Add new site
2. Drag and drop the project folder
3. Done — live in seconds

**Vercel**
```bash
npm install -g vercel
vercel
```

---

## ⚠️ Known Limitations & Future Improvements

| Limitation | Suggested Fix |
|---|---|
| localStorage only — data lost if browser storage is cleared | Integrate a backend (Node.js/Firebase) for cloud persistence |
| Passwords stored in plaintext | Server-side auth with bcrypt + JWT |
| Feed is not shared across browsers/devices | Real-time database (Firebase / WebSockets) |
| No profile image support | Allow avatar uploads |
| No post editing or deletion | Add edit/delete with confirmation |
| jQuery loaded from CDN — fails offline | Bundle locally or replace with vanilla JS |
| No input sanitisation on posts | Sanitise HTML before rendering to prevent XSS |

---

## 👥 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

© 2025 Richfield Connect | Empowering Student Collaboration
