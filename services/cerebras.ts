import Cerebras from "@cerebras/cerebras_cloud_sdk";
import type { AIService, ChatMessage } from "../types";

const cerebras = new Cerebras({
  apiKey: process.env.CEREBRAS_API_KEY,
});

export const cerebrasService: AIService = {
  name: "Cerebras",
  async chat(messages: ChatMessage[]) {
    const chatCompletion = await cerebras.chat.completions.create({
      messages: messages as any,
      model: "gpt-oss-120b",
      temperature: 0.6,
      max_completion_tokens: 4096,
      top_p: 1,
      stream: true,
      stop: null,
    });

    return (async function* () {
      for await (const chunk of chatCompletion) {
        const content = (chunk as any).choices?.[0]?.delta?.content || "";
        yield content;
      }
    })();
  },
};
