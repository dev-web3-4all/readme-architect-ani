# README Architect (v1)

AI-powered professional README generator and auditor for developers.

## Features

- **AI Generation**: High-quality README generation using Gemini 3.
- **Technical Auditor**: A rigorous review mode that evaluates clarity, coherence, and utility, providing feedback and an improved version.
- **Prompt Strategy**: Versioned prompts for iterative improvement and evaluation.
- **Technical UI**: A mission-control dashboard designed for developers.

## Architecture

- **Frontend**: React 19, Vite, Tailwind CSS 4.
- **AI Service**: Gemini API (@google/genai).
- **UI Components**: shadcn/ui.

## Prompt Strategy

We use a versioned prompt strategy to ensure documentation quality:
- `src/prompts/readmePrompts.ts`: Contains the logic for building generation and audit prompts.

## Roadmap

See [docs/roadmap.md](docs/roadmap.md) for future plans.

## License

MIT
