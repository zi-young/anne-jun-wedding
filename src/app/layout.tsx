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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="image"
          href="/images/%EB%A9%94%EC%9D%B8%EC%82%AC%EC%A7%84/KakaoTalk_20260415_075850582_02.jpg"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
