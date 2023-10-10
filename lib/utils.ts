import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { DEFAULT_PROMPT } from './constant';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePrompt(input: string): ChatCompletionMessageParam[] {
  const content = DEFAULT_PROMPT.replace('{{url}}', input);
  return [
    {
      content,
      role: 'user'
    }
  ];
}
