import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';

import { generateBulkPrompt } from '@/lib/utils';
import { OpenAIStream, StreamingTextResponse } from 'ai';

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

// async function getSummaryFromCsv(csv: string[][]) {
//   const messages = transformCsv(csv);
//   const passedMessages = generateBulkPrompt(messages);
//   // Ask OpenAI for a streaming chat completion given the prompt
//   const response = await openai.chat.completions.create({
//     model: 'gpt-4',
//     stream: true,
//     messages: passedMessages
//   });
//   // Convert the response into a friendly text-stream
//   const stream = OpenAIStream(response);
  
//   // Respond with the stream
//   return new StreamingTextResponse(stream);
// }

function transformCsv(csv: string[][]) {
  const data: SummaryMessageRequest[] = [];
  for (let i = 1; i < csv.length; i++) {
    const row = csv[i];
    const inputRow: SummaryMessageRequest = {
      category: row[0],
      sourceName: row[1],
      sourceUrl: row[2],
      content: row[3]
    };
    data.push(inputRow);
  }
  return data;
}
