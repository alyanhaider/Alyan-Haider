import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useAnimationControls } from "framer-motion";
import SharedNav from "../components/SharedNav";

// Reduce motion on mobile for better performance
const mobileTransition =
  typeof window !== "undefined" && window.innerWidth < 768
    ? { duration: 0.2, ease: "easeOut" }
    : undefined; // undefined means use the component's own transition

/* ══════════════════════════════════════════════════════════════════════════════
   PALETTE
══════════════════════════════════════════════════════════════════════════════ */
const P = {
  teal:       "#5EEAD4",
  tealDark:   "#2DD4BF",
  tealHover:  "#14b8a6",
  purple:     "#A78BFA",
  purpleLt:   "#C4B5FD",
  text:       "#1a1a2e",
  textMid:    "#44445a",
  textLight:  "#8888aa",
  bg:         "#f9f8ff",
  white:      "#ffffff",
} as const;

/* ══════════════════════════════════════════════════════════════════════════════
   CSS INJECTION
══════════════════════════════════════════════════════════════════════════════ */
const FAQ_CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@400;500;600;700;800&display=swap');

.faq-bg {
  background:
    radial-gradient(ellipse 72% 58% at 14%  8%,  rgba(167,139,250,0.42) 0%, transparent 68%),
    radial-gradient(ellipse 54% 44% at 82%  5%,  rgba(196,181,253,0.28) 0%, transparent 62%),
    radial-gradient(ellipse 48% 42% at 95% 52%,  rgba(94,234,212,0.32)  0%, transparent 62%),
    radial-gradient(ellipse 55% 48% at 48% 92%,  rgba(251,191,36,0.16)  0%, transparent 62%),
    radial-gradient(ellipse 52% 46% at 5%  85%,  rgba(45,212,191,0.26)  0%, transparent 62%),
    radial-gradient(ellipse 62% 42% at 52% 44%,  rgba(224,231,255,0.38) 0%, transparent 68%),
    #f9f8ff;
  animation: faqBgBreath 16s ease-in-out infinite alternate;
}

@keyframes faqBgBreath {
  0%   { filter: hue-rotate(0deg)   brightness(1.00); }
  50%  { filter: hue-rotate(7deg)   brightness(1.02); }
  100% { filter: hue-rotate(-5deg)  brightness(0.99); }
}

@keyframes faqFadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes spinRing {
  to { transform: rotate(360deg); }
}

@keyframes floatBook {
  0%,100% { transform: translateY(0px); }
  50%      { transform: translateY(-10px); }
}

.book-float-faq { animation: floatBook 5s ease-in-out infinite; }

