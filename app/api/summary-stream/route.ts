import OpenAI from 'openai';
import { generateStreamPrompt } from '@/lib/utils';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { messages } = await req.json();
  const passedMessages = generateStreamPrompt(messages);
  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages: passedMessages,
  });

   // Convert the response into a friendly text-stream
   const stream = OpenAIStream(response);
  
   // Respond with the stream
   return new StreamingTextResponse(stream);
}
