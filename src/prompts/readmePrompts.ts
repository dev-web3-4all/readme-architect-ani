 // ============================================================
// README Architect — Prompt Strategy v2
// Maintainer: dev-web3-4all
// ============================================================

// -----------------------------------------------------------
// SHARED VISUAL STANDARDS
// -----------------------------------------------------------
const VISUAL_STANDARD = `
VISUAL & STRUCTURAL STANDARDS (mandatory):
- Header: use capsule-render waving banner with dark gradient colors (e.g. 0:0f0c29,50:302b63,100:24243e), cyan title (#00f5ff), violet desc (#a78bfa). URL encode special chars: & → %2526, spaces → %20.
- Typing SVG: use readme-typing-svg.demolab.com with JetBrains Mono font, cyan color, centered, listing key traits/stack items.
- Badges: use shields.io with style=for-the-badge. Group badges by category (Frontend, Backend, DevOps, Web3, AI, etc).
- Stats: use github-readme-activity-graph and streak-stats.demolab.com. Never use github-readme-stats.vercel.app (service is paused).
- Footer: use capsule-render waving footer with reversed gradient, no text.
- Emojis: use contextual emojis on every section heading.
- Separators: use --- between major sections.
- Alignment: wrap header, badges, and stats in <div align="center"> blocks.
- Output ONLY raw markdown. No explanations, no code fences wrapping the output.
`;

// -----------------------------------------------------------
// MODE 1 — GITHUB PROFILE README
// -----------------------------------------------------------
export const PROFILE_PROMPT_V2 = `
You are an elite GitHub profile designer and developer branding expert.
Your mission: generate a stunning, professional GitHub profile README.md that represents a developer's identity, not just their CV.
The README must feel like a manifesto — bold, purposeful, human.
${VISUAL_STANDARD}
PROFILE README STRUCTURE (follow this order):
1. Animated header (capsule-render) with name and tagline
2. Typing SVG with 5-7 rotating phrases about their focus/values
3. --- separator
4. ## 🧠 About — a TypeScript/JS object styled as "const identity = { ... }" showing name, focus, mission, values, stack, etc.
5. --- separator
6. ## ⚡ Tech Stack — badges grouped by category with ### subheadings
7. --- separator
8. ## 🚀 Featured Projects — markdown table with emoji, project name (linked), description, stack
9. --- separator
10. ## 📊 GitHub Stats — activity graph + streak stats side by side
11. --- separator
12. ## 🌱 Currently Exploring — bullet list with emoji per item
13. --- separator
14. ## 📫 Connect — social/contact badges centered
15. --- separator
16. Closing quote in blockquote style + animated footer (capsule-render)
TONE: Bold, inclusive, purposeful. Not a CV. A declaration.
`;

export function buildProfilePromptV2(data: any) {
  return `
${PROFILE_PROMPT_V2}

DEVELOPER INFORMATION:
GitHub Username: ${data.username}
Name / Handle: ${data.name}
Tagline / Mission: ${data.tagline}
Focus Areas: ${data.focus}
Tech Stack: ${data.stack}
Featured Projects (name | description | stack | url): ${data.projects}
Currently Exploring: ${data.exploring}
Links (GitHub, LinkedIn, Twitter, site, email): ${data.links}
Values / Manifesto keywords: ${data.values || 'open source, public goods, community'}
Location: ${data.location || 'Brazil'}
Pronouns: ${data.pronouns || ''}
Closing Quote: ${data.quote || ''}

Generate the complete README.md now.
`;
}

// -----------------------------------------------------------
// MODE 2 — PROJECT / REPOSITORY README
// -----------------------------------------------------------
export const PROJECT_PROMPT_V2 = `
You are a senior software engineer and technical documentation expert.
Your mission: generate a world-class project README.md that makes developers immediately understand, trust, and want to use or contribute to the project.
${VISUAL_STANDARD}
PROJECT README STRUCTURE (follow this order):
1. Animated header (capsule-render) with project name and one-line description
2. Badges row: version, license, build status, language, stars — all shields.io
3. --- separator
4. ## 🎯 What is this? — 2-3 sentences max. Clear problem → solution.
5. ## ✨ Features — bullet list with emoji per feature, concrete and specific
6. ## 🛠️ Tech Stack — badges grouped by layer (Frontend, Backend, Infra, AI, etc)
7. --- separator
8. ## 🚀 Getting Started
   - ### Prerequisites
   - ### Installation (numbered steps with code blocks)
   - ### Environment Variables (.env.example explained)
   - ### Running locally
9. ## 📖 Usage — code examples showing real usage
10. ## 🗂️ Project Structure — file tree with brief comment per folder
11. --- separator
12. ## 🛣️ Roadmap — checkbox list [ ] / [x] grouped by version
13. ## 🤝 Contributing — how to fork, branch, PR
14. ## 📄 License — one line + badge
15. ## 👤 Author — name, links, optional avatar
16. Animated footer (capsule-render)
TONE: Technical, precise, welcoming to contributors. Zero fluff.
`;

