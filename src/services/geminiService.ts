import { GoogleGenAI } from "@google/genai";
import {
  buildProjectPromptV2,
  buildProfilePromptV2,
  buildAuditPromptV2,
} from "../prompts/readmePrompts";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

export interface ReadmeData {
  mode: "project" | "profile";
  projectName: string;
  description: string;
  projectType: string;
  features: string;
  technologies: string;
  technicalDecisions: string;
  installation: string;
  usage: string;
  license: string;
  repoUrl?: string;
  prerequisites?: string;
  envVars?: string;
  structure?: string;
  roadmap?: string;
  author?: string;
  username?: string;
  name?: string;
  tagline?: string;
  focus?: string;
  stack?: string;
  projects?: string;
  exploring?: string;
  links?: string;
  values?: string;
  location?: string;
  pronouns?: string;
  quote?: string;
}

export async function generateReadme(data: ReadmeData): Promise<string> {
  const prompt =
    data.mode === "profile"
      ? buildProfilePromptV2(data)
      : buildProjectPromptV2(data);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-05-20",
      contents: prompt,
    });
    return response.text || "Failed to generate README.";
  } catch (error) {
    console.error("Error generating README:", error);
    throw new Error("Failed to connect to AI service.");
  }
}

export async function auditReadme(
  readme: string,
  mode: "profile" | "project" = "project"
): Promise<string> {
  const prompt = buildAuditPromptV2(readme, mode);
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-05-20",
      contents: prompt,
    });
    return response.text || "Failed to audit README.";
  } catch (error) {
    console.error("Error auditing README:", error);
    throw new Error("Failed to connect to AI service.");
  }
}
