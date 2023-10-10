import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { DEFAULT_PROMPT } from './constant';
import { Message } from 'ai';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePrompt(input: Message[]): ChatCompletionMessageParam[] {
  const content = DEFAULT_PROMPT.replace('{{url}}', input[0]?.content);
  return [
    {
      content,
      role: 'user'
    }
  ];
}
