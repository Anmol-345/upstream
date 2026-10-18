'use client';

import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';

export default function Footer({ onShowToast }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="nf-footer">
      <div className="nf-footer-inner">
        {/* Top bar with brand & phone prompt */}
        <div className="nf-footer-top">
          <div className="nf-footer-top-left">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="nf-footer-brand"
              aria-label="LIVE Home"
            >
              <img src="/live-wordmark.png" alt="LIVE" height={22} width={48} />
            </button>
            <p className="nf-footer-contact">
              Questions? Call <a href="tel:1-800-873-2646">1-800-USE-LIVE</a> or{' '}
              <button onClick={() => scrollTo('faq')}>
                Contact Us
              </button>
            </p>
          </div>

          <div className="nf-footer-socials">
            <a
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LIVE on X"
              className="nf-social-icon"
            >
              <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* 4-Column Netflix Links Grid */}
        <ul className="nf-footer-grid">
          <li>
            <button onClick={() => scrollTo('faq')}>FAQ</button>
          </li>
          <li>
            <button onClick={() => scrollTo('faq')}>Help Centre</button>
          </li>
          <li>
            <button onClick={() => scrollTo('watch')}>Account</button>
          </li>
          <li>
            <button onClick={() => scrollTo('faq')}>Media Centre</button>
          </li>
          <li>
            <button onClick={() => scrollTo('wishlist')}>Investor Relations</button>
          </li>
          <li>
            <button onClick={() => scrollTo('creators')}>Jobs</button>
          </li>
          <li>
            <button onClick={() => scrollTo('watch')}>Ways to Watch</button>
          </li>
          <li>
            <button onClick={() => scrollTo('faq')}>Terms of Use</button>
          </li>
          <li>
            <button onClick={() => scrollTo('faq')}>Privacy</button>
          </li>
          <li>
            <button onClick={() => scrollTo('faq')}>Cookie Preferences</button>
          </li>
          <li>
            <button onClick={() => scrollTo('faq')}>Corporate Information</button>
          </li>
          <li>
            <button onClick={() => scrollTo('faq')}>Contact Us</button>
          </li>
          <li>
            <a href="https://fast.com" target="_blank" rel="noreferrer">
              Speed Test
            </a>
          </li>
          <li>
            <button onClick={() => scrollTo('faq')}>Legal Notices</button>
          </li>
          <li>
            <button onClick={() => scrollTo('watch')}>Only on $LIVE</button>
          </li>
          <li>
            <button onClick={() => scrollTo('faq')}>Docs</button>
          </li>
        </ul>

        {/* App Store & Google Play Badges */}
        <div className="nf-footer-apps">
          <button
            type="button"
            className="nf-app-btn"
            onClick={onShowToast}
            aria-label="Download on the App Store"
          >
            <svg width={20} height={24} viewBox="0 0 170 210" fill="currentColor">
              <path d="M141.7 111.6c-.2-22 18-32.6 18.8-33.1-10.3-15-26.2-17.1-31.8-17.3-13.5-1.4-26.4 8-33.3 8-6.9 0-17.5-7.8-28.7-7.6-14.8.2-28.4 8.6-36 21.8-15.4 26.7-3.9 66.2 11.1 87.9 7.3 10.6 16 22.5 27.4 22.1 11-.4 15.2-7.1 28.5-7.1 13.3 0 17 7.1 28.7 6.9 11.9-.2 19.4-10.8 26.6-21.5 8.4-12.3 11.9-24.2 12.1-24.8-.3-.1-23.2-8.9-23.4-35.3zM119.9 47c6.1-7.4 10.2-17.6 9.1-27.8-8.8.4-19.4 5.8-25.7 13.2-5.6 6.5-10.6 17-9.3 27 9.8.8 19.8-5 25.9-12.4z" />
            </svg>
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
              <span style={{ fontSize: 9, textTransform: 'uppercase', opacity: 0.8 }}>Download on the</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>App Store</span>
            </span>
          </button>

          <button
            type="button"
            className="nf-app-btn"
            onClick={onShowToast}
            aria-label="Get it on Google Play"
          >
            <svg width={20} height={22} viewBox="0 0 24 26">
              <path d="M1.5 1.2 13.9 13 1.5 24.8c-.3-.3-.5-.8-.5-1.4V2.6c0-.6.2-1.1.5-1.4Z" fill="#00D7FE" />
              <path d="M13.9 13 17.7 9.3l4.6 2.6c1.3.7 1.3 1.9 0 2.6l-4.6 2.6L13.9 13Z" fill="#FFCE00" />
              <path d="M1.5 24.8 13.9 13l3.8 3.7L3.6 25.2c-.8.4-1.6.3-2.1-.4Z" fill="#F63448" />
              <path d="M1.5 1.2c.5-.7 1.3-.8 2.1-.4l14.1 8.5L13.9 13 1.5 1.2Z" fill="#00F076" />
            </svg>
            <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', lineHeight: 1.1 }}>
              <span style={{ fontSize: 9, textTransform: 'uppercase', opacity: 0.8 }}>Get it on</span>
              <span style={{ fontSize: 14, fontWeight: 600 }}>Google Play</span>
            </span>
          </button>
        </div>

        {/* Language Picker */}
        <div className="nf-footer-lang">
          <button type="button" className="nf-lang-btn" aria-label="Select Language">
            <Globe size={15} />
            <span>English</span>
            <ChevronDown size={14} style={{ marginLeft: 2 }} />
          </button>
        </div>

        {/* Region */}
        <div className="nf-footer-country">$LIVE Global</div>

        {/* Legal Disclaimer */}
        <div className="nf-footer-disclaimer">
          Media for the people, by the people: streams are made for the $LIVE community. Not available to U.S. persons. $LIVE is a utility token: it unlocks the player and nothing else. Read the{' '}
          <button onClick={() => scrollTo('faq')}>
            docs
          </button>{' '}
          for the full risk disclosure.
        </div>
      </div>
    </footer>
  );
}
