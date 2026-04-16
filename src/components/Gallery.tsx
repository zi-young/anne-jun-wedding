'use client';

import { useEffect, useCallback, useState, useRef, useMemo } from 'react';
import Image from 'next/image';

const GALLERY_IMAGES = [
  '/images/IMG_1072-1.jpg',
  '/images/IMG_2086.JPG',
  '/images/IMG_2087.JPG',
  '/images/IMG_2159.JPG',
  '/images/IMG_2160.JPG',
  '/images/KakaoTalk_20260414_091606067.jpg',
  '/images/KakaoTalk_20260415_075850582.jpg',
  '/images/KakaoTalk_20260415_075850582_01.jpg',
  '/images/KakaoTalk_20260415_075850582_03.jpg',
  '/images/KakaoTalk_20260415_075850582_04.jpg',
  '/images/KakaoTalk_20260415_075850582_05.jpg',
  '/images/KakaoTalk_20260415_075850582_06.jpg',
  '/images/KakaoTalk_20260415_075850582_08.jpg',
  '/images/KakaoTalk_20260415_075850582_09.jpg',
  '/images/KakaoTalk_20260415_075850582_10.jpg',
  '/images/KakaoTalk_20260415_075850582_11.jpg',
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const INITIAL_COUNT = 9;
  const visibleImages = showAll ? GALLERY_IMAGES : GALLERY_IMAGES.slice(0, INITIAL_COUNT);

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
    if (e.key === 'ArrowRight') setLightboxIndex((prev) => prev !== null ? Math.min(prev + 1, GALLERY_IMAGES.length - 1) : null);
    if (e.key === 'ArrowLeft') setLightboxIndex((prev) => prev !== null ? Math.max(prev - 1, 0) : null);
  }, [lightboxIndex]);

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
    setLightboxIndex((prev) => prev !== null && prev < GALLERY_IMAGES.length - 1 ? prev + 1 : prev);
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

  // 라이트박스 이미지 프리로드 (인접 이미지)
  const preloadedSet = useRef(new Set<string>());
  useMemo(() => {
    if (lightboxIndex === null) return;
    const toPreload = [lightboxIndex - 1, lightboxIndex, lightboxIndex + 1];
    toPreload.forEach((i) => {
      if (i >= 0 && i < GALLERY_IMAGES.length) {
        const src = GALLERY_IMAGES[i];
        if (!preloadedSet.current.has(src)) {
          preloadedSet.current.add(src);
          const img = new window.Image();
          img.src = src;
        }
      }
    });
  }, [lightboxIndex]);

  // 이미지 로드 상태로 crossfade
  const [loadedIndex, setLoadedIndex] = useState<number | null>(null);
  const prevIndexRef = useRef<number | null>(null);

  useEffect(() => {
    if (lightboxIndex === null) {
      setLoadedIndex(null);
      prevIndexRef.current = null;
      return;
    }
    // 새 이미지 프리로드 후 전환
    const img = new window.Image();
    img.src = GALLERY_IMAGES[lightboxIndex];
    if (img.complete) {
      prevIndexRef.current = lightboxIndex;
      setLoadedIndex(lightboxIndex);
    } else {
      img.onload = () => {
        prevIndexRef.current = lightboxIndex;
        setLoadedIndex(lightboxIndex);
      };
    }
  }, [lightboxIndex]);

  return (
    <>
      <section className="gallery-section section">
        <p className="section-title">GALLERY</p>
        <div className="section-line" />
        <div className="gallery-grid">
          {visibleImages.map((src, idx) => (
            <div
              key={src}
              className="gallery-item"
              onClick={() => setLightboxIndex(idx)}
              onContextMenu={(e) => e.preventDefault()}
              draggable={false}
            >
              <Image
                src={src}
                alt={`갤러리 ${idx + 1}`}
                className="gallery-img"
                fill
                sizes="(max-width: 480px) 33vw, 160px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          ))}
        </div>
        {GALLERY_IMAGES.length > INITIAL_COUNT && (
          <button
            className="gallery-more-btn"
            onClick={() => setShowAll((v) => !v)}
          >
            {showAll ? '닫기 ↑' : '더보기 ↓'}
          </button>
        )}
      </section>

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
            <div className="lightbox-img-wrapper">
              {/* 이전 이미지 (로딩 중 보여줌) */}
              {prevIndexRef.current !== null && loadedIndex !== lightboxIndex && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={GALLERY_IMAGES[prevIndexRef.current]}
                  alt=""
                  className="lightbox-img lightbox-img-prev"
                />
              )}
              {/* 현재 이미지 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={GALLERY_IMAGES[lightboxIndex]}
                alt={`갤러리 ${lightboxIndex + 1}`}
                className={`lightbox-img ${loadedIndex === lightboxIndex ? 'lightbox-img-loaded' : 'lightbox-img-loading'}`}
              />
            </div>
            <div className="lightbox-counter">
              {lightboxIndex + 1} / {GALLERY_IMAGES.length}
            </div>
          </div>

          <button
            className="lightbox-arrow lightbox-arrow-right"
            onClick={handleNext}
            disabled={lightboxIndex === GALLERY_IMAGES.length - 1}
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
