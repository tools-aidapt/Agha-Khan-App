import React, { useEffect, useRef, useState } from 'react';
import { AGENDA } from '../agenda.js';
import { SESSIONS } from '../data.js';
import { BrandMark, AgendaRow } from './ScreenWelcome.jsx';
import { WhatsAppPill } from '../components/WhatsAppPill.jsx';

// ───────── Confetti + success ─────────
function Confetti({ count = 64 }) {
  const piecesRef = useRef(null);
  if (!piecesRef.current) {
    const palette = ['#0b66c2', '#c5dbf3', '#d33c1f', '#f7d3c9', '#1a1410', '#fffefb'];
    piecesRef.current = Array.from({ length: count }).map((_, i) => ({
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
      duration: 1.8 + Math.random() * 1.2,
      color: palette[i % palette.length],
      w: 6 + Math.random() * 6,
      h: 10 + Math.random() * 10,
      rot: Math.random() * 360,
      shape: Math.random() > 0.5 ? '2px' : '50%',
    }));
  }
  return (
    <React.Fragment>
      {piecesRef.current.map((p, i) => (
        <span
          key={i}
          className="confetti-piece"
          style={{
            left: p.left + '%',
            width: p.w, height: p.h,
            background: p.color,
            borderRadius: p.shape,
            transform: `rotate(${p.rot}deg)`,
            animationDelay: p.delay + 's',
            animationDuration: p.duration + 's',
          }}
        />
      ))}
    </React.Fragment>
  );
}

export function SuccessOverlay({ name }) {
  return (
    <div className="success-wrap">
      <Confetti count={70} />
      <div className="success-mark">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <path d="M10 20 L18 28 L30 14" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <h2>You're in{name ? `, ${name.split(' ')[0]}` : ''}.</h2>
      <p>Loading your seminar dashboard…</p>
    </div>
  );
}

// ───────── Skeleton ─────────
function SkeletonHubCard({ tall }) {
  return (
    <div className="sk-card" style={tall ? { minHeight: 200 } : { minHeight: 140 }}>
      <div className="sk-row">
        <div className="skeleton" style={{ width: 80, height: 14 }} />
        <div className="sk-spacer" />
        <div className="skeleton" style={{ width: 70, height: 22, borderRadius: 99 }} />
      </div>
      <div className="skeleton" style={{ width: '78%', height: 22 }} />
      <div className="skeleton" style={{ width: '92%', height: 14 }} />
      <div className="skeleton" style={{ width: '60%', height: 14 }} />
    </div>
  );
}

function HubSkeleton() {
  return (
    <div className="hub">
      <SkeletonHubCard tall />
      <SkeletonHubCard />
      <SkeletonHubCard />
      <SkeletonHubCard />
    </div>
  );
}

// ───────── Hub building blocks ─────────
function Divider({ label, isNow }) {
  return (
    <div className="hub-divider">
      <span className={"lbl" + (isNow ? " is-now" : "")}>{label}</span>
      <span className="line"></span>
    </div>
  );
}

