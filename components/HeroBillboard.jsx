'use client';

import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';

export default function HeroBillboard({ slides = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides]);

  if (!slides || slides.length === 0) return null;

  const slide = slides[currentSlide];

  const handlePlay = () => {
    const el = document.getElementById('watch');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInfo = () => {
    const el = document.getElementById('faq');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="nf-billboard">
      {slides.map((s, idx) => (
        <div
          key={s.id}
          className={`nf-billboard-slide ${idx === currentSlide ? 'active' : ''}`}
        >
          <img
            src={s.image}
            alt={s.title}
            className="nf-billboard-img"
          />
        </div>
      ))}

      {/* Scrim Overlays */}
      <div className="nf-scrim-left" aria-hidden="true" />
      <div className="nf-scrim-bottom" aria-hidden="true" />

      {/* Billboard Foreground Details */}
      <div className="nf-billboard-content">
        <div className="nf-live-badge">
          <span className="nf-pulse-dot" />
          <span>{slide.tagline || 'Live now'}</span>
        </div>

        <h1 className="nf-billboard-title">{slide.title}</h1>
        <p className="nf-billboard-desc">{slide.subtitle}</p>

        <div className="nf-billboard-actions">
          <button onClick={handlePlay} className="nf-btn-play">
            <Play size={20} fill="#000" />
            <span>Play</span>
          </button>

          <button onClick={handleInfo} className="nf-btn-info">
            <Info size={20} />
            <span>More Info</span>
          </button>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="nf-billboard-dots">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`nf-dot ${idx === currentSlide ? 'active' : ''}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
