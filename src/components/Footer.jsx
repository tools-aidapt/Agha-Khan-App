import React from 'react';
import logoUrl from '../assets/aidapt-logo.svg';

export function Footer() {
  return (
    <footer className="sessions-footer">
      <div className="made">
        Made with <span className="heart">❤</span> by
        <a
          className="aidapt-logo-link"
          href="https://www.aidapt.co"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Aidapt — opens in a new tab"
        >
          <img src={logoUrl} alt="Aidapt" />
        </a>
      </div>
    </footer>
  );
}