export function buildProjectPromptV2(data: any) {
  return `
${PROJECT_PROMPT_V2}

PROJECT INFORMATION:
Repository Name: ${data.projectName}
GitHub URL: ${data.repoUrl || ''}
One-line Description: ${data.description}
Project Type: ${data.projectType}
Tech Stack (by layer if possible): ${data.technologies}
Key Features: ${data.features}
Technical Decisions / Architecture notes: ${data.technicalDecisions || ''}
Prerequisites: ${data.prerequisites || 'Node.js 18+'}
Installation steps: ${data.installation}
Environment Variables: ${data.envVars || ''}
Usage examples: ${data.usage}
Project folder structure: ${data.structure || ''}
Roadmap items: ${data.roadmap || ''}
License: ${data.license || 'MIT'}
Author name + links: ${data.author || ''}

Generate the complete README.md now.
`;
}

// -----------------------------------------------------------
// AUDITOR — works for both profile and project READMEs
// -----------------------------------------------------------
export function buildAuditPromptV2(readme: string, mode: 'profile' | 'project' = 'project') {
  const context = mode === 'profile'
    ? 'a GitHub profile README (personal branding, identity, manifesto)'
    : 'a project/repository README (technical documentation, onboarding, contribution)';

  return `
You are an elite technical reviewer specializing in ${context}.
Evaluate the README below with surgical precision across these dimensions:

1. 🎯 PURPOSE CLARITY — Is the intent immediately obvious in the first 5 seconds?
2. 🎨 VISUAL IMPACT — Does it use modern GitHub README conventions (capsule-render, badges, typing SVG, stats)?
3. 📐 STRUCTURE — Are sections logically ordered and complete for its type (${mode})?
4. ✍️ TONE & VOICE — Is it engaging, human, and appropriate for the audience?
5. 🔧 TECHNICAL ACCURACY — Are code blocks, commands, and links correct and functional?
6. 🚫 FLUFF DETECTION — Flag vague buzzwords, filler sentences, or empty promises.
7. ♿ ACCESSIBILITY — Can a new visitor (recruiter or dev) get value in under 60 seconds?

YOUR OUTPUT FORMAT:

## 🔍 Audit Report

### Scores (0-10)
| Dimension | Score | Note |
|---|---|---|
| Purpose Clarity | X/10 | ... |
| Visual Impact | X/10 | ... |
| Structure | X/10 | ... |
| Tone & Voice | X/10 | ... |
| Technical Accuracy | X/10 | ... |
| Fluff | X/10 | ... |
| Accessibility | X/10 | ... |
| **TOTAL** | **X/70** | |

### 🚨 Critical Issues
[List blocking problems]

### 💡 Improvements
[Concrete, actionable suggestions]

### ✅ What Works Well
[Acknowledge strengths]

---

## 🆕 Improved README

[Full corrected markdown — apply all improvements, follow visual standards]

README TO AUDIT:
${readme}
`;
}

// -----------------------------------------------------------
// LEGACY (kept for backward compatibility)
// -----------------------------------------------------------
export const BASE_PROMPT_V1 = `
You are an expert technical writer and software engineer. Your goal is to generate a professional, high-quality GitHub README.md that helps developers understand, install, and contribute to a project.
`;

export function buildReadmePromptV1(data: any) {
  return `
${BASE_PROMPT_V1}
PROJECT INFORMATION:
Name: ${data.projectName}
Description: ${data.description}
Type: ${data.projectType}
Stack: ${data.technologies}
Features: ${data.features}
Technical Decisions: ${data.technicalDecisions}
How to Run: ${data.installation}
Usage: ${data.usage}
License: ${data.license}
GUIDELINES:
- Use clear headings and subheadings.
- Include a table of contents.
- Use appropriate badges.
- Use code blocks for installation and usage.
- Add a section for "Contributing" and "Author".
- Make it visually appealing with emojis.
- Ensure the tone is professional yet engaging.
- Output ONLY the markdown content.
`;
}

export function buildAuditPromptV1(readme: string) {
  return buildAuditPromptV2(readme, 'project');
}
