import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ConferenceDisplay } from './components/ConferenceDisplay';
import { ShowcaseGallery } from './components/ShowcaseGallery';
import { VideoModal } from './components/VideoModal';
import { QrSettingsModal } from './components/QrSettingsModal';
import './App.css';

export default function App() {
  const getInitialView = () => {
    if (window.location.hash === '#showcase' || window.location.search.includes('view=showcase')) {
      return 'showcase';
    }
    return 'display';
  };

  const [currentView, setView] = useState(getInitialView);
  const [activeVideoProduct, setActiveVideoProduct] = useState(null);
  const [showQrModal, setShowQrModal] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const getDefaultQrUrl = () => {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    return `${origin}${pathname}#showcase`;
  };

  const [qrUrl, setQrUrl] = useState(getDefaultQrUrl);

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#showcase') {
        setView('showcase');
      } else if (window.location.hash === '#display' || window.location.hash === '') {
        setView('display');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSetView = (newView) => {
    setView(newView);
    if (newView === 'showcase') {
      window.location.hash = '#showcase';
    } else {
      window.location.hash = '#display';
    }
  };

  const handleToggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  return (
    <div className={`app-root ${currentView === 'display' ? 'view-display-lock' : 'view-showcase-flow'} ${isFullscreen ? 'is-fullscreen' : ''}`}>
      {/* Header Bar */}
      <Header
        currentView={currentView}
        setView={handleSetView}
      />

      {/* Main Screen Content */}
      <main className="main-viewport">
        {currentView === 'display' ? (
          <ConferenceDisplay
            qrUrl={qrUrl}
            onExploreClick={() => handleSetView('showcase')}
          />
        ) : (
          <ShowcaseGallery
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

      {/* QR Code Settings & Print Modal */}
      {showQrModal && (
        <QrSettingsModal
          qrUrl={qrUrl}
          setQrUrl={setQrUrl}
          defaultUrl={getDefaultQrUrl()}
          onClose={() => setShowQrModal(false)}
        />
      )}
    </div>
  );
}
