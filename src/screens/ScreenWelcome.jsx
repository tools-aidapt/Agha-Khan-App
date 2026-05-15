import React from 'react';
import { AGENDA, EVENT_META } from '../agenda.js';
import { WhatsAppPill } from '../components/WhatsAppPill.jsx';
// Served from /public — same file is the favicon + share image
const ismailiCivicLogo = '/ismaili-civic-kenya.png';

export function BrandMark() {
  return (
    <div className="brand-mark event">
      <span className="dot" aria-hidden="true"></span>
      <span className="title">AI Unpacked</span>
      <span className="v">AKF · 2026</span>
    </div>
  );
}

export function AgendaRow({ item }) {
  return (
    <div className="ag-row" data-kind={item.kind}>
      <div className="time">
        <span>{item.time}</span>
        <span className="ampm">{item.ampm}</span>
      </div>
      <div className="body">
        <div className="title">{item.title}</div>
        {(item.speaker || item.tag) && (
          <div className="meta">
            {item.tag && <span className="tag">{item.tag}</span>}
            {item.speaker && <span className="speaker">{item.speaker}</span>}
          </div>
        )}
      </div>
    </div>
  );
}

export function WelcomeScreen({ onBegin }) {
  const meta = EVENT_META;
  return (
    <div className="screen screen-enter" style={{ paddingTop: 22 }}>
      <div className="topbar">
        <BrandMark />
        <WhatsAppPill />
      </div>

      {/* Decorative geometry */}
      <div className="welcome-art-compact" aria-hidden="true">
        <div className="ring r1"></div>
        <div className="ring r2"></div>
        <div className="ring r3"></div>
        <div className="dot"></div>
        <div className="arrow-box">
          <svg width="26" height="26" viewBox="0 0 34 34" fill="none">
            <path d="M9 25 L25 9 M11 9 L25 9 L25 23" stroke="white" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <div className="welcome-hero">
        <div className="eyebrow" style={{ marginBottom: 18 }}>{meta.subtitle}</div>
        <h1 className="display" style={{ fontSize: 'clamp(54px, 14vw, 76px)' }}>
          AI<br/>
          <em>Unpacked.</em>
        </h1>
        <p className="lede" style={{ marginTop: 18, fontSize: 16 }}>
          A one-day, invite-only premier on what AI actually means for your business — and how to bring it home tomorrow.
        </p>
        <div className="mc-line">
          <span className="label">Hosted by</span>
          <span className="name">{meta.mc}</span>
          <span style={{ color: 'var(--ink-4)' }}>·</span>
          <span>at {meta.venue}</span>
        </div>
      </div>

      <div className="event-facts">
        <div className="fact">
          <span className="k">Doors</span>
          <span className="v">{meta.doors}</span>
        </div>
        <div className="fact">
          <span className="k">Hard start</span>
          <span className="v">{meta.hardStart}</span>
        </div>
        <div className="fact span2">
          <span className="k">Venue</span>
          <span className="v">{meta.venue}</span>
        </div>
      </div>

      {ismailiCivicLogo && (
        <div className="organiser">
          <span className="organiser-eyebrow">Organised by</span>
          <span className="organiser-line" aria-hidden="true"></span>
          <img
            className="organiser-logo"
            src={ismailiCivicLogo}
            alt="Ismaili Civic Kenya"
          />
        </div>
      )}

      {/* Agenda */}
      <div className="agenda">
        <div className="agenda-head">
          <h3>The <em>programme.</em></h3>
          <span className="count">{AGENDA.length} items</span>
        </div>
        <div className="agenda-list">
          {AGENDA.map((item, i) => (
            <AgendaRow key={i} item={item} />
          ))}
        </div>
      </div>

      <div className="cta-dock">
        <button className="btn btn-primary" onClick={onBegin}>
          Check me in
          <span className="arrow">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6 L10 6 M6 2 L10 6 L6 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>
        <p className="helper">Takes about 40 seconds. No account required.</p>
      </div>
    </div>
  );
}
