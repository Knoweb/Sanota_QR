import React from 'react';
import { Globe, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';

export function ContactFooter({ variant = 'display' }) {
  return (
    <footer className={`site-contact-footer ${variant === 'showcase' ? 'showcase-mode' : 'display-mode'}`}>
      <div className="contact-footer-container">
        
        {/* Left: Contact Info */}
        <div className="footer-contact-block">
          <div className="footer-block-heading">
            <span className="heading-accent-dot"></span>
            <h4>Contact</h4>
          </div>
          
          <div className="contact-meta-list">
            <a 
              href="https://www.sanotaglobal.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="contact-meta-item link-item"
              title="Visit SANOTA Global website"
            >
              <Globe size={14} className="contact-icon" />
              <span>www.sanotaglobal.com</span>
            </a>

            <a 
              href="mailto:info@sanotaglobal.com" 
              className="contact-meta-item link-item"
              title="Send email to info@sanotaglobal.com"
            >
              <Mail size={14} className="contact-icon" />
              <span>info@sanotaglobal.com</span>
            </a>

            <a 
              href="tel:+94740709989" 
              className="contact-meta-item link-item"
              title="Call SANOTA Global"
            >
              <Phone size={14} className="contact-icon" />
              <span>+94 740 70 99 89</span>
            </a>

            <div className="contact-meta-item location-item">
              <MapPin size={14} className="contact-icon" />
              <span>Sri Lanka</span>
            </div>
          </div>
        </div>

        {/* Center: Engineering Challenge Callout Card */}
        <div className="footer-challenge-card">
          <div className="challenge-text-content">
            <h4 className="challenge-title">Have an engineering challenge?</h4>
            <p className="challenge-subtitle">Tell us what you need to achieve.</p>
          </div>
          <a
            href="https://www.sanotaglobal.com/tell-us-your-challenge"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-start-enquiry"
          >
            <span>Start Your Enquiry</span>
            <ArrowUpRight size={14} className="enquiry-arrow" />
          </a>
        </div>

        {/* Right: Social Links & Brand Statement */}
        <div className="footer-social-block">
          <div className="footer-block-heading">
            <h4>Social Links</h4>
          </div>

          <div className="social-links-row">
            <a
              href="https://www.linkedin.com/company/sanota-global/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn linkedin"
              title="SANOTA Global on LinkedIn"
              aria-label="LinkedIn"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </a>

            <a
              href="https://www.instagram.com/sanota_global/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn instagram"
              title="SANOTA Global on Instagram"
              aria-label="Instagram"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
              </svg>
            </a>

            <a
              href="https://www.facebook.com/sanotaglobal/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn facebook"
              title="SANOTA Global on Facebook"
              aria-label="Facebook"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
              </svg>
            </a>
          </div>

          <div className="footer-bottom-brand-tag">
            <span>SANOTA · Integrated Engineering Solutions</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
