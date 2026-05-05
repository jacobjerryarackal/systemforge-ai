import type { Metadata } from 'next';
import AntdProvider from '../components/providers/AntdProvider';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'SystemForge AI — AMD Architecture Engine',
  description:
    'Autonomous multi-agent engine that plans, validates, and self-corrects production-grade software architectures.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;600;700;900&family=JetBrains+Mono:wght@300;400;500;700&family=Rajdhani:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AntdProvider>{children}</AntdProvider>
      </body>
    </html>
  );
}
