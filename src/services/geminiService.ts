import { GoogleGenAI } from "@google/genai";
import { buildReadmePromptV1, buildAuditPromptV1 } from "../prompts/readmePrompts";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface ReadmeData {
  projectName: string;
  description: string;
  projectType: string;
  features: string;
  technologies: string;
  technicalDecisions: string;
  installation: string;
  usage: string;
  license: string;
}

export async function generateReadme(data: ReadmeData): Promise<string> {
  const prompt = buildReadmePromptV1(data);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "Failed to generate README.";
  } catch (error) {
    console.error("Error generating README:", error);
    throw new Error("Failed to connect to AI service.");
  }
}

export async function auditReadme(readme: string): Promise<string> {
  const prompt = buildAuditPromptV1(readme);

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
    });

    return response.text || "Failed to audit README.";
  } catch (error) {
    console.error("Error auditing README:", error);
    throw new Error("Failed to connect to AI service.");
  }
}
