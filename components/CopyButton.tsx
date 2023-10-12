import * as React from "react"

import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

export default function CopyButton(props: { text: string }) {
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