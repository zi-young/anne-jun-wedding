'use client';

import { useEffect, useRef, useState } from 'react';
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

const KAKAO_KEY = '7b40232aa8c437b0405a6ba1469c5ba4';

export default function KakaoShare() {
  const { kakaoShare } = weddingData;
  const scriptRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (scriptRef.current) return;
    scriptRef.current = true;

    const init = () => {
      try {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(KAKAO_KEY);
        }
        setReady(window.Kakao.isInitialized());
      } catch {
        setReady(false);
      }
    };

    if (window.Kakao) {
      init();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js';
    script.integrity = 'sha384-DKYJZ8NLiK8MN4/C5P2dtSmLQ4KwPaoqAfyA/DfmEc1VDxu4yyC7wy6K1Hs90nka';
    script.crossOrigin = 'anonymous';
    script.async = true;
    script.onload = init;
    script.onerror = () => setReady(false);
    document.head.appendChild(script);
  }, []);

  const handleShare = () => {
    if (!ready || !window.Kakao?.isInitialized()) {
      alert('카카오 SDK가 아직 준비되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: kakaoShare.title,
        description: kakaoShare.description,
        imageUrl: kakaoShare.imageUrl,
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
