
// Fallback feedback if API fails
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
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: emotion }),
    });

    if (!response.ok) {
      throw new Error(`Proxy error: ${response.statusText}`);
    }

    if (!response.body) {
        throw new Error("No response body");
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      onChunk(chunk);
    }
    return;

  } catch (error) {
    console.warn("Backend API failed, using fallback:", error);
    
    // Local Fallback
    const randomFeedback = FALLBACK_FEEDBACKS[Math.floor(Math.random() * FALLBACK_FEEDBACKS.length)];
    const words = randomFeedback.split("");
    for (const word of words) {
      await new Promise(resolve => setTimeout(resolve, 50));
      onChunk(word);
    }
  }
};
