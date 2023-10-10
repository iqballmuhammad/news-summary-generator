'use client';
import { Input } from '@/components/ui/input';
import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, data } = useChat({
    api: 'api/summary'
  });
  return (
    <div className='flex flex-col w-full max-w-md py-24 mx-auto stretch'>
      {messages.length > 0
        ? messages.map((m) => (
            <div key={m.id} className='whitespace-pre-wrap'>
              {m.role === 'user' ? 'User: ' : 'AI: '}
              {m.content}
            </div>
          ))
        : null}
      <form onSubmit={handleSubmit}>
        <Input
          className='fixed bottom-0 w-full max-w-md p-2 mb-8  rounded shadow-md'
          value={input}
          placeholder='Input news artile URL. Multiple URLs are supported, separate by comma'
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
