'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ContentRow({ title, items = [], sectionId }) {
  const railRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!railRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = railRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = railRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        el.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [items]);

  const scroll = (direction) => {
    if (!railRef.current) return;
    const offset = railRef.current.clientWidth * 0.75;
    railRef.current.scrollBy({
      left: direction === 'left' ? -offset : offset,
      behavior: 'smooth',
    });
    setTimeout(checkScroll, 350);
  };

  if (!items || items.length === 0) return null;

  return (
    <section className="nf-row" id={sectionId}>
      <div className="nf-row-header">
        <h2 className="nf-row-title">{title}</h2>
        <span className="nf-see-all">Explore All &gt;</span>
      </div>

      <div className="nf-rail-wrapper">
        {canScrollLeft && (
          <button
            className="nf-rail-arrow left"
            onClick={() => scroll('left')}
            aria-label={`Scroll ${title} left`}
          >
            <ChevronLeft size={36} />
          </button>
        )}

        <div className="nf-rail" ref={railRef}>
          {items.map((item) => (
            <div
              key={item.id}
              className="nf-tile"
              tabIndex={0}
              role="button"
              aria-label={`Watch ${item.title}`}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="nf-tile-img"
                loading="lazy"
              />

              <div className="nf-tile-overlay">
                <div className="nf-tile-top">
                  <span className="nf-tile-badge">
                    <span className="nf-pulse-dot" style={{ width: 6, height: 6 }} />
                    <span>Live</span>
                  </span>
                  {item.viewers && (
                    <span className="nf-tile-badge" style={{ background: 'rgba(0,0,0,0.5)' }}>
                      {item.viewers}
                    </span>
                  )}
                </div>

                <div className="nf-tile-bottom">
                  {item.avatar && (
                    <img
                      src={item.avatar}
                      alt={item.creator || 'Streamer'}
                      className="nf-tile-avatar"
                    />
                  )}
                  <div className="nf-tile-info">
                    <div className="nf-tile-title">{item.title}</div>
                    {item.creator && <div className="nf-tile-sub">{item.creator}</div>}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {canScrollRight && (
          <button
            className="nf-rail-arrow right"
            onClick={() => scroll('right')}
            aria-label={`Scroll ${title} right`}
          >
            <ChevronRight size={36} />
          </button>
        )}
      </div>
    </section>
  );
}
