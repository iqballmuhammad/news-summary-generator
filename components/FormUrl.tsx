import * as React from 'react';

import { Button } from '@/components/ui/button';
import { FormUrlProps } from '@/lib/types';
import { Textarea } from '@/components/ui/textarea';

export default function FormUrl({
  setStatus,
  handleInputChange,
  handleSubmit,
  input
}: FormUrlProps) {
  return (
    <form
      className='w-full flex flex-col justify-center space-y-3'
      onSubmit={(e) => {
        setStatus('completed-url');
        handleSubmit(e);
      }}
    >
      <Textarea
        className='w-full max-w-md p-2 rounded shadow-md flex'
        placeholder='Enter URL(s) separated by commas (e.g. http://example1.com, http://example2.com)'
        id='url'
        name='url'
        value={input}
        onChange={handleInputChange}
        required
      />

      <Button type='submit'>Generate Summary</Button>
    </form>
  );
}
