import type { Metadata } from 'next';
import './globals.css';
import '@/styles/wedding.css';

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
      <body>{children}</body>
    </html>
  );
}
