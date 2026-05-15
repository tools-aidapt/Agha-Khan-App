import React, { useState } from 'react';
import { BrandMark } from './ScreenWelcome.jsx';
import { COMPANY_SIZES } from '../data.js';

function Progress({ step, total }) {
  return (
    <div className="progress">
      {Array.from({ length: total }).map((_, i) =>
        <span
          key={i}
          className={"pip" + (i === step ? " active" : i < step ? " done" : "")} />
      )}
    </div>
  );
}

function TopNav({ onBack, step, total }) {
  return (
    <div className="topbar">
      <button className="back-btn" onClick={onBack} disabled={step === 0}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2 L4 7 L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <Progress step={step} total={total} />
      <BrandMark />
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div className={"field" + (error ? " has-error" : "")}>
      <label>
        {label}
        {required && <span className="req">●</span>}
      </label>
      {children}
      {error && <p className="err">{error}</p>}
    </div>
  );
}

// ──────── Step 1 ────────
export function Step1Personal({ data, setData, onNext, onBack }) {
  const [errors, setErrors] = useState({});
  const submit = () => {
    const e = {};
    if (!data.name?.trim()) e.name = "We need a name to address you by.";
    if (!data.email?.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = "That doesn't look like a valid email.";
    if (!data.phone?.trim()) e.phone = "We'll only message for seminar updates.";
    if (data.website?.trim() && !/\.[a-z]{2,}/i.test(data.website)) e.website = "Doesn't look like a valid website.";
    setErrors(e);
    if (Object.keys(e).length === 0) onNext();
  };
  return (
    <div className="screen screen-enter">
      <TopNav onBack={onBack} step={0} total={3} />

      <div className="prompt">
        <div className="eyebrow">Step 01 · About you</div>
        <h2>Let's start with <span className="ital">your name</span>.</h2>
        <p>We use this to personalise your schedule and badge at the door.</p>
      </div>

      <div className="fields-stack">
        <Field label="Your full name" required error={errors.name}>
          <input
            type="text"
            placeholder="e.g. Sara Ahmed"
            value={data.name || ""}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            autoComplete="name" />
        </Field>
        <Field label="Email address" required error={errors.email}>
          <input
            type="email"
            placeholder="sara@yourcompany.com"
            value={data.email || ""}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            autoComplete="email"
            inputMode="email" />
        </Field>
        <Field label="Contact number" required error={errors.phone}>
          <div className="phone-wrap">
            <div className="prefix">
              <div className="flag" aria-hidden="true"></div>
              +92
            </div>
            <input
              type="tel"
              placeholder="3xx xxx xxxx"
              value={data.phone || ""}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              autoComplete="tel"
              inputMode="tel" />
          </div>
        </Field>
        <Field label="Website" error={errors.website}>
          <input
            type="url"
            placeholder="yourcompany.com"
            value={data.website || ""}
            onChange={(e) => setData({ ...data, website: e.target.value })}
            autoComplete="url"
            inputMode="url" />
        </Field>
      </div>

      <div className="cta-dock">
        <button className="btn btn-primary" onClick={submit}>
          Continue
          <span className="arrow">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6 L10 6 M6 2 L10 6 L6 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

// ──────── Step 2 ────────
export function Step2Business({ data, setData, onNext, onBack }) {
  const [errors, setErrors] = useState({});
  const isOwner = data.isOwner;
  const isYes = isOwner === true;

  const submit = () => {
    const e = {};
    if (isOwner === undefined || isOwner === null) e.isOwner = "Pick one to continue.";
    if (isYes) {
      if (!data.company?.trim()) e.company = "Company name is required.";
      if (!data.size) e.size = "Pick a team size.";
    }
    setErrors(e);
    if (Object.keys(e).length === 0) onNext();
  };

  return (
    <div className="screen screen-enter">
      <TopNav onBack={onBack} step={1} total={3} />

      <div className="prompt">
        <div className="eyebrow">Step 02 · Your work</div>
        <h2>Do you <span className="ital">own a business?</span></h2>
        <p>So we can tailor the right sessions and put you next to the right people.</p>
      </div>

      <div className="choice-row">
        <button
          className={"choice" + (isYes ? " is-selected" : "")}
          onClick={() => setData({ ...data, isOwner: true })}>
          <span className="glyph">Yes</span>
          <span className="sub">I run a company or freelance practice.</span>
        </button>
        <button
          className={"choice" + (isOwner === false ? " is-selected" : "")}
          onClick={() => setData({ ...data, isOwner: false, company: "", size: "" })}>
          <span className="glyph">No</span>
          <span className="sub">I'm curious, exploring, or here to learn.</span>
        </button>
      </div>
      {errors.isOwner && <p className="err" style={{ marginTop: 10 }}>{errors.isOwner}</p>}

      {/* Conditional reveal */}
      <div className={"reveal" + (isYes ? " is-open" : "")}>
        <div className="reveal-inner">
          <div className="reveal-pad">
            <Field label="Company or brand name" required error={errors.company}>
              <input
                type="text"
                placeholder="e.g. Marigold Studio"
                value={data.company || ""}
                onChange={(e) => setData({ ...data, company: e.target.value })} />
            </Field>
            <Field label="Team size" required error={errors.size}>
              <div className="chips">
                {COMPANY_SIZES.map((s) =>
                  <button
                    key={s}
                    className={"chip" + (data.size === s ? " is-selected" : "")}
                    onClick={() => setData({ ...data, size: s })}>
                    {s}
                  </button>
                )}
              </div>
            </Field>
          </div>
        </div>
      </div>

      <div className="cta-dock">
        <button className="btn btn-primary" onClick={submit}>
          Continue
          <span className="arrow">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6 L10 6 M6 2 L10 6 L6 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

// ──────── Step 3 ────────
export function Step3Interest({ data, setData, onNext, onBack }) {
  const interested = data.interested;
  return (
    <div className="screen screen-enter">
      <TopNav onBack={onBack} step={2} total={3} />

      <div className="prompt">
        <div className="eyebrow">Step 03 · One last thing</div>
        <h2>
          Want to see how <span className="ital">AI</span> can supercharge your business?
        </h2>
        <p>If yes, we'll match you with one of our team for a 1:1 walkthrough during the seminar.</p>
      </div>

      <div className="choice-row">
        <button
          className={"choice" + (interested === true ? " is-selected" : "")}
          onClick={() => setData({ ...data, interested: true })}>
          <span className="glyph">Yes, please</span>
          <span className="sub">Book me a 15-min consultation.</span>
        </button>
        <button
          className={"choice" + (interested === false ? " is-selected" : "")}
          onClick={() => setData({ ...data, interested: false })}>
          <span className="glyph">Maybe later</span>
          {/* <span className="sub">I'll just attend the sessions for now.</span> */}
        </button>
      </div>

      {/* <div style={{ marginTop: 24, padding: 16, borderRadius: 16, background: 'var(--blue-tint)', border: '1px solid rgba(11,102,194,0.18)' }}>
        <div className="eyebrow" style={{ color: 'var(--blue-deep)' }}>What you'll get</div>
        <ul style={{ margin: '10px 0 0', paddingLeft: 18, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6 }}>
          <li>A custom AI workflow built around <em>your</em> business</li>
          <li>Direct intros to two case-study founders</li>
          <li>A free 30-day trial of the follow-up class</li>
        </ul>
      </div> */}

      <div className="cta-dock">
        <button
          className="btn btn-primary"
          onClick={onNext}
          disabled={interested === undefined || interested === null}>
          Finish & enter
          <span className="arrow">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6 L10 6 M6 2 L10 6 L6 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}
