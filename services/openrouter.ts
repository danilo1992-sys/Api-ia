import { OpenRouter } from "@openrouter/sdk";
import type { AIService, ChatMessage } from "../types";

const openRouter = new OpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const openrouterService: AIService = {
  name: "OpenRouter",
  async chat(messages: ChatMessage[]) {
    const chatCompletion = await openRouter.chat.send({
      model: "openai/gpt-4o",
      messages,
      stream: true,
    });

    return (async function* () {
      for await (const chunk of chatCompletion) {
        yield chunk.choices[0]?.delta?.content || "";
      }
    })();
  },
};
