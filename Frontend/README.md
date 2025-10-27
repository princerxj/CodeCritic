# 🧠 CodeCritic

> **Constructive Reviews. Better Results.**
>
> CodeCritic is an AI-powered code review platform designed to help developers identify bugs, inefficiencies, and improvements in their code with just one click. Simply paste your code, and CodeCritic instantly analyzes it — highlighting potential issues, best practices, and optimization ideas.

[![Status](https://img.shields.io/badge/status-In%20Development-yellow)](https://github.com)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev/)

## ⚠️ Work in Progress

This project is **actively under development**. New features and improvements are being added regularly — including real-time AI review streaming and multi-language support. Your feedback and contributions are always welcome!

### 🚧 Future Features Coming Soon:
- 🔁 Real-time AI streaming reviews (using SSE or WebSockets)
- 🧮 Multi-language support (C++, Python, Java, TypeScript, Go, etc.)
- 💾 User authentication & saved reviews history
- 🌙 Dark/Light mode toggle
- 📊 Code quality scoring system with detailed metrics
- 🤝 Community review & peer feedback system
- 📈 Advanced analytics dashboard
- 🔄 Git integration for automated reviews
- 🎯 Custom review rules and policies
- 📱 Mobile app version
---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Getting Started](#-getting-started)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Contributing](#-contributing)

---

## ✨ Features

### Core Features
- **🔍 AI-Powered Code Review** — Get intelligent insights on your code quality, readability, and design
- **⚡ Instant Feedback** — Analyzes code and highlights potential issues instantly
- **🛡️ Security Scanning** — Detects potential vulnerabilities and security concerns
- **📚 Best Practices** — Enforces industry standards and design patterns
- **❌ Error Detection** — Catches bugs, inefficiencies, and edge cases
- **📝 Detailed Reports** — Comprehensive, actionable feedback with explanations

### Technical Features
- 🎯 **Clean & Minimal UI** — Beautiful, distraction-free interface for developers
- 🌐 **Code Syntax Highlighting** — Powered by Prism.js for clean syntax visuals
- � **Markdown-based Output** — Reviews formatted beautifully using react-markdown
- � **Copy-Paste Support** — Easy code input with live editor
- 🎨 **Responsive & Modern Design** — Built with Tailwind CSS and Framer Motion principles
- 🏗️ **Modular Architecture** — Easy to scale, maintain, and contribute

---

## 🛠️ Tech Stack

### Frontend Layer
| Technology | Purpose |
|-----------|---------|
| **React 18** | UI library |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Styling & responsive design |
| **Framer Motion** | Animations & transitions |

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

### AI Integration
| Technology | Purpose |
|-----------|---------|
| **OpenAI API** | AI model for code analysis (or custom LLM) |
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
│  └────────┬─────────┘  └──────────────────────────────┘ │
│           │                                              │
│           │  HTTP POST (code)                           │
│           │                                              │
└───────────┼──────────────────────────────────────────────┘
            │
            ▼
┌─────────────────────────────────────────────────────────┐
│           Backend API (Express.js)                       │
├─────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────────────────┐   │
│  │  Route: POST /ai/get-review                      │   │
│  │  - Receives code from frontend                   │   │
│  │  - Processes code analysis                       │   │
│  │  - Calls AI/ML model                             │   │
│  └──────────────────────────────────────────────────┘   │
│                     │                                    │
│                     ▼                                    │
│  ┌──────────────────────────────────────────────────┐   │
│  │  AI Analysis Engine                              │   │
│  │  - Performance analysis                          │   │
│  │  - Security checks                               │   │
│  │  - Best practices validation                     │   │
│  │  - Error detection                               │   │
│  └──────────────────────────────────────────────────┘   │
│                     │                                    │
│                     ▼                                    │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Generate Review Report (Markdown)               │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
            │
            │  HTTP Response (review)
            │
            ▼
┌─────────────────────────────────────────────────────────┐
│  Frontend displays formatted review                      │
└─────────────────────────────────────────────────────────┘
```

### User Flow Diagram

```
START
  │
  ▼
┌─────────────────────────┐
│ User Opens CodeCritic   │
└────────────┬────────────┘
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
   │ Frontend Sends POST     │
   │ to /ai/get-review       │
   └────────────┬────────────┘
                │
                ▼
   ┌─────────────────────────┐
   │ Backend Sends Code to   │
   │ AI Model (e.g., GPT)    │
   └────────────┬────────────┘
                │
                ▼
   ┌─────────────────────────┐
   │ AI Generates Review     │
   │ (Markdown Format)       │
   └────────────┬────────────┘
                │
                ▼
   ┌─────────────────────────┐
   │ Backend Returns Review  │
   │ to Frontend             │
   └────────────┬────────────┘
                │
                ▼
   ┌─────────────────────────┐
   │ Frontend Renders        │
   │ Review via Markdown     │
   └────────────┬────────────┘
                │
                ▼
   ┌──────────────────────────────┐
   │ User Reads & Improves Code   │
   │ - Quality Issues             │
   │ - Performance Tips           │
   │ - Security Concerns          │
   │ - Best Practices             │
   └────────────┬─────────────────┘
                │
                ├─ YES ──► Modify Code ──► [Click Review Code]
                │
                └─ NO ──► END
```

### Data Flow Diagram

```
+──────────────┐          +─────────────────┐          +──────────────┐
│  Frontend    │  -POST→  │  Backend API    │  -POST→  │  AI Model    │
│ (React App)  │          │  (Express)      │          │  (OpenAI)    │
+──────────────+          +─────────────────+          +──────────────+
       ↑                           │                            │
       |                           ▼                            │
       |                  ┌─────────────────┐                  │
       └←-RESPONSE────────│  Process Code   │←────REVIEW───────┘
                          │  & Format       │
                          │  Markdown       │
                          └─────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control
- **OpenAI API Key** (or custom LLM endpoint)

### Installation

1. **Clone the Repository**
```bash
git clone https://github.com/your-username/codecritic.git
cd codecritic
```

2. **Install Frontend Dependencies**
```bash
cd Frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../BackEnd
npm install
```

4. **Setup Environment Variables**

Create a `.env` file in the `BackEnd` directory:
```env
PORT=3000
NODE_ENV=development
OPENAI_API_KEY=your_api_key_here
# Or use custom LLM endpoint
# LLM_ENDPOINT=https://your-llm-api.com/review
```

### Running the Application

#### Start Backend Server
```bash
cd BackEnd
npm start
# Server runs on http://localhost:3000
```

#### Start Frontend Development Server
```bash
cd Frontend
npm run dev
# Opens on http://localhost:5173 (or next available port)
```

Then visit 👉 **http://localhost:5173/** to access CodeCritic!

### Backend API Endpoint

The backend should expose this endpoint:

```
POST /ai/get-review
Content-Type: application/json

Body: { "code": "<user_code_here>" }

Response: { "review": "<markdown_formatted_review>" }
```

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

## 📁 Project Structure

```
CodeCritic/
├── Frontend/
│   ├── src/
│   │   ├── App.jsx              # Main React component
│   │   ├── App.css              # Component styling
│   │   ├── main.jsx             # Entry point
│   │   ├── index.css            # Global styles
│   │   └── assets/              # Static assets
│   ├── public/                  # Public files
│   ├── index.html               # HTML template
│   ├── package.json             # Dependencies
│   ├── vite.config.js           # Vite configuration
│   ├── eslint.config.js         # Linting rules
│   ├── tailwind.config.js       # Tailwind configuration
│   └── README.md                # Frontend documentation
│
└── BackEnd/
    ├── src/
    │   ├── app.js               # Express app setup
    │   ├── server.js            # Server entry point
    │   ├── controllers/
    │   │   └── ai.controller.js  # AI review logic
    │   ├── routes/
    │   │   └── ai.routes.js      # API routes
    │   └── services/
    │       └── ai.service.js     # AI processing & integration
    ├── package.json             # Dependencies
    ├── .env.example             # Environment template
    └── README.md                # Backend documentation
```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the BackEnd directory:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# API Keys (using external AI service)
# AI_API_KEY=your_api_key_here
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

### Styling
- Built with **Tailwind CSS** for utility-first styling
- Responsive grid system for mobile-first design
- Custom animations with **Framer Motion**

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
- Test your changes before submitting
- Update documentation as needed
- Ensure backward compatibility


## 📞 Support & Feedback

- 📧 **Email**: pr273582@gmail.com
- 🐛 **Report Issues**: [GitHub Issues](https://github.com/your-username/codecritic/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/your-username/codecritic/discussions)
- 🌟 **Star the project** if you find it helpful!


<div align="center">

**Made with ❤️ by Prince Raj**

⭐ **If you like this project, please consider giving it a star!** ⭐

Follow us for updates on new features and improvements!

</div></div>
