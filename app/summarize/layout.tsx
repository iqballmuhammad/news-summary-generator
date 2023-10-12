import '../globals.css';

import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'News Summary Generator',
  description: 'Tools to generate summary from given article(s)'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <div className='flex justify-center flex-col w-full h-screen max-w-md py-24 mx-auto stretch p-10'>
          {children}
        </div>
      </body>
      <Toaster />
    </html>
  );
}
