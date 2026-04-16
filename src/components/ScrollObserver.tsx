'use client';

import { useEffect } from 'react';

export default function ScrollObserver() {
  useEffect(() => {
    const SELECTORS = [
      '.section-title',
      '.section-line',
      '.invitation-heading',
      '.invitation-paragraph',
      '.invitation-parents',
      '.countdown-info',
      '.gallery-grid',
      '.gallery-more-btn',
      '.accordion-wrapper',
      '.map-buttons',
      '.shuttle-info',
      '.kakao-share-button',
      '.footer-text',
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06, rootMargin: '0px 0px -30px 0px' }
    );

    document.querySelectorAll(SELECTORS.join(',')).forEach((el, i) => {
      (el as HTMLElement).style.transitionDelay = `${Math.min(i % 4, 3) * 80}ms`;
      el.classList.add('reveal-hidden');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
