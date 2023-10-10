// ./app/api/chat/route.ts
import OpenAI from 'openai';
import { generatePrompt } from '@/lib/utils';
import { NextResponse } from 'next/server';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { message } = await req.json();
  const passedMessages = generatePrompt(message);

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: false,
    messages: passedMessages,
  });

  const data = response.choices[0]?.message?.content;
  console.log(data);
  return NextResponse.json(data);
}
