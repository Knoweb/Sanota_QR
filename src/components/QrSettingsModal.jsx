import React, { useState } from 'react';
import { X, Download, Copy, Check, ExternalLink, RefreshCw, QrCode as QrIcon } from 'lucide-react';
import QRCode from 'qrcode';
import { QrCodeRenderer } from './QrCodeRenderer';

export function QrSettingsModal({ qrUrl, setQrUrl, defaultUrl, onClose }) {
  const [copied, setCopied] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Download high-resolution PNG (2048x2048) for print banners
  const handleDownloadPng = async () => {
    setIsExporting(true);
    try {
      const dataUrl = await QRCode.toDataURL(qrUrl, {
        width: 2048,
        margin: 3,
        color: {
          dark: '#17135B',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      });

      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `SANOTA_Showcase_QR_2048px.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExporting(false);
    }
  };

  // Download clean vector SVG for graphic designers
  const handleDownloadSvg = async () => {
    try {
      const svgString = await QRCode.toString(qrUrl, {
        type: 'svg',
        margin: 3,
        color: {
          dark: '#17135B',
          light: '#FFFFFF'
        },
        errorCorrectionLevel: 'H'
      });

      const blob = new Blob([svgString], { type: 'image/svg+xml' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `SANOTA_Showcase_QR_Vector.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card qr-settings-card" onClick={(e) => e.stopPropagation()}>
        {/* Header Bar */}
        <div className="modal-top-bar">
          <div className="modal-heading-title">
            <div className="modal-icon-badge">
              <QrIcon size={22} className="modal-icon-gold" />
            </div>
            <div>
              <h3>QR Code Generator &amp; Exporter</h3>
              <p className="modal-subheading">High-Resolution Vector &amp; Print Assets for Exhibition</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="qr-settings-body">
          {/* Left Preview Column */}
          <div className="qr-preview-side">
            <div className="qr-print-box">
              <QrCodeRenderer url={qrUrl} size={190} showCenterLogo={true} />
            </div>
            <div className="qr-badge-status">
              <span className="dot-pulse"></span>
              <span>Level H Error Correction (30%)</span>
            </div>
            <span className="qr-print-caption">
              Optimized for mobile cameras &amp; wide-angle scans up to 5 meters.
            </span>
          </div>

          {/* Right Controls Column */}
          <div className="qr-controls-side">
            <div className="field-group">
              <label className="input-field-label">
                Destination Link <span>(Target URL opened when visitors scan)</span>
              </label>
              <input
                type="text"
                value={qrUrl}
                onChange={(e) => setQrUrl(e.target.value)}
                className="text-input-field"
                placeholder="https://..."
              />
            </div>

            <div className="url-quick-buttons">
              <button
                onClick={() => setQrUrl(defaultUrl)}
                className="btn-quick-url"
                type="button"
              >
                <RefreshCw size={13} />
                <span>Reset to Default</span>
              </button>
              <button
                onClick={handleCopy}
                className="btn-quick-url"
                type="button"
              >
                {copied ? <Check size={14} color="#16A34A" /> : <Copy size={13} />}
                <span style={{ color: copied ? '#16A34A' : 'inherit', fontWeight: copied ? 700 : 600 }}>
                  {copied ? "Copied to Clipboard!" : "Copy URL"}
                </span>
              </button>
            </div>

            <div className="print-export-section">
              <div className="export-header-row">
                <h4 className="export-heading">Print &amp; Exhibition Assets</h4>
                <span className="badge-hq">300+ DPI Vector Ready</span>
              </div>
              <p className="export-text">
                Export publication-grade QR graphics ready for your booth standee, rollups, acrylic table displays, or brochures.
              </p>

              <div className="export-buttons-row">
                <button
                  onClick={handleDownloadPng}
                  disabled={isExporting}
                  className="btn-export-asset primary"
                  type="button"
                >
                  <Download size={18} />
                  <div className="btn-label-group">
                    <span className="btn-main-label">
                      {isExporting ? "Generating High-Res..." : "Download Ultra HD PNG"}
                    </span>
                    <span className="btn-sub-label">2048 × 2048 px • Lossless Master</span>
                  </div>
                </button>

                <button
                  onClick={handleDownloadSvg}
                  className="btn-export-asset secondary"
                  type="button"
                >
                  <Download size={18} />
                  <div className="btn-label-group">
                    <span className="btn-main-label">Download Vector SVG</span>
                    <span className="btn-sub-label">Infinite Scale • Adobe Illustrator</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
