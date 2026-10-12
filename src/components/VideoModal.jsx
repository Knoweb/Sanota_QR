import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, CheckCircle, ExternalLink, Share2, Sliders } from 'lucide-react';

export function VideoModal({ product, onClose }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [customVideoUrl, setCustomVideoUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const canvasRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isPlaying) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let step = 0;

    const render = () => {
      step += 0.04;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(212, 175, 55, 0.12)';
      ctx.lineWidth = 1;
      const gridSize = 30;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      ctx.strokeStyle = '#D4AF37';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 4) {
        const y = canvas.height / 2 + Math.sin(x * 0.02 + step) * 35 + Math.cos(x * 0.05 + step * 1.5) * 15;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.strokeStyle = 'rgba(74, 144, 226, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 4) {
        const y = canvas.height / 2 + Math.cos(x * 0.03 - step * 1.2) * 25;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `SANOTA - ${product.title}`,
        text: product.description,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Product link copied to clipboard!");
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

  const embedUrl = getEmbedUrl(customVideoUrl);

  return (
    <div className="video-modal-backdrop" onClick={onClose}>
      <div className="video-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-top-bar">
          <div className="modal-badge-group">
            <span className="modal-category-chip">{product.badge}</span>
            <span className="modal-status-chip">
              <span className="chip-dot"></span>
              Video Demonstration Coming Soon
            </span>
          </div>

          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="video-player-container">
          {embedUrl ? (
            <iframe
              src={embedUrl}
              title={product.title}
              className="custom-video-iframe"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="teaser-player-canvas-wrap">
              <img
                src={product.image}
                alt={product.title}
                className="teaser-bg-img"
              />
              <div className="teaser-dark-scrim"></div>

              <canvas
                ref={canvasRef}
                width={800}
                height={400}
                className="teaser-canvas-overlay"
              />

              <div className="teaser-hud-top">
                <div className="hud-metric">
                  <span className="hud-label">TELEMETRY</span>
                  <span className="hud-val text-green">ONLINE</span>
                </div>
                <div className="hud-metric">
                  <span className="hud-label">EFFICIENCY</span>
                  <span className="hud-val">98.4% OEE</span>
                </div>
                <div className="hud-metric">
                  <span className="hud-label">PLC CYCLE</span>
                  <span className="hud-val">1.28 ms</span>
                </div>
              </div>

              <div className="teaser-center-content">
                <div className="teaser-icon-ring">
                  <Play size={28} fill="#D4AF37" color="#D4AF37" />
                </div>
                <h3>Product Demonstration Video</h3>
                <p>The demonstration video for this solution is currently being finalized.</p>
                <div className="teaser-timer-badge">
                  <span>Duration: {product.duration}</span>
                </div>
              </div>

              <div className="teaser-controls-bar">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="ctrl-btn"
                  title={isPlaying ? "Pause Visualizer" : "Play Visualizer"}
                >
                  {isPlaying ? <Pause size={17} /> : <Play size={17} />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="ctrl-btn"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                </button>
                <div className="ctrl-timeline">
                  <div className="ctrl-progress-bar"></div>
                </div>
                <button
                  onClick={() => setShowUrlInput(!showUrlInput)}
                  className="ctrl-btn-custom-url"
                  title="Paste ready YouTube / MP4 video link"
                >
                  <Sliders size={14} />
                  <span>Insert Video URL</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {showUrlInput && (
          <div className="custom-url-drawer">
            <label>Paste Ready Video URL (YouTube or Direct MP4):</label>
            <div className="url-input-row">
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                value={customVideoUrl}
                onChange={(e) => setCustomVideoUrl(e.target.value)}
                className="url-input"
              />
              <button
                onClick={() => setCustomVideoUrl('')}
                className="btn-clear-url"
              >
                Reset
              </button>
            </div>
            <span className="url-hint">
              Once your edited videos are uploaded to YouTube (Unlisted) or Vimeo, paste the link here for instant playback.
            </span>
          </div>
        )}

        <div className="modal-content-area">
          <div className="modal-tabs">
            <button
              className={`modal-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview &amp; Capabilities
            </button>
            <button
              className={`modal-tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Technical Specifications
            </button>
          </div>

          <div className="tab-pane">
            {activeTab === 'overview' ? (
              <div className="tab-overview">
                <h2 className="modal-product-title">{product.title}</h2>
                <p className="modal-product-description">{product.description}</p>

                <h4 className="section-mini-heading">Engineering Highlights</h4>
                <div className="modal-highlights-grid">
                  {product.highlights.map((h, i) => (
                    <div key={i} className="highlight-row">
                      <CheckCircle size={15} className="highlight-icon" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>

                <div className="applications-box">
                  <strong>Industrial Applications:</strong> {product.applications}
                </div>
              </div>
            ) : (
              <div className="tab-specs">
                <h2 className="modal-product-title">{product.title} — System Specs</h2>
                <div className="specs-table">
                  {product.specs.map((s, i) => (
                    <div key={i} className="spec-row">
                      <div className="spec-col-label">{s.label}</div>
                      <div className="spec-col-value">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

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
