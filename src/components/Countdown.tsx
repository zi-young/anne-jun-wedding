'use client';

import { useState, useEffect } from 'react';
import { weddingData } from '@/data/wedding';

export default function Countdown() {
  const { date } = weddingData;
  const weddingDate = new Date(date.isoDate);

  const [mounted, setMounted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  function calcTimeLeft() {
    const now = new Date();
    const diff = weddingDate.getTime() - now.getTime();

    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    setTimeLeft(calcTimeLeft());
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  // 5월 달력 생성
  const year = date.year;
  const month = date.month;
  const firstDay = new Date(year, month - 1, 1).getDay(); // 0=일
  const daysInMonth = new Date(year, month, 0).getDate();

  const calendarDays: { day: number; isEmpty: boolean }[] = [];
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push({ day: 0, isEmpty: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push({ day: d, isEmpty: false });
  }

  const dayHeaders = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  return (
    <section className="countdown-section">
      {/* 배경 사진 + 카운트다운 오버레이 */}
      <div className="countdown-bg">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/IMG_2159.JPG"
          alt=""
          className="countdown-bg-img"
          draggable={false}
          onContextMenu={(e) => e.preventDefault()}
        />
        <div className="countdown-overlay">
          <div className="countdown-numbers">
            <span className="countdown-value">{mounted ? pad(timeLeft.days) : '--'}</span>
            <span className="countdown-separator">:</span>
            <span className="countdown-value">{mounted ? pad(timeLeft.hours) : '--'}</span>
            <span className="countdown-separator">:</span>
            <span className="countdown-value">{mounted ? pad(timeLeft.minutes) : '--'}</span>
            <span className="countdown-separator">:</span>
            <span className="countdown-value">{mounted ? pad(timeLeft.seconds) : '--'}</span>
          </div>
          <div className="countdown-labels">
            <span className="countdown-label">DAYS</span>
            <span className="countdown-label">HOURS</span>
            <span className="countdown-label">MINS</span>
            <span className="countdown-label">SECS</span>
          </div>
        </div>
      </div>

      {/* D-day + 달력 */}
      <div className="countdown-info">
        <p className="countdown-dday">
          결혼식까지 {mounted ? timeLeft.days : '--'}일 남았습니다
        </p>
        <div className="countdown-calendar">
          <div className="calendar">
            <div className="calendar-month">
              {['', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month]} {year}
            </div>
            <div className="calendar-grid">
              {dayHeaders.map((dh) => (
                <div key={dh} className="calendar-day-header">{dh}</div>
              ))}
              {calendarDays.map((cd, idx) => {
                const dayOfWeek = idx % 7;
                let cls = 'calendar-day';
                if (cd.isEmpty) cls += ' empty';
                if (cd.day === date.day) cls += ' wedding-day';
                else if (dayOfWeek === 0) cls += ' sunday';
                else if (dayOfWeek === 6) cls += ' saturday';
                return (
                  <div key={idx} className={cls}>
                    {cd.isEmpty ? '' : cd.day}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
