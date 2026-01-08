import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// This forces the route to be dynamic and run on the server
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const apiKey = process.env.DASHSCOPE_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Server configuration error: API Key missing' }, { status: 500 });
  }

  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const openai = new OpenAI({
      apiKey: apiKey,
      baseURL: "https://dashscope.aliyuncs.com/compatible-mode/v1",
    });

    const stream = await openai.chat.completions.create({
      model: "qwen3-max",
      messages: [
        { role: "system", content: "你是一个温暖、富有同理心的心理支持助手。用户刚刚通过一种仪式感（如燃烧、揉皱）销毁了他们的负面情绪。请根据用户倾诉的内容，给出一段简短、治愈、鼓舞人心的反馈（100字以内）。语气要温柔、坚定。" },
        { role: "user", content: `我刚刚销毁了这些情绪：${message}` }
      ],
      stream: true,
    });

    // Create a TransformStream to convert OpenAI stream to web standard stream
    const encoder = new TextEncoder();
    const customStream = new ReadableStream({
      async start(controller) {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || "";
          if (content) {
            controller.enqueue(encoder.encode(content));
          }
        }
        controller.close();
      },
    });

    return new NextResponse(customStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error) {
    console.error('AI Service Error:', error);
    return NextResponse.json({ error: 'Failed to generate feedback' }, { status: 500 });
  }
}
