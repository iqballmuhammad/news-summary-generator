import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { BULK_PROMPT, DEFAULT_PROMPT } from './constant';
import { Message } from 'ai';

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