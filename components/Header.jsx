'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, X, Menu } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className={`nf-header ${isScrolled ? 'solid' : ''}`}>
      <div className="nf-header-left">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="nf-logo"
          aria-label="LIVE Home"
        >
          <img src="/live-wordmark.png" alt="LIVE" height={28} width={62} />
        </button>

        <nav className="nf-nav" aria-label="Main Navigation">
          <li>
            <button onClick={() => scrollTo('watch')} className="nf-nav-link">
              Watch
            </button>
          </li>
          <li>
            <button onClick={() => scrollTo('creators')} className="nf-nav-link">
              Stream to Earn
            </button>
          </li>
          <li>
            <button onClick={() => scrollTo('events')} className="nf-nav-link">
              Events
            </button>
          </li>
          <li>
            <button onClick={() => scrollTo('wishlist')} className="nf-nav-link">
              Wishlist
            </button>
          </li>
          <li>
            <button onClick={() => scrollTo('faq')} className="nf-nav-link">
              Docs
            </button>
          </li>
        </nav>
      </div>

      <div className="nf-header-right">
        {searchOpen ? (
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 4, padding: '4px 8px' }}>
            <Search size={16} color="#aaa" />
            <input
              type="text"
              placeholder="Titles, people, sports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', marginLeft: 8, fontSize: 13, width: 160 }}
              autoFocus
            />
            <button onClick={() => setSearchOpen(false)} style={{ color: '#aaa' }}>
              <X size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setSearchOpen(true)}
            className="nf-header-btn"
            aria-label="Search"
          >
            <Search size={19} />
          </button>
        )}

        <button
          onClick={() => scrollTo('watch')}
          className="nf-signin-btn"
        >
          Sign In
        </button>
      </div>
    </header>
  );
}
