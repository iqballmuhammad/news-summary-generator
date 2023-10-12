import * as React from 'react';

import { Button } from '@/components/ui/button';
import { FormUploadProps } from '@/lib/types';
import { Input } from '@/components/ui/input';

export default function FormUpload({ handleUpload, setFile }: FormUploadProps) {
  return (
    <form className='flex flex-col space-y-2' onSubmit={handleUpload}>
      <Input
        className='grid w-full max-w-sm items-center gap-1.5 justify-center text-center cursor-pointer'
        id='csv'
        type='file'
        onChange={(e) => setFile(e.target.files?.[0])}
      />
      <a
        target='_blank'
        className='text-xs text-center text-sky-500 underline'
        href='https://cdnid.sp-cdn.susercontent.com/api/v4/50093511/slimud/cf0e7356c2751970e5f44b78722c7c40/example.csv'
        rel='noopener noreferrer'
      >
        CSV File Example
      </a>
      <Button className='cursor-pointer' type='submit'>
        Upload CSV
      </Button>
    </form>
  );
}
