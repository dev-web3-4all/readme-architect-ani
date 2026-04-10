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
  return `
You are a rigorous technical reviewer. 

Analyze the README below and evaluate it based on:
1. Clarity: Is the project purpose immediately clear?
2. Coherence: Does the documentation match a real-world project structure?
3. Fluff/Buzzwords: Is there unnecessary marketing speak?
4. Technical Quality: Are the installation/usage steps logical?
5. Practical Utility: Can a new developer get started in minutes?

YOUR TASK:
- List specific problems found.
- Suggest concrete improvements.
- Generate a corrected, improved version of the README.

FORMAT YOUR RESPONSE AS FOLLOWS:
# Audit Feedback
[Your detailed feedback here]

# Improved README
[The full corrected markdown here]

README TO AUDIT:
${readme}
`;
}