function CardArrow() {
  return (
    <div className="hc-arrow">
      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
        <path d="M2 6 L10 6 M6 2 L10 6 L6 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

// ───────── Speaker photos ─────────
import hiteshPhoto from '../assets/speakers/hitesh-mahajan.jpg';
import kayuyuPhoto from '../assets/speakers/kayuyu-mwaura.jpg';
import reenaPhoto from '../assets/speakers/reena-gore.jpg';

// ───────── Speaker bios ─────────
const SPEAKER_BIOS = {
  'Hitesh Mahajan': {
    photo: hiteshPhoto,
    tagline: 'Managing Partner, Aidapt',
    location: 'Dubai, UAE',
    expertise: ['AI transformation', 'Practical AI', 'Owner-led adoption', 'Cross-industry'],
    bio: [
      "Hitesh is the Managing Partner of Aidapt, your AI Transformation Partner helping businesses across the Middle East, Africa, and Asia turn AI on. He is based in Dubai, with active engagements across the UAE, Saudi Arabia, South Africa, Kenya, and India.",
      "A builder first and a technologist second, Hitesh has been building businesses since he was 18. Horticulture. FMCG. Consulting for some of the world's largest retailers across four continents. He didn't come to AI from the tech side. He came to it from the boardroom, after seeing what cutting-edge AI could do for the way real businesses operate, and set up Aidapt to make that connection real.",
      "Hitesh is delighted to bring the conversation about practical, everyday AI home to Nairobi.",
    ],
    company: {
      name: 'About Aidapt',
      paragraphs: [
        "Aidapt is your AI Transformation Partner. We help businesses move from AI-ambition to AI-native by embedding AI operators inside our clients' organisations, building in two-week sprints, and leaving the client owning the system without us.",
        "We work across four Operating Systems: PeopleOS for adoption and change, ProductivityOS for workflow automation and AI agents, DataOS for the data platform and analytics, and SecurityOS for AI governance.",
        "Aidapt is an official partner in MEA for AWS, Microsoft, Snowflake, Anthropic (Claude), and ClickUp.",
        "Our promise is simple. Turn AI on. From everyday tasks to enterprise transformation.",
      ],
    },
    links: [
      { label: 'LinkedIn', value: 'linkedin.com/in/hiteshmahajan', href: 'https://linkedin.com/in/hiteshmahajan' },
      { label: 'Website',  value: 'aidapt.co',                       href: 'https://www.aidapt.co' },
    ],
  },
  'Kayuyu Mwaura': {
    photo: kayuyuPhoto,
    tagline: 'Technology leader · Product strategist',
    location: 'Nairobi, Kenya',
    expertise: ['AI-assisted product', 'Digital health', 'Human-centered design', 'African ecosystems'],
    bio: [
      "Kayuyu is a multidisciplinary technology leader, researcher, and product strategist working at the intersection of AI-assisted product development, digital health innovation, human-centered technology, and Africa's emerging ecosystems.",
      "Her work focuses on designing and scaling digital platforms that address real-world challenges across healthcare, education, and financial inclusion in emerging markets — bringing technical depth and strategic clarity to digital product development.",
      "She is particularly interested in how AI is reshaping product innovation workflows — how teams can leverage generative AI, AI-assisted prototyping, and developer copilots to experiment faster, build MVPs more efficiently, and shorten the design-to-development cycle without sacrificing usability, accessibility, or ethical design.",
      "Alongside product work, Kayuyu contributes to Africa's technology ecosystem through mentorship — supporting young women in tech via Global Give Back Circle / Mastercard Foundation's HER Lab, Moringa School, She Codes Africa, and Young Techiez. She also collaborates with clinicians and researchers on the practical and responsible application of AI within healthcare systems in emerging markets.",
    ],
    links: [
      { label: 'LinkedIn',   value: 'linkedin.com/in/kayuyumwaura',  href: 'https://www.linkedin.com/in/kayuyumwaura/' },
      { label: 'Slide deck', value: 'The ABCs of AI (PDF)',          href: '/decks/abcs-of-ai-kayuyu.pdf' },
    ],
  },
  'Reena Gore': {
    photo: reenaPhoto,
    tagline: 'Founder & CEO, Intellique Solutions',
    location: 'Nairobi, Kenya',
    expertise: ['CEO advisory', 'Finance & operations', 'SME scaling', 'Leadership'],
    bio: [
      "Reena spent over two decades inside some of East Africa's most complex organisations — manufacturing, textiles, printing, plastics, packaging — as CFO and Operations Executive. She didn't just read the numbers. She fixed the businesses behind them.",
      "Today, as Founder and CEO of Intellique Solutions Ltd — a business coaching and e-learning platform purpose-built for the African market — she addresses what she calls the Management Gap™: the leadership and systems deficiency that prevents promising SMEs from scaling sustainably.",
      "Through her proprietary FPO Method™ (Finance, People, Operations), Reena has worked shoulder-to-shoulder with 50+ CEOs across 19 countries, guiding enterprises from USD 2M to USD 40M+ in revenue. Her approach is built from the boardroom floor — rooted in real P&Ls, real turnarounds, and real people.",
      "Great businesses are built when people, processes, and money work in harmony. Reena works with founders, leaders, and teams to strengthen these three pillars — bringing clarity, alignment, and execution discipline.",
    ],
    links: [
      { label: 'LinkedIn', value: 'linkedin.com/in/reena-gore', href: 'https://www.linkedin.com/in/reena-gore-884a73178/' },
    ],
  },
  // Other speakers' full bios coming — for now we'll show their talk info only
};

// ───────── Speakers helpers ─────────
const EXCLUDED_SPEAKERS = new Set(['Nafisa Teja', 'Zahiba Mawji']);

function getSpeakers() {
  const tones = ['blue', 'red', 'ink', 'cream', 'blue'];
  const seen = new Set();
  const speakers = [];
  const ADMIN_TITLES = /welcome address|closing remarks|mc opening|screen break/i;
  AGENDA.forEach((a) => {
    if (!a.speaker || seen.has(a.speaker)) return;
    if (EXCLUDED_SPEAKERS.has(a.speaker)) return;
    if (a.kind === 'moment') return;
    if (ADMIN_TITLES.test(a.title)) return;
    seen.add(a.speaker);
    const sess = SESSIONS.find((s) => s.speaker === a.speaker);
    const bio = SPEAKER_BIOS[a.speaker];
    const role = sess?.role || (a.kind === 'keynote' ? 'Keynote' : a.kind === 'fireside' ? 'Hosted conversation' : 'Talk');
    speakers.push({
      name: a.speaker,
      kind: a.kind,
      time: a.time + ' ' + a.ampm,
      title: sess?.title || a.title,
      blurb: sess?.blurb || '',
      role,
      tagline: bio?.tagline || role,
      location: bio?.location || null,
      expertise: bio?.expertise || null,
      bio: bio?.bio || null,
      company: bio?.company || null,
      links: bio?.links || null,
      photo: bio?.photo || null,
    });
  });
  return speakers.map((s, i) => ({ ...s, tone: tones[i % tones.length] }));
}

function initialsOf(name) {
  return name.split(' ').filter(Boolean).slice(0, 2).map((w) => w[0]).join('').toUpperCase();
}

// ───────── Detail sheet ─────────
function Sheet({ open, onClose, eyebrow, title, children }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="sheet-backdrop" onClick={onClose}>
      <div className="sheet" onClick={(e) => e.stopPropagation()}>
        <div className="sheet-handle" />
        <div className="sheet-head">
          <div className="l">
            <div className="eyebrow">{eyebrow}</div>
            <h2>{title}</h2>
          </div>
          <button className="sheet-close" onClick={onClose} aria-label="Close">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2 L12 12 M12 2 L2 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        <div className="sheet-body">{children}</div>
      </div>
    </div>
  );
}

function SpeakersSheet({ open, onClose }) {
  const speakers = getSpeakers();
  const [selectedName, setSelectedName] = useState(null);

  useEffect(() => {
    if (!open) setSelectedName(null);
  }, [open]);

  const selected = selectedName ? speakers.find((s) => s.name === selectedName) : null;

  if (selected) {
    const roleEyebrow =
      selected.kind === 'keynote' ? (selected.role === 'Opening Keynote' ? 'Opening Keynote' : 'Keynote')
      : selected.kind === 'fireside' ? 'Hosted Conversation'
      : selected.role || 'Speaker';
    return (
      <Sheet
        open={open}
        onClose={onClose}
        eyebrow="Speaker profile"
        title={<>The <em>profile.</em></>}
      >
        <button
          type="button"
          className="spkr-back"
          onClick={() => setSelectedName(null)}
        >
          <svg width="12" height="12" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M9 2 L4 7 L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          All speakers
        </button>
        <div className="spkr-profile" data-kind={selected.kind}>
          <div className="spkr-hero">
            <div className="av-lg" data-tone={selected.tone}>
              {selected.photo
                ? <img src={selected.photo} alt={selected.name} loading="lazy" decoding="async" />
                : initialsOf(selected.name)}
            </div>
            <div className="meta">
              <div className="role-eyebrow">
                <span className="dot" aria-hidden="true"></span>
                {roleEyebrow}
              </div>
              <h3 className="display-name">{selected.name}</h3>
              <div className="tagline">{selected.tagline}</div>
              {selected.location && (
                <div className="location">
                  <svg width="11" height="13" viewBox="0 0 11 13" fill="none" aria-hidden="true">
                    <path d="M5.5 12 C8 9 10 7 10 4.8 A4.5 4.5 0 0 0 1 4.8 C1 7 3 9 5.5 12 Z" stroke="currentColor" strokeWidth="1.1" fill="none" strokeLinejoin="round"/>
                    <circle cx="5.5" cy="4.7" r="1.5" stroke="currentColor" strokeWidth="1.1" fill="none"/>
                  </svg>
                  {selected.location}
                </div>
              )}
            </div>
          </div>

          <div className="spkr-talk">
            <div className="talk-head">
              <span className="when">{selected.time}</span>
              <span className="dot-sep">·</span>
              <span className="kind">{(selected.kind === 'fireside' ? 'Fireside' : selected.kind === 'keynote' ? 'Keynote' : 'Talk')}</span>
            </div>
            <div className="title">{selected.title}</div>
            {selected.blurb && <p className="blurb">{selected.blurb}</p>}
          </div>

          {selected.bio && (
            <div className="spkr-section">
              <div className="sect-lbl">About</div>
              {selected.bio.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}

          {selected.expertise?.length > 0 && (
            <div className="spkr-section">
              <div className="sect-lbl">Expertise</div>
              <div className="expertise-chips">
                {selected.expertise.map((tag) => (
                  <span key={tag} className="ex-chip">{tag}</span>
                ))}
              </div>
            </div>
          )}

          {selected.links?.length > 0 && (
            <div className="spkr-section">
              <div className="sect-lbl">Find them</div>
              <div className="link-rows">
                {selected.links.map((l) => (
                  <a
                    key={l.label}
                    className="link-row"
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="ll">{l.label}</span>
                    <span className="lv">{l.value}</span>
                    <span className="la" aria-hidden="true">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 9 L9 3 M4 3 L9 3 L9 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {selected.company && (
            <div className="spkr-section spkr-company">
              <div className="sect-lbl">{selected.company.name}</div>
              {selected.company.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          )}
        </div>
      </Sheet>
    );
  }

  return (
    <Sheet open={open} onClose={onClose} eyebrow="Today's lineup" title={<>Three voices, <em>one day.</em></>}>
      <div className="spkr-list">
        {speakers.map((s) => (
          <button
            key={s.name}
            type="button"
            className="spkr is-clickable"
            data-kind={s.kind}
            onClick={() => setSelectedName(s.name)}
            aria-label={`View profile for ${s.name}`}
          >
            <div className="av" data-tone={s.tone}>
              {s.photo ? <img src={s.photo} alt="" loading="lazy" decoding="async" /> : initialsOf(s.name)}
            </div>
            <div className="body">
              <div className="row1">
                <div className="name">{s.name}</div>
                <div className="when">{s.time}</div>
              </div>
              <div className="role">{s.tagline}</div>
            </div>
            <span className="chev" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
                <path d="M5 2 L10 7 L5 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </Sheet>
  );
}

const CLASS_OUTLINE = [
  { n: 1, title: "Understand AI & Build Your AI Personality", desc: "Train Claude & ChatGPT to think, speak, and work exactly like you. Create a personalized AI profile that responds in your voice, every time." },
  { n: 2, title: "Research & Professional Drafting", desc: "Use AI as your research partner for professional excellence. Master advanced research techniques and draft high-quality emails, proposals, and social media profiles." },
  { n: 3, title: "Presentations & Storytelling", desc: "Create professional, visually compelling decks in minutes using Gamma and Canva AI. Turn briefs into branded presentations instantly without design skills." },
  { n: 4, title: "AI for Families", desc: "Explore safe, effective, and smart ways to use AI for the whole family. Use Google LLMs (Gemini) as a personalized tutor and learn best practices for parents." },
  { n: 5, title: "AI Connectors & Supercharging Efficiency", desc: "Connect AI to your daily tools for seamless productivity. Organize your calendar, emails, and tasks with Claude and meet the Manus AI Agent for workflow automation." },
  { n: 6, title: "The Capstone Launch", desc: "Put it all together into a real, deployable project. Form teams to build communications packs and receive your Certificate of Completion plus access to the monthly drop-in clinic." },
];

const PROGRAM_REFERENCE_URL = 'https://www.reenagore.net';

function ClassDetailsSheet({ open, onClose }) {
  return (
    <Sheet open={open} onClose={onClose} eyebrow="Reference material" title={<>The 6-session <em>program.</em></>}>
      <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '4px 0 18px', lineHeight: 1.55 }}>
        A six-week journey starting every Saturday. One evening a week, practical hands-on learning, one cohort. Empowering you to move from curious to confident in the age of AI.
      </p>
      <div className="class-list">
        {CLASS_OUTLINE.map((c) => (
          <div key={c.n} className="class-row">
            <div className="num">{String(c.n).padStart(2, '0')}</div>
            <div className="body">
              <div className="title">{c.title}</div>
              <div className="desc">{c.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <p style={{ fontSize: 13, color: 'var(--ink-3)', margin: '20px 0 0', textAlign: 'center' }}>
        Learn more at{' '}
        <a
          href={PROGRAM_REFERENCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'var(--blue-deep)', fontWeight: 600 }}
        >
          reenagore.net
        </a>
      </p>
    </Sheet>
  );
}

function AgendaSheet({ open, onClose }) {
  return (
    <Sheet open={open} onClose={onClose} eyebrow="Today's programme" title={<>The <em>full day.</em></>}>
      <div className="agenda" style={{ marginTop: 0 }}>
        <div className="agenda-list">
          {AGENDA.map((item, i) => (
            <AgendaRow key={i} item={item} />
          ))}
        </div>
      </div>
    </Sheet>
  );
}

function DiagnosticBookingSheet({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    if (document.querySelector('script[data-clickup-forms-embed]')) return;
    const script = document.createElement('script');
    script.src = CLICKUP_EMBED_SCRIPT;
    script.async = true;
    script.setAttribute('data-clickup-forms-embed', 'true');
    document.body.appendChild(script);
  }, [open]);

  return (
    <Sheet open={open} onClose={onClose} eyebrow="Bonus · For business leaders" title={<>AI Readiness <em>Diagnostic.</em></>}>
      <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '4px 0 16px', lineHeight: 1.55 }}>
        60 minutes. A 90-day roadmap you can act on. No pitch. Fill in the form and we&rsquo;ll be in touch to schedule.
      </p>
      <iframe
        className="clickup-embed clickup-dynamic-height"
        src={DIAGNOSTIC_FORM_URL}
        width="100%"
        height="640"
        loading="lazy"
        onWheel={() => {}}
        title="AI Readiness Diagnostic booking form"
        style={{ background: 'transparent', border: '1px solid var(--line)', borderRadius: 12, display: 'block' }}
      />
    </Sheet>
  );
}

// ───────── Hub cards ─────────
function NowCard({ onOpen }) {
  const now = AGENDA.find((a) => a.title === 'Opening keynote') ?? AGENDA[2];
  const next = AGENDA.find((a) => a.title === 'Second keynote') ?? AGENDA[4];
  return (
    <article className="hcard is-now span-2" onClick={onOpen}>
      <div className="hc-head">
        <span className="hc-num">01 · Right now</span>
        <span className="hc-pill is-live">● Live</span>
      </div>
      <h3>{now.title}</h3>
      <p className="lead">{now.speaker} is on stage. Tap to see everything still ahead today.</p>
      <div className="now-mini">
        <div className="t">{now.time} {now.ampm}</div>
        <div className="b">
          <span className="when">Now playing</span>
          <span className="ttl">{now.speaker} — {now.title}</span>
        </div>
      </div>
      <div className="now-mini">
        <div className="t">{next.time} {next.ampm}</div>
        <div className="b">
          <span className="when">Up next</span>
          <span className="ttl">{next.speaker} — {next.title}</span>
        </div>
      </div>
      <div className="hc-foot">
        <span className="hc-link" style={{ color: 'var(--cream)' }}>See full agenda</span>
        <CardArrow />
      </div>
    </article>
  );
}

function ShareCard() {
  const [copied, setCopied] = useState(false);
  const shareUrl = 'https://www.youtube.com/live/H4mGbx06FfU';

  const onShare = async () => {
    const payload = {
      title: 'AI Unpacked — live from Nairobi',
      text: 'Watch AI Unpacked live — every keynote, in real time.',
      url: shareUrl,
    };
    if (navigator.share) {
      try { await navigator.share(payload); } catch { /* user dismissed */ }
      return;
    }
    onCopy();
  };

  const onCopy = async (e) => {
    e?.stopPropagation();
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch { /* clipboard blocked */ }
  };

  return (
    <article className="hcard is-share" onClick={onShare}>
      <div className="hc-head">
        <span className="hc-num">03 · Share the moment</span>
        <span className="hc-pill is-live">● Streaming</span>
      </div>
      <h3>Share this YouTube Live with your family &amp; friends.</h3>
      <p className="lead">
        Every keynote streams live to YouTube — send the link to anyone who couldn't make it to Nairobi.
      </p>
      <div className="share-link-chip">
        <span className="yt-glyph" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M8 5 L20 12 L8 19 Z" fill="currentColor"/>
          </svg>
        </span>
        <div className="info">
          <span className="a">YouTube · Live</span>
          <span className="b">youtube.com/live/H4mGbx06FfU</span>
        </div>
        <button
          type="button"
          className={"copy-btn" + (copied ? " is-copied" : "")}
          onClick={onCopy}
          aria-label={copied ? 'Link copied to clipboard' : 'Copy link to clipboard'}
        >
          {copied ? (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M3 7.2 L5.8 10 L11 4.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <rect x="5" y="5" width="9" height="9" rx="2" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M11 5 V3.5 A1.5 1.5 0 0 0 9.5 2 H3.5 A1.5 1.5 0 0 0 2 3.5 V9.5 A1.5 1.5 0 0 0 3.5 11 H5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            </svg>
          )}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <div className="hc-foot">
        <span className="hc-link">Share link</span>
        <CardArrow />
      </div>
    </article>
  );
}

const SIGNUP_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScyvlU9W4q22FKS-QiQzNiSuMvQ7weNcIphVb9sU1bxtQTgKA/viewform';
const AIDAPT_HOME_URL = 'https://www.aidapt.co';
const DIAGNOSTIC_FORM_URL = 'https://forms.clickup.com/9012897228/p/f/8ckbtec-175572/W18MURNSB3BHK8CI26/form';
const CLICKUP_EMBED_SCRIPT = 'https://app-cdn.clickup.com/assets/js/forms-embed/v1.js';

const TAKEHOME_RESOURCES = [
  {
    label: 'Prompt library',
    sub: '10 for work, 10 for home. Copy, paste, work smarter.',
    href: 'https://www.aidapt.co/#prompts',
    icon: (
      <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
        <path d="M2 3 H12 V9 H6.5 L4 11 V9 H2 Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M5 6 H9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    label: 'Tools that matter',
    sub: 'A curated short list. The few we use every week.',
    href: 'https://www.aidapt.co/#tools',
    icon: (
      <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
        <rect x="1.5" y="1.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="8" y="1.5" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="1.5" y="8" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="8" y="8" width="4.5" height="4.5" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    label: '7-day walkthrough',
    sub: 'One small AI win in your inbox each morning.',
    href: 'https://www.aidapt.co/#walkthrough',
    icon: (
      <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
        <rect x="1.5" y="2.5" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M1.5 5.5 H12.5 M4.5 1.5 V3.5 M9.5 1.5 V3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M5 9 L6.5 10.5 L9 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

function CompactCard({ tone, onClick, ariaLabel, eyebrow, title, sub, glyph }) {
  const onKey = (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(); } };
  return (
    <div
      className={`compact-card is-${tone}`}
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={onKey}
      aria-label={ariaLabel}
    >
      <span className="cc-glyph" aria-hidden="true">{glyph}</span>
      <div className="cc-copy">
        <span className="cc-eyebrow">{eyebrow}</span>
        <span className="cc-title">{title}</span>
        {sub && <span className="cc-sub">{sub}</span>}
      </div>
      <span className="cc-go" aria-hidden="true">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 6 L10 6 M6 2 L10 6 L6 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    </div>
  );
}

function SignUpCard() {
  const onClick = () => window.open(SIGNUP_FORM_URL, '_blank', 'noopener,noreferrer');
  return (
    <CompactCard
      tone="blue"
      onClick={onClick}
      ariaLabel="Sign up for your breakout sessions"
      eyebrow="Action needed · Do this first"
      title="Sign up for the session if you haven't already"
      sub="Pick your breakout tracks."
      glyph={(
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
          <path d="M3 4 H12 M3 8 H12 M3 12 H8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
          <path d="M10 11.5 L11.2 12.7 L13.5 10.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )}
    />
  );
}

function DiagnosticCard({ onOpen }) {
  return (
    <CompactCard
      tone="red"
      onClick={onOpen}
      ariaLabel="Book your AI Readiness Diagnostic"
      eyebrow="Bonus · For business leaders"
      title="AI Readiness Diagnostic"
      sub="60 minutes. A 90-day roadmap you can act on. No pitch."
      glyph={(
        <svg width="18" height="18" viewBox="0 0 16 16" fill="none">
          <rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M2 6.5 H14 M5.5 2 V4.5 M10.5 2 V4.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      )}
    />
  );
}

function TakeHomeAppCard({ onBookDiagnostic }) {
  const onOpenResources = () => window.open(AIDAPT_HOME_URL, '_blank', 'noopener,noreferrer');
  const openLink = (e, href) => {
    e.stopPropagation();
    window.open(href, '_blank', 'noopener,noreferrer');
  };
  const openDiagnostic = (e) => {
    e.stopPropagation();
    onBookDiagnostic?.();
  };
  return (
    <article className="hcard is-takehome span-2" onClick={onOpenResources}>
      <div className="hc-head">
        <span className="hc-num">06 · Before you leave</span>
        <span className="hc-pill is-soon">On your phone</span>
      </div>
      <h3>Take <em>Aidapt</em> home with you.</h3>
      <p className="lead">
        We help operators turn AI on inside their business. Not someday, this week. Here&rsquo;s what we packed for the ride home.
      </p>
      <div className="app-preview-inset">
        <div className="app-preview-head">
          <span className="app-icon">AI</span>
          <div className="app-brand">
            <span className="name">AI Unpacked</span>
            <span className="by">Free resources from Aidapt</span>
          </div>
        </div>
        <ul className="takehome-list">
          {TAKEHOME_RESOURCES.map((r) => (
            <li key={r.label}>
              <button
                type="button"
                className="takehome-row"
                onClick={(e) => openLink(e, r.href)}
              >
                <span className="th-icon" aria-hidden="true">{r.icon}</span>
                <span className="th-text">
                  <span className="th-label">{r.label}</span>
                  <span className="th-sub">{r.sub}</span>
                </span>
                <svg className="th-arrow" width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M4 2 L9 7 L4 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </li>
          ))}
        </ul>
        <div className="aidapt-pitch">
          <span className="pitch-eyebrow">Why Aidapt</span>
          <p>
            Most AI projects end in a deck. Yours won't. Aidapt embeds a Pod inside your business, builds in 2-week sprints, and leaves you owning the system. From AI-ambition to AI-native.
          </p>
          <button
            type="button"
            className="pitch-cta"
            onClick={openDiagnostic}
          >
            <span className="pitch-cta-text">
              <span className="pitch-cta-eyebrow">Start here</span>
              <span className="pitch-cta-label">Book your AI Readiness Diagnostic</span>
            </span>
            <span className="pitch-cta-go" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6 L10 6 M6 2 L10 6 L6 10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div className="hc-foot">
        <span className="hc-link">Explore everything at aidapt.co</span>
        <CardArrow />
      </div>
    </article>
  );
}

function SpeakersCard({ onOpen }) {
  const speakers = getSpeakers();
  const visible = speakers.slice(0, 5);
  return (
    <article className="hcard" onClick={onOpen}>
      <div className="hc-head">
        <span className="hc-num">02 · Read while you settle in</span>
        <span className="hc-pill">Today's lineup</span>
      </div>
      <h3>Today's speakers.</h3>
      <p className="lead">Three voices on what AI changes for business in front of you. Practical, today.</p>
      <div className="speaker-row">
        {visible.map((s) => (
          <div key={s.name} className="av" data-tone={s.tone} title={s.name}>
            {s.photo ? <img src={s.photo} alt="" loading="lazy" decoding="async" /> : initialsOf(s.name)}
          </div>
        ))}
        {speakers.length > 5 && <div className="av" data-tone="cream">+{speakers.length - 5}</div>}
      </div>
      <div className="hc-foot">
        <span className="hc-link">View bios & topics</span>
        <CardArrow />
      </div>
    </article>
  );
}

function ClassCard({ onOpen }) {
  return (
    <article className="hcard is-programme span-2" onClick={onOpen}>
      <div className="hc-head">
        <span className="hc-num">04 · Going deeper</span>
        <span className="hc-pill is-soon">Reference</span>
      </div>
      <h3>The 6-session program.</h3>
      <p className="lead">
        A six-week journey starting every Saturday. One evening a week of practical, hands-on learning. Move from curious to confident in the age of AI.
      </p>
      <div className="programme-stripe" aria-hidden="true">
        <span className="fill"></span>
        <span className="fill"></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div className="stat-row">
        <div className="s"><span className="n">6 wks</span><span className="l">Saturday evenings</span></div>
        <div className="s"><span className="n">1</span><span className="l">Hands-on cohort</span></div>
        <div className="s"><span className="n">Cert</span><span className="l">On completion</span></div>
      </div>
      <div className="hc-foot">
        <span className="hc-link">See the curriculum</span>
        <CardArrow />
      </div>
    </article>
  );
}

const SURVEY_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScUPAatlte0iH-VJTZhO21ryifjYWvh6cDWeaZmQHsTj0FlCw/viewform';

function SurveyCard() {
  const onOpen = () => window.open(SURVEY_FORM_URL, '_blank', 'noopener,noreferrer');
  return (
    <article className="hcard" onClick={onOpen}>
      <div className="hc-head">
        <span className="hc-num">05 · End of day</span>
        <span className="hc-pill">60 seconds</span>
      </div>
      <h3>Post-event survey.</h3>
      <p className="lead">Sixty seconds, six questions. Help us shape the next one. Every answer is read by a human.</p>
      <div className="hc-foot">
        <span className="hc-link">Open survey</span>
        <CardArrow />
      </div>
    </article>
  );
}

// ───────── Hub Screen ─────────
function formatNairobiTime() {
  return new Date().toLocaleTimeString('en-US', {
    timeZone: 'Africa/Nairobi',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function SessionsScreen({ data }) {
  const [loading, setLoading] = useState(true);
  const [sheet, setSheet] = useState(null); // 'speakers' | 'class' | 'agenda' | 'diagnostic' | null
  const [nairobiTime, setNairobiTime] = useState(formatNairobiTime);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const tick = setInterval(() => setNairobiTime(formatNairobiTime()), 30 * 1000);
    return () => clearInterval(tick);
  }, []);

  const firstName = (data.name || '').trim().split(' ')[0] || 'there';

  return (
    <React.Fragment>
      <div className="hub-hero screen-enter">
        <div className="topbar">
          <BrandMark />
          <WhatsAppPill />
        </div>
        <div className="eyebrow" style={{ marginTop: 14 }}>Welcome, {firstName}</div>
        <h1>Your day, <em>in order.</em></h1>
        <p className="lede">
          Everything you need today. From what's happening right now to tonight's wrap. Tap a card to dive in.
        </p>
      </div>

      {loading ? (
        <HubSkeleton />
      ) : (
        <div className="hub stagger">
          <DiagnosticCard onOpen={() => setSheet('diagnostic')} />
          <SignUpCard />

          <Divider label={`Right now · ${nairobiTime}`} isNow />
          <NowCard onOpen={() => setSheet('agenda')} />

          <Divider label="Before talks start" />
          <SpeakersCard onOpen={() => setSheet('speakers')} />

          <Divider label="During the day" />
          <ShareCard />

          <Divider label="After today" />
          <ClassCard onOpen={() => setSheet('class')} />

          <Divider label="Later this week" />
          <SurveyCard />

          <TakeHomeAppCard onBookDiagnostic={() => setSheet('diagnostic')} />
        </div>
      )}

      <SpeakersSheet open={sheet === 'speakers'} onClose={() => setSheet(null)} />
      <ClassDetailsSheet open={sheet === 'class'} onClose={() => setSheet(null)} />
      <AgendaSheet open={sheet === 'agenda'} onClose={() => setSheet(null)} />
      <DiagnosticBookingSheet open={sheet === 'diagnostic'} onClose={() => setSheet(null)} />
    </React.Fragment>
  );
}
