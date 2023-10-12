'use client';

import ErrorUI from '@/components/ErrorUI';
import FormUpload from '@/components/FormUpload';
import FormUrl from '@/components/FormUrl';
import Loading from '@/components/Loading';
import { PageStatus } from '@/lib/types';
import ResultTextArea from '@/components/ResultTextArea';
import { useChat } from 'ai/react';
import { useState } from 'react';

export default function Summarize() {
  const [status, setStatus] = useState<PageStatus>('input');
  const [file, setFile] = useState<File>();
  const [uploadMessages, setUploadMessages] = useState<string>('');
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/summary-stream'
  });

  async function handleUpload(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!file) return;
    try {
      setStatus('loading');
      const data = new FormData();
      data.set('csv', file);
      const res = await fetch('/api/summary-upload', {
        method: 'POST',
        body: data
      });
      setStatus('completed-upload');

      // Read the response as a stream of data
      const reader = res.body?.getReader();
      const decoder = new TextDecoder('utf-8');
      let text = '';
      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            break;
          }
          // Massage and parse the chunk of data
          const chunk = decoder.decode(value);
          const lines = chunk.split('\\n');
          text = text + lines;
          setUploadMessages(text);
        }
      }
      // handle the error
      if (!res.ok) throw new Error(await res.text());
    } catch (e: any) {
      // Handle errors here
      console.error(e);
      setStatus('completed-upload');
    }
  }
  if (messages && status === 'completed-url') {
    return <ResultTextArea content={messages} />;
  }
  if (uploadMessages && status === 'completed-upload') {
    return <ResultTextArea content={uploadMessages} />;
  }
  if (status === 'loading') {
    return <Loading />;
  }
  if (status === 'input') {
    return (
      <div>
        <div className='text-5xl text-center mb-20'>News Summary Generator</div>
        <FormUrl
          setStatus={setStatus}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          input={input}
        />
        <div className='mt-10 mb-10 text-center'>OR</div>
        <FormUpload setFile={setFile} handleUpload={handleUpload} />
      </div>
    );
  }
  if (status === 'error') {
    return <ErrorUI />;
  }
}
