import React, { useState } from 'react';
import { ArrowLeft, Play, ArrowUpRight, Sprout, Cpu, FlaskConical, Wifi, Eye, Layers, CheckCircle2 } from 'lucide-react';
import { MAIN_CATEGORIES, PRODUCTS_DATA } from '../data/products';
import { ContactFooter } from './ContactFooter';

export function ShowcaseGallery({ isMobile, onBackToDisplay, onSelectProduct }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS_DATA
    : PRODUCTS_DATA.filter(p => p.categoryId === activeCategory);

  const currentCategoryObj = MAIN_CATEGORIES.find(c => c.id === activeCategory);

  const getCategoryIcon = (id, size = 18) => {
    switch (id) {
      case 'smart-greenhouse':
        return <Sprout size={size} />;
      case 'industrial-automation':
        return <Cpu size={size} />;
      case 'product-rd':
        return <FlaskConical size={size} />;
      case 'iot':
        return <Wifi size={size} />;
      case 'vision-systems':
        return <Eye size={size} />;
      default:
        return <Layers size={size} />;
    }
  };

  return (
    <div className={`showcase-view-wrapper ${isMobile ? 'mobile-mode' : ''}`}>
      <div className="showcase-inner-container">
        
        {/* Top Header Section */}
        <div className="showcase-top-section">
          <div className="showcase-title-group">
            <div className="showcase-kicker">
              <span className="kicker-bullet"></span>
              <span className="kicker-text">SANOTA CORE CAPABILITIES</span>
            </div>
            <h1 className="showcase-main-heading">Solutions &amp; Video Demonstrations</h1>
            <p className="showcase-subheading">
              Select any category below to explore our engineering systems and watch operational videos.
            </p>
          </div>

          {!isMobile && (
            <div className="showcase-back-action">
              <button
                onClick={onBackToDisplay}
                className="btn-back-to-showcase"
                title="Return to Main Exhibition Display"
              >
                <ArrowLeft size={16} />
                <span>Back to QR Screen</span>
              </button>
            </div>
          )}
        </div>

        {/* 5 Main Product Categories Showcase Navigation Cards */}
        <div className="main-categories-overview-grid">
          {/* "All" category button */}
          <button
            className={`category-feature-card ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            <div className="cat-card-icon-wrap">
              <Layers size={20} />
            </div>
            <div className="cat-card-info">
              <span className="cat-card-kicker">PORTFOLIO</span>
              <h4 className="cat-card-title">All Solutions</h4>
              <span className="cat-card-count">{PRODUCTS_DATA.length} Systems</span>
            </div>
          </button>

          {/* 5 Official Categories */}
          {MAIN_CATEGORIES.map((cat) => {
            const itemCount = PRODUCTS_DATA.filter(p => p.categoryId === cat.id).length;
            return (
              <button
                key={cat.id}
                className={`category-feature-card ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <div className="cat-card-icon-wrap">
                  {getCategoryIcon(cat.id, 20)}
                </div>
                <div className="cat-card-info">
                  <span className="cat-card-kicker">{cat.kicker}</span>
                  <h4 className="cat-card-title">{cat.name}</h4>
                  <span className="cat-card-count">{itemCount} Video Demonstrations</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Category Highlights Banner */}
        {currentCategoryObj && (
          <div className="active-category-banner">
            <div className="banner-icon-side">
              {getCategoryIcon(currentCategoryObj.id, 24)}
            </div>
            <div className="banner-text-side">
              <span className="banner-kicker">SELECTED CATEGORY</span>
              <h3>{currentCategoryObj.name}</h3>
              <p>{currentCategoryObj.tagline}</p>
            </div>
          </div>
        )}

        {/* Section Heading for Videos Grid */}
        <div className="showcase-grid-header">
          <div className="grid-header-title">
            <h3>
              {activeCategory === 'all' 
                ? 'All Engineering Systems' 
                : `${currentCategoryObj?.name} Videos`}
            </h3>
            <span className="badge-video-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'Solution' : 'Solutions'} Available
            </span>
          </div>
        </div>

        {/* Solution & Video Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="empty-category-notice">
            <div className="empty-icon-ring">
              {getCategoryIcon(activeCategory, 26)}
            </div>
            <h4>Demonstration Videos Coming Soon</h4>
            <p>
              Videos for <strong>{currentCategoryObj?.name}</strong> are currently being prepared. In the meantime, you can explore the available industrial automation videos below.
            </p>
            <button
              onClick={() => setActiveCategory('industrial-automation')}
              className="btn-browse-available"
            >
              <span>View Industrial Automation Videos</span>
              <ArrowUpRight size={14} />
            </button>
          </div>
        ) : (
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

                  <div className="card-duration-badge">
                    <span>{product.duration}</span>
                  </div>

                  <div className="card-status-label">
                    {product.videoFile ? "PLAY VIDEO DEMO" : "WATCH PREVIEW"}
                  </div>

                  <div className="card-play-button">
                    <Play size={18} fill="#17135B" color="#17135B" className="play-triangle" />
                  </div>
                </div>

                <div className="card-details-panel">
                  <div className="card-category-tag-row">
                    <span className="card-category-tag">{product.categoryName}</span>
                  </div>
                  <h3 className="card-item-title">{product.title}</h3>
                  <p className="card-item-subtitle">{product.subtitle}</p>

                  <div className="card-watch-cta">
                    <span>Watch Video Demonstration</span>
                    <ArrowUpRight size={14} className="cta-arrow" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Section Notice */}
        <div className="showcase-footer-notice">
          <p className="notice-lead">
            Looking for a customized engineering solution? Discuss your technical requirements directly with our team.
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

      {/* Persistent Executive Contact Footer */}
      <ContactFooter variant="showcase" />
    </div>
  );
}
