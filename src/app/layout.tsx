import type { Metadata, Viewport } from 'next';
import './globals.css';
import '@/styles/wedding.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: '예인 & 준희의 결혼식에 초대합니다',
  description: '2026년 5월 9일 토요일 낮 12시 제이니힐',
  openGraph: {
    title: '예인 & 준희의 결혼식에 초대합니다',
    description: '2026년 5월 9일 토요일 낮 12시 제이니힐',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
