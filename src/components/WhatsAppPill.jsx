import React from 'react';

const WHATSAPP_URL = 'https://www.whatsapp.com/channel/0029Vb8KDbT7DAX44890YV0f';

export function WhatsAppPill() {
  return (
    <a
      className="whatsapp-pill"
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Join our AI WhatsApp community"
    >
      <svg className="wa-icon" width="14" height="14" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
        <path d="M16 0C7.16 0 0 7.16 0 16c0 2.83.74 5.49 2.04 7.8L0 32l8.41-2.21A15.9 15.9 0 0 0 16 32c8.84 0 16-7.16 16-16S24.84 0 16 0zm7.32 19.36c-.4-.2-2.38-1.17-2.75-1.31-.37-.13-.64-.2-.91.2-.27.4-1.04 1.31-1.27 1.58-.23.27-.47.3-.87.1-.4-.2-1.69-.62-3.22-1.99a12.1 12.1 0 0 1-2.24-2.79c-.23-.4 0-.61.18-.81.18-.18.4-.47.6-.7.2-.23.27-.4.4-.67.13-.27.07-.5-.03-.7-.1-.2-.91-2.18-1.24-2.98-.33-.79-.66-.68-.91-.69h-.78c-.27 0-.7.1-1.07.5-.37.4-1.4 1.37-1.4 3.34s1.44 3.88 1.64 4.15c.2.27 2.82 4.31 6.84 6.04.96.41 1.7.66 2.28.85.96.3 1.83.26 2.52.16.77-.11 2.38-.97 2.72-1.91.34-.94.34-1.74.24-1.91-.1-.17-.37-.27-.77-.47z"/>
      </svg>
      Join our AI community
    </a>
  );
}
