'use client';

import React from 'react';

export default function CreatorsSection({ creators = [] }) {
  if (!creators || creators.length === 0) return null;

  return (
    <section className="nf-creators-section" id="creators">
      <div className="nf-creators-inner">
        <div className="nf-creators-text">
          <span className="nf-creators-badge">Stream Partners</span>
          <h2 className="nf-creators-title">Go live. Get paid.</h2>
          <p className="nf-creators-desc">
            Broadcast sports, gaming, and culture directly to global audiences with decentralized streaming infrastructure and zero middleman fees.
          </p>
          <button
            onClick={() => {
              const el = document.getElementById('faq');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="nf-signin-btn"
            style={{ fontSize: 15, padding: '10px 24px' }}
          >
            Become a Partner
          </button>
        </div>

        <div className="nf-creators-grid" id="wishlist">
          {creators.map((c) => (
            <div key={c.id} className="nf-creator-card">
              <img
                src={c.image}
                alt={c.name}
                className="nf-creator-img"
              />
              <div className="nf-creator-name">{c.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
