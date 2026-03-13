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
const WORK_CSS = `
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
    --bg:         #f9f8ff;
  }

  /* ── PILL LABEL ── */
  .work-pill {
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
    color: var(--teal-dark);
    margin-bottom: 20px;
  }
  .work-pill-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: var(--teal-dark);
    animation: work-pulse 2s ease-in-out infinite;
    flex-shrink: 0;
  }
  @keyframes work-pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50%       { opacity: 0.45; transform: scale(0.75); }
  }

  /* ── HERO ── */
  .work-hero {
    text-align: center;
    padding: 120px 24px 72px;
    max-width: 760px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .work-hero-h1 {
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: clamp(2.6rem, 6vw, 4.4rem);
    color: var(--text);
    letter-spacing: -0.05em;
    line-height: 1.06;
    margin: 0;
  }
  .work-hero-h1 .accent { color: var(--teal-dark); }

  .work-hero-sub {
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.88rem, 1.1vw, 1.05rem);
    color: var(--text-light);
    max-width: 480px;
    margin: 14px auto 0;
    line-height: 1.72;
  }

  /* ── STATS ROW ── */
  .work-stats {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0;
    margin-top: 44px;
    flex-wrap: wrap;
  }
  .work-stat {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 36px;
  }
  .work-stat:not(:last-child) {
    border-right: 1px solid rgba(167,139,250,0.20);
  }
  .work-stat-val {
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: clamp(1.6rem, 3vw, 2.2rem);
    color: var(--text);
    letter-spacing: -0.04em;
    line-height: 1;
  }
  .work-stat-label {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-weight: 500;
    color: var(--text-light);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-top: 5px;
    white-space: nowrap;
  }

  /* ── PROJECTS GRID ── */
  .work-projects-wrap {
    padding: 72px 24px;
    max-width: 1160px;
    margin: 0 auto;
  }
  .work-projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 28px;
  }

  /* ── PROJECT CARD ── */
  .work-card {
    background: #ffffff;
    border: 1px solid rgba(167,139,250,0.18);
    border-radius: 20px;
    overflow: hidden;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    box-shadow: 0 4px 24px rgba(167,139,250,0.10);
    transition: box-shadow 0.3s ease;
  }

  .work-card-accent-bar {
    height: 4px;
    width: 100%;
    flex-shrink: 0;
  }

  .work-card-body {
    padding: 28px 28px 24px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .work-card-num {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 11px;
    color: var(--text-light);
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }

  .work-card-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: clamp(1.3rem, 2.2vw, 1.6rem);
    color: var(--text);
    margin-top: 8px;
    line-height: 1.2;
    letter-spacing: -0.02em;
  }

  .work-card-subtitle {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 13px;
    margin-top: 4px;
  }

  .work-card-desc {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    color: var(--text-mid);
    line-height: 1.75;
    margin-top: 12px;
  }

  .work-card-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 16px;
  }
  .work-card-tag {
    background: rgba(167,139,250,0.08);
    border: 1px solid rgba(167,139,250,0.18);
    border-radius: 50px;
    padding: 4px 12px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 11px;
    color: var(--text-light);
  }

  .work-card-footer {
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid rgba(167,139,250,0.10);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .work-card-num-badge {
    border-radius: 50px;
    padding: 4px 12px;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 11px;
    letter-spacing: 0.08em;
  }

  .work-card-link {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size: 13px;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    transition: opacity 0.2s;
  }
  .work-card-link:hover { opacity: 0.75; }

  /* ── TECH STACK ── */
  .work-tech-wrap {
    padding: 72px 24px;
    max-width: 900px;
    margin: 0 auto;
    text-align: center;
  }

  .work-tech-heading {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    color: var(--text);
    letter-spacing: -0.04em;
    margin-top: 16px;
    line-height: 1.1;
  }

  .work-tech-chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 12px;
    margin-top: 36px;
  }

  .work-tech-chip {
    border-radius: 50px;
    padding: 8px 18px;
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 13px;
    cursor: default;
    user-select: none;
  }
  .work-tech-chip--teal {
    background: rgba(45,212,191,0.10);
    border: 1px solid rgba(45,212,191,0.25);
    color: #2DD4BF;
  }
  .work-tech-chip--purple {
    background: rgba(167,139,250,0.10);
    border: 1px solid rgba(167,139,250,0.25);
    color: #A78BFA;
  }

  /* ── CTA SECTION ── */
  .work-cta-wrap {
    padding: 80px 24px 72px;
    max-width: 760px;
    margin: 0 auto;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .work-cta-heading {
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: clamp(2rem, 4.5vw, 3rem);
    color: var(--text);
    letter-spacing: -0.04em;
    line-height: 1.1;
    margin: 0;
  }

  .work-cta-sub {
    font-family: 'Inter', sans-serif;
    font-size: clamp(0.9rem, 1.2vw, 1.05rem);
    color: var(--text-light);
    margin-top: 14px;
    line-height: 1.7;
    max-width: 460px;
  }

  .work-cta-btns {
    display: flex;
    gap: 14px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 36px;
  }

  .work-btn-primary {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(135deg, var(--teal-dark), var(--purple));
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

  .work-btn-outline {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: 15px;
    color: var(--text-mid);
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

  .work-footer-line {
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: var(--text-light);
    margin-top: 48px;
    opacity: 0.65;
  }

  /* ── DIVIDER ── */
  .work-divider {
    width: 100%;
    max-width: 1100px;
    margin: 0 auto;
    height: 1px;
    background: linear-gradient(to right, transparent, rgba(167,139,250,0.20), transparent);
  }

  /* ── MOBILE ── */
  @media (max-width: 640px) {
    .work-hero { padding: 80px 20px 52px; }
    .work-stat { padding: 0 20px; }
    .work-stat:not(:last-child) { border-right: none; border-bottom: 1px solid rgba(167,139,250,0.15); padding-bottom: 16px; margin-bottom: 16px; }
    .work-stats { flex-direction: column; gap: 0; }
    .work-projects-wrap { padding: 48px 16px; }
    .work-projects-grid { grid-template-columns: 1fr; gap: 20px; }
    .work-tech-wrap { padding: 48px 16px; }
    .work-cta-wrap { padding: 60px 20px 52px; }
    .work-cta-btns { flex-direction: column; width: 100%; }
    .work-btn-primary, .work-btn-outline { justify-content: center; width: 100%; }
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

/* ── DATA ───────────────────────────────────────────────────────────── */
interface Project {
  id: number;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  accent: string;
  href: string;
  chipColor: 'teal' | 'purple';
}

const PROJECTS: Project[] = [
  {
    id: 1,
    num: '01',
    title: 'Fatah Hotel',
    subtitle: 'Hotel Booking Platform',
    description:
      'A modern hotel booking website with room listings, reservation system, and responsive design built for a real hospitality client.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
    accent: '#2DD4BF',
    href: 'https://fatah-hotel.vercel.app/',
    chipColor: 'teal',
  },
  {
    id: 2,
    num: '02',
    title: 'Nexus Marketplace',
    subtitle: 'Multi-Vendor E-Commerce',
    description:
      'A full-stack multi-vendor marketplace with product listings, vendor dashboards, cart system, and payment-ready architecture.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Express'],
    accent: '#A78BFA',
    href: 'https://nexus-marketplace-smoky.vercel.app/',
    chipColor: 'purple',
  },
  {
    id: 3,
    num: '03',
    title: 'Car Showcase',
    subtitle: 'Automotive Listing Site',
    description:
      'A sleek car showcase platform with filtering, search, and detailed vehicle pages — built for performance and mobile-first browsing.',
    tags: ['React', 'TypeScript', 'Tailwind CSS', 'Vercel'],
    accent: '#2DD4BF',
    href: 'https://car-showcase-site-teal.vercel.app/',
    chipColor: 'teal',
  },
];

interface Tech {
  name: string;
  color: 'teal' | 'purple';
}

const TECH: Tech[] = [
  { name: 'React', color: 'teal' },
  { name: 'Next.js', color: 'purple' },
  { name: 'TypeScript', color: 'teal' },
  { name: 'Node.js', color: 'teal' },
  { name: 'Express', color: 'purple' },
  { name: 'PostgreSQL', color: 'teal' },
  { name: 'MongoDB', color: 'purple' },
  { name: 'Supabase', color: 'teal' },
  { name: 'Tailwind CSS', color: 'purple' },
  { name: 'Framer Motion', color: 'teal' },
  { name: 'Docker', color: 'purple' },
  { name: 'Vercel', color: 'teal' },
  { name: 'GitHub Actions', color: 'purple' },
  { name: 'AWS', color: 'teal' },
];

/* ── HERO SECTION ───────────────────────────────────────────────────── */
function HeroSection(): React.ReactElement {
  return (
    <div className="work-hero">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <div className="work-pill">
          <span className="work-pill-dot" />
          Selected Projects
        </div>
      </motion.div>

      <motion.h1
        className="work-hero-h1"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.2 }}
      >
        Real Projects,
        <br />
        Real <span className="accent">Results</span>
      </motion.h1>

      <motion.p
        className="work-hero-sub"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.4 }}
      >
        Hand-picked work across SaaS, e-commerce, marketplaces, and business
        platforms.
      </motion.p>

      <motion.div
        className="work-stats"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, delay: 0.55 }}
      >
        <div className="work-stat">
          <span className="work-stat-val">3+</span>
          <span className="work-stat-label">Live Projects</span>
        </div>
        <div className="work-stat">
          <span className="work-stat-val">$80</span>
          <span className="work-stat-label">Starting Price</span>
        </div>
        <div className="work-stat">
          <span className="work-stat-val">5★</span>
          <span className="work-stat-label">Fiverr Rating</span>
        </div>
      </motion.div>
    </div>
  );
}

/* ── PROJECT CARD ───────────────────────────────────────────────────── */
interface ProjectCardProps {
  project: Project;
  index: number;
}

function ProjectCard({ project, index }: ProjectCardProps): React.ReactElement {
  const isTeal = project.chipColor === 'teal';
  const badgeStyle: React.CSSProperties = isTeal
    ? {
        background: 'rgba(45,212,191,0.12)',
        border: '1px solid rgba(45,212,191,0.28)',
        color: '#2DD4BF',
      }
    : {
        background: 'rgba(167,139,250,0.12)',
        border: '1px solid rgba(167,139,250,0.28)',
        color: '#A78BFA',
      };

  return (
    <motion.div
      className="work-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={mobileTransition ?? { delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
      whileHover={
        window.innerWidth > 768
          ? {
              y: -6,
              boxShadow: '0 16px 48px rgba(167,139,250,0.18)',
            }
          : {}
      }
    >
      {/* Accent bar */}
      <div
        className="work-card-accent-bar"
        style={{
          background: `linear-gradient(to right, ${project.accent}, ${project.accent}44)`,
        }}
      />

      <div className="work-card-body">
        <span className="work-card-num">Project {project.num}</span>
        <h3 className="work-card-title">{project.title}</h3>
        <p className="work-card-subtitle" style={{ color: project.accent }}>
          {project.subtitle}
        </p>
        <p className="work-card-desc">{project.description}</p>

        <div className="work-card-tags">
          {project.tags.map((tag) => (
            <span key={tag} className="work-card-tag">
              {tag}
            </span>
          ))}
        </div>

        <div className="work-card-footer">
          <span className="work-card-num-badge" style={badgeStyle}>
            {project.num}
          </span>

          <motion.a
            className="work-card-link"
            style={{ color: project.accent }}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={window.innerWidth > 768 ? { x: 4 } : {}}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            View Project →
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
}

/* ── PROJECTS GRID SECTION ──────────────────────────────────────────── */
function ProjectsGrid(): React.ReactElement {
  return (
    <div className="work-projects-wrap">
      <div className="work-projects-grid">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}

/* ── TECH STACK SECTION ─────────────────────────────────────────────── */
function TechStackSection(): React.ReactElement {
  return (
    <div className="work-tech-wrap">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={mobileTransition ?? { duration: 0.55 }}
        style={{ display: 'flex', justifyContent: 'center' }}
      >
        <div className="work-pill">
          <span className="work-pill-dot" />
          Technologies I Use
        </div>
      </motion.div>

      <motion.h2
        className="work-tech-heading"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={mobileTransition ?? { duration: 0.55, delay: 0.12 }}
      >
        Tools That Power My Work
      </motion.h2>

      <div className="work-tech-chips">
        {TECH.map((tech, i) => (
          <motion.div
            key={tech.name}
            className={`work-tech-chip work-tech-chip--${tech.color}`}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={mobileTransition ?? { delay: i * 0.04, duration: 0.4, ease: 'easeOut' }}
            whileHover={window.innerWidth > 768 ? { scale: 1.08, y: -2 } : {}}
          >
            {tech.name}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── CTA SECTION ────────────────────────────────────────────────────── */
function CTASection(): React.ReactElement {
  return (
    <div className="work-cta-wrap">
      <div className="work-divider" style={{ marginBottom: '72px' }} />

      <motion.h2
        className="work-cta-heading"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={mobileTransition ?? { duration: 0.6 }}
      >
        Want to Build Something?
      </motion.h2>

      <motion.p
        className="work-cta-sub"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={mobileTransition ?? { duration: 0.6, delay: 0.14 }}
      >
        I&apos;m available for freelance, contract, and full-time remote work.
        Let&apos;s talk.
      </motion.p>

      <motion.div
        className="work-cta-btns"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={mobileTransition ?? { duration: 0.6, delay: 0.26 }}
      >
        <motion.a
          href="https://www.fiverr.com/alyan_haider259"
          target="_blank"
          rel="noopener noreferrer"
          className="work-btn-primary"
          whileHover={
            window.innerWidth > 768
              ? { scale: 1.05, boxShadow: '0 10px 34px rgba(45,212,191,0.40)' }
              : {}
          }
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        >
          View on Fiverr
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
          className="work-btn-outline"
          whileHover={
            window.innerWidth > 768
              ? { scale: 1.03, borderColor: 'rgba(94,234,212,0.50)', background: 'rgba(255,255,255,0.95)' }
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

      <p className="work-footer-line">
        © 2025 Alyan Haider · Built with React + Framer Motion + TypeScript
      </p>
    </div>
  );
}

/* ── PAGE ───────────────────────────────────────────────────────────── */
export default function WorkPage(): React.ReactElement {
  useEffect(() => {
    if (document.getElementById('work-page-styles')) return;
    const style = document.createElement('style');
    style.id = 'work-page-styles';
    style.textContent = WORK_CSS;
    document.head.appendChild(style);
  }, []);

  return (
    <>
      <SharedNav activePage="work" />
      <main
        style={{
          minHeight: '100vh',
          overflowX: 'hidden',
          paddingTop: 'var(--nav-h, 80px)',
          background: 'transparent',
        }}
      >
        <HeroSection />
        <ProjectsGrid />
        <div className="work-divider" />
        <TechStackSection />
        <CTASection />
      </main>
    </>
  );
}
