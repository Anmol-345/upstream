'use client';

import React from 'react';

export default function Toast({ message, isVisible }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`nf-toast ${isVisible ? 'visible' : ''}`}
    >
      {message}
    </div>
  );
}
