import { NextRequest, NextResponse } from 'next/server';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { generateBulkPrompt, transformCsv } from '@/lib/utils';

import OpenAI from 'openai';
import { parse } from 'csv-parse/sync';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || ''
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const file: File | null = data.get('csv') as unknown as File;
  if (!file) {
    return NextResponse.json({ success: false });
  }
  const bytes = await file.arrayBuffer();
  
  const buffer = Buffer.from(bytes);
  const results = parse(buffer);
  const messages = transformCsv(results);
  const passedMessages = generateBulkPrompt(messages);
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages: passedMessages
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
