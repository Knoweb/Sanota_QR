import React, { useState } from 'react';
import { ArrowUpRight, Download, Check, Sparkles, Wrench, Globe, ChevronRight } from 'lucide-react';
import QRCode from 'qrcode';
import { QrCodeRenderer } from './QrCodeRenderer';
import { ContactFooter } from './ContactFooter';

export function ConferenceDisplay({ qrUrl, onExploreClick }) {
  const [saved, setSaved] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleSaveQr = async () => {
    if (isDownloading) return;
    setIsDownloading(true);
    try {
      const size = 1200;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      // 1. Draw high-res QR code
      const qrCanvas = document.createElement('canvas');
      await QRCode.toCanvas(qrCanvas, qrUrl, {
        width: size,
        margin: 2,
        color: {
          dark: '#17135B',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      });
      ctx.drawImage(qrCanvas, 0, 0);

      // 2. Overlay center SANOTA circular emblem
      const logoImg = new Image();
      logoImg.crossOrigin = 'anonymous';
      logoImg.src = '/sanota_clean.png';

      await new Promise((resolve) => {
        logoImg.onload = resolve;
        logoImg.onerror = resolve;
      });

      if (logoImg.naturalWidth) {
        const badgeRadius = size * 0.12;
        const centerX = size / 2;
        const centerY = size / 2;

        // Circular background
        ctx.save();
        ctx.beginPath();
        ctx.arc(centerX, centerY, badgeRadius, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();

        // Gold border
        ctx.lineWidth = 7;
        ctx.strokeStyle = '#D4AF37';
        ctx.stroke();

        // Center logo
        const logoW = badgeRadius * 1.5;
        const logoH = logoW * (logoImg.naturalHeight / logoImg.naturalWidth);
        ctx.drawImage(logoImg, centerX - logoW / 2, centerY - logoH / 2, logoW, logoH);
        ctx.restore();
      }

      // 3. Trigger direct browser download
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = 'SANOTA_Showcase_QR.png';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error('Error downloading QR:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="single-screen-display-wrapper">
      <div className="screen-inner-container">
        <div className="showcase-three-column-grid">
          {/* =========================================
              Left Column: Grand Headline & Value Props
             ========================================= */}
          <div className="screen-col-left">
            <div className="kicker-tag">
              <span className="kicker-bullet"></span>
              <span className="kicker-text">INTEGRATED ENGINEERING SOLUTIONS</span>
            </div>

            <h1 className="hero-typography">
              <span className="hero-row">Engineering.</span>
              <span className="hero-row">Connected.</span>
              <span className="hero-row hero-row-gold">In motion.</span>
            </h1>

            <div className="gold-accent-line"></div>

            <p className="hero-mission-statement">
              Discover how SANOTA brings engineering, automation and digital technology together to solve real industrial challenges.
            </p>

            {/* Left Organized Info Cards */}
            <div className="left-structured-cards">
              <div className="left-info-card">
                <div className="info-card-icon-wrap">
                  <Wrench size={15} className="info-icon" />
                </div>
                <div className="info-card-text">
                  <h4>Turnkey Execution</h4>
                  <p>Machinery, PLC automation &amp; digital platforms under one coordinated team.</p>
                </div>
              </div>

              <div className="left-info-card">
                <div className="info-card-icon-wrap">
                  <Globe size={15} className="info-icon" />
                </div>
                <div className="info-card-text">
                  <h4>1,250+ Engagements</h4>
                  <p>Trusted industrial solutions developed across diverse operating environments.</p>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================
              Center Column: Bigger, Commanding Luxury QR Card
             ========================================= */}
          <div className="screen-col-center">
            <div className="qr-outer-bezel">
              <div className="qr-inner-card">
                <div className="qr-card-kicker">
                  <Sparkles size={12} className="sparkle-gold" />
                  <span>YOUR NEXT DISCOVERY STARTS HERE</span>
                </div>

                {/* Larger QR Scanner Box with Corner Brackets & Scan Line */}
                <div className="qr-scanner-box">
                  <div className="scanner-corner corner-tl"></div>
                  <div className="scanner-corner corner-tr"></div>
                  <div className="scanner-corner corner-bl"></div>
                  <div className="scanner-corner corner-br"></div>
                  <div className="scanner-light-line"></div>
                  
                  {/* Larger 265px QR Code for High Visibility */}
                  <QrCodeRenderer url={qrUrl} size={265} showCenterLogo={true} />
                </div>

                {/* Bold, Enlarged Card Typography */}
                <h2 className="qr-card-title">Scan. Explore. Connect.</h2>
                <p className="qr-card-subtitle">
                  Point your phone camera at the QR code to explore our products and systems.
                </p>

                {/* Explore Button */}
                <button
                  className="btn-explore-products"
                  onClick={onExploreClick}
                  id="explore-products-btn"
                >
                  <span>Explore products</span>
                  <ArrowUpRight size={17} />
                </button>

                <div className="qr-phone-caption">
                  On your phone? Tap the button above.
                </div>

                {/* Utility Row */}
                <div className="qr-card-actions">
                  <button
                    onClick={handleSaveQr}
                    className="btn-util-link"
                    disabled={isDownloading}
                    title="Download high-resolution QR image with SANOTA logo"
                  >
                    {saved ? <Check size={12} color="#16A34A" /> : <Download size={12} />}
                    <span style={{ color: saved ? '#16A34A' : 'inherit', fontWeight: saved ? 700 : 'inherit' }}>
                      {saved ? "Saved!" : isDownloading ? "Saving..." : "Save QR"}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* =========================================
              Right Column: Organized Luxury Cards (01, 02, 03)
             ========================================= */}
          <div className="screen-col-right">
            <div className="section-label">
              <span>ONE TEAM. CONNECTED EXPERTISE.</span>
            </div>

            {/* Organized Cards Stack */}
            <div className="expertise-cards-stack">
              <div className="expertise-luxury-card" onClick={onExploreClick}>
                <div className="card-index-row">
                  <span className="index-gold">01</span>
                  <span className="expertise-pill">Machinery</span>
                </div>
                <h3 className="card-item-heading">Engineering &amp; machinery</h3>
                <p className="card-item-desc">
                  Practical solutions for real operational requirements.
                </p>
              </div>

              <div className="expertise-luxury-card" onClick={onExploreClick}>
                <div className="card-index-row">
                  <span className="index-gold">02</span>
                  <span className="expertise-pill">Automation</span>
                </div>
                <h3 className="card-item-heading">Automation &amp; control</h3>
                <p className="card-item-desc">
                  Connect processes, equipment and intelligent controls.
                </p>
              </div>

              <div className="expertise-luxury-card" onClick={onExploreClick}>
                <div className="card-index-row">
                  <span className="index-gold">03</span>
                  <span className="expertise-pill">IoT &amp; Cloud</span>
                </div>
                <h3 className="card-item-heading">IoT &amp; digital platforms</h3>
                <p className="card-item-desc">
                  Turn operational data into clearer visibility.
                </p>
              </div>
            </div>

            <div className="right-action-row">
              <a
                href="https://www.sanotaglobal.com/about"
                target="_blank"
                rel="noopener noreferrer"
                className="link-get-to-know"
              >
                <span>Get to know SANOTA</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Contact & Challenge Footer Panel */}
      <ContactFooter variant="display" />
    </div>
  );
}
