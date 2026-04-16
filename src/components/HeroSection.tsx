'use client';

import { weddingData } from '@/data/wedding';

export default function HeroSection() {
  const { groom, bride, date } = weddingData;

  return (
    <section className="hero-section">
      {/* 메인 사진 */}
      <div className="hero-top">
        <div className="hero-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/메인사진/KakaoTalk_20260415_075850582_02.jpg"
            alt="Anne & Jun"
            className="hero-photo-img"
            fetchPriority="high"
          />
        </div>
      </div>

      {/* 이름 & 날짜 — 두 번째 사진이 배경 */}
      <div className="hero-info">
        {/* 배경 사진 */}
        <div className="hero-second-photo">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/메인사진/KakaoTalk_20260415_075850582_07.jpg"
            alt=""
            className="hero-second-photo-img"
          />
          <div className="hero-second-photo-dim" />
        </div>
        {/* 텍스트 — 사진 위에 올라옴 */}
        <div className="hero-text-content">
          <div className="hero-en-names">
            {bride.enName.toUpperCase()} &amp; {groom.enName.toUpperCase()}
          </div>
          <div className="hero-date-text">
            {date.day} {['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.month]} {date.year}
          </div>
        </div>
      </div>
    </section>
  );
}
