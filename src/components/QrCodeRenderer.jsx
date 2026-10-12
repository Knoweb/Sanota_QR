import React, { useEffect, useState } from 'react';
import QRCode from 'qrcode';

export function QrCodeRenderer({ url, size = 265, showCenterLogo = true, darkColor = '#17135B', lightColor = '#FFFFFF' }) {
  const [dataUrl, setDataUrl] = useState('');

  useEffect(() => {
    if (!url) return;

    QRCode.toDataURL(url, {
      width: 1024,
      margin: 2,
      color: {
        dark: darkColor,
        light: lightColor
      },
      errorCorrectionLevel: 'H'
    }, (err, uri) => {
      if (err) {
        console.error("QR Code Error:", err);
      } else {
        setDataUrl(uri);
      }
    });
  }, [url, darkColor, lightColor]);

  return (
    <div
      className="qr-code-container"
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: `${size}px`,
        aspectRatio: '1 / 1',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {dataUrl ? (
        <img
          src={dataUrl}
          alt="SANOTA QR Code"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            borderRadius: '12px'
          }}
        />
      ) : (
        <div style={{ width: size, height: size, background: '#F3F4F6', borderRadius: '12px' }} />
      )}

      {/* Decorative Brand Logo in center of QR code */}
      {showCenterLogo && dataUrl && (
        <div
          className="qr-center-badge"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: `${Math.round(size * 0.24)}px`,
            height: `${Math.round(size * 0.24)}px`,
            backgroundColor: '#FFFFFF',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(23, 19, 91, 0.2), 0 0 0 2px #D4AF37',
            padding: '3px',
            pointerEvents: 'none'
          }}
        >
          <img
            src="/sanota_clean.png"
            alt="Sanota Logo"
            style={{
              width: '88%',
              height: '88%',
              objectFit: 'contain'
            }}
          />
        </div>
      )}
    </div>
  );
}
