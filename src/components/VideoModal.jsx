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
    const shareUrl = product.youtubeUrl || window.location.href;
    if (navigator.share) {
      navigator.share({
        title: `SANOTA - ${product.title}`,
        text: product.description,
        url: shareUrl
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert("Video link copied to clipboard!");
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
              {product.youtubeId ? "YouTube HD Demonstration" : "Video Demonstration"}
            </span>
          </div>

          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Video Player Display */}
        <div className="video-player-container">
          {product.youtubeId ? (
            <div className="youtube-player-responsive-wrap">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${product.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={product.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="youtube-iframe-element"
              />
            </div>
          ) : product.videoFile ? (
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

            {product.youtubeUrl && (
              <a
                href={product.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-modal-action youtube-btn"
                title="Watch directly on YouTube"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
                <span>YouTube</span>
              </a>
            )}

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
