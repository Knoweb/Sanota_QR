import React from 'react';
import { ArrowUpRight, Video, Monitor } from 'lucide-react';

export function Header({ currentView, setView }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        {/* Brand Logo - Big, Prominent, Crisp */}
        <div className="header-brand">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setView('display');
            }}
            className="logo-anchor"
            title="SANOTA Global"
          >
            <img src="/sanota_clean.png" alt="SANOTA" className="brand-logo-img" />
          </a>
        </div>

        {/* View Switcher Pills */}
        <div className="header-nav-pills">
          <button
            className={`nav-pill ${currentView === 'display' ? 'active' : ''}`}
            onClick={() => setView('display')}
          >
            <Monitor size={14} />
            <span>Display Screen</span>
          </button>
          <button
            className={`nav-pill ${currentView === 'showcase' ? 'active' : ''}`}
            onClick={() => setView('showcase')}
          >
            <Video size={14} />
            <span>Product Videos</span>
            <span className="pill-badge">6</span>
          </button>
        </div>

        {/* Right Tools */}
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
      </div>
    </header>
  );
}
