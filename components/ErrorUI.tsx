'use client';

import { Button } from '@/components/ui/button';

export default function ErrorUI() {
  return (
    <div className='flex flex-col justify-center items-center space-y-5'>
      <h2>Something went wrong!</h2>
      <Button onClick={() => window.location.reload()}>Try again</Button>
    </div>
  );
}
