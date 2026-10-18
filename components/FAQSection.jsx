'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export default function FAQSection({ faqs = [] }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="nf-faq-section" id="faq" style={{ width: '100%' }}>
      <h2 className="nf-faq-title">Frequently Asked Questions</h2>

      <div className="nf-faq-list" style={{ width: '100%' }}>
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div key={idx} className="nf-faq-item" style={{ width: '100%' }}>
              <button
                type="button"
                className="nf-faq-header"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <Plus
                  className={`nf-faq-icon ${isOpen ? 'open' : ''}`}
                />
              </button>

              {isOpen && (
                <div className="nf-faq-body">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
