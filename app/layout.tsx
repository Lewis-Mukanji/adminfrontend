import type { Metadata } from 'next';
// import { Inter } from 'next/font/google';
import { Poppins } from 'next/font/google';
import './globals.css';

// const inter = Inter({ subsets: ['latin'] });
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '700'], // choose weights you want
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: 'The Fearless Movement Admin System',
  description: 'Manage The Fearless Movement members',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
    <body>{children}</body>
  </html>
  );
}