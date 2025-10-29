# CodeCritic

> **Constructive Reviews. Better Results.**
>
> CodeCritic is an AI-powered code review platform designed to help developers identify bugs, inefficiencies, and improvements in their code with just one click. Simply paste your code, and CodeCritic instantly analyzes it — highlighting potential issues, best practices, and optimization ideas.

[![Status](https://img.shields.io/badge/status-In%20Development-yellow)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)

## ⚠️ Status

This project is **actively under development**. New features and improvements are being added regularly — including real-time AI review streaming. Your feedback and contributions are always welcome!

### 🚧 Future Features Coming Soon:
- 🔁 Real-time AI streaming reviews (using SSE or WebSockets)
- 💾 Saved reviews history
- 📊 Code quality scoring system with detailed metrics
- 🤝 Community review & peer feedback system
- 📈 Advanced analytics dashboard
- 🔄 Git integration for automated reviews
- 🎯 Custom review rules and policies
- 📱 Mobile app version

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🏗️ Architecture](#-architecture)
- [🚀 Quick Start](#-quick-start)
- [💻 Detailed Setup](#-detailed-setup)
- [📁 Project Structure](#-project-structure)
- [🔐 Authentication & Rate Limiting](#-authentication--rate-limiting)
- [📚 API Reference](#-api-reference)
- [🧪 Testing & Verification](#-testing--verification)
- [🐛 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📞 Support](#-support)

---

## ✨ Features

### Core Features
- **🔍 AI-Powered Code Review** — Get intelligent insights on your code quality, readability, and design
- **⚡ Instant Feedback** — Analyzes code and highlights potential issues instantly
- **🛡️ Security Scanning** — Detects potential vulnerabilities and security concerns
- **📚 Best Practices** — Enforces industry standards and design patterns
- **❌ Error Detection** — Catches bugs, inefficiencies, and edge cases
- **📝 Detailed Reports** — Comprehensive, actionable feedback with explanations
- **Dark/Light Mode available

### Technical Features
- 🎯 **Clean & Minimal UI** — Beautiful, distraction-free interface for developers
- 🌐 **Code Syntax Highlighting** — Powered by Prism.js for clean syntax visuals
- 📋 **Markdown-based Output** — Reviews formatted beautifully using react-markdown
- 📝 **Copy-Paste Support** — Easy code input with live editor
- 🎨 **Responsive & Modern Design** — Built with Tailwind CSS and Framer Motion
- 🏗️ **Modular Architecture** — Easy to scale, maintain, and contribute
- 🔐 **OAuth Authentication** — Sign in with Google or GitHub
- ⏱️ **Credit System** — Daily credit limits with 24-hour auto-reset
- 🌙 **Dark/Light Mode** — Theme switcher for user preference
- 👤 **User Profiles** — Profile dropdown with logout functionality

### 🎯 Feature Comparison

| Feature | Free Users | Authenticated |
|---------|-----------|---------------|
| Code Reviews | 1 per day | 5 per day |
| Credit Reset | 24 hours | 24 hours |
| Login Required | No | Yes |
| Profile Visible | No | Yes |
| Session Length | N/A | 7 days JWT |

---

## 🛠️ Tech Stack

### Frontend Layer
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library |
| **Vite 5** | Build tool & dev server |
| **Tailwind CSS** | Styling & responsive design |
| **Framer Motion** | Animations & transitions |
| **React Router** | Client-side routing |
| **Axios** | HTTP client for API requests |

### Code Editor & Display
| Technology | Purpose |
|-----------|---------|
| **react-simple-code-editor** | Code editing component |
| **PrismJS** | Syntax highlighting |
| **react-markdown** | Markdown rendering |
| **rehype-highlight** | Code block highlighting in reviews |

### API & Communication
| Technology | Purpose |
|-----------|---------|
| **Axios** | HTTP client for API requests |
| **Express.js** | Backend API server |
| **Node.js** | Runtime environment |

### Authentication
| Technology | Purpose |
|-----------|---------|
| **@react-oauth/google** | Google OAuth client |
| **JWT (jsonwebtoken)** | Token generation & verification |
| **express-rate-limit** | API rate limiting |

### Database
| Technology | Purpose |
|-----------|---------|
| **MongoDB** | NoSQL database for user data |
| **Mongoose** | MongoDB object modeling |

### AI Integration
| Technology | Purpose |
|-----------|---------|
| **Google Gemini API** | AI model for code analysis |
| **OpenAI API** | Alternative AI provider (optional) |
| **JavaScript (ES6+)** | Primary language |

---

## 🏗️ Architecture

### System Architecture Flow

```
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React)                      │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────┐  ┌──────────────────────────────┐ │
│  │  Code Editor     │  │  Review Display              │ │
│  │  (PrismJS)       │  │  (React Markdown)            │ │
│  │  + Credits Badge │  │  + Credits Info              │ │
│  └────────┬─────────┘  └──────────────────────────────┘ │
│           │                                              │
│           │  HTTP POST (code + JWT)                      │
│           │                                              │
└───────────┼──────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────┐
│           Backend API (Express.js)                       │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐   │
│  │  Middleware: JWT Auth + Credit Checker           │   │
│  │  - Verify JWT token (if present)                 │   │
│  │  - Check/update credits in MongoDB               │   │
│  │  - Auto-reset if 24h passed                      │   │
│  └────────────────────┬─────────────────────────────┘   │
│                       │                                  │
│                       ▼                                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Route: POST /ai/get-review                      │   │
│  │  - Validates code input                          │   │
│  │  - Consumes 1 credit                             │   │
│  │  - Calls Gemini AI                               │   │
│  └──────────────────────────────────────────────────┘   │
│                       │                                  │
│                       ▼                                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Google Gemini AI                                │   │
│  │  - Code analysis & review generation             │   │
│  │  - Best practices validation                     │   │
│  │  - Security & performance checks                 │   │
│  └──────────────────────────────────────────────────┘   │
│                       │                                  │
│                       ▼                                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Return: { review, credits }                     │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
            │
            │  HTTP Response (review + credits info)
            │
            ▼
┌─────────────────────────────────────────────────────────┐
│  Frontend updates review & credits display               │
└─────────────────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────┐
│                 MongoDB Database                         │
├─────────────────────────────────────────────────────────┤
│  Users Collection:                                       │
│  - email, name, picture                                  │
│  - provider (google/github)                              │
│  - credits (5 for auth, 1 for guest)                     │
│  - creditsResetAt (24h timestamp)                        │
└─────────────────────────────────────────────────────────┘
```

### User Flow Diagram

```
START
  │
  ▼
┌─────────────────────────┐
│ User Opens CodeCritic   │
│ (Fetch Credits)         │
└────────────┬────────────┘
             │
             ▼
   ┌─────────────────────┐
   │ Credits Display:    │
   │ - Auth: X/5 credits │
   │ - Guest: 1/1 credit │
   └────────────┬────────┘
                │
                ▼
   ┌─────────────────────┐
   │ Types or Pastes     │
   │ Code                │
   └────────────┬────────┘
                │
                ▼
   ┌─────────────────────────┐
   │ Clicks "Review Code"    │
   │ Button                  │
   └────────────┬────────────┘
                │
                ▼
   ┌─────────────────────────┐
   │ Credit Check            │
   │ (MongoDB for Auth,      │
   │  IP Map for Guest)      │
   └────────────┬────────────┘
                │
        ┌───────┴───────┐
        │               │
    No Credits?     Has Credits?
        │               │
        ▼               ▼
    ┌─────────┐   ┌──────────────┐
    │ Show    │   │ Send to AI   │
    │ Error   │   │ Consume 1    │
    │ + Reset │   │ Credit       │
    │ Time    │   └──────┬───────┘
    └────┬────┘          │
         │               ▼
         │          ┌──────────────┐
         │          │ Get Review   │
         │          │ from Gemini  │
         │          └──────┬───────┘
         │                 │
         │                 ▼
         │          ┌──────────────────┐
         │          │ Display Review   │
         │          │ + Update Credits │
         │          │ Badge (X-1)      │
         │          └──────┬───────────┘
         │                 │
         ▼                 ▼
    ┌──────────┐   ┌──────────────────┐
    │ Wait 24h │   │ User Reads &     │
    │ or Login │   │ Improves Code    │
    └──────────┘   └──────────────────┘
```

### Authentication Flow - Google OAuth (with MongoDB & Credits)

```
User                Frontend           Google OAuth         Backend              MongoDB
 │                     │                   │                  │                    │
 ├─ Click Google ─────>│                   │                  │                    │
 │                     ├─── Google Auth ──>│                  │                    │
 │                     │    (Popup)        │                  │                    │
 │                     │                   │                  │                    │
 │   [User Auth]       │<── Credential ────┤                  │                    │
 │                     │                   │                  │                    │
 │                     ├─ Send Credential ─────────────────────>│                  │
 │                     │   to Backend      │                  │                    │
 │                     │                   │   Verify with    │                    │
 │                     │                   │   Google API     │                    │
 │                     │                   │                  │                    │
 │                     │                   │   Find/Create ────────────────────────>│
 │                     │                   │   User           │                    │
 │                     │                   │   (providerUserId)                    │
 │                     │                   │                  │  ┌──────────────┐  │
 │                     │                   │                  │  │ New User?    │  │
 │                     │                   │                  │  │ Create with: │  │
 │                     │                   │                  │  │ - credits: 5 │  │
 │                     │                   │                  │  │ - resetAt    │  │
 │                     │                   │                  │  └──────────────┘  │
 │                     │                   │   User Data <──────────────────────────┤
 │                     │<── JWT Token ────────────────────────┤                    │
 │<─ JWT Saved ────────┤                   │                  │                    │
 │   in LocalStorage   │                   │                  │                    │
 │   + Fetch Credits ──────────────────────────────────────────>│                  │
 │                     │                   │                  ├─ Query Credits ────>│
 │                     │<── Credits (5/5) ────────────────────┤<── Return Credits ─┤
 │                     │                   │                  │                    │
 └─ User Logged In ────>                   │                  │                    │
    with Credits
```

### Authentication Flow - GitHub OAuth

```
User                Frontend              GitHub OAuth         Backend
 │                     │                      │                  │
 ├─ Click GitHub ─────>│                      │                  │
 │                     ├─ Redirect to Auth ──>│                  │
 │                     │   (Redirect URL)     │                  │
 │                     │                      │                  │
 │   [User Auth]       │                      │                  │
 │   [Approve]         │                      │                  │
 │                     │<─ Code in URL ───────┤                  │
 │                     │   (Callback)         │                  │
 │                     │                      │                  │
 │                     ├─ Send Code ────────────────────────────>│
 │                     │                      │                  │
 │                     │                      │   Exchange Code  │
 │                     │                      │   for Token      │
 │                     │                      │   (GitHub API)   │
 │                     │                      │                  │
 │                     │                      │   Get User Info  │
 │                     │                      │   (GitHub API)   │
 │                     │<──── JWT Token ──────────────────────────┤
 │<─ JWT Saved ────────┤                      │                  │
 │   in LocalStorage   │                      │                  │
 │                     │                      │                  │
 └─ User Logged In ────>                      │                  │
```

### Credit System Flow

```
User Makes Request
        │
        ▼
   ┌────────────────────────────┐
   │  Does request have JWT?    │
   └────────────────────────────┘
        ↙              ↘
      NO                YES
       │                │
       ↓                ▼
   Guest User     ┌─────────────────────┐
   IP-Based       │ Fetch User from DB  │
   Credits        │ (MongoDB)           │
       │          └─────────┬───────────┘
       │                    │
       ↓                    ▼
   ┌─────────────┐   ┌──────────────────┐
   │ Check IP in │   │ 24h passed since │
   │ Memory Map  │   │ creditsResetAt?  │
   └──────┬──────┘   └────────┬─────────┘
          │              ↙          ↘
          │           YES            NO
          │            │              │
          │            ▼              ▼
          │     ┌──────────────┐  ┌──────────┐
          │     │ Reset to 5   │  │ Keep     │
          │     │ Credits      │  │ Current  │
          │     └──────┬───────┘  └────┬─────┘
          │            │               │
          │            └───────┬───────┘
          │                    │
          ▼                    ▼
   ┌──────────────┐   ┌──────────────────┐
   │ Used in last │   │ Credits > 0?     │
   │ 24h?         │   └────────┬─────────┘
   └──────┬───────┘       ↙          ↘
      ↙      ↘          YES            NO
    YES      NO          │              │
     │        │          ▼              ▼
     ▼        ▼     ┌──────────┐  ┌──────────┐
  ❌ Block  ✅ Allow│ Decrement│  │ ❌ Block │
  Show       Store  │ Credit   │  │ Show hrs │
  Reset      IP+    │ by 1     │  │ to reset │
  Time       Time   └────┬─────┘  └──────────┘
                         │
                         ▼
                    ✅ Allow
                    Process
                    Request
```

### Data Flow Diagram

```
+──────────────┐          +─────────────────┐          +──────────────┐
│  Frontend    │  -POST→  │  Backend API    │  -POST→  │  AI Model    │
│ (React App)  │  +JWT    │  (Express)      │          │  (Gemini)    │
│              │          │  + Middleware   │          │              │
+──────┬───────+          +────────┬────────+          +──────────────+
       │                           │                            │
       │                           ▼                            │
       │                  ┌─────────────────┐                  │
       │                  │  Credit Check   │                  │
       │                  │  (MongoDB)      │                  │
       │                  └────────┬────────┘                  │
       │                           │                            │
       │                           ▼                            │
       │                  ┌─────────────────┐                  │
       │                  │  Process Code   │←────REVIEW───────┘
       │                  │  & Format       │
       │                  │  Markdown       │
       │                  └────────┬────────┘
       │                           │
       │                           ▼
       │                  +─────────────────+
       │                  │   MongoDB       │
       │                  │  Update Credits │
       │                  │  (Decrement -1) │
       │                  +─────────────────+
       │                           │
       ↓                           ↓
+────────────────────────────────────────+
│  Response: { review, credits }        │
│  - Markdown formatted review          │
│  - Credits: { remaining: X, max: 5 }  │
+────────────────────────────────────────+
```

### Complete Request Flow with Credits

```
┌─────────────────────────────────────────────────────────────┐
│ 1. USER ACTION: Submit Code for Review                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. FRONTEND: Send POST /ai/get-review                       │
│    - Body: { code: "..." }                                  │
│    - Headers: { Authorization: "Bearer <JWT>" } (optional)  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. BACKEND MIDDLEWARE: JWT Verification                     │
│    - Extract user ID from token (if present)                │
│    - Attach req.user to request                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. CREDIT CHECKER MIDDLEWARE:                               │
│    IF Authenticated:                                        │
│      - Query MongoDB for user                               │
│      - Check if 24h passed → Reset credits to 5             │
│      - Check credits > 0 → Decrement by 1                   │
│      - Attach remaining credits to req                      │
│    IF Guest:                                                │
│      - Check IP in memory map                               │
│      - 24h passed? → Allow, store timestamp                 │
│      - Already used? → Block with 429 error                 │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. AI CONTROLLER: Process Request                           │
│    - Validate code input                                    │
│    - Call Gemini AI service                                 │
│    - Format response with credits info                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. GEMINI AI SERVICE:                                       │
│    - Analyze code for bugs, performance, security           │
│    - Generate markdown review                               │
│    - Return structured feedback                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. BACKEND RESPONSE:                                        │
│    {                                                        │
│      "review": "# Code Review\n\n...",                      │
│      "credits": {                                           │
│        "remaining": 4,                                      │
│        "max": 5                                             │
│      }                                                      │
│    }                                                        │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 8. FRONTEND: Display Results                                │
│    - Render markdown review in ReviewPanel                  │
│    - Update credit badge: "4/5 credits"                     │
│    - Show success/error messages                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v16 or higher
- **npm** or **yarn** package manager
- **Git** for version control
- **MongoDB** (local or MongoDB Atlas)
- **Google OAuth credentials** (5 minutes)
- **GitHub OAuth credentials** (5 minutes)

### ⏱️ Installation Time: ~20 minutes

#### Step 0️⃣: Install MongoDB (if not already installed)

**Option A: Local MongoDB**
- Download from https://www.mongodb.com/try/download/community
- Install and start MongoDB service
- Default connection: `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud - Recommended)**
- Sign up at https://www.mongodb.com/cloud/atlas
- Create a free cluster
- Get connection string (looks like `mongodb+srv://username:password@cluster.mongodb.net/`)

#### Step 1️⃣: Get Google OAuth Credentials

1. Open https://console.cloud.google.com/
2. Create a new project named `CodeCritic`
3. Go to **APIs & Services** → **Library**
4. Search for and enable **Google+ API**
5. Go to **APIs & Services** → **Credentials**
6. Click **+ Create Credentials** → **OAuth 2.0 Client IDs**
7. Choose **Web application**
8. Add authorized redirect URIs:
   - `http://localhost:5173`
   - `http://localhost:3000`
9. Click **Create** and copy your **Client ID** and **Client Secret**

#### Step 2️⃣: Get GitHub OAuth Credentials

1. Open https://github.com/settings/apps
2. Click **New OAuth App**
3. Fill in:
   - **Application name:** CodeCritic
   - **Homepage URL:** http://localhost:5173
   - **Authorization callback URL:** http://localhost:5173/auth/github/callback
4. Click **Register application**
5. Copy your **Client ID**
6. Click **Generate a new client secret** and copy it immediately

#### Step 3️⃣: Clone and Setup

```bash
# Clone repository
git clone https://github.com/princerxj/CodeCritic.git
cd CodeCritic

# Create BackEnd/.env
cd BackEnd
cat > .env << EOF
JWT_SECRET=super-secret-key-change-in-production
GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET_HERE
GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID_HERE
GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET_HERE
GEMINI_API_KEY=YOUR_GEMINI_API_KEY_HERE
MONGODB_URI=mongodb://localhost:27017/codecritic
MAX_CREDITS=5
EOF

# Install backend dependencies
npm install

# Start backend server
npm start
```

#### Step 4️⃣: Start Frontend

```bash
# In new terminal
cd Frontend

# Create .env.local
cat > .env.local << EOF
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID_HERE
VITE_GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID_HERE
EOF

# Install frontend dependencies
npm install

# Start frontend development server
npm run dev
```

#### Step 5️⃣: Open the App

Visit **http://localhost:5173** in your browser! 🎉

---

## 💻 Detailed Setup

### Backend Setup

1. **Navigate to Backend**
   ```bash
   cd BackEnd
   ```

2. **Create `.env` file** with your credentials:
   ```env
   # JWT Configuration
   JWT_SECRET=my-ultra-secret-key-12345-change-in-production
   
   # Google OAuth (from Google Cloud Console)
   GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
   GOOGLE_CLIENT_SECRET=YOUR_GOOGLE_CLIENT_SECRET
   
   # GitHub OAuth (from GitHub Developer Settings)
   GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
   GITHUB_CLIENT_SECRET=YOUR_GITHUB_CLIENT_SECRET
   
   # AI Service (Google Gemini)
   GEMINI_API_KEY=YOUR_GEMINI_API_KEY
   
   # MongoDB Connection
   MONGODB_URI=mongodb://localhost:27017/codecritic
   # For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/codecritic
   
   # Credit System
   MAX_CREDITS=5  # Number of credits for authenticated users (default: 5)
   
   # Optional
   PORT=3000
   NODE_ENV=development
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Server**
   ```bash
   npm start
   ```

   You should see:
   ```
   Server is running on http://localhost:3000
   ```

### Frontend Setup

1. **Navigate to Frontend**
   ```bash
   cd Frontend
   ```

2. **Create `.env.local` file** with your credentials:
   ```env
   # ONLY Client IDs (NOT secrets!)
   VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
   VITE_GITHUB_CLIENT_ID=YOUR_GITHUB_CLIENT_ID
   ```

3. **Install Dependencies**
   ```bash
   npm install
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   ➜  Local:   http://localhost:5173/
   ```

5. **Open in Browser**
   ```
   http://localhost:5173
   ```

---

## 📁 Project Structure

```
CodeCritic/
├── BackEnd/
│   ├── src/
│   │   ├── app.js                      # Express app setup
│   │   ├── server.js                   # Server entry point
│   │   ├── config/
│   │   │   └── database.js             # MongoDB connection setup
│   │   ├── models/
│   │   │   └── User.js                 # User schema with credits tracking
│   │   ├── middleware/
│   │   │   ├── auth.js                 # JWT authentication
│   │   │   └── rateLimiter.js          # Credit-based rate limiting
│   │   ├── controllers/
│   │   │   ├── ai.controller.js        # AI review & credits logic
│   │   │   └── auth.controller.js      # OAuth handlers
│   │   ├── routes/
│   │   │   ├── ai.routes.js            # AI review & credits routes
│   │   │   └── auth.routes.js          # OAuth routes
│   │   └── services/
│   │       └── ai.service.js           # Gemini AI integration
│   ├── package.json                    # Backend dependencies
│   ├── .env                            # Environment variables (not in git)
│   ├── .env.example                    # Environment template
│   └── README.md                       # Backend docs
│
├── Frontend/
│   ├── src/
│   │   ├── App.jsx                     # Main app component
│   │   ├── App.css                     # Component styling
│   │   ├── main.jsx                    # Entry point
│   │   ├── index.css                   # Global styles
│   │   ├── context/
│   │   │   ├── AuthContext.jsx         # Auth state management
│   │   │   └── ThemeContext.jsx        # Theme state management
│   │   ├── components/
│   │   │   ├── Navbar.jsx              # Navigation bar with user profile
│   │   │   ├── HeroSection.jsx         # Landing section
│   │   │   ├── CodeEditorSection.jsx   # Code input area with credits display
│   │   │   ├── ReviewPanel.jsx         # Review display panel
│   │   │   ├── Footer.jsx              # Footer component
│   │   │   └── ProtectedRoute.jsx      # Route protection
│   │   ├── pages/
│   │   │   ├── Home.jsx                # Main page with credit tracking
│   │   │   ├── Login.jsx               # Login page
│   │   │   └── GitHubCallback.jsx      # OAuth callback handler
│   │   ├── utils/
│   │   │   └── api.js                  # API client (reviews & credits)
│   │   └── assets/                     # Static assets
│   ├── public/                         # Public files
│   ├── package.json                    # Frontend dependencies
│   ├── vite.config.js                  # Vite configuration
│   ├── eslint.config.js                # ESLint configuration
│   ├── tailwind.config.js              # Tailwind configuration
│   ├── index.html                      # HTML template
│   ├── .env.local                      # Environment variables (local)
│   └── .env.example                    # Environment template
│
├── README.md                           # Main documentation
├── MONGODB_INTEGRATION.md              # MongoDB setup guide
├── .gitignore                          # Git ignore rules
└── LICENSE                             # MIT License
```

### Key Files & Their Roles

**Backend Core:**
- `config/database.js` - MongoDB connection with auto-reconnect
- `models/User.js` - User schema with credits & reset timestamp
- `middleware/rateLimiter.js` - Credit-based rate limiting (24h reset)
- `controllers/ai.controller.js` - Review generation + credit management
- `controllers/auth.controller.js` - OAuth signup/login handlers

**Frontend Core:**
- `pages/Home.jsx` - Main UI with credit fetching & display
- `components/CodeEditorSection.jsx` - Editor with credit badge
- `utils/api.js` - API calls for reviews & credits
- `context/AuthContext.jsx` - Global auth state

---

## 🔐 Authentication & Rate Limiting

### What's Implemented

✅ **OAuth Authentication with Database Persistence**
- Sign in with Google (auto signup/login)
- Sign in with GitHub (auto signup/login)
- JWT token generation (7-day expiry)
- User data stored in MongoDB (name, email, picture, credits)
- Automatic token refresh on page load
- Logout functionality

✅ **Unified Signup/Login Flow**
- First-time users automatically sign up
- Returning users automatically log in
- Same OAuth process for both
- User data persisted in database

✅ **Rate Limiting**
- 1 request per 24 hours per IP (free users)
- Unlimited requests for authenticated users
- Express rate-limit middleware
- Error messages for rate-limited users

✅ **User Management**
- User profile dropdown in navbar
- Profile information display
- Logout button
- Auto-login on page refresh
- User data persisted across sessions

✅ **Security**
- JWT token verification
- OAuth credential validation
- Secure token storage (localStorage)
- Protected routes
- MongoDB indexes for fast queries

✅ **Database Schema**
- Name, email, picture stored
- Provider info (Google/GitHub)
- Timestamps (createdAt, updatedAt)
- Unique constraints on email and providerUserId

### How It Works

#### 1. Unauthenticated User Flow
```
User visits app
    ↓
Clicks "Review Code"
    ↓
Backend checks IP in rate limiter
    ↓
First request? → Allow & log IP
Repeated request? → Block & show error
    ↓
Show "Login to get more reviews" message
```

#### 2. OAuth Signup/Login Flow
```
User clicks Google/GitHub button
    ↓
OAuth provider popup/redirect
    ↓
User authenticates and approves
    ↓
Callback to CodeCritic backend with OAuth token/code
    ↓
Backend verifies with OAuth provider
    ↓
Backend checks if user exists in MongoDB
    ↓
    ├─ User exists? → LOGIN: Update user info, generate JWT
    │
    └─ User doesn't exist? → SIGNUP: Create new user in DB, generate JWT
    ↓
Backend generates JWT token
    ↓
Frontend stores JWT in localStorage
    ↓
Axios attaches JWT to all requests
    ↓
Rate limiter skips authenticated users
    ↓
Unlimited reviews!
```

#### 3. Credit System & Rate Limiting

**Credit-Based Usage Tracking**

CodeCritic uses a **credit-based system** to manage API usage fairly:

**Authenticated Users:**
- Get **MAX_CREDITS** (default: 5) credits per day
- Credits **reset automatically every 24 hours**
- Each code review consumes **1 credit**
- When credits reach 0, user must wait for the 24-hour reset
- Credits are stored in MongoDB with reset timestamp tracking

**Guest Users (Non-Authenticated):**
- Get **1 free credit** per IP address per 24 hours
- Credit resets automatically after 24 hours from first use
- Must log in/sign up for more daily credits

**Configuration:**
```env
# In BackEnd/.env
MAX_CREDITS=5  # Number of credits for authenticated users per day
```

**How Credits Work:**

```
Request received → Check authentication
    ↓
Authenticated User:
  - Fetch user from MongoDB
  - Check if 24h passed since last reset
    - Yes → Reset credits to MAX_CREDITS, update timestamp
    - No → Continue with current credits
  - Check credits > 0?
    - Yes → Decrement by 1, process request, return credits info
    - No → Reject with 429 (out of credits, X hours until reset)
    
Guest User:
  - Check IP in memory store
  - Check if 24h passed since first use
    - Yes → Allow request, reset timestamp
    - No → Reject with 429 (1 credit used, X hours until reset)
```

**Response Format:**
All successful code review responses now include credit information:
```json
{
  "review": "AI-generated code review...",
  "credits": {
    "remaining": 4,
    "max": 5
  }
}
```

**Benefits:**
- ✅ Fair daily usage limits for all users
- ✅ Automatic 24-hour reset (no manual login required)
- ✅ Configurable limits via environment variables
- ✅ Persistent tracking with timestamps
- ✅ Real-time credit display and countdown
- ✅ Encourages user registration for more credits

---

## 📚 API Reference

### Authentication Endpoints

#### Google OAuth
```
POST /auth/google
Content-Type: application/json

Request Body:
{
  "token": "google_id_token_here"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "google_id",
    "email": "user@example.com",
    "name": "John Doe",
    "picture": "https://..."
  }
}
```

#### GitHub OAuth
```
POST /auth/github
Content-Type: application/json

Request Body:
{
  "code": "github_authorization_code"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "github_username",
    "email": "user@github.com",
    "name": "John Doe"
  }
}
```

### Code Review Endpoint

#### Get Code Review (Credit-Based)
```
POST /ai/get-review
Content-Type: application/json
Authorization: Bearer jwt_token (optional)

Request Body:
{
  "code": "function add(a, b) { return a + b; }"
}

Credit Limits:
- Without Auth: 1 credit per 24h per IP
- With Auth: MAX_CREDITS (default: 5) per login session
- Credits reset on each login for authenticated users

Success Response (200):
{
  "review": "# Code Review\n\n✓ Excellent work...",
  "credits": {
    "remaining": 4,
    "max": 5
  },
  "statusCode": 200
}

Out of Credits Error (429):
{
  "statusCode": 429,
  "message": "You have used all 5 credits for today. Your credits will reset in 8 hour(s).",
  "credits": 0,
  "maxCredits": 5,
  "retryAfter": "8 hour(s)"
}

Guest Rate Limit Error (429):
{
  "statusCode": 429,
  "message": "You have used your 1 free credit. Please log in or try again in 23 hours.",
  "retryAfter": "23 hours"
}

Unauthorized Error (401):
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Please log in to access this resource"
}
```

### Frontend Routes

```
/              - Main page (public)
/login         - Login page (public)
/auth/github/callback - GitHub OAuth callback (public)
```

### Response Examples

**Successful Review:**
```json
{
  "review": "# Code Review\n\n## Performance\n- Good use of built-in methods\n\n## Best Practices\n- Consider adding error handling\n\n## Security\n- No issues found"
}
```

**Rate Limit Error:**
```json
{
  "statusCode": 429,
  "message": "You have reached the daily limit. Please log in to get more requests."
}
```

**Unauthorized:**
```json
{
  "statusCode": 401,
  "error": "Unauthorized",
  "message": "Please log in to access this resource"
}
```

---

## 🧪 Testing & Verification

### Verify Installation

1. **Check Backend Packages**
   ```bash
   cd BackEnd
   npm list --depth=0
   ```
   Should show: `jsonwebtoken`, `express-rate-limit`, `axios`, etc.

2. **Check Frontend Packages**
   ```bash
   cd Frontend
   npm list @react-oauth/google react-router-dom axios
   ```
   Should show all three installed.

3. **Check Environment Variables**
   - Backend: Verify `BackEnd/.env` exists
   - Frontend: Verify `Frontend/.env.local` exists

### Testing Workflow

After starting both servers:

1. **Test Unauthenticated Access**
   - Open http://localhost:5173
   - Paste some code
   - Click "Review Code" → Should work
   - Try again → Should show rate limit error

2. **Test Google Login**
   - Click "Sign In with Google"
   - Complete authentication
   - Should redirect back to app
   - Profile dropdown should show user info

3. **Test GitHub Login**
   - Click "Sign In with GitHub"
   - Complete authentication
   - Should redirect back to app
   - Profile dropdown should show user info

4. **Test Unlimited Reviews**
   - After login, paste code
   - Click "Review Code" multiple times
   - Should work unlimited times

5. **Test Logout**
   - Click profile dropdown
   - Click "Logout"
   - Should redirect to login
   - Rate limit should apply again

6. **Test Dark/Light Mode**
   - Click theme toggle in navbar
   - App colors should switch

---

## 🐛 Troubleshooting

### Backend Won't Start

```bash
# Error: Cannot find module 'express-rate-limit'
# Solution: Install dependencies
cd BackEnd
npm install

# Error: Port 3000 already in use
# Solution: Kill process or change port
# Windows: taskkill /PID <process_id> /F
# Linux/Mac: kill -9 <process_id>
```

### Frontend Build Fails

```bash
# Error: Missing module @react-oauth/google
cd Frontend
npm install @react-oauth/google

# Error: Cannot find .env.local
# Solution: Create Frontend/.env.local with credentials
cat > .env.local << EOF
VITE_GOOGLE_CLIENT_ID=your_id
VITE_GITHUB_CLIENT_ID=your_id
EOF
```

### OAuth Errors

**Error: "401: invalid_client"**
- Check Client ID/Secret are correct
- Verify redirect URIs match your setup
- Ensure `.env` files are created and readable

**Error: "Missing environment variables"**
- Ensure `BackEnd/.env` exists
- Ensure `Frontend/.env.local` exists
- Check variable names match exactly

**Error: "Token expired"**
- Clear localStorage: `localStorage.clear()`
- Login again to get new 7-day token

### Rate Limiting Issues

**Always getting rate limited:**
- Check JWT token in localStorage
- Verify `Authorization` header is sent
- Check backend logs for token verification

**Not getting rate limited when expected:**
- Verify rate limiter middleware is applied
- Check IP address is being logged
- Verify 24h window calculation

---

## 🚀 Production Deployment

### Before Going Live

- [ ] Generate strong `JWT_SECRET`
- [ ] Use HTTPS only (set secure cookies)
- [ ] Store credentials in secure environment
- [ ] Implement refresh tokens
- [ ] Add database for user persistence
- [ ] Enable CORS properly
- [ ] Add request validation
- [ ] Implement CSRF protection
- [ ] Add logging and monitoring
- [ ] Set up error tracking

### Deployment Options

**Frontend:** Vercel, Netlify, GitHub Pages
**Backend:** Heroku, Railway, AWS EC2, DigitalOcean

---

## 📦 Build for Production

### Frontend Build
```bash
cd Frontend
npm run build
```

Creates optimized build in `dist/` folder.

### Backend Setup
Ensure all environment variables are set in production environment.

---

## 💻 Usage

### Basic Workflow

1. **Open the Application**
   - Navigate to `http://localhost:5173`
   
2. **Input Your Code**
   - Paste your JavaScript code in the left editor panel
   - Or type directly in the editor
   
3. **Request Review**
   - Click the "Review Code" button
   - Wait for AI analysis to complete
   
4. **Review Feedback**
   - Read the detailed feedback in the right panel
   - Identify areas for improvement
   
5. **Iterate**
   - Modify your code based on suggestions
   - Request another review

### Example

**Input Code:**
```javascript
function calculateSum(arr) {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum = sum + arr[i];
  }
  return sum;
}
```

**Review Output:**
```
✓ Code Quality: Good
- Consider using const/let instead of var
- Use arrow functions or reduce() for cleaner syntax

⚡ Performance: Acceptable
- Current approach is O(n), which is optimal
- Consider using Array.prototype.reduce() for functional approach

🛡️ Security: No Issues Found

📚 Best Practices:
- Use destructuring for better readability
- Consider adding input validation
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the BackEnd directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# AI Service (Google Gemini)
GEMINI_API_KEY=your_gemini_api_key
```

### Tailwind CSS Configuration

Tailwind CSS is pre-configured in `vite.config.js` and `tailwind.config.js`

---

## 🎨 UI Components

### Main Components
- **Code Editor** - React Simple Code Editor with PrismJS highlighting
- **Review Panel** - Markdown-rendered review feedback
- **Navigation Bar** - Header with app title and branding
- **Feature Cards** - Informational cards about features
- **Footer** - Links and information section
- **Login Page** - OAuth authentication page
- **Profile Dropdown** - User menu with logout option

### Styling
- Built with **Tailwind CSS** for utility-first styling
- Responsive grid system for mobile-first design
- Custom animations with **Framer Motion**
- Dark/Light mode support with theme context

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit your changes** (`git commit -m 'Add amazing feature'`)
4. **Push to the branch** (`git push origin feature/amazing-feature`)
5. **Open a Pull Request**

### Development Guidelines
- Write clean, readable, and well-commented code
- Follow the existing code style and conventions
- Test your changes thoroughly before submitting
- Update documentation as needed
- Ensure backward compatibility
- Add tests for new features
- Keep commits atomic and well-described

### Code Style
- Use ES6+ JavaScript features
- Follow React best practices and hooks conventions
- Use functional components over class components
- Implement proper error handling
- Add comments for complex logic
- Use meaningful variable and function names

### Pull Request Process
1. Update the README.md with details of changes if applicable
2. Update the package.json version following semantic versioning
3. The PR will be merged once you have approval from maintainers

---

## 📞 Support

- 📧 **Email**: pr273582@gmail.com
- 🐛 **Report Issues**: [GitHub Issues](https://github.com/princerxj/CodeCritic/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/princerxj/CodeCritic/discussions)
- ⭐ **Star the project** if you find it helpful!

---

## 🔐 NEW: Authentication & Rate Limiting (v2.0)

### What's New ✨
- **OAuth Authentication** - Sign in with Google or GitHub
- **Rate Limiting** - 1 free review per 24h, unlimited for authenticated users
- **JWT Tokens** - Secure 7-day token-based authentication
- **User Profiles** - Profile dropdown with logout

### Getting Started with Auth

#### Step 1: Install Dependencies
```bash
cd BackEnd && npm install
cd ../Frontend && npm install
```

#### Step 2: Get OAuth Credentials
- **Google**: [Google Cloud Console](https://console.cloud.google.com/)
- **GitHub**: [GitHub Developer Settings](https://github.com/settings/apps)

See detailed instructions in the [Quick Start](#-quick-start) section above.

#### Step 3: Configure Environment

Create `BackEnd/.env`:
```env
JWT_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-id
GOOGLE_CLIENT_SECRET=your-secret
GITHUB_CLIENT_ID=your-id
GITHUB_CLIENT_SECRET=your-secret
GEMINI_API_KEY=your-api-key
```

Create `Frontend/.env.local`:
```env
VITE_GOOGLE_CLIENT_ID=your-id
VITE_GITHUB_CLIENT_ID=your-id
```

#### Step 4: Run the App
```bash
# Terminal 1 - Backend (:3000)
cd BackEnd && npm start

# Terminal 2 - Frontend (:5173)
cd Frontend && npm run dev
```

### Features

| Feature | Free Users | Authenticated |
|---------|-----------|---------------|
| Code Reviews | 1 per 24h | Unlimited |
| Rate Limit | Per IP | Bypassed |
| Login | Not Required | Yes |
| Profile | Hidden | Visible |
| Session | 24h IP | 7 days JWT |

### Documentation
- 📖 [Setup Guide](./SETUP_GUIDE.md) - Complete setup instructions
- 🔑 [Credentials Template](./CREDENTIALS_TEMPLATE.md) - Get OAuth credentials
- 🚀 [Installation Verified](./INSTALLATION_VERIFIED.md) - Troubleshooting
- 📚 [Quick Reference](./QUICK_REFERENCE.md) - API endpoints
- 🏗️ [Architecture](./ARCHITECTURE.md) - System design
- 📊 [Status](./STATUS.md) - Current status

---

## 🌟 Key Features Deep Dive

### AI-Powered Code Analysis

CodeCritic uses advanced AI models (Google Gemini) to analyze your code across multiple dimensions:

**Performance Analysis:**
- Time complexity evaluation
- Space complexity assessment
- Algorithm efficiency suggestions
- Optimization recommendations

**Security Scanning:**
- SQL injection vulnerabilities
- XSS attack vectors
- Authentication issues
- Data exposure risks
- Insecure dependencies

**Best Practices:**
- Coding standards compliance
- Design pattern recommendations
- Code organization suggestions
- Naming conventions
- Documentation quality

**Error Detection:**
- Syntax errors
- Logic errors
- Edge case handling
- Exception handling
- Type safety issues

### Rate Limiting System

**For Free Users:**
- 1 code review per 24 hours
- IP-based tracking
- Automatic reset after 24 hours
- Clear error messages with login prompt

**For Authenticated Users:**
- Unlimited code reviews
- JWT token-based authentication
- 7-day session validity
- Automatic token refresh

### Theme System

**Light Mode:**
- Clean white background
- High contrast for readability
- Professional appearance
- Optimized for daylight use

**Dark Mode:**
- Easy on the eyes
- Reduced eye strain
- Modern aesthetic
- Optimized for night coding

---

## 📊 Performance Metrics

### Response Times
- Average review generation: 3-5 seconds
- Authentication: < 1 second
- Page load time: < 2 seconds
- API response time: < 500ms

### Scalability
- Supports concurrent users
- Efficient rate limiting
- Optimized database queries
- CDN-ready static assets

---

## 🔒 Security Features

### Authentication Security
- OAuth 2.0 protocol
- JWT token encryption
- Secure token storage
- HTTPS enforcement (production)

### API Security
- Rate limiting per endpoint
- Request validation
- SQL injection prevention
- Input sanitization
- Error message sanitization

### Data Privacy
- No code storage (unless opted in)
- Secure data transmission
- OAuth token encryption
- User data protection

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### MIT License Summary
```
Copyright (c) 2025 Prince Raj

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---


## 💡 FAQ

**Q: Is CodeCritic free to use?**
A: Yes! Free users get 1 review per 24 hours. Sign in for unlimited reviews.

**Q: What programming languages are supported?**
A: Currently JavaScript. Multi-language support coming in v2.2.

**Q: Is my code stored anywhere?**
A: No, your code is analyzed in real-time and not stored (unless you opt-in for history).

**Q: Can I use this for production code?**
A: Yes, but always verify suggestions before implementing them.

**Q: How accurate are the AI reviews?**
A: Very accurate, but AI can make mistakes. Use human judgment.

**Q: Can I contribute?**
A: Absolutely! Check our [Contributing Guidelines](./CONTRIBUTING.md).

**Q: Is there an API?**
A: Yes, see [API Documentation](./docs/API.md) for details.

**Q: Can I self-host CodeCritic?**
A: Yes, follow the setup instructions in this README.

---

## 🚨 Important Notes

### Rate Limiting
- Free users: 1 review per 24 hours per IP address
- Authenticated users: Unlimited reviews
- Rate limits reset automatically

### Authentication
- Google OAuth requires Google Cloud Console setup
- GitHub OAuth requires GitHub Developer Settings
- JWT tokens expire after 7 days
- Tokens are stored in localStorage

### Privacy
- We don't store your code by default
- OAuth providers handle authentication
- We only store email and name from OAuth
- See [Privacy Policy](./PRIVACY.md) for details


**Made with ❤️ by Prince Raj**

[![GitHub Follow](https://img.shields.io/github/followers/princerxj?style=social)](https://github.com/princerxj)
[![Twitter Follow](https://img.shields.io/twitter/follow/princerxj?style=social)](https://twitter.com/princerxj)

⭐ **If you like this project, please consider giving it a star!** ⭐

**Follow for updates on new features and improvements!**


</div>

---

<div align="center">

### 🎉 Thank you for using CodeCritic! 🎉

**Happy Coding! 💻✨**

</div