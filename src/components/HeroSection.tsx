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
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
          />
          {/* 이니셜 오버레이 */}
          <div className="hero-initials-overlay">
            <div className="hero-initials">
              {bride.enName[0]}
              <span className="hero-initials-ampersand">&amp;</span>
              {groom.enName[0]}
            </div>
          </div>
        </div>
      </div>

      {/* 이름 & 날짜 */}
      <div className="hero-info">
        <div className="hero-en-names">
          {bride.enName.toUpperCase()} &amp; {groom.enName.toUpperCase()}
        </div>
        <div className="hero-date-text">
          {date.day} {['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][date.month]} {date.year}
        </div>
      </div>

      {/* 두 번째 사진 */}
      <div className="hero-second-photo">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/메인사진/KakaoTalk_20260415_075850582_07.jpg"
          alt="Anne & Jun"
          className="hero-second-photo-img"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>
    </section>
  );
}
