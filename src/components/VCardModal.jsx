import React, { useEffect, useState } from 'react';
import { X, Download, UserCheck, Phone, Mail, Globe, MapPin, Building, QrCode as QrIcon, Check, Sparkles, Smartphone, ArrowRight } from 'lucide-react';
import QRCode from 'qrcode';
import { DIRECTOR_VCARD, generateVCardString, downloadVCard } from '../data/vcard';

export function VCardModal({ onClose }) {
  const [qrDataUrl, setQrDataUrl] = useState('');
  const [downloaded, setDownloaded] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const vcardString = generateVCardString(DIRECTOR_VCARD);
    QRCode.toDataURL(vcardString, {
      width: 480,
      margin: 1.5,
      color: {
        dark: '#17135B',
        light: '#FFFFFF'
      },
      errorCorrectionLevel: 'L'
    }, (err, uri) => {
      if (!err && uri) {
        setQrDataUrl(uri);
      }
    });
  }, []);

  const handleDownload = () => {
    downloadVCard(DIRECTOR_VCARD);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card vcard-modal-card" onClick={(e) => e.stopPropagation()}>
        {/* Top Header */}
        <div className="modal-top-bar vcard-header-bar">
          <div className="modal-heading-title">
            <div className="modal-icon-badge vcard-header-badge">
              <UserCheck size={20} className="modal-icon-gold" />
            </div>
            <div>
              <div className="vcard-header-tag">
                <Sparkles size={11} className="text-gold" />
                <span>OFFICIAL EXECUTIVE PROFILE</span>
              </div>
              <h3 className="vcard-main-title">Executive Contact Card</h3>
              <p className="modal-subheading">Digital Business Card &amp; Instant Smartphone Address Book Import</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        <div className="vcard-header-gold-line"></div>

        {/* Modal Body */}
        <div className="vcard-modal-body">
          {/* Left: Luxury Business Card Preview */}
          <div className="vcard-card-side">
            <div className="executive-business-card">
              {/* Metallic Ambient Sheen & Circuit Accents */}
              <div className="card-gold-glow"></div>
              <div className="card-circuit-overlay"></div>
              
              {/* Card Header: Brand Logo & Executive Badge */}
              <div className="card-header-row">
                <div className="card-brand-badge">
                  <img src="/sanota_clean.png" alt="SANOTA Global" className="card-brand-logo" />
                </div>
                <div className="card-vip-badge">
                  <span className="vip-gem">✦</span>
                  <span>MANAGING DIRECTOR</span>
                </div>
              </div>

              {/* Identity & Smart Chip Section */}
              <div className="card-identity-section">
                <div className="card-chip-container">
                  <div className="card-emv-chip" title="Smart Card Security Standard">
                    <div className="chip-inner-grid"></div>
                  </div>
                  <div className="card-nfc-indicator">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 8a8 8 0 0 1 12 0" />
                      <path d="M8.5 11.5a4.5 4.5 0 0 1 7 0" />
                      <circle cx="12" cy="15" r="1" fill="currentColor" />
                    </svg>
                  </div>
                </div>

                <h2 className="card-person-name">{DIRECTOR_VCARD.fullName}</h2>
                <div className="card-title-row">
                  <span className="card-person-title">{DIRECTOR_VCARD.title}</span>
                  <span className="card-bullet-sep">•</span>
                  <span className="card-company-name">{DIRECTOR_VCARD.company}</span>
                </div>
              </div>

              {/* Gold Hairline Divider */}
              <div className="card-divider-line"></div>

              {/* Direct Contact Rows with Gold Circular Badges */}
              <div className="card-contact-entries">
                <a href={`tel:${DIRECTOR_VCARD.phone}`} className="card-entry-row" title="Tap to call">
                  <div className="entry-icon-disc">
                    <Phone size={13} />
                  </div>
                  <span className="entry-text-strong">{DIRECTOR_VCARD.displayPhone}</span>
                </a>

                <a href={`mailto:${DIRECTOR_VCARD.email}`} className="card-entry-row" title="Send email">
                  <div className="entry-icon-disc">
                    <Mail size={13} />
                  </div>
                  <span>{DIRECTOR_VCARD.email}</span>
                </a>

                <a href={DIRECTOR_VCARD.website} target="_blank" rel="noopener noreferrer" className="card-entry-row" title="Visit website">
                  <div className="entry-icon-disc">
                    <Globe size={13} />
                  </div>
                  <span>{DIRECTOR_VCARD.displayWebsite}</span>
                </a>

                {DIRECTOR_VCARD.linkedin && (
                  <a href={DIRECTOR_VCARD.linkedin} target="_blank" rel="noopener noreferrer" className="card-entry-row" title="LinkedIn Profile">
                    <div className="entry-icon-disc">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                      </svg>
                    </div>
                    <span>linkedin.com/company/sanotalk</span>
                  </a>
                )}

                <div className="card-entry-row address-entry" title="Company address">
                  <div className="entry-icon-disc">
                    <MapPin size={13} />
                  </div>
                  <span className="entry-address-text">{DIRECTOR_VCARD.fullAddress}</span>
                </div>
              </div>

              {/* Card Footer Brand Line */}
              <div className="card-footer-strap">
                <span>Integrated Engineering Solutions · Sri Lanka</span>
                <span className="card-edition-tag">vCard 3.0</span>
              </div>
            </div>

            {/* Quick Action Button for Mobile & Desktop */}
            <button
              onClick={handleDownload}
              className={`btn-download-vcard ${downloaded ? 'btn-download-success' : ''}`}
              type="button"
            >
              {downloaded ? (
                <>
                  <Check size={18} className="btn-icon-check" />
                  <span>Contact Saved to Contacts!</span>
                </>
              ) : (
                <>
                  <Download size={18} className="btn-icon-dl" />
                  <span>Save Contact to Phone (.vcf)</span>
                </>
              )}
            </button>
            <p className="vcard-instant-hint">
              Tap above to instantly import phone, email, and address directly into Apple Contacts, Android, Google or Outlook.
            </p>
          </div>

          {/* Right: Instant Scan to Contacts QR */}
          <div className="vcard-qr-side">
            <div className="vcard-qr-badge-pill">
              <Smartphone size={12} className="text-gold" />
              <span>INSTANT CAMERA SCAN</span>
            </div>

            <div className="vcard-qr-viewfinder">
              <div className="viewfinder-corner top-left"></div>
              <div className="viewfinder-corner top-right"></div>
              <div className="viewfinder-corner bottom-left"></div>
              <div className="viewfinder-corner bottom-right"></div>

              <div className="vcard-qr-box">
                {qrDataUrl ? (
                  <img src={qrDataUrl} alt="Scan to Save Contact" className="vcard-qr-image" />
                ) : (
                  <div className="vcard-qr-skeleton" />
                )}
              </div>
            </div>

            <div className="vcard-qr-caption">
              <QrIcon size={15} className="text-gold" />
              <strong>Point Phone Camera</strong>
            </div>

            <div className="vcard-scan-steps">
              <div className="scan-step-item">
                <span className="step-num">1</span>
                <span>Open Camera</span>
              </div>
              <ArrowRight size={11} className="step-arrow" />
              <div className="scan-step-item">
                <span className="step-num">2</span>
                <span>Scan QR</span>
              </div>
              <ArrowRight size={11} className="step-arrow" />
              <div className="scan-step-item">
                <span className="step-num">3</span>
                <span>Save Contact</span>
              </div>
            </div>

            <p className="vcard-qr-subtext">
              Directly opens your smartphone's native Contacts app with Mr. Sahan C. Ranasinghe's verified details.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
