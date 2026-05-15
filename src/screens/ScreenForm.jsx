import React, { useEffect, useRef, useState } from 'react';
import { BrandMark } from './ScreenWelcome.jsx';
import { COMPANY_SIZES } from '../data.js';

export const COUNTRIES = [
  { code: 'AF', name: 'Afghanistan', dial: '+93' },
  { code: 'AL', name: 'Albania', dial: '+355' },
  { code: 'DZ', name: 'Algeria', dial: '+213' },
  { code: 'AD', name: 'Andorra', dial: '+376' },
  { code: 'AO', name: 'Angola', dial: '+244' },
  { code: 'AG', name: 'Antigua and Barbuda', dial: '+1' },
  { code: 'AR', name: 'Argentina', dial: '+54' },
  { code: 'AM', name: 'Armenia', dial: '+374' },
  { code: 'AU', name: 'Australia', dial: '+61' },
  { code: 'AT', name: 'Austria', dial: '+43' },
  { code: 'AZ', name: 'Azerbaijan', dial: '+994' },
  { code: 'BS', name: 'Bahamas', dial: '+1' },
  { code: 'BH', name: 'Bahrain', dial: '+973' },
  { code: 'BD', name: 'Bangladesh', dial: '+880' },
  { code: 'BB', name: 'Barbados', dial: '+1' },
  { code: 'BY', name: 'Belarus', dial: '+375' },
  { code: 'BE', name: 'Belgium', dial: '+32' },
  { code: 'BZ', name: 'Belize', dial: '+501' },
  { code: 'BJ', name: 'Benin', dial: '+229' },
  { code: 'BT', name: 'Bhutan', dial: '+975' },
  { code: 'BO', name: 'Bolivia', dial: '+591' },
  { code: 'BA', name: 'Bosnia and Herzegovina', dial: '+387' },
  { code: 'BW', name: 'Botswana', dial: '+267' },
  { code: 'BR', name: 'Brazil', dial: '+55' },
  { code: 'BN', name: 'Brunei', dial: '+673' },
  { code: 'BG', name: 'Bulgaria', dial: '+359' },
  { code: 'BF', name: 'Burkina Faso', dial: '+226' },
  { code: 'BI', name: 'Burundi', dial: '+257' },
  { code: 'CV', name: 'Cabo Verde', dial: '+238' },
  { code: 'KH', name: 'Cambodia', dial: '+855' },
  { code: 'CM', name: 'Cameroon', dial: '+237' },
  { code: 'CA', name: 'Canada', dial: '+1' },
  { code: 'CF', name: 'Central African Republic', dial: '+236' },
  { code: 'TD', name: 'Chad', dial: '+235' },
  { code: 'CL', name: 'Chile', dial: '+56' },
  { code: 'CN', name: 'China', dial: '+86' },
  { code: 'CO', name: 'Colombia', dial: '+57' },
  { code: 'KM', name: 'Comoros', dial: '+269' },
  { code: 'CG', name: 'Congo', dial: '+242' },
  { code: 'CD', name: 'Congo (DRC)', dial: '+243' },
  { code: 'CR', name: 'Costa Rica', dial: '+506' },
  { code: 'CI', name: "Côte d'Ivoire", dial: '+225' },
  { code: 'HR', name: 'Croatia', dial: '+385' },
  { code: 'CU', name: 'Cuba', dial: '+53' },
  { code: 'CY', name: 'Cyprus', dial: '+357' },
  { code: 'CZ', name: 'Czechia', dial: '+420' },
  { code: 'DK', name: 'Denmark', dial: '+45' },
  { code: 'DJ', name: 'Djibouti', dial: '+253' },
  { code: 'DM', name: 'Dominica', dial: '+1' },
  { code: 'DO', name: 'Dominican Republic', dial: '+1' },
  { code: 'EC', name: 'Ecuador', dial: '+593' },
  { code: 'EG', name: 'Egypt', dial: '+20' },
  { code: 'SV', name: 'El Salvador', dial: '+503' },
  { code: 'GQ', name: 'Equatorial Guinea', dial: '+240' },
  { code: 'ER', name: 'Eritrea', dial: '+291' },
  { code: 'EE', name: 'Estonia', dial: '+372' },
  { code: 'SZ', name: 'Eswatini', dial: '+268' },
  { code: 'ET', name: 'Ethiopia', dial: '+251' },
  { code: 'FJ', name: 'Fiji', dial: '+679' },
  { code: 'FI', name: 'Finland', dial: '+358' },
  { code: 'FR', name: 'France', dial: '+33' },
  { code: 'GA', name: 'Gabon', dial: '+241' },
  { code: 'GM', name: 'Gambia', dial: '+220' },
  { code: 'GE', name: 'Georgia', dial: '+995' },
  { code: 'DE', name: 'Germany', dial: '+49' },
  { code: 'GH', name: 'Ghana', dial: '+233' },
  { code: 'GR', name: 'Greece', dial: '+30' },
  { code: 'GD', name: 'Grenada', dial: '+1' },
  { code: 'GT', name: 'Guatemala', dial: '+502' },
  { code: 'GN', name: 'Guinea', dial: '+224' },
  { code: 'GW', name: 'Guinea-Bissau', dial: '+245' },
  { code: 'GY', name: 'Guyana', dial: '+592' },
  { code: 'HT', name: 'Haiti', dial: '+509' },
  { code: 'HN', name: 'Honduras', dial: '+504' },
  { code: 'HK', name: 'Hong Kong', dial: '+852' },
  { code: 'HU', name: 'Hungary', dial: '+36' },
  { code: 'IS', name: 'Iceland', dial: '+354' },
  { code: 'IN', name: 'India', dial: '+91' },
  { code: 'ID', name: 'Indonesia', dial: '+62' },
  { code: 'IR', name: 'Iran', dial: '+98' },
  { code: 'IQ', name: 'Iraq', dial: '+964' },
  { code: 'IE', name: 'Ireland', dial: '+353' },
  { code: 'IL', name: 'Israel', dial: '+972' },
  { code: 'IT', name: 'Italy', dial: '+39' },
  { code: 'JM', name: 'Jamaica', dial: '+1' },
  { code: 'JP', name: 'Japan', dial: '+81' },
  { code: 'JO', name: 'Jordan', dial: '+962' },
  { code: 'KZ', name: 'Kazakhstan', dial: '+7' },
  { code: 'KE', name: 'Kenya', dial: '+254' },
  { code: 'KI', name: 'Kiribati', dial: '+686' },
  { code: 'KW', name: 'Kuwait', dial: '+965' },
  { code: 'KG', name: 'Kyrgyzstan', dial: '+996' },
  { code: 'LA', name: 'Laos', dial: '+856' },
  { code: 'LV', name: 'Latvia', dial: '+371' },
  { code: 'LB', name: 'Lebanon', dial: '+961' },
  { code: 'LS', name: 'Lesotho', dial: '+266' },
  { code: 'LR', name: 'Liberia', dial: '+231' },
  { code: 'LY', name: 'Libya', dial: '+218' },
  { code: 'LI', name: 'Liechtenstein', dial: '+423' },
  { code: 'LT', name: 'Lithuania', dial: '+370' },
  { code: 'LU', name: 'Luxembourg', dial: '+352' },
  { code: 'MO', name: 'Macau', dial: '+853' },
  { code: 'MG', name: 'Madagascar', dial: '+261' },
  { code: 'MW', name: 'Malawi', dial: '+265' },
  { code: 'MY', name: 'Malaysia', dial: '+60' },
  { code: 'MV', name: 'Maldives', dial: '+960' },
  { code: 'ML', name: 'Mali', dial: '+223' },
  { code: 'MT', name: 'Malta', dial: '+356' },
  { code: 'MH', name: 'Marshall Islands', dial: '+692' },
  { code: 'MR', name: 'Mauritania', dial: '+222' },
  { code: 'MU', name: 'Mauritius', dial: '+230' },
  { code: 'MX', name: 'Mexico', dial: '+52' },
  { code: 'FM', name: 'Micronesia', dial: '+691' },
  { code: 'MD', name: 'Moldova', dial: '+373' },
  { code: 'MC', name: 'Monaco', dial: '+377' },
  { code: 'MN', name: 'Mongolia', dial: '+976' },
  { code: 'ME', name: 'Montenegro', dial: '+382' },
  { code: 'MA', name: 'Morocco', dial: '+212' },
  { code: 'MZ', name: 'Mozambique', dial: '+258' },
  { code: 'MM', name: 'Myanmar', dial: '+95' },
  { code: 'NA', name: 'Namibia', dial: '+264' },
  { code: 'NR', name: 'Nauru', dial: '+674' },
  { code: 'NP', name: 'Nepal', dial: '+977' },
  { code: 'NL', name: 'Netherlands', dial: '+31' },
  { code: 'NZ', name: 'New Zealand', dial: '+64' },
  { code: 'NI', name: 'Nicaragua', dial: '+505' },
  { code: 'NE', name: 'Niger', dial: '+227' },
  { code: 'NG', name: 'Nigeria', dial: '+234' },
  { code: 'KP', name: 'North Korea', dial: '+850' },
  { code: 'MK', name: 'North Macedonia', dial: '+389' },
  { code: 'NO', name: 'Norway', dial: '+47' },
  { code: 'OM', name: 'Oman', dial: '+968' },
  { code: 'PK', name: 'Pakistan', dial: '+92' },
  { code: 'PW', name: 'Palau', dial: '+680' },
  { code: 'PS', name: 'Palestine', dial: '+970' },
  { code: 'PA', name: 'Panama', dial: '+507' },
  { code: 'PG', name: 'Papua New Guinea', dial: '+675' },
  { code: 'PY', name: 'Paraguay', dial: '+595' },
  { code: 'PE', name: 'Peru', dial: '+51' },
  { code: 'PH', name: 'Philippines', dial: '+63' },
  { code: 'PL', name: 'Poland', dial: '+48' },
  { code: 'PT', name: 'Portugal', dial: '+351' },
  { code: 'QA', name: 'Qatar', dial: '+974' },
  { code: 'RO', name: 'Romania', dial: '+40' },
  { code: 'RU', name: 'Russia', dial: '+7' },
  { code: 'RW', name: 'Rwanda', dial: '+250' },
  { code: 'KN', name: 'Saint Kitts and Nevis', dial: '+1' },
  { code: 'LC', name: 'Saint Lucia', dial: '+1' },
  { code: 'VC', name: 'Saint Vincent', dial: '+1' },
  { code: 'WS', name: 'Samoa', dial: '+685' },
  { code: 'SM', name: 'San Marino', dial: '+378' },
  { code: 'ST', name: 'São Tomé and Príncipe', dial: '+239' },
  { code: 'SA', name: 'Saudi Arabia', dial: '+966' },
  { code: 'SN', name: 'Senegal', dial: '+221' },
  { code: 'RS', name: 'Serbia', dial: '+381' },
  { code: 'SC', name: 'Seychelles', dial: '+248' },
  { code: 'SL', name: 'Sierra Leone', dial: '+232' },
  { code: 'SG', name: 'Singapore', dial: '+65' },
  { code: 'SK', name: 'Slovakia', dial: '+421' },
  { code: 'SI', name: 'Slovenia', dial: '+386' },
  { code: 'SB', name: 'Solomon Islands', dial: '+677' },
  { code: 'SO', name: 'Somalia', dial: '+252' },
  { code: 'ZA', name: 'South Africa', dial: '+27' },
  { code: 'KR', name: 'South Korea', dial: '+82' },
  { code: 'SS', name: 'South Sudan', dial: '+211' },
  { code: 'ES', name: 'Spain', dial: '+34' },
  { code: 'LK', name: 'Sri Lanka', dial: '+94' },
  { code: 'SD', name: 'Sudan', dial: '+249' },
  { code: 'SR', name: 'Suriname', dial: '+597' },
  { code: 'SE', name: 'Sweden', dial: '+46' },
  { code: 'CH', name: 'Switzerland', dial: '+41' },
  { code: 'SY', name: 'Syria', dial: '+963' },
  { code: 'TW', name: 'Taiwan', dial: '+886' },
  { code: 'TJ', name: 'Tajikistan', dial: '+992' },
  { code: 'TZ', name: 'Tanzania', dial: '+255' },
  { code: 'TH', name: 'Thailand', dial: '+66' },
  { code: 'TL', name: 'Timor-Leste', dial: '+670' },
  { code: 'TG', name: 'Togo', dial: '+228' },
  { code: 'TO', name: 'Tonga', dial: '+676' },
  { code: 'TT', name: 'Trinidad and Tobago', dial: '+1' },
  { code: 'TN', name: 'Tunisia', dial: '+216' },
  { code: 'TR', name: 'Turkey', dial: '+90' },
  { code: 'TM', name: 'Turkmenistan', dial: '+993' },
  { code: 'TV', name: 'Tuvalu', dial: '+688' },
  { code: 'UG', name: 'Uganda', dial: '+256' },
  { code: 'UA', name: 'Ukraine', dial: '+380' },
  { code: 'AE', name: 'United Arab Emirates', dial: '+971' },
  { code: 'GB', name: 'United Kingdom', dial: '+44' },
  { code: 'US', name: 'United States', dial: '+1' },
  { code: 'UY', name: 'Uruguay', dial: '+598' },
  { code: 'UZ', name: 'Uzbekistan', dial: '+998' },
  { code: 'VU', name: 'Vanuatu', dial: '+678' },
  { code: 'VA', name: 'Vatican City', dial: '+379' },
  { code: 'VE', name: 'Venezuela', dial: '+58' },
  { code: 'VN', name: 'Vietnam', dial: '+84' },
  { code: 'YE', name: 'Yemen', dial: '+967' },
  { code: 'ZM', name: 'Zambia', dial: '+260' },
  { code: 'ZW', name: 'Zimbabwe', dial: '+263' },
];

