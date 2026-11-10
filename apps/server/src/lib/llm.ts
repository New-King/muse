type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

const baseUrl = () => process.env.OPENAI_API_BASE ?? "https://api.openai.com/v1";
const apiKey = () => process.env.OPENAI_API_KEY ?? "";
const modelName = () => process.env.OPENAI_MODEL ?? "deepseek-flash";

export class LlmError extends Error {}

export async function chat(messages: ChatMessage[]): Promise<string> {
  if (!apiKey()) throw new LlmError("缺少 OPENAI_API_KEY");

  const res = await fetch(`${baseUrl()}/chat/completions`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${apiKey()}`,
    },
    body: JSON.stringify({ model: modelName(), messages, max_tokens: 1500, temperature: 0.6 }),
  });

  if (!res.ok) {
    const text = (await res.text()).slice(0, 300);
    throw new LlmError(`模型返回 ${res.status}：${text}`);
  }

  const json = (await res.json()) as {
    choices?: { message?: { content?: string } }[];
  };
  return json.choices?.[0]?.message?.content?.trim() ?? "";
}
