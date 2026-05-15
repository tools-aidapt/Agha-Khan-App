import React, { useEffect, useState } from 'react';
import { WelcomeScreen } from './screens/ScreenWelcome.jsx';
import { Step1Personal, Step2Business, Step3Interest } from './screens/ScreenForm.jsx';
import { SessionsScreen, SuccessOverlay } from './screens/ScreenSessions.jsx';
import {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakSelect,
  TweakButton,
  TweakColor,
} from './components/TweaksPanel.jsx';
import { Footer } from './components/Footer.jsx';

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "blue",
  "density": "regular",
  "showHaptic": true,
  "skipForm": false
}/*EDITMODE-END*/;

const STORAGE_KEY = 'aidapt-onboarding-v1';
const WEBHOOK_URL = 'https://aidapt.app.n8n.cloud/webhook-test/38c67af1-b398-4997-b342-f90b2285b8ed';
const EVENT_ID = 'AI Unpacked · Nairobi 2026';

function loadStoredUser() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
    if (saved && typeof saved === 'object' && saved.name) return saved;
  } catch { /* invalid JSON or storage blocked */ }
  return null;
}

export default function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  // Returning visitor: skip the form, restore their profile straight to sessions.
  const [data, setData] = useState(() => loadStoredUser() || {});
  const [stage, setStage] = useState(() => loadStoredUser() ? 'sessions' : 'welcome'); // welcome | s1 | s2 | s3 | success | sessions

  // Apply accent variants
  useEffect(() => {
    const root = document.documentElement;
    if (t.accent === 'red') {
      root.style.setProperty('--accent', 'var(--red)');
    } else {
      root.style.setProperty('--accent', 'var(--blue)');
    }
  }, [t.accent]);

  // Allow tweak: skip directly to sessions for review
  useEffect(() => {
    if (t.skipForm && stage === 'welcome') {
      setData({ name: 'Sara Ahmed', email: 'sara@marigold.co', phone: '300 1234567', isOwner: true, company: 'Marigold Studio', size: '2 — 10', interested: true });
      setStage('sessions');
    }
  }, [t.skipForm]);

  const go = (s) => setStage(s);

  // Fired once when the user clicks "Finish & enter" on Step 3.
  // 1. Save the profile locally so the next QR scan skips the form.
  // 2. POST the submission to the n8n webhook (fire-and-forget — we don't block the UI).
  const handleSubmit = () => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* storage blocked */ }
    const payload = {
      ...data,
      submittedAt: new Date().toISOString(),
      event: EVENT_ID,
    };
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    }).catch((err) => console.warn('Submission webhook failed:', err));
    go('success');
  };

  const resetProfile = () => {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* storage blocked */ }
    setData({});
    setStage('welcome');
  };

  // Success → sessions auto transition
  useEffect(() => {
    if (stage === 'success') {
      const t1 = setTimeout(() => setStage('sessions'), 2100);
      return () => clearTimeout(t1);
    }
    if (stage !== 'sessions') {
      window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    }
  }, [stage]);

  const isSessions = stage === 'sessions';

  return (
    <div className={"app-shell " + (isSessions ? "is-sessions" : "")}>
      {stage === 'welcome' && (
        <WelcomeScreen onBegin={() => go('s1')} />
      )}
      {stage === 's1' && (
        <Step1Personal
          data={data} setData={setData}
          onBack={() => go('welcome')}
          onNext={() => go('s2')}
        />
      )}
      {stage === 's2' && (
        <Step2Business
          data={data} setData={setData}
          onBack={() => go('s1')}
          onNext={() => go('s3')}
        />
      )}
      {stage === 's3' && (
        <Step3Interest
          data={data} setData={setData}
          onBack={() => go('s2')}
          onNext={handleSubmit}
        />
      )}
      {stage === 'success' && <SuccessOverlay name={data.name} />}
      {stage === 'sessions' && <SessionsScreen data={data} />}

      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Flow"/>
        <TweakSelect
          label="Jump to step"
          value={stage}
          options={[
            { value: 'welcome', label: 'Welcome' },
            { value: 's1', label: 'Step 1 · Personal' },
            { value: 's2', label: 'Step 2 · Business' },
            { value: 's3', label: 'Step 3 · AI Interest' },
            { value: 'success', label: 'Success / Confetti' },
            { value: 'sessions', label: 'Sessions Page' },
          ]}
          onChange={(v) => {
            if ((v === 'sessions' || v === 's2' || v === 's3') && !data.name) {
              setData({ name: 'Sara Ahmed', email: 'sara@marigold.co', phone: '300 1234567', isOwner: true, company: 'Marigold Studio', size: '2 — 10', interested: true });
            }
            setStage(v);
          }}
        />
        <TweakButton label="Reset / sign out" onClick={resetProfile}/>

        <TweakSection label="Accent"/>
        <TweakColor
          label="Highlight color"
          value={t.accent === 'red' ? '#d33c1f' : '#0b66c2'}
          options={['#0b66c2', '#d33c1f']}
          onChange={(v) => setTweak('accent', v === '#d33c1f' ? 'red' : 'blue')}
        />
      </TweaksPanel>
    </div>
  );
}
