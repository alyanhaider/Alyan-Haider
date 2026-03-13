'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import SharedNav from '../components/SharedNav';

// Reduce motion on mobile for better performance
const mobileTransition =
  typeof window !== 'undefined' && window.innerWidth < 768
    ? { duration: 0.2, ease: 'easeOut' }
    : undefined; // undefined means use the component's own transition

/* ── CSS ──────────────────────────────────────────────────────────── */
const PROCESS_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@400;500;600;700;800&display=swap');

  :root {
    --teal:       #5EEAD4;
    --teal-dark:  #2DD4BF;
    --teal-hover: #14b8a6;
    --purple:     #A78BFA;
    --purple-lt:  #C4B5FD;
    --text:       #1a1a2e;
    --text-mid:   #44445a;
    --text-light: #8888aa;
    --nav-h:      80px;
  }

  /* ── PILL ── */
  .proc-page-pill {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px 16px;
    background: rgba(45,212,191,0.10);
    border: 1px solid rgba(45,212,191,0.28);
    border-radius: 50px;
    font-family: 'Inter', sans-serif;
    font-size: 11.5px;
    font-weight: 500;
    letter-spacing: 0.10em;
    text-transform: uppercase;
    color: #2DD4BF;
    margin-bottom: 20px;
  }
  .proc-page-pill-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #2DD4BF;
    animation: proc-pulse 2s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes proc-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.45; transform: scale(0.75); }
  }

  /* ── HERO ── */
  .proc-page-hero {
    text-align: center;
    padding: 120px 24px 72px;
    max-width: 760px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .proc-page-hero-h1 {
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: clamp(2.6rem, 6vw, 4.4rem);
    color: #1a1a2e;
    letter-spacing: -0.05em;
    line-height: 1.06;
    margin: 0;
  }
  .proc-page-hero-h1 .accent { color: #2DD4BF; }
  .proc-page-hero-sub {
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.88rem, 1.1vw, 1.05rem);
    color: #8888aa;
    max-width: 480px;
    margin: 14px auto 0;
    line-height: 1.72;
  }

  /* ── STATS ── */
  .proc-page-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    margin-top: 44px;
    flex-wrap: wrap;
  }
  .proc-page-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 36px;
  }
  .proc-page-stat:not(:last-child) {
    border-right: 1px solid rgba(167,139,250,0.20);
  }
  .proc-page-stat-val {
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    color: #1a1a2e;
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .proc-page-stat-label {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: #8888aa;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-top: 5px;
    white-space: nowrap;
  }

  /* ── DIVIDER ── */
  .proc-page-divider {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(167,139,250,0.20), transparent);
  }

  /* ── STEPS SECTION ── */
  .proc-page-steps-wrap {
    padding: 80px 24px 40px;
    max-width: 1100px;
    margin: 0 auto;
    position: relative;
  }

  /* Vertical connector line */
  .proc-page-connector {
    display: none;
  }
  @media (min-width: 768px) {
    .proc-page-connector {
      display: block;
      position: absolute;
      left: 50%;
      top: 80px;
      bottom: 80px;
      width: 2px;
      transform: translateX(-50%);
      background: linear-gradient(to bottom, #2DD4BF, #A78BFA);
      opacity: 0.20;
      pointer-events: none;
      border-radius: 2px;
      z-index: 0;
    }
  }

  .proc-page-steps-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0;
    position: relative;
    z-index: 1;
  }
  @media (min-width: 768px) {
    .proc-page-steps-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  /* Step cell */
  .proc-step-cell {
    padding: 48px 40px;
    position: relative;
  }
  @media (max-width: 767px) {
    .proc-step-cell {
      padding: 32px 8px;
    }
    /* On mobile, odd-index cells (right col on desktop) get a top separator */
    .proc-step-cell.proc-step-right {
      padding-top: 0;
    }
  }

  /* Large ghost number */
  .proc-step-ghost-num {
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: clamp(3rem, 6vw, 5rem);
    color: rgba(167,139,250,0.13);
    position: absolute;
    top: 40px;
    right: 28px;
    line-height: 1;
    pointer-events: none;
    user-select: none;
  }
  @media (max-width: 767px) {
    .proc-step-ghost-num { top: 24px; right: 12px; font-size: 2.8rem; }
  }

  /* Number badge */
  .proc-step-badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 50px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 11px;
    letter-spacing: 0.10em;
    text-transform: uppercase;
  }
  .proc-step-badge--teal {
    background: rgba(45,212,191,0.12);
    border: 1px solid rgba(45,212,191,0.28);
    color: #2DD4BF;
  }
  .proc-step-badge--purple {
    background: rgba(167,139,250,0.12);
    border: 1px solid rgba(167,139,250,0.28);
    color: #A78BFA;
  }

  .proc-step-icon {
    margin-top: 20px;
    margin-bottom: 4px;
  }

  .proc-step-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: clamp(1.4rem, 2.5vw, 1.9rem);
    color: #1a1a2e;
    margin-top: 12px;
    letter-spacing: -0.03em;
    line-height: 1.2;
  }

  .proc-step-desc {
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    color: #44445a;
    line-height: 1.8;
    margin-top: 10px;
    max-width: 440px;
  }

  .proc-step-detail {
    margin-top: 16px;
    padding: 14px 18px;
    border-radius: 0 8px 8px 0;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #44445a;
    line-height: 1.7;
    max-width: 420px;
  }
  .proc-step-detail--teal {
    background: rgba(45,212,191,0.07);
    border-left: 3px solid #2DD4BF;
  }
  .proc-step-detail--purple {
    background: rgba(167,139,250,0.07);
    border-left: 3px solid #A78BFA;
  }

  /* Right-aligned step (desktop odd-index) */
  @media (min-width: 768px) {
    .proc-step-right {
      padding-left: 60px;
    }
    .proc-step-left {
      padding-right: 60px;
    }
    /* On desktop, right cells align text to left (default), left cells also left */
    .proc-step-right .proc-step-ghost-num { right: auto; left: 28px; }
  }

  /* Step row separator on mobile */
  .proc-step-row-sep {
    display: block;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(167,139,250,0.15), transparent);
    margin: 0 0 0 0;
  }
  @media (min-width: 768px) { .proc-step-row-sep { display: none; } }

  /* ── GUARANTEES ── */
  .proc-page-guarantees-wrap {
    padding: 72px 24px;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }
  .proc-page-g-heading {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    color: #1a1a2e;
    letter-spacing: -0.04em;
    margin-top: 16px;
    line-height: 1.1;
  }
  .proc-page-g-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    margin-top: 40px;
    text-align: left;
  }
  .proc-page-g-card {
    background: #ffffff;
    border: 1px solid rgba(167,139,250,0.18);
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba(167,139,250,0.08);
  }
  .proc-page-g-bar { height: 3px; width: 100%; }
  .proc-page-g-body { padding: 20px 24px 24px; }
  .proc-page-g-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 15px;
    color: #1a1a2e;
    margin-top: 4px;
    line-height: 1.3;
  }
  .proc-page-g-body-text {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    color: #44445a;
    line-height: 1.7;
    margin-top: 8px;
  }

  /* ── CTA ── */
  .proc-page-cta-wrap {
    padding: 80px 24px 72px;
    max-width: 760px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .proc-page-cta-heading {
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: clamp(2rem, 4.5vw, 3rem);
    color: #1a1a2e;
    letter-spacing: -0.04em;
    line-height: 1.1;
    margin: 0;
  }
  .proc-page-cta-sub {
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.9rem, 1.2vw, 1.05rem);
    color: #8888aa;
    margin-top: 14px;
    line-height: 1.7;
    max-width: 460px;
  }
  .proc-page-cta-btns {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 36px;
  }
  .proc-page-btn-primary {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(135deg, #2DD4BF, #A78BFA);
    padding: 14px 30px;
    border-radius: 50px;
    border: none;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 6px 24px rgba(45,212,191,0.30);
    cursor: pointer;
    white-space: nowrap;
  }
  .proc-page-btn-outline {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 15px;
    color: #44445a;
    background: rgba(255,255,255,0.80);
    padding: 14px 28px;
    border-radius: 50px;
    border: 1px solid rgba(167,139,250,0.28);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    box-shadow: 0 2px 12px rgba(167,139,250,0.08);
    cursor: pointer;
    white-space: nowrap;
  }
  .proc-page-footer-line {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #8888aa;
    margin-top: 48px;
    opacity: 0.65;
  }

  /* ── MOBILE ── */
  @media (max-width: 640px) {
    .proc-page-hero { padding: 80px 20px 52px; }
    .proc-page-stat { padding: 0 20px; }
    .proc-page-stat:not(:last-child) {
      border-right: none;
      border-bottom: 1px solid rgba(167,139,250,0.15);
      padding-bottom: 16px;
      margin-bottom: 16px;
    }
    .proc-page-stats { flex-direction: column; gap: 0; }
    .proc-page-steps-wrap { padding: 48px 16px 24px; }
    .proc-page-guarantees-wrap { padding: 48px 16px; }
    .proc-page-cta-wrap { padding: 60px 20px 52px; }
    .proc-page-cta-btns { flex-direction: column; width: 100%; }
    .proc-page-btn-primary, .proc-page-btn-outline { justify-content: center; width: 100%; }
  }

  @media (max-width: 768px) {
    /* Remove GPU pre-allocation on elements that don't need it on mobile */
    .split-char,
    .proj-card,
    .proc-card,
    .parallax-card-container,
    .parallax-card-content,
    .parallax-image-circle {
      will-change: auto !important;
    }

    /* Disable 3D transform context on mobile — causes compositing cost */
    .projects-cards,
    .proj-card,
    .proc-stage {
      transform-style: flat !important;
      perspective: none !important;
    }
  }
`;

/* ── ICONS ──────────────────────────────────────────────────────────── */
function IconMessage({ color }: { color: string }): React.ReactElement {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.65">
      <rect x="10" y="18" width="60" height="40" rx="8" />
      <path d="M10 30l30 18 30-18" />
      <path d="M26 58l-10 10 4-10" />
    </svg>
  );
}

function IconScope({ color }: { color: string }): React.ReactElement {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.65">
      <rect x="18" y="10" width="44" height="60" rx="6" />
      <line x1="28" y1="28" x2="52" y2="28" />
      <line x1="28" y1="38" x2="52" y2="38" />
      <line x1="28" y1="48" x2="42" y2="48" />
      <circle cx="54" cy="54" r="10" />
      <line x1="61" y1="61" x2="68" y2="68" />
    </svg>
  );
}

function IconBuild({ color }: { color: string }): React.ReactElement {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.65">
      <polyline points="28,26 12,40 28,54" />
      <polyline points="52,26 68,40 52,54" />
      <line x1="44" y1="18" x2="36" y2="62" />
    </svg>
  );
}

function IconUpdate({ color }: { color: string }): React.ReactElement {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.65">
      <path d="M64 40a24 24 0 1 1-4.5-14" />
      <polyline points="64,16 64,30 50,30" />
      <line x1="40" y1="32" x2="40" y2="40" />
      <line x1="40" y1="44" x2="40" y2="48" />
    </svg>
  );
}

function IconRevise({ color }: { color: string }): React.ReactElement {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.65">
      <path d="M52 16l12 12-30 30-14 2 2-14 30-30z" />
      <line x1="44" y1="24" x2="56" y2="36" />
      <line x1="14" y1="66" x2="66" y2="66" />
    </svg>
  );
}

function IconHandover({ color }: { color: string }): React.ReactElement {
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.65">
      <rect x="16" y="44" width="48" height="22" rx="6" />
      <line x1="40" y1="38" x2="40" y2="14" />
      <polyline points="28,26 40,14 52,26" />
    </svg>
  );
}

type IconName = 'message' | 'scope' | 'build' | 'update' | 'revise' | 'handover';

function StepIcon({ icon, color }: { icon: IconName; color: string }): React.ReactElement {
  switch (icon) {
    case 'message':  return <IconMessage color={color} />;
    case 'scope':    return <IconScope color={color} />;
    case 'build':    return <IconBuild color={color} />;
    case 'update':   return <IconUpdate color={color} />;
    case 'revise':   return <IconRevise color={color} />;
    case 'handover': return <IconHandover color={color} />;
  }
}

/* ── DATA ───────────────────────────────────────────────────────────── */
interface Step {
  num: string;
  title: string;
  description: string;
  detail: string;
  accent: string;
  chipColor: 'teal' | 'purple';
  icon: IconName;
}

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Send Me a Message',
    description:
      'Tell me about your project — even a rough idea is fine. Send me a WhatsApp message, email, or Fiverr order. I respond to every inquiry within 24 hours, usually much faster.',
    detail:
      "No lengthy forms, no discovery calls before we've even said hello. Just send me a message and we'll talk like humans.",
    accent: '#2DD4BF',
    chipColor: 'teal',
    icon: 'message',
  },
  {
    num: '02',
    title: 'We Scope the Project',
    description:
      "We'll have a quick back-and-forth to define exactly what needs to be built, the timeline, and the budget. I'll ask the right questions so nothing gets missed.",
    detail:
      'You get a clear written proposal before any work starts. Fixed-price for defined projects. Hourly for evolving ones. No surprises.',
    accent: '#A78BFA',
    chipColor: 'purple',
    icon: 'scope',
  },
  {
    num: '03',
    title: 'I Start Building',
    description:
      'Work begins within 24–48 hours of your approval. I build in focused sprints, testing as I go. You get a live staging link early so you can see real progress.',
    detail:
      "I don't disappear for two weeks and return with a finished product. You're involved throughout without being overwhelmed.",
    accent: '#2DD4BF',
    chipColor: 'teal',
    icon: 'build',
  },
  {
    num: '04',
    title: 'Regular Updates',
    description:
      'I send progress updates every 1–2 days. You can review the staging link, give feedback, and request adjustments in real time — not just at the end.',
    detail:
      'Communication is always clear and in plain English. No technical jargon unless you want it.',
    accent: '#A78BFA',
    chipColor: 'purple',
    icon: 'update',
  },
  {
    num: '05',
    title: 'Revisions Until Perfect',
    description:
      "Once the build is complete, we go through a revision round. Minor changes are always free. I don't move on until you are genuinely satisfied with the result.",
    detail:
      'Basic: 2 revisions. Standard: 4 revisions. Premium: unlimited. Extra revisions available for $5 each.',
    accent: '#2DD4BF',
    chipColor: 'teal',
    icon: 'revise',
  },
  {
    num: '06',
    title: 'Clean Handover',
    description:
      'You receive 100% of the source code, full documentation, deployment instructions, and a handover call if needed. The project is yours completely.',
    detail:
      'Deployed to Vercel, AWS, or your preferred host. I help you go live and stay available for questions after delivery.',
    accent: '#A78BFA',
    chipColor: 'purple',
    icon: 'handover',
  },
];

interface Guarantee {
  title: string;
  body: string;
  accent: string;
}

const GUARANTEES: Guarantee[] = [
  {
    title: 'You Own the Code',
    body: '100% source code ownership on full payment. No licenses, no restrictions.',
    accent: '#2DD4BF',
  },
  {
    title: 'Fixed Price = Fixed Price',
    body: "No scope creep charges. If I missed something I said I'd build, I build it.",
    accent: '#A78BFA',
  },
  {
    title: "I Don't Disappear",
    body: "Active communication throughout. You will never be left wondering what's happening.",
    accent: '#2DD4BF',
  },
  {
    title: 'Mobile-First Always',
    body: 'Every project is responsive by default. Mobile-first is not an add-on.',
    accent: '#A78BFA',
  },
];

/* ── HERO ───────────────────────────────────────────────────────────── */
function HeroSection(): React.ReactElement {
  return (
    <div className="proc-page-hero">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="proc-page-pill">
          <span className="proc-page-pill-dot" />
          How I Work
        </div>
      </motion.div>

      <motion.h1
        className="proc-page-hero-h1"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.2 }}
      >
        Simple Process,
        <br />
        Zero <span className="accent">Surprises</span>
      </motion.h1>

      <motion.p
        className="proc-page-hero-sub"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.4 }}
      >
        From first message to final delivery — here is exactly what working with
        me looks like.
      </motion.p>

      <motion.div
        className="proc-page-stats"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.55 }}
      >
        <div className="proc-page-stat">
          <span className="proc-page-stat-val">24h</span>
          <span className="proc-page-stat-label">First Response</span>
        </div>
        <div className="proc-page-stat">
          <span className="proc-page-stat-val">48h</span>
          <span className="proc-page-stat-label">Project Start</span>
        </div>
        <div className="proc-page-stat">
          <span className="proc-page-stat-val">100%</span>
          <span className="proc-page-stat-label">Code Ownership</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ── STEPS SECTION ──────────────────────────────────────────────────── */
function StepsSection(): React.ReactElement {
  // On desktop: even-index (0,2,4) go in left col, odd-index (1,3,5) go in right col
  // The grid is 2 columns, items naturally flow left→right, row by row
  // Steps are: [0-left, 1-right, 2-left, 3-right, 4-left, 5-right]

  return (
    <div className="proc-page-steps-wrap">
      <div className="proc-page-connector" />
      <div className="proc-page-steps-grid">
        {STEPS.map((step, index) => {
          const isRight = index % 2 === 1;
          const dirX = isRight ? 30 : -30;

          return (
            <React.Fragment key={step.num}>
              <motion.div
                className={`proc-step-cell ${isRight ? 'proc-step-right' : 'proc-step-left'}`}
                initial={{ opacity: 0, x: dirX }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={mobileTransition ?? { delay: 0.1, duration: 0.7, ease: 'easeOut' }}
              >
                {/* Ghost number */}
                <span className="proc-step-ghost-num" aria-hidden="true">
                  {step.num}
                </span>

                {/* Badge */}
                <span
                  className={`proc-step-badge proc-step-badge--${step.chipColor}`}
                >
                  STEP {step.num}
                </span>

                {/* Icon */}
                <div className="proc-step-icon">
                  <StepIcon icon={step.icon} color={step.accent} />
                </div>

                {/* Title */}
                <h3 className="proc-step-title">{step.title}</h3>

                {/* Description */}
                <p className="proc-step-desc">{step.description}</p>

                {/* Detail callout */}
                <div
                  className={`proc-step-detail proc-step-detail--${step.chipColor}`}
                >
                  {step.detail}
                </div>
              </motion.div>

              {/* Mobile row separator between pairs */}
              {isRight && index < STEPS.length - 1 && (
                <div
                  className="proc-step-row-sep"
                  style={{ gridColumn: '1 / -1' }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

/* ── GUARANTEES SECTION ─────────────────────────────────────────────── */
function GuaranteesSection(): React.ReactElement {
  return (
    <div className="proc-page-guarantees-wrap">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={mobileTransition ?? { duration: 0.55 }}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <div className="proc-page-pill">
          <span className="proc-page-pill-dot" />
          My Guarantees
        </div>
      </motion.div>

      <motion.h2
        className="proc-page-g-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={mobileTransition ?? { duration: 0.55, delay: 0.12 }}
      >
        What You Can Always Count On
      </motion.h2>

      <div className="proc-page-g-grid">
        {GUARANTEES.map((g, i) => (
          <motion.div
            key={g.title}
            className="proc-page-g-card"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={mobileTransition ?? { delay: i * 0.1, duration: 0.55, ease: 'easeOut' }}
            whileHover={
              window.innerWidth > 768 ? { y: -4, boxShadow: '0 12px 36px rgba(167,139,250,0.14)' } : {}
            }
          >
            <div
              className="proc-page-g-bar"
              style={{
                background: `linear-gradient(to right, ${g.accent}, ${g.accent}44)`,
              }}
            />
            <div className="proc-page-g-body">
              <p className="proc-page-g-title">{g.title}</p>
              <p className="proc-page-g-body-text">{g.body}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── CTA SECTION ────────────────────────────────────────────────────── */
function CTASection(): React.ReactElement {
  return (
    <div className="proc-page-cta-wrap">
      <div className="proc-page-divider" style={{ marginBottom: '72px', width: '100%' }} />

      <motion.h2
        className="proc-page-cta-heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={mobileTransition ?? { duration: 0.6 }}
      >
        Ready to Get Started?
      </motion.h2>

      <motion.p
        className="proc-page-cta-sub"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={mobileTransition ?? { duration: 0.6, delay: 0.14 }}
      >
        Send me a message and we'll have your project scoped within 24 hours.
      </motion.p>

      <motion.div
        className="proc-page-cta-btns"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={mobileTransition ?? { duration: 0.6, delay: 0.26 }}
      >
        <motion.a
          href="https://www.fiverr.com/alyan_haider259"
          target="_blank"
          rel="noopener noreferrer"
          className="proc-page-btn-primary"
          whileHover={
            window.innerWidth > 768
              ? { scale: 1.05, boxShadow: '0 10px 34px rgba(45,212,191,0.40)' }
              : {}
          }
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          Start on Fiverr
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </motion.a>

        <motion.a
          href="https://wa.me/923255629527"
          target="_blank"
          rel="noopener noreferrer"
          className="proc-page-btn-outline"
          whileHover={
            window.innerWidth > 768
              ? {
                  scale: 1.03,
                  borderColor: 'rgba(94,234,212,0.50)',
                  background: 'rgba(255,255,255,0.95)',
                }
              : {}
          }
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          WhatsApp Me
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </motion.a>
      </motion.div>

      <p className="proc-page-footer-line">
        © 2025 Alyan Haider · Built with React + Framer Motion + TypeScript
      </p>
    </div>
  );
}

/* ── PAGE ───────────────────────────────────────────────────────────── */
export default function ProcessPage(): React.ReactElement {
  useEffect(() => {
    if (document.getElementById('process-page-styles')) return;
    const style = document.createElement('style');
    style.id = 'process-page-styles';
    style.textContent = PROCESS_CSS;
    document.head.appendChild(style);
  }, []);

  return (
    <>
      <SharedNav activePage="process" />
      <main
        style={{
          minHeight: '100vh',
          overflowX: 'hidden',
          paddingTop: 'var(--nav-h, 80px)',
          background: 'transparent',
        }}
      >
        <HeroSection />
        <div className="proc-page-divider" />
        <StepsSection />
        <div className="proc-page-divider" />
        <GuaranteesSection />
        <CTASection />
      </main>
    </>
  );
}
