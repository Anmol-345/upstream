'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import HeroBillboard from '@/components/HeroBillboard';
import ContentRow from '@/components/ContentRow';
import CreatorsSection from '@/components/CreatorsSection';
import FAQSection from '@/components/FAQSection';
import Footer from '@/components/Footer';
import Toast from '@/components/Toast';

import {
  billboardSlides,
  streamSections,
  streamCreators,
  faqItems,
} from '@/data/streamsData';

export default function HomePage() {
  const [toastMessage, setToastMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const triggerToast = (msg = 'Coming soon on the App Store and Google Play.') => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2800);
  };

  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />

      <HeroBillboard slides={billboardSlides} />

      {/* Content Rails */}
      <div className="nf-rows-container" id="watch">
        {streamSections.map((sec, index) => (
          <ContentRow
            key={sec.id}
            title={sec.title}
            items={sec.items}
            sectionId={index === 0 ? 'watch' : index === 2 ? 'events' : undefined}
          />
        ))}
      </div>

      {/* Creators & Partners Section */}
      <CreatorsSection creators={streamCreators} />

      {/* FAQ Section */}
      <FAQSection faqs={faqItems} />

      {/* Footer */}
      <Footer onShowToast={() => triggerToast()} />

      {/* Floating Status Toast */}
      <Toast message={toastMessage} isVisible={toastVisible} />
    </main>
  );
}
