import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ChatCompletionMessageParam } from 'openai/resources/chat';
import { DEFAULT_PROMPT } from './constant';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePrompt(input: string): ChatCompletionMessageParam[] {
  const urls = input.split(',');
  const urlList =
    urls.length === 0
      ? ''
      : urls.map((url) => {
          return `${url.trim()}`;
        });
  const content = DEFAULT_PROMPT.replace('{{url}}', urlList[0]);
  return [
    {
      content,
      role: 'user'
    }
  ];
}
