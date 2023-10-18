import '../globals.css';

import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'News Summary Generator',
  description: 'Tools to generate summary from given article(s)'
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  url: 'https://dev.iqbl.me/summarize',
  logo: 'https://dev.iqbl.me/favicon.ico'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <body className={inter.className}>
        <div className='flex justify-center flex-col w-full h-screen max-w-md py-24 mx-auto stretch p-10'>
          {children}
        </div>
      </body>
      <Toaster />
    </html>
  );
}
