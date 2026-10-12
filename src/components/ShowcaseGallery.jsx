import React, { useState } from 'react';
import { ArrowLeft, Play, ArrowUpRight } from 'lucide-react';
import { PRODUCTS_DATA, CATEGORIES } from '../data/products';
import { ContactFooter } from './ContactFooter';

export function ShowcaseGallery({ onBackToDisplay, onSelectProduct }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.category === activeCategory);

  return (
    <div className="showcase-view-wrapper">
      <div className="showcase-inner-container">
        {/* Header section matching reference screenshot 2 */}
        <div className="showcase-top-section">
          <div className="showcase-title-group">
            <div className="showcase-kicker">
              <span className="kicker-bullet"></span>
              <span className="kicker-text">EXPLORE SANOTA</span>
            </div>
            <h1 className="showcase-main-heading">Ideas at work.</h1>
            <p className="showcase-subheading">
              Explore our solution areas. Product demonstration videos are coming soon.
            </p>
          </div>

          <div className="showcase-back-action">
            <button
              onClick={onBackToDisplay}
              className="btn-back-to-showcase"
            >
              <ArrowLeft size={16} />
              <span>Back to showcase</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="showcase-filter-row">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              className={`showcase-filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* 6 Cards 3x2 Grid */}
        <div className="showcase-cards-grid">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="solution-showcase-card"
              onClick={() => onSelectProduct(product)}
            >
              <div className="card-video-canvas">
                <img
                  src={product.image}
                  alt={product.title}
                  className="card-bg-thumbnail"
                  loading="lazy"
                />
                <div className="card-soft-scrim"></div>

                <div className="card-status-label">
                  VIDEO COMING SOON
                </div>

                <div className="card-play-button">
                  <Play size={18} fill="#17135B" color="#17135B" className="play-triangle" />
                </div>
              </div>

              <div className="card-details-panel">
                <h3 className="card-item-title">{product.title}</h3>
                <p className="card-item-subtitle">{product.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="showcase-footer-notice">
          <p className="notice-lead">
            Product demonstration videos are being prepared. In the meantime, discover our full product range on the SANOTA website.
          </p>
          <div className="notice-links-row">
            <a
              href="https://www.sanotaglobal.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-visit-sanota"
            >
              <span>Visit SANOTA Global</span>
              <ArrowUpRight size={13} />
            </a>
            <span className="notice-sep">•</span>
            <a
              href="https://www.sanotaglobal.com/tell-us-your-challenge"
              target="_blank"
              rel="noopener noreferrer"
              className="link-visit-sanota"
            >
              <span>Tell Us Your Challenge</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
      </div>

      <ContactFooter variant="showcase" />
    </div>
  );
}
