import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ReadmeData {
  projectName: string;
  description: string;
  features: string;
  technologies: string;
  installation: string;
  usage: string;
  license: string;
}

export async function generateReadme(data: ReadmeData): Promise<string> {
  const prompt = `
    Generate a professional, high-quality GitHub README.md for the following project:
    
    Project Name: ${data.projectName}
    Description: ${data.description}
    Key Features: ${data.features}
    Technologies Used: ${data.technologies}
    Installation Steps: ${data.installation}
    Usage Instructions: ${data.usage}
    License: ${data.license}
    
    Guidelines:
    - Use clear headings and subheadings.
    - Include a table of contents.
    - Use appropriate badges (e.g., license, build status placeholders).
    - Use code blocks for installation and usage.
    - Add a section for "Contributing" and "Author".
    - Make it visually appealing with emojis where appropriate.
    - Ensure the tone is professional yet engaging.
    - Output ONLY the markdown content.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "Failed to generate README.";
  } catch (error) {
    console.error("Error generating README:", error);
    throw new Error("Failed to connect to AI service. Please check your API key.");
  }
}
