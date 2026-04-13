'use client';

import { useEffect, useCallback, useState, useRef } from 'react';

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const placeholders = Array.from({ length: 6 }, (_, i) => i + 1);

  // 이미지 보호: 우클릭 방지
  const handleContextMenu = useCallback((e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.gallery-section') || target.closest('.lightbox')) {
      e.preventDefault();
    }
  }, []);

  // 드래그 방지
  const handleDragStart = useCallback((e: DragEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('.gallery-section') || target.closest('.lightbox')) {
      e.preventDefault();
    }
  }, []);

  // 키보드 네비게이션
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (lightboxIndex === null) return;
    if (e.key === 'Escape') setLightboxIndex(null);
    if (e.key === 'ArrowRight') setLightboxIndex((prev) => prev !== null ? Math.min(prev + 1, placeholders.length - 1) : null);
    if (e.key === 'ArrowLeft') setLightboxIndex((prev) => prev !== null ? Math.max(prev - 1, 0) : null);
  }, [lightboxIndex, placeholders.length]);

  useEffect(() => {
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleContextMenu, handleDragStart, handleKeyDown]);

  // 라이트박스 열릴 때 스크롤 잠금
  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  const handlePrev = () => {
    setLightboxIndex((prev) => prev !== null && prev > 0 ? prev - 1 : prev);
  };

  const handleNext = () => {
    setLightboxIndex((prev) => prev !== null && prev < placeholders.length - 1 ? prev + 1 : prev);
  };

  // 모바일 스와이프
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handleNext();
      else handlePrev();
    }
  };

  return (
    <>
      <section className="gallery-section section">
        <p className="section-title">GALLERY</p>
        <div className="section-line" />
        <div className="gallery-grid">
          {placeholders.map((n, idx) => (
            <div
              key={n}
              className="gallery-item"
              onClick={() => setLightboxIndex(idx)}
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            >
              <span className="gallery-placeholder-text">+</span>
            </div>
          ))}
        </div>
      </section>

      {/* 라이트박스 */}
      {lightboxIndex !== null && (
        <div
          className="lightbox"
          onClick={(e) => {
            if ((e.target as HTMLElement).classList.contains('lightbox')) {
              setLightboxIndex(null);
            }
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button className="lightbox-close" onClick={() => setLightboxIndex(null)}>
            ✕
          </button>

          <button
            className="lightbox-arrow lightbox-arrow-left"
            onClick={handlePrev}
            disabled={lightboxIndex === 0}
          >
            ‹
          </button>

          <div
            className="lightbox-content"
            onContextMenu={(e) => e.preventDefault()}
          >
            {/* TODO: 실제 이미지로 교체 */}
            <div className="lightbox-placeholder">
              <span className="lightbox-placeholder-text">Photo {lightboxIndex + 1}</span>
            </div>
            <div className="lightbox-counter">
              {lightboxIndex + 1} / {placeholders.length}
            </div>
          </div>

          <button
            className="lightbox-arrow lightbox-arrow-right"
            onClick={handleNext}
            disabled={lightboxIndex === placeholders.length - 1}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
