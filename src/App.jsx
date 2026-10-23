import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ConferenceDisplay } from './components/ConferenceDisplay';
import { ShowcaseGallery } from './components/ShowcaseGallery';
import { VideoModal } from './components/VideoModal';
import './App.css';

export default function App() {
  const checkIsMobile = () => {
    return window.innerWidth <= 768 || /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
  };

  const [isMobile, setIsMobile] = useState(checkIsMobile);

  const getInitialView = () => {
    // If opened on phone/tablet, directly open the Showcase page!
    if (checkIsMobile()) {
      return 'showcase';
    }
    if (window.location.hash === '#showcase' || window.location.search.includes('view=showcase')) {
      return 'showcase';
    }
    return 'display';
  };

  const [currentView, setView] = useState(getInitialView);
  const [activeVideoProduct, setActiveVideoProduct] = useState(null);

  const getDefaultQrUrl = () => {
    let origin = window.location.origin;
    // If viewing via localhost, automatically use your machine's Wi-Fi network IP
    // so any phone/tablet on the same Wi-Fi can scan and open it immediately!
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      origin = `http://192.168.8.132:${window.location.port || '5173'}`;
    }
    const pathname = window.location.pathname;
    return `${origin}${pathname}#showcase`;
  };

  const [qrUrl] = useState(getDefaultQrUrl);

  useEffect(() => {
    const handleResize = () => {
      const mobile = checkIsMobile();
      setIsMobile(mobile);
      // If user resized or opened on mobile, enforce showcase view
      if (mobile && currentView !== 'showcase') {
        setView('showcase');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentView]);

  useEffect(() => {
    const handleHashChange = () => {
      if (isMobile) {
        setView('showcase');
        return;
      }
      if (window.location.hash === '#showcase') {
        setView('showcase');
      } else if (window.location.hash === '#display' || window.location.hash === '') {
        setView('display');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [isMobile]);

  const handleSetView = (newView) => {
    if (isMobile) {
      setView('showcase');
      return;
    }
    setView(newView);
    if (newView === 'showcase') {
      window.location.hash = '#showcase';
    } else {
      window.location.hash = '#display';
    }
  };

  // On mobile, always render showcase flow
  const effectiveView = isMobile ? 'showcase' : currentView;

  return (
    <div className={`app-root ${effectiveView === 'display' ? 'view-display-lock' : 'view-showcase-flow'} ${isMobile ? 'is-mobile-device' : ''}`}>
      {/* Navbar: Full on Desktop / Clean on Mobile */}
      <Header
        isMobile={isMobile}
        currentView={effectiveView}
        setView={handleSetView}
      />

      {/* Main Screen Content */}
      <main className="main-viewport">
        {effectiveView === 'display' ? (
          <ConferenceDisplay
            qrUrl={qrUrl}
            onExploreClick={() => handleSetView('showcase')}
          />
        ) : (
          <ShowcaseGallery
            isMobile={isMobile}
            onBackToDisplay={() => handleSetView('display')}
            onSelectProduct={(product) => setActiveVideoProduct(product)}
          />
        )}
      </main>

      {/* Product Video Details / Demo Modal */}
      {activeVideoProduct && (
        <VideoModal
          product={activeVideoProduct}
          onClose={() => setActiveVideoProduct(null)}
        />
      )}
    </div>
  );
}