export const DEFAULT_COUNTRY_CODE = 'KE';

function CountryPicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const rootRef = useRef(null);
  const searchRef = useRef(null);

  const current = COUNTRIES.find((c) => c.code === value) || COUNTRIES[0];

  useEffect(() => {
    if (!open) { setQuery(''); return; }
    const onDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    setTimeout(() => searchRef.current?.focus(), 0);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const filtered = query.trim()
    ? COUNTRIES.filter((c) => {
      const q = query.toLowerCase();
      return c.name.toLowerCase().includes(q) || c.dial.includes(q);
    })
    : COUNTRIES;

  return (
    <div className={"country-picker" + (open ? " is-open" : "")} ref={rootRef}>
      <button
        type="button"
        className="picker-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <img
          className="flag-img"
          src={`https://flagcdn.com/w40/${current.code.toLowerCase()}.png`}
          srcSet={`https://flagcdn.com/w80/${current.code.toLowerCase()}.png 2x`}
          alt={current.name}
          width="22"
          height="16"
        />
        <span className="dial">{current.dial}</span>
        <svg className="chev" width="9" height="9" viewBox="0 0 10 10" fill="none">
          <path d="M2 4 L5 7 L8 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="picker-menu" role="listbox">
          <input
            ref={searchRef}
            className="picker-search"
            type="text"
            placeholder="Search country or code…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="picker-list">
            {filtered.length === 0 && (
              <div className="picker-empty">No matches.</div>
            )}
            {filtered.map((c) => (
              <button
                key={c.code}
                type="button"
                role="option"
                aria-selected={c.code === current.code}
                className={"picker-option" + (c.code === current.code ? " is-selected" : "")}
                onClick={() => { onChange(c.code); setOpen(false); }}
              >
                <img
                  className="flag-img"
                  src={`https://flagcdn.com/w40/${c.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w80/${c.code.toLowerCase()}.png 2x`}
                  alt=""
                  width="24"
                  height="18"
                  loading="lazy"
                />
                <span className="name">{c.name}</span>
                <span className="dial">{c.dial}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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
            <CountryPicker
              value={data.country || DEFAULT_COUNTRY_CODE}
              onChange={(code) => setData({ ...data, country: code })}
            />
            <input
              type="tel"
              placeholder="Mobile number"
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
        <div className="consent-note">
          <span className="check" aria-hidden="true">
            <svg width="11" height="11" viewBox="0 0 14 14" fill="none">
              <path d="M3 7.2 L5.8 10 L11 4.2" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <p>
            Continuing confirms your consent to receive <b>AI Unpacked</b> updates.
          </p>
        </div>
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
          <span className="sub">I'll just attend the sessions for now.</span>
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
