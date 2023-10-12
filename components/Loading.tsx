import * as React from "react"

import { Skeleton } from '@/components/ui/skeleton';

export default function SkeletonDemo() {
    return (
      <div className='flex flex-col items-center space-y-2'>
        <Skeleton className='h-4 w-[275px]' />
        <Skeleton className='h-4 w-[275px]' />
        <Skeleton className='h-4 w-[275px]' />
        <Skeleton className='h-4 w-[275px]' />
        Processing...
      </div>
    );
  }