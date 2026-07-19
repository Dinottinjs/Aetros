import type { Metadata } from "next";
import './globals.css';
import { Inter } from 'next/font/google';
import { LanguageProvider } from '@/components/LanguageProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Aetros | Zero-Error SaaS',
  description: 'The ultimate zero-error boilerplate for Next.js, Supabase, and Stripe.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-50 antialiased`}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
