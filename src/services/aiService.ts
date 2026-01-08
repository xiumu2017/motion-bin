import OpenAI from "openai";

const API_KEY = import.meta.env.VITE_DASHSCOPE_API_KEY;

// Fallback feedback if API fails or no key
const FALLBACK_FEEDBACKS = [
  "释放了这些情绪，你会感觉轻松很多。",
  "每一个结束都是新的开始。",
  "深呼吸，感受当下的平静。",
  "你做得很好，允许自己休息一下。",
  "这些烦恼已经随风而去，明天会更好。"
];

export const generateFeedback = async (
  emotion: string, 
  onChunk: (chunk: string) => void
): Promise<void> => {
  if (!API_KEY) {
    console.warn("No API Key found. Using fallback feedback.");
    const randomFeedback = FALLBACK_FEEDBACKS[Math.floor(Math.random() * FALLBACK_FEEDBACKS.length)];
    // Simulate streaming
    const words = randomFeedback.split("");
    for (const word of words) {
      await new Promise(resolve => setTimeout(resolve, 50));
      onChunk(word);
    }
    return;
  }

  try {
    const openai = new OpenAI({
      apiKey: API_KEY,
      baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
      dangerouslyAllowBrowser: true 
    });

    const completion = await openai.chat.completions.create({
      model: "qwen3-max",
      messages: [
        { role: "system", content: "你是一个温暖、富有同理心的心理支持助手。用户刚刚通过一种仪式感（如燃烧、揉皱）销毁了他们的负面情绪。请根据用户倾诉的内容，给出一段简短、治愈、鼓舞人心的反馈（100字以内）。语气要温柔、坚定。" },
        { role: "user", content: `我刚刚销毁了这些情绪：${emotion}` }
      ],
      stream: true
    });

    for await (const chunk of completion) {
      const content = chunk.choices[0]?.delta?.content || "";
      if (content) {
        onChunk(content);
      }
    }
  } catch (error) {
    console.error("AI Generation Error:", error);
    // On error, send a fallback message
    const errorFeedback = "虽然连接有点小问题，但你的情绪已经安全释放。愿你此刻内心平静。";
    onChunk(errorFeedback);
  }
};
