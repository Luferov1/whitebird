import type { Metadata } from 'next';
import { ReactNode } from 'react';

import './globals.css';
import Header from '../components/Header';

export const metadata: Metadata = {
  title: 'White Bird Forum',
  description: 'Test forum app built with Next.js',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-6">{children}</main>
      </body>
    </html>
  );
}
