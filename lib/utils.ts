import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { BULK_PROMPT, DEFAULT_PROMPT } from './constant';
import { Message } from 'ai';
import { SummaryMessageRequest } from '@/lib/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateStreamPrompt(input: Message[]): ChatCompletionMessageParam[] {
  const content = DEFAULT_PROMPT.replace('{{url}}', input[0]?.content);
  return [
    {
      content,
      role: 'user'
    }
  ];
}

export function generateBulkPrompt(messages: SummaryMessageRequest[]): ChatCompletionMessageParam[] {
  const content = BULK_PROMPT.replace('{{data}}', JSON.stringify(messages));
  return [
    {
      content,
      role: 'user'
    }
  ];
}

export function getAIMessage(messages: Message[]): string {
  const message = messages.filter((message) => message.role === 'assistant');
  return message[0]?.content;
}


export function transformCsv(csv: string[][]) {
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

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}