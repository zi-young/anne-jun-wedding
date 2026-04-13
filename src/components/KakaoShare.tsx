'use client';

import { useEffect } from 'react';
import { weddingData } from '@/data/wedding';

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: Record<string, unknown>) => void;
      };
    };
  }
}

export default function KakaoShare() {
  const { kakaoShare } = weddingData;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        const key = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
        if (key) window.Kakao.init(key);
      }
    };
    document.head.appendChild(script);
  }, []);

  const handleShare = () => {
    if (!window.Kakao) return;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: kakaoShare.title,
        description: kakaoShare.description,
        imageUrl: kakaoShare.imageUrl || 'https://via.placeholder.com/600x400',
        link: {
          mobileWebUrl: kakaoShare.webUrl,
          webUrl: kakaoShare.webUrl,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: kakaoShare.webUrl,
            webUrl: kakaoShare.webUrl,
          },
        },
      ],
    });
  };

  return (
    <section className="section share-section">
      <p className="section-title">SHARE</p>
      <div className="section-line" />
      <button className="kakao-share-button" onClick={handleShare}>
        <svg className="kakao-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3C6.48 3 2 6.58 2 10.94c0 2.8 1.86 5.27 4.66 6.67-.15.56-.96 3.6-.99 3.83 0 0-.02.17.09.24.11.06.24.01.24.01.32-.04 3.7-2.44 4.28-2.86.55.08 1.13.12 1.72.12 5.52 0 10-3.58 10-7.94C22 6.58 17.52 3 12 3z" />
        </svg>
        카카오톡 공유하기
      </button>
    </section>
  );
}
