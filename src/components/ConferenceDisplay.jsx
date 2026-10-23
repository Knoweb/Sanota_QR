import React, { useState } from 'react';
import { ArrowUpRight, Download, Check, Sparkles } from 'lucide-react';
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
              Right Column: Organized Luxury Cards (Official Categories)
             ========================================= */}
          <div className="screen-col-right">
            <div className="section-label">
              <span>CORE ENGINEERING DOMAINS</span>
            </div>

            {/* Organized Cards Stack */}
            <div className="expertise-cards-stack">
              <div className="expertise-luxury-card" onClick={onExploreClick}>
                <div className="card-index-row">
                  <span className="index-gold">01</span>
                  <span className="expertise-pill">Smart Agri</span>
                </div>
                <h3 className="card-item-heading">Smart greenhouse</h3>
                <p className="card-item-desc">
                  Climate regulation, automated fertigation &amp; cultivation loops.
                </p>
              </div>

              <div className="expertise-luxury-card" onClick={onExploreClick}>
                <div className="card-index-row">
                  <span className="index-gold">02</span>
                  <span className="expertise-pill">Automation</span>
                </div>
                <h3 className="card-item-heading">Industrial automation solutions</h3>
                <p className="card-item-desc">
                  Turnkey conveyor systems, PLC architectures &amp; motion control.
                </p>
              </div>

              <div className="expertise-luxury-card" onClick={onExploreClick}>
                <div className="card-index-row">
                  <span className="index-gold">03</span>
                  <span className="expertise-pill">AI Vision &amp; IoT</span>
                </div>
                <h3 className="card-item-heading">Vision based systems &amp; IoT</h3>
                <p className="card-item-desc">
                  High-speed optical inspection, defect detection &amp; live telemetry.
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