::-webkit-scrollbar { width: 5px; }
::-webkit-scrollbar-track { background: #f9f8ff; }
::-webkit-scrollbar-thumb { background: rgba(167,139,250,0.35); border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: rgba(45,212,191,0.50); }

.faq-btn:focus-visible {
  outline: 2px solid rgba(45,212,191,0.55);
  outline-offset: 2px;
  border-radius: 12px;
}

@media (max-width: 768px) {
  /* Simplify book transforms on mobile */
  [class*="book"],
  [class*="Book"] {
    perspective: none !important;
    transform-style: flat !important;
    will-change: auto !important;
  }

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

/* ══════════════════════════════════════════════════════════════════════════════
   FAQ DATA
══════════════════════════════════════════════════════════════════════════════ */
interface FAQItem {
  id: number;
  category: string;
  chipColor: "teal" | "purple";
  question: string;
  answer: string;
  hasLink?: boolean;
  linkText?: string;
  linkHref?: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    id: 1, category: "Services", chipColor: "teal",
    question: "What kind of projects do you build?",
    answer: "I build everything from simple responsive websites ($80, 1 page) to full-stack web applications with authentication, dashboards, databases, and custom functionality ($350+). This includes SaaS platforms, e-commerce stores, business dashboards, REST APIs, and landing pages — end to end.",
  },
  {
    id: 2, category: "Services", chipColor: "teal",
    question: "Do you do frontend-only or backend-only work?",
    answer: "Yes — you can hire me for just the frontend (React, Next.js, Tailwind CSS, animations) or just the backend (Node.js, Express, PostgreSQL, MongoDB, Supabase, REST APIs). Most clients hire me full-stack, but partial-scope work is absolutely fine.",
  },
  {
    id: 3, category: "Services", chipColor: "teal",
    question: "Do you handle design as well as development?",
    answer: "Yes. I handle UI/UX design as part of every project — designing in the browser using Tailwind CSS and component libraries. If you have a Figma file or brand guidelines I follow them precisely. Everything I deliver is mobile-first and looks polished on all screen sizes.",
  },
  {
    id: 4, category: "Pricing", chipColor: "purple",
    question: "What are your packages and prices?",
    answer: "Basic ($80): 1-page starter website, modern design, 3-day delivery, 2 revisions, 1 plugin, hosting setup included. Standard ($200): 4-page professional website with dashboard, database integration, 6-day delivery, 4 revisions, payment integration, speed optimization. Premium ($350): 7-page advanced web application with full-stack auth, e-commerce (10 products), unlimited revisions, 10-day delivery, all features included.",
    hasLink: true, linkText: "See full package details on Fiverr", linkHref: "https://www.fiverr.com/alyan_haider259",
  },
  {
    id: 5, category: "Pricing", chipColor: "purple",
    question: "What add-ons and extras are available?",
    answer: "Additional page: +$10 (+1 day). Extra revision: +$5. Content upload: +$15 (+1 day). Additional plugin: +$15 (+1 day). E-commerce functionality: +$70 (+3 days). Additional product: +$5. Payment integration: +$40 (+1 day). Opt-in form: +$15 (+1 day). Autoresponder integration: +$20 (+1 day). Speed optimization: +$30 (+1 day). Hosting setup: +$20 (+1 day).",
  },
  {
    id: 6, category: "Pricing", chipColor: "purple",
    question: "Can I get my project delivered faster?",
    answer: "Yes. Express delivery is available on all packages: Basic in 1 day for +$20, Standard in 3 days for +$40, Premium in 5 days for +$60. Just select the fast delivery add-on when ordering on Fiverr or mention it when messaging me directly.",
  },
  {
    id: 7, category: "Pricing", chipColor: "purple",
    question: "Do you offer fixed-price or hourly rates?",
    answer: "Both. My Fiverr packages are fixed-price so you know the full cost upfront — no surprises. For ongoing work, maintenance, or larger custom projects outside Fiverr, I can work on an hourly or monthly retainer basis. We agree on the model before any work starts.",
  },
  {
    id: 8, category: "Process", chipColor: "teal",
    question: "How do we get started working together?",
    answer: "You can order directly on Fiverr (Basic $80 / Standard $200 / Premium $350), or send me a message on WhatsApp or email describing your project. I will reply within 24 hours with a clear proposal. Once agreed, I begin within 24–48 hours.",
    hasLink: true, linkText: "Message me on WhatsApp", linkHref: "https://wa.me/923255629527",
  },
  {
    id: 9, category: "Process", chipColor: "teal",
    question: "How do you keep me updated during the project?",
    answer: "I send progress updates every 1–2 days. You will get a live staging link early so you can see the actual app building, not just screenshots. I am reachable on WhatsApp and email during working hours and always respond within a few hours.",
  },
  {
    id: 10, category: "Process", chipColor: "teal",
    question: "Will I own the source code after delivery?",
    answer: "Yes — 100%. Once the project is paid in full, all source code belongs to you. I do not add licensing restrictions. You receive a clean handover with the full repository, documentation, and deployment instructions.",
  },
  {
    id: 11, category: "Process", chipColor: "teal",
    question: "Do you sign NDAs or contracts?",
    answer: "Yes. If your project is sensitive I am happy to sign an NDA before you share any details. For larger projects I can also work with a formal contract. Your idea and data are safe with me.",
  },
  {
    id: 12, category: "Revisions", chipColor: "teal",
    question: "How many revisions do I get?",
    answer: "Basic package: 2 revisions. Standard package: 4 revisions. Premium package: unlimited revisions. Need more on Basic or Standard? Extra revisions are available for just $5 each. My goal is that you are genuinely happy with what you receive.",
  },
  {
    id: 13, category: "Revisions", chipColor: "teal",
    question: "What if I want changes after delivery?",
    answer: "Minor bug fixes after delivery are always included at no extra charge. For new features or significant scope changes after completion we agree on a separate quote. I do not disappear once the project is handed over — your satisfaction is the finish line.",
  },
  {
    id: 14, category: "Tech", chipColor: "purple",
    question: "What technologies do you work with?",
    answer: "Frontend: React, Next.js, TypeScript, Tailwind CSS, Framer Motion, GSAP. Backend: Node.js, Express, PostgreSQL, MongoDB, Supabase. Infrastructure: Docker, Vercel, AWS basics, GitHub Actions. I pick the right stack for your project — not just what I prefer.",
  },
  {
    id: 15, category: "Tech", chipColor: "purple",
    question: "Will my website be mobile-friendly?",
    answer: "Every single project I build is mobile-first by default. Responsive design is not an add-on — it is built in from day one. I test on real device sizes throughout development, not just at the end before delivery.",
  },
  {
    id: 16, category: "Tech", chipColor: "purple",
    question: "Can you work with an existing codebase?",
    answer: "Absolutely. I regularly jump into existing projects to add features, fix bugs, refactor messy code, or improve performance. Just share your repo and I will review it before we agree on scope and price.",
  },
  {
    id: 17, category: "Working Together", chipColor: "purple",
    question: "Where can I hire you?",
    answer: "You can order on Fiverr for secure escrow and buyer protection, or work with me directly via WhatsApp or email for a custom quote with no platform fees. Both options are available — direct is usually faster and slightly more cost-effective.",
    hasLink: true, linkText: "Order on Fiverr", linkHref: "https://www.fiverr.com/alyan_haider259",
  },
  {
    id: 18, category: "Working Together", chipColor: "purple",
    question: "Are you available for long-term work?",
    answer: "Yes and I actively prefer it. Long-term relationships mean I deeply understand your product and deliver better results faster over time. I am open to monthly retainers, ongoing contracts, and full-time remote positions.",
  },
  {
    id: 19, category: "Working Together", chipColor: "purple",
    question: "What time zone are you in and are you flexible?",
    answer: "I am based in Pakistan (PKT, UTC+5). I work with clients across Europe, North America, the Middle East and Australia. I am flexible with overlap hours and for ongoing clients I can partially adjust my schedule to match yours.",
  },
  {
    id: 20, category: "Working Together", chipColor: "purple",
    question: "What makes you different from other developers?",
    answer: "I ship complete, working products — not just code. I care about the actual outcome for your business. I communicate clearly, meet deadlines, and do not disappear mid-project. Every package on Fiverr includes hosting setup or e-commerce or payment integration depending on tier — real features, not just design.",
  },
];

/* ══════════════════════════════════════════════════════════════════════════════
   BOOK DATA
══════════════════════════════════════════════════════════════════════════════ */
interface PageFace {
  label: string;
  title: string;
  subtitle: string;
  body: string;
  accent: string;
  bg: string;
}

interface BookLeaf {
  type: "cover" | "inner" | "back-cover";
  front: PageFace;
  back: PageFace;
}

const FAQ_BOOK_PAGES: BookLeaf[] = [
  {
    type: "cover",
    front: {
      label: "",
      title: "Quick\nAnswers",
      subtitle: "Alyan Haider · Full Stack Dev",
      body: "Flip through for quick answers about my services, pricing, timelines, and how we work together.",
      accent: P.tealDark,
      bg: "linear-gradient(145deg, rgba(45,212,191,0.18) 0%, rgba(167,139,250,0.14) 100%)",
    },
    back: {
      label: "Services",
      title: "What Do\nI Build?",
      subtitle: "",
      body: "Starter websites from $80 · Professional multi-page apps from $200 · Full-stack SaaS platforms from $350. E-commerce, dashboards, REST APIs and more.",
      accent: P.purple,
      bg: "linear-gradient(145deg, rgba(167,139,250,0.20) 0%, rgba(196,181,253,0.12) 100%)",
    },
  },
  {
    type: "inner",
    front: {
      label: "Pricing",
      title: "How Much\nDoes It Cost?",
      subtitle: "",
      body: "Basic: $80 — 1 page, 3 days. Standard: $200 — 4 pages, 6 days. Premium: $350 — 7 pages, 10 days, unlimited revisions, full-stack features.",
      accent: P.tealDark,
      bg: "linear-gradient(145deg, rgba(94,234,212,0.18) 0%, rgba(45,212,191,0.10) 100%)",
    },
    back: {
      label: "Timeline",
      title: "How Fast\nCan You Deliver?",
      subtitle: "",
      body: "Basic: 3 days ($80). Standard: 6 days ($200). Premium: 10 days ($350). Need it faster? Express delivery available: +$20, +$40, or +$60.",
      accent: P.tealHover,
      bg: "linear-gradient(145deg, rgba(45,212,191,0.18) 0%, rgba(94,234,212,0.10) 100%)",
    },
  },
  {
    type: "inner",
    front: {
      label: "Revisions",
      title: "What About\nRevisions?",
      subtitle: "",
      body: "Basic: 2 revisions. Standard: 4 revisions. Premium: unlimited revisions. Extra revisions available for just $5 each on any package.",
      accent: P.purple,
      bg: "linear-gradient(145deg, rgba(167,139,250,0.22) 0%, rgba(196,181,253,0.12) 100%)",
    },
    back: {
      label: "Stack",
      title: "What Tech\nDo You Use?",
      subtitle: "",
      body: "React · Next.js · Node.js · Express · PostgreSQL · MongoDB · Supabase · TypeScript · Tailwind CSS · Docker · Vercel · AWS",
      accent: P.purpleLt,
      bg: "linear-gradient(145deg, rgba(196,181,253,0.22) 0%, rgba(167,139,250,0.14) 100%)",
    },
  },
  {
    type: "back-cover",
    front: {
      label: "Extras",
      title: "What Add-\nOns Are There?",
      subtitle: "",
      body: "Extra page +$10 · E-commerce +$70 · Payment integration +$40 · Speed optimization +$30 · Content upload +$15 · Hosting setup +$20.",
      accent: P.tealDark,
      bg: "linear-gradient(145deg, rgba(94,234,212,0.20) 0%, rgba(167,139,250,0.12) 100%)",
    },
    back: {
      label: "",
      title: "Ready to\nStart?",
      subtitle: "fiverr.com/alyan_haider259",
      body: "Order directly on Fiverr for escrow protection, or message me on WhatsApp or email for a custom quote. I respond within 24 hours.",
      accent: P.purple,
      bg: "linear-gradient(145deg, rgba(167,139,250,0.22) 0%, rgba(94,234,212,0.16) 100%)",
    },
  },
];

/* ══════════════════════════════════════════════════════════════════════════════
   BOOK UTILITIES — extracted from InteractiveBook component file
══════════════════════════════════════════════════════════════════════════════ */
function useBookSize() {
  const calc = useCallback(() => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const isMobile = vw < 768;
    let w: number, h: number;
    if (isMobile) {
      w = Math.floor((vw - 32) / 2);
      w = Math.max(w, 120);
      h = Math.min(Math.round(w * 1.42), vh - 60);
      w = Math.round(h / 1.42);
    } else {
      w = Math.min(360, Math.floor(vw * 0.28));
      h = Math.min(Math.round(w * 1.42), vh - 100);
      w = Math.round(h / 1.42);
    }
    return { w, h, isMobile };
  }, []);

  const [size, setSize] = useState(calc);

  useEffect(() => {
    const onResize = () => setSize(calc());
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", () =>
      setTimeout(() => setSize(calc()), 200)
    );
    return () => window.removeEventListener("resize", onResize);
  }, [calc]);

  return size;
}

