import React from 'react';
import { ArrowUpRight, Video, Monitor } from 'lucide-react';

export function Header({ isMobile, currentView, setView }) {
  return (
    <header className="site-header">
      <div className={`header-inner ${isMobile ? 'header-mobile-clean' : ''}`}>
        {/* Brand Logo - Big, Prominent, Crisp */}
        <div className="header-brand">
          <a
            href="/"
            onClick={(e) => {
              if (!isMobile && setView) {
                e.preventDefault();
                setView('display');
              }
            }}
            className="logo-anchor"
            title="SANOTA Global"
          >
            <img src="/sanota_clean.png" alt="SANOTA" className="brand-logo-img" />
          </a>
        </div>

        {/* Desktop Navbar: Switcher Pills & Website Link */}
        {!isMobile && (
          <>
            {/* View Switcher Pills */}
            <div className="header-nav-pills">
              <button
                className={`nav-pill ${currentView === 'display' ? 'active' : ''}`}
                onClick={() => setView && setView('display')}
              >
                <Monitor size={14} />
                <span>Display Screen</span>
              </button>
              <button
                className={`nav-pill ${currentView === 'showcase' ? 'active' : ''}`}
                onClick={() => setView && setView('showcase')}
              >
                <Video size={14} />
                <span>Product Videos</span>
                <span className="pill-badge">3</span>
              </button>
            </div>

            {/* Right Website Link */}
            <div className="header-right-tools">
              <a
                href="https://www.sanotaglobal.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="header-website-anchor"
              >
                <span>Visit our website</span>
                <ArrowUpRight size={14} className="anchor-arrow" />
              </a>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
