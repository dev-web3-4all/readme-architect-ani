 <div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f0c29,50:302b63,100:24243e&height=200&section=header&text=README%20Architect&fontSize=52&fontColor=00f5ff&animation=fadeIn&fontAlignY=38&desc=AI-Powered%20README%20Generator%20%2526%20Auditor&descAlignY=60&descColor=a78bfa&descSize=18" width="100%"/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=600&size=18&pause=1000&color=00F5FF&center=true&vCenter=true&width=700&lines=Generate+professional+READMEs+in+seconds+%F0%9F%9A%80;Profile+README+%7C+Project+README+%E2%9C%A8;AI+Auditor+with+scoring+%26+improvements+%F0%9F%94%8D;Built+with+React+%2B+TypeScript+%2B+Gemini+AI+%F0%9F%A4%96;Open+Source+%E2%80%94+Web3+for+all+%F0%9F%8C%8D)](https://git.io/typing-svg)

![Version](https://img.shields.io/badge/version-2.0.0-00f5ff?style=for-the-badge&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-a78bfa?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Gemini](https://img.shields.io/badge/Gemini_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)

</div>

---

## 🎯 What is this?

**README Architect** is an AI-powered agent that generates and audits professional GitHub READMEs. Give it your project or profile details — it returns a world-class, visually rich, ready-to-commit `README.md`.

Two modes. One mission: **no more bad READMEs.**

---

## ✨ Features

- **🗂️ Project README** — generates structured docs with features, stack, installation, usage, roadmap and contributing sections
- **👤 Profile README** — builds a bold developer identity with manifesto, typed animations, badges, stats and connect links
- **🔍 AI Auditor** — scores your README across 7 dimensions and delivers a fully improved version
- **📋 Copy & Download** — one click to get your `README.md` ready to commit
- **🎨 Visual Standards** — enforces capsule-render headers, shields.io badges, typing SVG and GitHub stats by default
- **📱 Responsive UI** — works on desktop and mobile with a mission-control dark interface

---

## 🛠️ Tech Stack

<div align="center">

![React](https://img.shields.io/badge/React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![shadcn](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge&logo=shadcnui&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)
![Motion](https://img.shields.io/badge/Motion-FF0055?style=for-the-badge&logo=framer&logoColor=white)

</div>

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Gemini API key — get one at [aistudio.google.com](https://aistudio.google.com)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/dev-web3-4all/readme-architect-ani.git
cd readme-architect-ani

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Add your Gemini API key to .env

# 4. Run locally
npm run dev
```

### Environment Variables

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 📖 Usage

**Project README:**
1. Select **Project README** mode
2. Fill in name, description, stack, features and install steps
3. Click **Generate** → copy or download your `README.md`
4. Optionally click **Audit** for a scored review and improved version

**Profile README:**
1. Select **Profile README** mode
2. Enter your GitHub username, tagline, stack, projects and links
3. Click **Generate** → a manifesto-style profile README is ready to commit

---

## 🗂️ Project Structure

```
readme-architect-ani/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   └── MarkdownPreview  # rendered markdown display
│   ├── prompts/
│   │   └── readmePrompts.ts # v2 prompt strategy (profile + project + auditor)
│   ├── services/
│   │   └── geminiService.ts # Gemini API integration
│   ├── lib/
│   │   └── utils.ts
│   └── App.tsx              # main UI with mode toggle
├── docs/
│   └── roadmap.md
├── .env.example
└── vite.config.ts
```

---

## 🛣️ Roadmap

- [x] README Generator (v1)
- [x] Technical Auditor Mode (v1)
- [x] Versioned Prompt Strategy (v1)
- [x] Profile README mode (v2)
- [x] Project/Profile toggle UI (v2)
- [x] Enhanced auditor with scoring (v2)
- [ ] Export directly to `.md` file
- [ ] GitHub API integration — auto-fetch repo info
- [ ] Direct commit to repository via GitHub OAuth
- [ ] Multi-language support (PT, ES, FR)
- [ ] Multi-agent workflow — Planner + Writer + Auditor
- [ ] Automated documentation pipeline

---

## 🤝 Contributing

Contributions are welcome — this is an open source, public good project.

```bash
# Fork the repo, then:
git checkout -b feat/your-feature
git commit -m "feat: your feature description"
git push origin feat/your-feature
# Open a Pull Request
```

---

## 📄 License

MIT © [dev-web3-4all](https://github.com/dev-web3-4all)

---

<div align="center">

> *"Good documentation is not a luxury — it's a public good."* 🌍

[![dev-web3-4all](https://img.shields.io/badge/by-dev--web3--4all-00f5ff?style=for-the-badge&logo=github&logoColor=white)](https://github.com/dev-web3-4all)
[![aideaflux](https://img.shields.io/badge/AideaFlux-95%2B_AI_Tools-a78bfa?style=for-the-badge&logo=artifacthub&logoColor=white)](https://aideaflux.xyz)

<img src="https://capsule-render.vercel.app/api?type=waving&color=0:24243e,50:302b63,100:0f0c29&height=100&section=footer&text=" width="100%"/>

</div>