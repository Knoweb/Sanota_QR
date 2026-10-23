import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Share2, Play } from 'lucide-react';

export function VideoModal({ product, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `SANOTA - ${product.title}`,
        text: product.description,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="video-modal-backdrop" onClick={onClose}>
      <div className="video-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Bar */}
        <div className="modal-top-bar">
          <div className="modal-badge-group">
            <span className="modal-category-chip">{product.categoryName}</span>
            <span className="modal-status-chip">
              <span className="chip-dot"></span>
              Video Demonstration
            </span>
          </div>

          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Video Player Display */}
        <div className="video-player-container">
          {product.videoFile ? (
            <div className="html5-video-player-wrap">
              <video
                ref={videoRef}
                src={encodeURI(product.videoFile)}
                controls
                autoPlay
                playsInline
                className="html5-video-element"
              />
            </div>
          ) : (
            <div className="teaser-player-canvas-wrap">
              <img
                src={product.image}
                alt={product.title}
                className="teaser-bg-img"
              />
              <div className="teaser-dark-scrim"></div>
              <div className="teaser-center-content">
                <div className="teaser-icon-ring">
                  <Play size={28} fill="#D4AF37" color="#D4AF37" />
                </div>
                <h3>{product.title}</h3>
                <p>Video demonstration will be available shortly.</p>
              </div>
            </div>
          )}
        </div>

        {/* Video Details & Actions */}
        <div className="modal-content-area">
          <h2 className="modal-product-title">{product.title}</h2>
          <p className="modal-product-description">{product.description || product.subtitle}</p>

          <div className="modal-footer-actions">
            <a
              href="https://www.sanotaglobal.com/tell-us-your-challenge"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-modal-action primary"
            >
              <span>Inquire About This Solution</span>
              <ExternalLink size={14} />
            </a>

            <button
              onClick={handleShare}
              className="btn-modal-action secondary"
            >
              <Share2 size={16} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
