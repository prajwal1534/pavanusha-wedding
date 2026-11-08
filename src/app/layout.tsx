import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'A Wedding Invitation',
  description: 'A celebration of love. You are invited.',
  themeColor: '#f5f1e9',
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
