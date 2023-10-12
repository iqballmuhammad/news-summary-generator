import * as React from 'react';

import { ArrowLeftCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CopyButton from '@/components/CopyButton';
import { Label } from '@radix-ui/react-label';
import { Message } from 'ai';
import { Textarea } from '@/components/ui/textarea';
import { getAIMessage } from '@/lib/utils';

export default function ResultTextArea({
  content
}: {
  content: Message[] | string;
}) {
  const isUploadMessage = typeof content === 'string';
  const [textAreaValue, SetTextAreaValue] = React.useState('');
  return (
    <div className='grid w-full gap-3'>
      <Label htmlFor='summary'>Article(s) summary</Label>
      <Textarea
        className='h-52 p-2'
        value={
          isUploadMessage
            ? (content as string)
            : getAIMessage(content as Message[])
        }
        placeholder='Type your message here.'
        onChange={(e) => !isUploadMessage && SetTextAreaValue(e.target.value)}
        id='summary'
      />
      <div className='flex justify-center space-x-2'>
        <Button
          variant='outline'
          className='p-2 flex-1'
          onClick={() => window.location.reload()}
        >
          <ArrowLeftCircle className='mr-2 h-4 w-4' />
          Back
        </Button>
        <CopyButton
          text={isUploadMessage ? (content as string) : textAreaValue}
        />
      </div>
    </div>
  );
}
