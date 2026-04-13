import { weddingData } from '@/data/wedding';

export default function HeroSection() {
  const { groom, bride, date } = weddingData;

  return (
    <section className="hero-section">
      {/* 사진 + 이니셜 오버레이 */}
      <div className="hero-top">
        <div className="hero-photo">
          <span className="hero-photo-placeholder">Wedding Photo</span>
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
    </section>
  );
}
