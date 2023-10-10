'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Skeleton } from '@/components/ui/skeleton';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeftCircle, Copy } from 'lucide-react';
import { useState } from 'react';

function SkeletonDemo() {
  return (
    <div className='flex flex-col items-center space-y-2'>
      <Skeleton className='h-4 w-[275px]' />
      <Skeleton className='h-4 w-[275px]' />
      <Skeleton className='h-4 w-[275px]' />
      <Skeleton className='h-4 w-[275px]' />
    </div>
  );
}

function TextAreaDemo(props: { content: string; handleBack: Function }) {
  const [textAreaValue, SetTextAreaValue] = useState(props.content);
  return (
    <div className='grid w-full gap-3'>
      <Label htmlFor='summary'>Article(s) summary</Label>
      <Textarea
        className='h-52 p-2'
        value={textAreaValue}
        placeholder='Type your message here.'
        onChange={(e) => SetTextAreaValue(e.target.value)}
        id='summary'
      />
      <div className='flex justify-center space-x-2'>
        <Button variant='outline' className='p-2 flex-1' onClick={() => props.handleBack()}>
        <ArrowLeftCircle className='mr-2 h-4 w-4' />Back
        </Button>
        <CopyButton text={textAreaValue} />
      </div>
    </div>
  );
}

function CopyButton(props: { text: string }) {
  const { toast } = useToast();
  return (
    <Button
      className='p-2 flex-1'
      onClick={() => {
        navigator.clipboard.writeText(props.text);
        toast({
          title: 'Article summary successfully copied to your clipboard!'
        });
      }}
    >
      <Copy className='mr-2 h-4 w-4' /> Copy
    </Button>
  );
}

export default function Chat() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [status, setStatus] = useState('typing');

  async function handleSubmit(e: any) {
    e.preventDefault();
    setStatus('loading');
    try {
      const result = await submitForm(input);
      setResult(result);
      setStatus('finished');
    } catch (err) {
      console.log(err);
    }
  }

  async function submitForm(input: string) {
    const options = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: input })
    };
    const result = await fetch('/api/summary', options);
    return result.json();
  }

  return (
    <div className='flex justify-center flex-col w-full h-screen max-w-md py-24 mx-auto stretch p-10'>
      {result && status === 'finished' && (
        <TextAreaDemo content={result} handleBack={() => setStatus('typing')} />
      )}
      {status === 'loading' && <SkeletonDemo />}
      {status === 'typing' && (
        <div>
          <div className='text-5xl text-center mb-20'>
            News Summary Generator
          </div>
          <form
            className='w-full flex flex-col justify-center space-y-3'
            onSubmit={handleSubmit}
          >
            <Textarea
              className='w-full max-w-md p-2 rounded shadow-md flex'
              placeholder='Enter URL(s) separated by commas (e.g. http://example1.com, http://example2.com)'
              id='url'
              name='url'
              onChange={(e) => setInput(e.target.value)}
              required
            />

            <Button>Generate Summary</Button>
          </form>
        </div>
      )}
    </div>
  );
}