const faceBase: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden" as React.CSSProperties["WebkitBackfaceVisibility"],
  background: P.bg,
  overflow: "hidden",
};

interface BookSize { w: number; h: number; isMobile: boolean; }

function SpineGrad({ reverse }: { reverse?: boolean }) {
  return (
    <div style={{
      position: "absolute",
      [reverse ? "right" : "left"]: 0,
      top: 0, bottom: 0, width: "12%",
      background: reverse
        ? "linear-gradient(to left, rgba(0,0,0,0.10), transparent)"
        : "linear-gradient(to right, rgba(0,0,0,0.10), transparent)",
      pointerEvents: "none",
    }} />
  );
}

function AccentEdge({ side }: { side: "left" | "right" }) {
  return (
    <div style={{
      position: "absolute",
      [side]: 0, top: 0, bottom: 0, width: 2,
      background: `linear-gradient(to bottom, transparent, ${P.tealDark}, ${P.purpleLt}, ${P.tealDark}, transparent)`,
      opacity: 0.55, pointerEvents: "none",
    }} />
  );
}

function PageCard({ data, isCover, isBackCover, size }: {
  data: PageFace;
  isCover: boolean;
  isBackCover: boolean;
  size: BookSize;
}) {
  const { label, title, subtitle, body, accent, bg } = data;
  const { w, h } = size;
  const small = w < 180;
  const fs = {
    label:    Math.max(8,  Math.round(w * 0.034)),
    title:    Math.max(14, Math.round(w * 0.115)),
    subtitle: Math.max(9,  Math.round(w * 0.042)),
    body:     Math.max(9,  Math.round(w * 0.048)),
  };
  const centered = isCover || isBackCover;

  return (
    <div style={{
      width: "100%", height: "100%",
      background: bg,
      position: "relative",
      display: "flex", flexDirection: "column",
      justifyContent: centered ? "center" : "space-between",
      alignItems: centered ? "center" : "flex-start",
      padding: small ? "12px 10px" : `${Math.round(h * 0.06)}px ${Math.round(w * 0.1)}px`,
      textAlign: centered ? "center" : "left",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(255,255,255,0.55) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", bottom: -20, right: -20,
        width: Math.round(w * 0.55), height: Math.round(w * 0.55),
        borderRadius: "50%",
        background: `radial-gradient(circle, ${accent}22 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: -15, left: -15,
        width: Math.round(w * 0.35), height: Math.round(w * 0.35),
        borderRadius: "50%",
        background: `radial-gradient(circle, ${accent}18 0%, transparent 70%)`,
        pointerEvents: "none",
      }} />
      {label ? (
        <div style={{
          position: "relative",
          display: "inline-flex", alignItems: "center",
          background: `${accent}1a`,
          border: `1px solid ${accent}44`,
          borderRadius: 50,
          padding: small ? "2px 8px" : "4px 14px",
          marginBottom: small ? 6 : 10,
          alignSelf: centered ? "center" : "flex-start",
        }}>
          <span style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: fs.label, fontWeight: 600,
            letterSpacing: "0.07em", textTransform: "uppercase",
            color: accent,
          }}>{label}</span>
        </div>
      ) : null}
      <div style={{ position: "relative", flex: centered ? "none" : 1, display: "flex", alignItems: "center" }}>
        <h2 style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 800, fontSize: fs.title,
          lineHeight: 1.05, letterSpacing: "-0.04em",
          color: P.text, whiteSpace: "pre-line", margin: 0,
        }}>
          {title.split("\n").map((line, li) => (
            <span key={li} style={{ display: "block" }}>
              {li === 0
                ? <><span style={{ color: accent }}>{line.split(" ")[0]}</span>{line.slice(line.split(" ")[0].length)}</>
                : line}
            </span>
          ))}
        </h2>
      </div>
      <div style={{ position: "relative", marginTop: small ? 4 : 8 }}>
        {subtitle ? (
          <p style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 500, fontSize: fs.subtitle,
            color: accent, letterSpacing: "0.03em",
            marginBottom: small ? 4 : 6,
          }}>{subtitle}</p>
        ) : null}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: fs.body, fontWeight: 400,
          lineHeight: 1.6, color: P.textMid, margin: 0,
        }}>{body}</p>
      </div>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(to right, ${accent}, ${accent}44, transparent)`,
        borderRadius: "0 0 8px 8px",
      }} />
    </div>
  );
}

