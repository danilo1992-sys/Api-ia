import { GoogleGenAI } from "@google/genai";
import type { AIService, ChatMessage } from "../types";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "your-api-key-here",
});

export const geminiService: AIService = {
  name: "Gemini",
  async chat(messages: ChatMessage[]) {
    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash",
      contents: messages.map((msg) => msg.content).join("\n"),
    });

    return (async function* () {
      for await (const chunk of response) {
        if (chunk.text) {
          yield chunk.text;
        }
      }
    })();
  },
};
