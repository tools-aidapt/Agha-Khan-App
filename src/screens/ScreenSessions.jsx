import React, { useEffect, useRef, useState } from 'react';
import { AGENDA } from '../agenda.js';
import { SESSIONS } from '../data.js';
import { BrandMark, AgendaRow } from './ScreenWelcome.jsx';

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
import reenaPhoto from '../assets/speakers/reena-goore.jpg';

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
      { label: 'Website',  value: 'aidapt.co',                       href: 'https://aidapt.co' },
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
      { label: 'LinkedIn', value: 'linkedin.com/in/kayuyumwaura', href: 'https://www.linkedin.com/in/kayuyumwaura/' },
    ],
  },
  'Reena Goore': {
    photo: reenaPhoto,
    // tagline, location, expertise, bio, links — fill in when available
  },
  // Other speakers' full bios coming — for now we'll show their talk info only
};

// ───────── Speakers helpers ─────────
function getSpeakers() {
  const tones = ['blue', 'red', 'ink', 'cream', 'blue'];
  const seen = new Set();
  const speakers = [];
  const ADMIN_TITLES = /welcome address|closing remarks|mc opening|screen break/i;
  AGENDA.forEach((a) => {
    if (!a.speaker || seen.has(a.speaker)) return;
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
                ? <img src={selected.photo} alt={selected.name} />
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
    <Sheet open={open} onClose={onClose} eyebrow="Today's lineup" title={<>Five voices, <em>one day.</em></>}>
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
              {s.photo ? <img src={s.photo} alt="" /> : initialsOf(s.name)}
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
  { n: 1, title: "Foundations — what AI actually is", desc: "Cut through the noise. We map the landscape so you can spot real value vs. hype." },
  { n: 2, title: "Operations — automating the boring stuff", desc: "Find the ten hours of weekly busywork in your business and replace them with agents." },
  { n: 3, title: "Customer intelligence", desc: "Turn every conversation, review, and call into a same-day signal you can act on." },
  { n: 4, title: "Marketing & content, reimagined", desc: "From content calendars to one-to-one campaigns at scale. Tools and real-world cases." },
  { n: 5, title: "Your first workflow — live build", desc: "A hands-on lab. You leave with one working AI workflow, deployed inside your business." },
  { n: 6, title: "Going live & what's next", desc: "Demo day with the cohort. Plus a 90-day plan for embedding AI across your team." },
];

function ClassDetailsSheet({ open, onClose }) {
  return (
    <Sheet open={open} onClose={onClose} eyebrow="Reference material" title={<>The 6-session <em>class.</em></>}>
      <p style={{ fontSize: 14, color: 'var(--ink-2)', margin: '4px 0 18px', lineHeight: 1.55 }}>
        A six-week private class starting October. One evening a week, twelve founders, one cohort.
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

// ───────── Hub cards ─────────
function NowCard({ onOpen }) {
  const now = AGENDA[3];
  const next = AGENDA[5];
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
        <span className="hc-num">04 · Share the moment</span>
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

function SignUpCard() {
  return (
    <article className="hcard is-action span-2">
      <div className="hc-head">
        <span className="hc-num">02 · Do this first</span>
        <span className="hc-pill is-action">Action needed</span>
      </div>
      <h3>Sign up for your sessions.</h3>
      <p className="lead">Three afternoon breakouts run in parallel. Lock in your seat before talks start at 10:30.</p>
      <div className="signup-mini">
        <div className="slot">Breakout A · 2:00</div>
        <div className="slot">Breakout B · 3:00</div>
        <div className="slot">Breakout C · 4:00</div>
      </div>
      <div className="hc-foot">
        <span className="hc-link" style={{ color: 'white' }}>Choose your three →</span>
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
        <span className="hc-num">03 · Read while you settle in</span>
        <span className="hc-pill">Today's lineup</span>
      </div>
      <h3>Today's speakers.</h3>
      <p className="lead">Five voices on what AI changes for business, community, and the everyday.</p>
      <div className="speaker-row">
        {visible.map((s) => (
          <div key={s.name} className="av" data-tone={s.tone} title={s.name}>
            {s.photo ? <img src={s.photo} alt="" /> : initialsOf(s.name)}
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

function MentimeterCard() {
  return (
    <article className="hcard">
      <div className="hc-head">
        <span className="hc-num">05 · During sessions</span>
        <span className="hc-pill is-live">● Live</span>
      </div>
      <h3>Mentimeter is live.</h3>
      <p className="lead">Vote in the live polls as they appear on screen. Code updates per session.</p>
      <div className="menti-code">
        <span className="code">1428&nbsp;9036</span>
        <div className="info">
          <span className="a">Tap to join</span>
          <span className="b">menti.com · session 01</span>
        </div>
      </div>
      <div className="hc-foot">
        <span className="hc-link">Open Mentimeter</span>
        <CardArrow />
      </div>
    </article>
  );
}

function ClassCard({ onOpen }) {
  return (
    <article className="hcard is-programme span-2" onClick={onOpen}>
      <div className="hc-head">
        <span className="hc-num">06 · Going deeper</span>
        <span className="hc-pill is-soon">Reference</span>
      </div>
      <h3>The 6-session class.</h3>
      <p className="lead">
        After today, want the long version? A private six-week class for owners ready to put AI to work inside their own business.
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
        <div className="s"><span className="n">6 wks</span><span className="l">Tuesday evenings</span></div>
        <div className="s"><span className="n">12</span><span className="l">Founders / cohort</span></div>
        <div className="s"><span className="n">1:1</span><span className="l">Mentorship</span></div>
      </div>
      <div className="hc-foot">
        <span className="hc-link">See the curriculum</span>
        <CardArrow />
      </div>
    </article>
  );
}

function SlideDecksCard() {
  return (
    <article className="hcard is-locked">
      <div className="hc-head">
        <span className="hc-num">07 · Reference</span>
        <span className="hc-pill is-locked">○ Friday 6 PM</span>
      </div>
      <h3>Slide decks.</h3>
      <p className="lead">All five speaker decks land here on Friday evening. We'll email you the moment they're ready.</p>
      <div className="hc-foot">
        <span className="hc-link is-muted">Notify me when live</span>
        <CardArrow />
      </div>
    </article>
  );
}

function SurveyCard() {
  return (
    <article className="hcard is-locked">
      <div className="hc-head">
        <span className="hc-num">08 · End of day</span>
        <span className="hc-pill is-locked">○ Opens 4:00 PM</span>
      </div>
      <h3>Post-event survey.</h3>
      <p className="lead">Sixty seconds, six questions. Help us shape the next one — every answer is read by a human.</p>
      <div className="hc-foot">
        <span className="hc-link is-muted">Saved for later</span>
        <CardArrow />
      </div>
    </article>
  );
}

// ───────── Hub Screen ─────────
export function SessionsScreen({ data }) {
  const [loading, setLoading] = useState(true);
  const [sheet, setSheet] = useState(null); // 'speakers' | 'class' | 'agenda' | null
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1100);
    return () => clearTimeout(t);
  }, []);

  const firstName = (data.name || '').trim().split(' ')[0] || 'there';
  const initials = (data.name || '?').split(' ').filter(Boolean).slice(0, 2)
    .map((s) => s[0].toUpperCase()).join('');

  return (
    <React.Fragment>
      <div className="hub-hero screen-enter">
        <div className="topbar">
          <BrandMark />
          <div className="greet" style={{ margin: 0 }}>
            <div className="avatar">{initials}</div>
          </div>
        </div>
        <div className="eyebrow" style={{ marginTop: 14 }}>Welcome, {firstName}</div>
        <h1>Your day, <em>in order.</em></h1>
        <p className="lede">
          Everything you need today — from what's happening right now to tonight's wrap. Tap a card to dive in.
        </p>
      </div>

      {loading ? (
        <HubSkeleton />
      ) : (
        <div className="hub stagger">
          <Divider label="Right now · 10:42 AM" isNow />
          <NowCard onOpen={() => setSheet('agenda')} />

          <Divider label="Before talks start" />
          <SignUpCard />
          <SpeakersCard onOpen={() => setSheet('speakers')} />
          <ShareCard />

          <Divider label="During the day" />
          <MentimeterCard />

          <Divider label="After today" />
          <ClassCard onOpen={() => setSheet('class')} />

          <Divider label="Later this week" />
          <SlideDecksCard />
          <SurveyCard />
        </div>
      )}

      <SpeakersSheet open={sheet === 'speakers'} onClose={() => setSheet(null)} />
      <ClassDetailsSheet open={sheet === 'class'} onClose={() => setSheet(null)} />
      <AgendaSheet open={sheet === 'agenda'} onClose={() => setSheet(null)} />
    </React.Fragment>
  );
}