function BookCoverFace({ data, size }: { data: PageFace; size: BookSize }) {
  const { w } = size;
  const small = w < 180;
  return (
    <div style={{
      width: "100%", height: "100%",
      background: `linear-gradient(145deg,
        rgba(167,139,250,0.25) 0%,
        rgba(196,181,253,0.18) 35%,
        rgba(94,234,212,0.20) 70%,
        rgba(45,212,191,0.15) 100%)`,
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      padding: small ? 12 : 24,
      position: "relative", overflow: "hidden",
      textAlign: "center",
    }}>
      <div style={{
        position: "absolute",
        width: Math.round(w * 1.1), height: Math.round(w * 1.1),
        borderRadius: "50%",
        border: "1px solid rgba(167,139,250,0.22)",
        animation: "spinRing 22s linear infinite",
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        width: Math.round(w * 1.3), height: Math.round(w * 1.3),
        borderRadius: "50%",
        border: "1px dashed rgba(94,234,212,0.18)",
        animation: "spinRing 32s linear infinite reverse",
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        pointerEvents: "none",
      }} />
      <div style={{
        width: Math.round(w * 0.42), height: Math.round(w * 0.42),
        borderRadius: "50%",
        background: "rgba(255,255,255,0.68)",
        border: "2px solid rgba(167,139,250,0.28)",
        boxShadow: "0 8px 32px rgba(167,139,250,0.18), 0 0 0 6px rgba(255,255,255,0.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
        marginBottom: small ? 10 : 16,
        position: "relative",
        backdropFilter: "blur(8px)",
        overflow: "hidden",
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 800,
          fontSize: Math.round(w * 0.13),
          color: P.tealDark,
          letterSpacing: "-0.04em",
          lineHeight: 1,
        }}>AH</span>
      </div>
      <h2 style={{
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 800,
        fontSize: Math.max(12, Math.round(w * 0.115)),
        letterSpacing: "-0.04em",
        lineHeight: 1.05,
        color: P.text, margin: 0,
      }}>
        {data.title.split("\n").map((line, li) => (
          <span key={li} style={{ display: "block" }}>
            {li === 0
              ? <><span style={{ color: P.tealDark }}>{line.split(" ")[0]}</span>{line.slice(line.split(" ")[0].length)}</>
              : line}
          </span>
        ))}
      </h2>
      <p style={{
        fontFamily: "'Poppins', sans-serif",
        fontWeight: 500,
        fontSize: Math.max(8, Math.round(w * 0.044)),
        color: P.tealHover,
        letterSpacing: "0.04em",
        marginTop: 4,
      }}>{data.subtitle}</p>
      <div style={{
        marginTop: small ? 10 : 16,
        padding: small ? "4px 12px" : "7px 20px",
        borderRadius: 50,
        background: `linear-gradient(135deg, ${P.tealDark}, ${P.purple})`,
        boxShadow: "0 4px 16px rgba(45,212,191,0.30)",
      }}>
        <span style={{
          fontFamily: "'Poppins', sans-serif",
          fontWeight: 600,
          fontSize: Math.max(7, Math.round(w * 0.038)),
          color: "#fff",
          letterSpacing: "0.04em",
        }}>Open to Work ✦</span>
      </div>
      <p style={{
        position: "absolute", bottom: 10,
        fontFamily: "'Inter', sans-serif",
        fontSize: Math.max(7, Math.round(w * 0.033)),
        color: P.textLight,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        opacity: 0.7,
      }}>Tap right to open →</p>
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(to right, ${P.tealDark}, ${P.purple})`,
      }} />
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   INTERACTIVE BOOK ENGINE
══════════════════════════════════════════════════════════════════════════════ */
function InteractiveBook({ width: w, height: h, pages, isMobile }: {
  width: number;
  height: number;
  pages: BookLeaf[];
  isMobile: boolean;
}) {
  const borderRadius = 10;
  const totalLeaves = pages.length;
  const size: BookSize = { w, h, isMobile };

  const [flippedCount, setFlippedCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const animating = useRef(false);
  const flippedRef = useRef(0);

  const c = [
    useAnimationControls(), useAnimationControls(),
    useAnimationControls(), useAnimationControls(),
    useAnimationControls(), useAnimationControls(),
    useAnimationControls(), useAnimationControls(),
    useAnimationControls(), useAnimationControls(),
    useAnimationControls(), useAnimationControls(),
  ];
  const bookCtrl = useAnimationControls();

  useEffect(() => {
    bookCtrl.set({ x: isOpen ? w / 2 : 0 });
  }, [w]); // eslint-disable-line

  const flipForward = async () => {
    if (animating.current) return;
    const cur = flippedRef.current;
    animating.current = true;
    if (cur >= totalLeaves) {
      await bookCtrl.start({ x: 0, transition: { duration: 0.7, ease: "easeInOut" } });
      for (let i = totalLeaves - 1; i >= 0; i--) {
        c[i].start({ rotateY: 0, transition: { duration: 0.42, ease: "easeInOut" } });
        await new Promise(r => setTimeout(r, 65));
      }
      flippedRef.current = 0;
      setFlippedCount(0);
      setIsOpen(false);
      animating.current = false;
      return;
    }
    if (cur === 0) {
      setIsOpen(true);
      bookCtrl.start({ x: w / 2, transition: { duration: 0.5, ease: "easeInOut" } });
    }
    flippedRef.current = cur + 1;
    setFlippedCount(cur + 1);
    await c[cur].start({ rotateY: -180, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } });
    animating.current = false;
  };

  const flipBackward = async () => {
    if (animating.current) return;
    const cur = flippedRef.current;
    if (cur === 0) return;
    animating.current = true;
    const idx = cur - 1;
    flippedRef.current = cur - 1;
    setFlippedCount(cur - 1);
    await c[idx].start({ rotateY: 0, transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] } });
    if (flippedRef.current === 0) {
      await bookCtrl.start({ x: 0, transition: { duration: 0.5, ease: "easeInOut" } });
      setIsOpen(false);
    }
    animating.current = false;
  };

  const handleInteract = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    let cx: number;
    if ("touches" in e && e.touches.length) cx = e.touches[0].clientX;
    else if ("changedTouches" in e && e.changedTouches.length) cx = e.changedTouches[0].clientX;
    else cx = (e as React.MouseEvent).clientX;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    cx - rect.left < rect.width / 2 ? flipBackward() : flipForward();
  };

  const openShadow = [
    "0 0 40px 8px rgba(45,212,191,0.22)",
    "0 0 80px 20px rgba(167,139,250,0.14)",
    "0 20px 50px 0 rgba(0,0,0,0.15)",
  ].join(", ");

  const closedShadow = [
    "8px 12px 40px 0 rgba(0,0,0,0.18)",
    "0 0 30px 6px rgba(45,212,191,0.18)",
    "0 0 60px 14px rgba(167,139,250,0.12)",
  ].join(", ");

  return (
    <div
      style={{
        width: w, height: h,
        perspective: 2600,
        cursor: "pointer",
        userSelect: "none", WebkitUserSelect: "none",
        position: "relative",
        overflow: "visible",
        flexShrink: 0,
      }}
      onClick={handleInteract}
      onTouchEnd={handleInteract}
    >
      <motion.div
        animate={bookCtrl}
        initial={{ x: 0 }}
        className={isOpen ? "" : "book-float-faq"}
        style={{
          width: w, height: h,
          position: "relative",
          transformStyle: "preserve-3d",
          borderRadius,
          boxShadow: isOpen ? openShadow : closedShadow,
        }}
      >
        <div style={{
          position: "absolute", inset: -1,
          borderRadius,
          border: "1px solid rgba(167,139,250,0.35)",
          pointerEvents: "none", zIndex: 200,
          boxShadow: "inset 0 0 10px rgba(94,234,212,0.08)",
        }} />

        {pages.map((leaf, index) => {
          const isFlipped  = index < flippedCount;
          const isFlipping = index === flippedCount - 1 || index === flippedCount;
          const zOffset    = isFlipped ? index * 0.4 : (totalLeaves - index) * 0.4;
          const zIndex     = isFlipping ? 100 : isFlipped ? index : totalLeaves - index;
          const isCover    = index === 0;
          const isBackCov  = index === totalLeaves - 1;

          return (
            <motion.div
              key={index}
              animate={c[index]}
              initial={{ rotateY: 0 }}
              style={{
                position: "absolute", inset: 0,
                transformOrigin: "left center",
                transformStyle: "preserve-3d",
                zIndex,
                transform: `translateZ(${zOffset}px)`,
                willChange: "transform",
              }}
            >
              <div style={{
                ...faceBase,
                borderRadius: `0 ${borderRadius}px ${borderRadius}px 0`,
              }}>
                {isCover
                  ? <BookCoverFace data={leaf.front} size={size} />
                  : <PageCard data={leaf.front} isCover={false} isBackCover={false} size={size} />
                }
                <SpineGrad />
                <AccentEdge side="right" />
              </div>
              <div style={{
                ...faceBase,
                transform: "rotateY(180deg) translateZ(0.01px)",
                borderRadius: `${borderRadius}px 0 0 ${borderRadius}px`,
              }}>
                {isBackCov
                  ? <PageCard data={leaf.back} isCover={false} isBackCover={true} size={size} />
                  : <PageCard data={leaf.back} isCover={false} isBackCover={false} size={size} />
                }
                <SpineGrad reverse />
                <AccentEdge side="left" />
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════════════════
   CATEGORIES
══════════════════════════════════════════════════════════════════════════════ */
const CATEGORIES = ["All", "Services", "Process", "Pricing", "Tech", "Revisions", "Working Together"] as const;
type Category = typeof CATEGORIES[number];

/* ══════════════════════════════════════════════════════════════════════════════
   FAQ PAGE
══════════════════════════════════════════════════════════════════════════════ */
export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [openId, setOpenId] = useState<number | null>(null);
  const { w, h, isMobile } = useBookSize();

  useEffect(() => {
    if (document.getElementById("faq-page-styles")) return;
    const s = document.createElement("style");
    s.id = "faq-page-styles";
    s.textContent = FAQ_CSS;
    document.head.appendChild(s);
  }, []);

  const visible = activeCategory === "All"
    ? FAQ_DATA
    : FAQ_DATA.filter(f => f.category === activeCategory);

  return (
    <>
      <SharedNav activePage="faq" />
      <div className="faq-bg" style={{ minHeight: "100vh", overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <section style={{ padding: "140px 24px 72px", textAlign: "center", position: "relative" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          {/* top label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "rgba(45,212,191,0.10)",
              border: "1px solid rgba(45,212,191,0.28)",
              borderRadius: 50, padding: "7px 20px",
              marginBottom: 24,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              style={{
                width: 6, height: 6, borderRadius: "50%",
                background: P.tealDark,
                boxShadow: "0 0 8px rgba(45,212,191,0.8)",
              }}
            />
            <span style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500, fontSize: 11,
              color: P.tealDark, letterSpacing: "0.18em",
              textTransform: "uppercase",
            }}>Frequently Asked Questions</span>
          </motion.div>

          {/* headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.4rem, 6vw, 4.2rem)",
              letterSpacing: "-0.05em",
              lineHeight: 1.05,
              color: P.text,
              margin: 0,
            }}
          >
            <span style={{ display: "block" }}>Everything You</span>
            <span style={{ display: "block" }}>
              Wanted to{" "}
              <span style={{ color: P.tealDark }}>Know</span>
            </span>
          </motion.h1>

          {/* subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400,
              fontSize: "clamp(0.88rem, 1.1vw, 1.05rem)",
              color: P.textLight,
              maxWidth: 500, margin: "14px auto 0",
              lineHeight: 1.75,
            }}
          >
            Real answers about my services, process, pricing, and how we work together.
          </motion.p>

          {/* stats row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            style={{
              display: "flex", gap: 32, justifyContent: "center",
              flexWrap: "wrap", marginTop: 28, alignItems: "center",
            }}
          >
            {[
              { num: "20+", label: "Questions Answered" },
              { num: "24h", label: "Response Time" },
              { num: "100%", label: "Satisfaction" },
            ].map((stat, i) => (
              <div key={stat.label} style={{ display: "flex", alignItems: "center", gap: 32 }}>
                {i > 0 && (
                  <div style={{
                    width: 1, height: 32,
                    background: "rgba(167,139,250,0.25)",
                  }} />
                )}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                  <span style={{
                    fontFamily: "'Poppins', sans-serif",
                    fontWeight: 700,
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    color: P.tealDark,
                  }}>{stat.num}</span>
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400, fontSize: 11,
                    color: P.textLight, letterSpacing: "0.08em",
                  }}>{stat.label}</span>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BOOK SECTION ── */}
      <section style={{
        padding: "0 24px 72px",
        display: "flex", flexDirection: "column", alignItems: "center",
        position: "relative",
      }}>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500, fontSize: 10,
          color: P.purple, letterSpacing: "0.26em",
          textTransform: "uppercase", marginBottom: 10,
        }}>FLIP THROUGH THE BASICS</p>
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400, fontSize: 12,
          color: P.textLight, marginBottom: 36,
        }}>Tap right to go forward · left to go back</p>
        <div style={{ position: "relative", display: "flex", justifyContent: "center" }}>
          <div style={{
            position: "relative",
            width: w * 2,
            height: h,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
          }}>
            <InteractiveBook width={w} height={h} pages={FAQ_BOOK_PAGES} isMobile={isMobile} />
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER ── */}
      <section style={{ padding: "48px 24px 0", display: "flex", justifyContent: "center" }}>
        <div style={{
          display: "flex", gap: 10,
          ...(isMobile
            ? { overflowX: "auto", flexWrap: "nowrap", paddingBottom: 8 }
            : { flexWrap: "wrap", justifyContent: "center" }
          ),
        }}>
          {CATEGORIES.map(cat => {
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                className="faq-btn"
                whileHover={window.innerWidth > 768 ? { scale: 1.04 } : {}}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat)}
                style={{
                  position: "relative",
                  background: isActive
                    ? "linear-gradient(135deg, #2DD4BF, #A78BFA)"
                    : "rgba(167,139,250,0.08)",
                  border: isActive
                    ? "1px solid transparent"
                    : "1px solid rgba(167,139,250,0.18)",
                  borderRadius: 50,
                  padding: "8px 20px",
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500, fontSize: 13,
                  color: isActive ? P.white : P.textLight,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 0.2s",
                  boxShadow: isActive ? "0 4px 20px rgba(45,212,191,0.25)" : "none",
                  outline: "none",
                }}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-chip"
                    style={{
                      position: "absolute", inset: 0,
                      borderRadius: 50,
                      background: "linear-gradient(135deg, #2DD4BF, #A78BFA)",
                      zIndex: -1,
                    }}
                    transition={
                      window.innerWidth < 768
                        ? { type: "tween", duration: 0.25 }
                        : { type: "spring", stiffness: 400, damping: 30 }
                    }
                  />
                )}
                {cat}
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* ── FAQ ACCORDION ── */}
      <section style={{ maxWidth: 780, margin: "0 auto", padding: "36px 24px 80px" }}>
        <AnimatePresence mode="wait">
          {visible.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={mobileTransition ?? { delay: index * 0.055, duration: 0.5 }}
                style={{
                  marginBottom: 12,
                  borderRadius: 16,
                  background: P.white,
                  border: `1px solid ${isOpen ? "rgba(45,212,191,0.40)" : "rgba(167,139,250,0.20)"}`,
                  boxShadow: isOpen
                    ? "0 6px 32px rgba(45,212,191,0.12)"
                    : "0 2px 12px rgba(167,139,250,0.08)",
                  overflow: "hidden",
                  transition: "border-color 0.25s ease, box-shadow 0.25s ease",
                }}
              >
                {/* question button */}
                <button
                  className="faq-btn"
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}
                  style={{
                    width: "100%", padding: "22px 24px",
                    display: "flex", alignItems: "flex-start",
                    justifyContent: "space-between", gap: 16,
                    background: "transparent", border: "none",
                    cursor: "pointer", textAlign: "left",
                    outline: "none",
                  }}
                >
                  {/* left side */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: "inline-block", marginBottom: 8,
                      background: item.chipColor === "teal"
                        ? "rgba(45,212,191,0.10)"
                        : "rgba(167,139,250,0.10)",
                      border: `1px solid ${item.chipColor === "teal"
                        ? "rgba(45,212,191,0.25)"
                        : "rgba(167,139,250,0.25)"}`,
                      borderRadius: 50, padding: "3px 10px",
                    }}>
                      <span style={{
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 500, fontSize: 9,
                        textTransform: "uppercase", letterSpacing: "0.14em",
                        color: item.chipColor === "teal" ? P.tealDark : P.purple,
                      }}>{item.category}</span>
                    </div>
                    <span style={{
                      display: "block",
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 600,
                      fontSize: "clamp(0.9rem, 1.8vw, 1.05rem)",
                      color: P.text, lineHeight: 1.4,
                    }}>{item.question}</span>
                  </div>

                  {/* right side icon */}
                  <div style={{
                    width: 28, height: 28, borderRadius: "50%",
                    flexShrink: 0, marginTop: 2,
                    background: isOpen ? "rgba(45,212,191,0.12)" : "rgba(167,139,250,0.10)",
                    border: `1px solid ${isOpen ? "rgba(45,212,191,0.30)" : "rgba(167,139,250,0.20)"}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "all 0.25s",
                  }}>
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <line x1="8" y1="3" x2="8" y2="13"
                          stroke={isOpen ? P.tealDark : P.purple}
                          strokeWidth="2" strokeLinecap="round" />
                        <line x1="3" y1="8" x2="13" y2="8"
                          stroke={isOpen ? P.tealDark : P.purple}
                          strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </motion.div>
                  </div>
                </button>

                {/* answer panel */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                      style={{ overflow: "hidden" }}
                    >
                      <div style={{ padding: "0 24px 22px", position: "relative" }}>
                        {/* accent bar */}
                        <div style={{
                          position: "absolute",
                          left: 24, top: 0, bottom: 22, width: 3,
                          background: "linear-gradient(to bottom, #2DD4BF, #A78BFA)",
                          borderRadius: 2,
                        }} />
                        <p style={{
                          paddingLeft: 20,
                          fontFamily: "'Inter', sans-serif",
                          fontSize: 14, fontWeight: 400,
                          color: P.textMid, lineHeight: 1.8,
                          margin: 0,
                        }}>{item.answer}</p>
                        {item.hasLink && (
                          <motion.a
                            href={item.linkHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={window.innerWidth > 768 ? { x: 3 } : {}}
                            style={{
                              display: "inline-flex", alignItems: "center", gap: 4,
                              marginTop: 14,
                              color: P.tealDark,
                              fontFamily: "'Inter', sans-serif",
                              fontWeight: 500, fontSize: 13,
                              textDecoration: "none",
                              paddingLeft: 20,
                            }}
                          >
                            → {item.linkText}
                          </motion.a>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </section>

      {/* ── CTA STRIP ── */}
      <section style={{
        padding: "72px 24px",
        textAlign: "center",
        position: "relative",
      }}>
        {/* soft glow */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600, height: 300,
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(45,212,191,0.12) 0%, rgba(167,139,250,0.10) 40%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={mobileTransition ?? { duration: 0.6 }}
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
            color: P.text,
            letterSpacing: "-0.04em",
            margin: 0,
            position: "relative",
          }}
        >
          Still have a question?
        </motion.h2>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400, fontSize: 15,
          color: P.textLight, lineHeight: 1.7,
          marginTop: 10, marginBottom: 36,
          position: "relative",
        }}>
          I respond to every message personally, usually within a few hours.
        </p>

        <div style={{
          display: "flex", gap: 14, justifyContent: "center",
          flexWrap: "wrap", position: "relative",
        }}>
          {/* email button */}
          <motion.a
            href="mailto:alyanhaider369@gmail.com"
            whileHover={
              window.innerWidth > 768
                ? { scale: 1.04, boxShadow: "0 12px 40px rgba(45,212,191,0.45)" }
                : {}
            }
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg, #2DD4BF, #A78BFA)",
              color: P.white,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600, fontSize: 14, letterSpacing: "0.05em",
              padding: "14px 32px", borderRadius: 50,
              border: "none",
              boxShadow: "0 6px 28px rgba(45,212,191,0.28)",
              textDecoration: "none", cursor: "pointer",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            Send Me an Email
          </motion.a>

          {/* whatsapp button */}
          <motion.a
            href="https://wa.me/923255629527"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={
              window.innerWidth > 768
                ? { scale: 1.04, borderColor: "rgba(45,212,191,0.75)" }
                : {}
            }
            whileTap={{ scale: 0.97 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "transparent",
              border: "1.5px solid rgba(45,212,191,0.40)",
              color: P.tealDark,
              fontFamily: "'Poppins', sans-serif",
              fontWeight: 600, fontSize: 14, letterSpacing: "0.05em",
              padding: "14px 32px", borderRadius: 50,
              textDecoration: "none", cursor: "pointer",
              transition: "border-color 0.2s",
            }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            WhatsApp Me
          </motion.a>
        </div>

        <p style={{
          marginTop: 48,
          fontFamily: "'Inter', sans-serif",
          fontWeight: 400, fontSize: 10,
          color: "rgba(26,26,46,0.25)",
          letterSpacing: "0.06em",
          position: "relative",
        }}>
          © 2025 Alyan Haider · Built with React + Framer Motion + TypeScript
        </p>
      </section>
      </div>
    </>
  );
}
