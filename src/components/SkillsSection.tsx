"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import "./SkillsSection.lumeshift.css";

// ─────────────────────────────────────────────
// Design tokens — matched to homepage
// ─────────────────────────────────────────────
const T = {
  tealDark:    "#2DD4BF",
  tealHover:   "#14b8a6",
  purple:      "#A78BFA",
  amber:       "#f59e0b",
  text:        "#1a1a2e",
  textMid:     "#44445a",
  textLight:   "#8888aa",
  cardBg:      "rgba(255,255,255,0.55)",
  cardBorder:  "rgba(167,139,250,0.18)",
  cardHoverBg: "rgba(255,255,255,0.88)",
};

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface SkillCard { icon: string; title: string; desc: string; }
interface Cluster   { label: string; desc: string; pills: string[]; accent: string; }
interface Slide     { id: string; title: string; icon: string; label: string; desc: string; pills: string[]; accent: string; }

// ─────────────────────────────────────────────
// Data — refined copy based on Alyan's actual skillset
// ─────────────────────────────────────────────
const SKILLS: SkillCard[] = [
  { icon: "⚛",  title: "React",                desc: "Component-based UIs built for reuse, speed, and real production traffic — not just demos." },
  { icon: "▲",  title: "Next.js",               desc: "Full-stack apps with SSR, app router, and API routes — from landing pages to SaaS platforms." },
  { icon: "⚡", title: "JavaScript",            desc: "Deep JS knowledge: async flows, closures, performance patterns and modern ES2024 features." },
  { icon: "🔷", title: "TypeScript",            desc: "End-to-end type safety with strict mode, generics, and Zod validation — fewer bugs, faster refactors." },
  { icon: "🟢", title: "Node.js",               desc: "Event-driven backend services, REST APIs, and server logic built to handle real-world load." },
  { icon: "🍃", title: "MongoDB",               desc: "Flexible schemas, aggregation pipelines, and indexing strategies for high-throughput applications." },
  { icon: "🔗", title: "REST APIs",             desc: "Clean, versioned API design with proper error handling, validation, and auth middleware." },
  { icon: "🔐", title: "Authentication",        desc: "JWT, OAuth 2.0, session management, and role-based access control from day one." },
  { icon: "🎨", title: "Tailwind CSS",          desc: "Utility-first styling that ships fast, looks precise, and stays maintainable at scale." },
  { icon: "🚀", title: "Performance",           desc: "Page speed, Core Web Vitals, lazy loading, and rendering optimisation for real SEO gains." },
  { icon: "📐", title: "Responsive Design",     desc: "Pixel-perfect layouts on every screen — mobile-first, tested across devices and browsers." },
  { icon: "☁",  title: "Vercel & Deployment",  desc: "CI/CD pipelines, Vercel deployments, and GitHub version control — production-ready from commit one." },
];

const CLUSTERS: Cluster[] = [
  {
    label: "Frontend Development",
    desc:  "I build professional landing pages, SaaS dashboards, marketplace UIs, and business websites — modern, animated, and responsive across every device.",
    pills: ["React", "Next.js", "Tailwind CSS", "Animations", "Responsive UI", "Vite"],
    accent: T.tealDark,
  },
  {
    label: "Backend & APIs",
    desc:  "Login systems, product listings, admin dashboards, user dashboards, and data storage — full backend logic that connects cleanly to any frontend.",
    pills: ["Node.js", "REST APIs", "Authentication", "MongoDB", "Supabase", "Security"],
    accent: T.purple,
  },
  {
    label: "Full-Stack Products",
    desc:  "I don't build static sites — I build real web apps with backend, API, database, dashboards, and auth all working together from day one.",
    pills: ["Full-Stack", "System Design", "Deployment", "GitHub", "Vercel", "Scalability"],
    accent: T.amber,
  },
];

const CAPABILITIES = [
  {
    title: "Marketplace Platforms",
    desc:  "Complete platforms with user accounts, product listings, image uploads, categories, admin control, and dashboards — think OLX or Facebook Marketplace.",
    icon:  "⬡",
  },
  {
    title: "SaaS Dashboards",
    desc:  "Data-rich admin and user dashboards with filtering, authentication, real-time updates, and clean component architecture built to scale.",
    icon:  "◈",
  },
  {
    title: "Business & Booking Sites",
    desc:  "Hotel, restaurant, and service websites with hero animations, booking flows, responsive design, and conversion-focused layouts.",
    icon:  "◎",
  },
];

// LumeShift slides — each maps to a core technical area from Alyan's stack
const LUMESHIFT_SLIDES: Slide[] = [
  {
    id:     "s1",
    title:  "React_&_Next.js",
    icon:   "⚛",
    label:  "Frontend Engineering",
    desc:   "Building responsive, high-performance interfaces with React and Next.js — SSR, app router, and optimized rendering baked in from the start.",
    pills:  ["React", "Next.js", "Tailwind", "Animations"],
    accent: T.tealDark,
  },
  {
    id:     "s2",
    title:  "Node_Backend",
    icon:   "🟢",
    label:  "Backend Systems",
    desc:   "Scalable REST APIs and server logic with Node.js — designed for speed, real-world traffic, and clean integration with any frontend.",
    pills:  ["Node.js", "REST APIs", "Express", "Supabase"],
    accent: T.purple,
  },
  {
    id:     "s3",
    title:  "TypeScript",
    icon:   "🔷",
    label:  "Type-Safe Architecture",
    desc:   "End-to-end type safety across every layer. Interfaces, generics, and strict mode keeping codebases consistent, bug-resistant, and easy to refactor.",
    pills:  ["TypeScript", "Zod", "Type Guards", "DX"],
    accent: "#60a5fa",
  },
  {
    id:     "s4",
    title:  "Database_Design",
    icon:   "🗄",
    label:  "Data Architecture",
    desc:   "Schema design, indexing strategies, and data modelling in MongoDB and PostgreSQL — built for throughput and long-term maintainability.",
    pills:  ["MongoDB", "PostgreSQL", "Indexing", "Queries"],
    accent: T.amber,
  },
  {
    id:     "s5",
    title:  "Auth_&_Security",
    icon:   "🔐",
    label:  "Auth & Security",
    desc:   "JWT, OAuth 2.0, session management, and role-based access control — every user flow secured and structured from day one.",
    pills:  ["JWT", "OAuth 2.0", "Sessions", "RBAC"],
    accent: "#f472b6",
  },
];

// ─────────────────────────────────────────────
// Hooks
// ─────────────────────────────────────────────
function useWindowWidth() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1200
  );
  useEffect(() => {
    const h = () => setWidth(window.innerWidth);
    window.addEventListener("resize", h, { passive: true });
    return () => window.removeEventListener("resize", h);
  }, []);
  return width;
}

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

// ─────────────────────────────────────────────
// LumeShift — CharStagger
// ─────────────────────────────────────────────
function CharStagger({ text, active }: { text: string; active: boolean }) {
  return (
    <>
      {text.split("").map((ch, i) => {
        const delay = `${i * 0.025}s`;
        return (
          <span key={i} className="ls-char-wrap">
            <span className="ls-char-out" style={{ animationDelay: delay }}>
              {ch === "_" ? "\u00A0" : ch}
            </span>
            <span className="ls-char-in" style={{ animationDelay: delay }}>
              {ch === "_" ? "\u00A0" : ch}
            </span>
          </span>
        );
      })}
    </>
  );
}

// ─────────────────────────────────────────────
// LumeShift — SlideCard
// ─────────────────────────────────────────────
function SlideCard({
  slide, index, activeSlide, prevSlide, onHover,
}: {
  slide: Slide; index: number; activeSlide: number;
  prevSlide: number | null; onHover: (i: number) => void;
}) {
  const isActive  = activeSlide === index;
  const wasActive = prevSlide === index && prevSlide !== activeSlide;
  let animClass   = "ls-card-inner";
  if (isActive)       animClass += " active";
  else if (wasActive) animClass += " was-active";

  return (
    <div className="ls-card-slot">
      <div
        className={animClass}
        onMouseEnter={() => onHover(index)}
        style={{
          boxShadow: isActive
            ? `0 0 0 1px ${slide.accent}28, 0 0 40px ${slide.accent}38, 0 0 80px ${slide.accent}18, 0 16px 48px rgba(167,139,250,0.14)`
            : "0 2px 10px rgba(167,139,250,0.07)",
          borderColor: isActive ? `${slide.accent}60` : T.cardBorder,
        }}
      >
        <div className="ls-card-top">
          <span className="ls-card-icon">{slide.icon}</span>
          <span className="ls-card-dot" style={{ background: slide.accent, boxShadow: `0 0 10px ${slide.accent}80` }} />
        </div>
        <div className="ls-card-label">{slide.label}</div>
        <p className="ls-card-desc">{slide.desc}</p>
        <div className="ls-card-pills">
          {slide.pills.map((p) => (
            <span key={p} className="ls-pill" style={{ background: `${slide.accent}18`, border: `1px solid ${slide.accent}38`, color: slide.accent }}>
              {p}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// LumeShift — root component
// ─────────────────────────────────────────────
function LumeShift() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [prevSlide,   setPrevSlide]   = useState<number | null>(null);
  const w        = useWindowWidth();
  const isMobile = w < 600;

  const handleHover = useCallback((i: number) => {
    if (i === activeSlide) return;
    setPrevSlide(activeSlide);
    setActiveSlide(i);
  }, [activeSlide]);

  // On mobile: tap to advance
  const handleTap = useCallback((i: number) => {
    if (isMobile) handleHover(i);
  }, [isMobile, handleHover]);

  return (
    <div className="ls-wrap">
      <div className="ls-inner">

        {/* LEFT — stagger titles */}
        <div className="ls-titles-col">
          {/* Section label above titles */}
          <p className="ls-section-label">Core Expertise</p>
          {LUMESHIFT_SLIDES.map((slide, i) => (
            <span
              key={slide.id}
              className={`ls-title-row${activeSlide === i ? " active" : ""}`}
              onMouseEnter={() => handleHover(i)}
              onClick={() => handleTap(i)}
            >
              <CharStagger text={slide.title} active={activeSlide === i} />
            </span>
          ))}
        </div>

        {/* RIGHT — stacked cards */}
        <div className="ls-card-col">
          <div className="ls-halo" />
          <div className="ls-card-grid">
            {LUMESHIFT_SLIDES.map((slide, i) => (
              <SlideCard
                key={slide.id}
                slide={slide}
                index={i}
                activeSlide={activeSlide}
                prevSlide={prevSlide}
                onHover={handleHover}
              />
            ))}
          </div>
          {/* Mobile dot nav */}
          {isMobile && (
            <div className="ls-dot-nav">
              {LUMESHIFT_SLIDES.map((_, i) => (
                <button
                  key={i}
                  className={`ls-dot${activeSlide === i ? " active" : ""}`}
                  onClick={() => handleHover(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// SKILLS SECTION — main section component
// ─────────────────────────────────────────────
export function SkillsSection() {
  const w        = useWindowWidth();
  const isMobile = w < 600;
  const isTablet = w >= 600 && w < 1024;

  const padV     = isMobile ? 64  : isTablet ? 80  : 120;
  const padH     = isMobile ? 20  : isTablet ? 28  : 48;
  const gridCols = isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(auto-fill,minmax(240px,1fr))";
  const clsCols  = isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)";
  const capCols  = isMobile ? "1fr" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)";

  const intro   = useReveal(0.1);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredCard,  setHoveredCard]  = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<boolean[]>(Array(SKILLS.length).fill(false));

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll<HTMLDivElement>("[data-card]");
    if (!cards) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const i = Number((e.target as HTMLElement).dataset.card);
          if (e.isIntersecting) setVisibleCards((prev) => { const n=[...prev]; n[i]=true; return n; });
        });
      },
      { threshold: 0.08 }
    );
    cards.forEach((c) => obs.observe(c));
    return () => obs.disconnect();
  }, []);

  return (
    <section style={{ paddingTop: padV, paddingBottom: padV, position: "relative", overflow: "hidden" }}>

      {/* Section accent blobs */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 65% 50% at 10% 5%,  rgba(167,139,250,0.16) 0%, transparent 65%),
          radial-gradient(ellipse 50% 42% at 90% 85%, rgba(94,234,212,0.13)  0%, transparent 60%)
        `,
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: `0 ${padH}px` }}>

        {/* ── INTRO ── */}
        <div
          ref={intro.ref}
          style={{
            textAlign: "center",
            transition: "opacity 0.8s ease, transform 0.8s ease",
            opacity:   intro.visible ? 1 : 0,
            transform: intro.visible ? "translateY(0)" : "translateY(40px)",
          }}
        >
          <p style={{
            fontFamily: "'Inter',sans-serif", fontSize: 11.5, fontWeight: 500,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: T.tealDark, margin: "0 0 10px",
          }}>
            Engineering Stack
          </p>
          <h2 style={{
            fontFamily: "'Poppins',sans-serif", fontWeight: 800,
            fontSize:   isMobile ? "clamp(1.9rem,8vw,2.4rem)" : "clamp(2.2rem,4.5vw,3.4rem)",
            lineHeight: 1.08, letterSpacing: "-0.04em", color: T.text, margin: "0 0 16px",
          }}>
            The Technology Behind{" "}
            <span style={{
              background: `linear-gradient(135deg,${T.tealDark},${T.purple})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              display: isMobile ? "block" : "inline", marginTop: isMobile ? 4 : 0,
            }}>
              My Products
            </span>
          </h2>
          <p style={{
            fontFamily: "'Inter',sans-serif",
            fontSize:   isMobile ? "0.97rem" : "clamp(1rem,1.5vw,1.1rem)",
            color: T.textMid, lineHeight: 1.75, maxWidth: 600, margin: "0 auto",
          }}>
            I'm a full-stack developer who builds real web apps — marketplaces, SaaS dashboards,
            booking platforms, and business websites — using a modern, production-grade stack.
          </p>
        </div>

        {/* ── SKILLS GRID ── */}
        <div
          ref={gridRef}
          style={{
            display: "grid", gridTemplateColumns: gridCols,
            gap: isMobile ? 12 : 18, marginTop: isMobile ? 40 : 64,
          }}
        >
          {SKILLS.map((sk, i) => (
            <div
              key={sk.title}
              data-card={i}
              onMouseEnter={() => !isMobile && setHoveredCard(i)}
              onMouseLeave={() => !isMobile && setHoveredCard(null)}
              style={{
                background:           hoveredCard===i ? T.cardHoverBg : T.cardBg,
                backdropFilter:       "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                border:               `1px solid ${hoveredCard===i ? T.tealDark+"90" : T.cardBorder}`,
                borderRadius:         isMobile ? 14 : 16,
                padding:              isMobile ? "18px 16px" : "26px 24px",
                cursor:               "default",
                transition:           "all 0.3s cubic-bezier(0.4,0,0.2,1)",
                transform:            visibleCards[i]
                                        ? (hoveredCard===i ? "translateY(-8px)" : "translateY(0)")
                                        : "translateY(50px)",
                opacity:              visibleCards[i] ? 1 : 0,
                transitionDelay:      visibleCards[i] ? `${i*0.05}s` : "0s",
                boxShadow:            hoveredCard===i
                                        ? "0 12px 36px rgba(45,212,191,0.16),0 4px 14px rgba(167,139,250,0.12)"
                                        : "0 2px 10px rgba(167,139,250,0.07)",
              }}
            >
              <div style={{
                fontSize: isMobile ? 24 : 28, marginBottom: isMobile ? 10 : 14,
                display: "inline-block", transition: "transform 0.3s ease",
                transform: hoveredCard===i ? "rotate(8deg) scale(1.1)" : "none",
              }}>
                {sk.icon}
              </div>
              <div style={{
                fontSize: isMobile ? 16 : 18, fontWeight: 700,
                fontFamily: "'Poppins',sans-serif", color: T.text,
                marginBottom: 6, letterSpacing: "-0.01em",
              }}>
                {sk.title}
              </div>
              <div style={{
                fontSize: isMobile ? 13 : 14, color: T.textMid,
                lineHeight: 1.6, fontFamily: "'Inter',sans-serif",
              }}>
                {sk.desc}
              </div>
            </div>
          ))}
        </div>

        {/* ── LUMESHIFT DIVIDER ── */}
        <div style={{
          marginTop: isMobile ? 56 : 96,
          marginBottom: 0,
          textAlign: "center",
        }}>
          <p style={{
            fontFamily: "'Inter',sans-serif", fontSize: 11.5, fontWeight: 500,
            letterSpacing: "0.14em", textTransform: "uppercase",
            color: T.tealDark, margin: "0 0 10px",
          }}>
            Deep Dives
          </p>
          <h3 style={{
            fontFamily: "'Poppins',sans-serif", fontWeight: 800,
            fontSize:   isMobile ? "clamp(1.6rem,7vw,2rem)" : "clamp(1.8rem,3vw,2.6rem)",
            letterSpacing: "-0.04em", lineHeight: 1.08,
            color: T.text, margin: "0 0 12px",
          }}>
            Hover to Explore{" "}
            <span style={{
              background: `linear-gradient(135deg,${T.tealDark},${T.purple})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Each Stack
            </span>
          </h3>
          <p style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: isMobile ? "0.9rem" : "1rem",
            color: T.textMid, maxWidth: 480, margin: "0 auto",
            lineHeight: 1.7,
          }}>
            {isMobile ? "Tap a skill to see what I actually build with it." : "Hover a skill name on the left to see exactly what I build with it."}
          </p>
        </div>

        {/* ── LUMESHIFT COMPONENT ── */}
        <LumeShift />

        {/* ── CLUSTER CARDS ── */}
        <div style={{ marginTop: isMobile ? 48 : 80 }}>
          <p style={{
            textAlign: "center", fontFamily: "'Inter',sans-serif", fontSize: 11,
            fontWeight: 500, color: T.textLight, letterSpacing: "0.15em",
            textTransform: "uppercase", marginBottom: isMobile ? 20 : 28,
          }}>
            What I specialise in
          </p>
          <div style={{ display: "grid", gridTemplateColumns: clsCols, gap: isMobile ? 14 : 22 }}>
            {CLUSTERS.map((cl) => <ClusterCard key={cl.label} cluster={cl} isMobile={isMobile} />)}
          </div>
        </div>

        {/* ── CAPABILITY CARDS ── */}
        <div style={{ marginTop: isMobile ? 40 : 56 }}>
          <p style={{
            textAlign: "center", fontFamily: "'Inter',sans-serif", fontSize: 11,
            fontWeight: 500, color: T.textLight, letterSpacing: "0.15em",
            textTransform: "uppercase", marginBottom: isMobile ? 20 : 28,
          }}>
            What I build for clients
          </p>
          <div style={{ display: "grid", gridTemplateColumns: capCols, gap: isMobile ? 12 : 18 }}>
            {CAPABILITIES.map((cap) => <CapabilityCard key={cap.title} cap={cap} isMobile={isMobile} />)}
          </div>
        </div>

        {/* ── CTA ── */}
        <SkillsCTA isMobile={isMobile} />

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────
// Cluster Card
// ─────────────────────────────────────────────
function ClusterCard({ cluster, isMobile }: { cluster: Cluster; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible }      = useReveal(0.1);
  return (
    <div
      ref={ref}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      style={{
        background:           hovered ? T.cardHoverBg : T.cardBg,
        backdropFilter:       "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        border:               `1px solid ${hovered ? cluster.accent+"70" : T.cardBorder}`,
        borderRadius:         isMobile ? 16 : 20,
        padding:              isMobile ? "24px 20px" : "36px 32px",
        transition:           "all 0.35s ease",
        transform:            visible ? (hovered ? "scale(1.02)" : "scale(1)") : "translateY(40px)",
        opacity:              visible ? 1 : 0,
        boxShadow:            hovered ? "0 16px 48px rgba(167,139,250,0.14)" : "0 2px 10px rgba(167,139,250,0.06)",
      }}
    >
      <div style={{ width:8, height:8, borderRadius:"50%", background: cluster.accent, boxShadow:`0 0 10px ${cluster.accent}80`, marginBottom:14 }} />
      <div style={{ fontSize: isMobile?17:19, fontWeight:700, fontFamily:"'Poppins',sans-serif", color:T.text, letterSpacing:"-0.02em", marginBottom:8 }}>
        {cluster.label}
      </div>
      <p style={{ fontSize: isMobile?13:14, color:T.textMid, lineHeight:1.7, fontFamily:"'Inter',sans-serif", margin:"0 0 18px" }}>
        {cluster.desc}
      </p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
        {cluster.pills.map((p) => (
          <span key={p} style={{
            padding:"4px 12px", borderRadius:99,
            background:`${cluster.accent}18`, border:`1px solid ${cluster.accent}38`,
            fontSize: isMobile?11:12, fontFamily:"'Inter',sans-serif", fontWeight:500, color: cluster.accent,
          }}>{p}</span>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Capability Card
// ─────────────────────────────────────────────
function CapabilityCard({ cap, isMobile }: { cap:{title:string;desc:string;icon:string}; isMobile:boolean }) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible }      = useReveal(0.1);
  return (
    <div
      ref={ref}
      onMouseEnter={() => !isMobile && setHovered(true)}
      onMouseLeave={() => !isMobile && setHovered(false)}
      style={{
        background:   hovered ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.42)",
        border:       `1px solid ${hovered ? T.tealDark+"55" : T.cardBorder}`,
        borderRadius: isMobile ? 14 : 16,
        padding:      isMobile ? "20px 18px" : "28px 24px",
        transition:   "all 0.3s ease",
        opacity:      visible ? 1 : 0,
        transform:    visible ? "translateY(0)" : "translateY(30px)",
        boxShadow:    hovered ? "0 8px 28px rgba(45,212,191,0.10)" : "0 2px 8px rgba(167,139,250,0.05)",
      }}
    >
      <div style={{ fontSize: isMobile?22:26, color:T.tealDark, marginBottom:12, fontFamily:"serif" }}>{cap.icon}</div>
      <div style={{ fontSize: isMobile?15:16, fontWeight:700, color:T.text, fontFamily:"'Poppins',sans-serif", letterSpacing:"-0.01em", marginBottom:7 }}>{cap.title}</div>
      <p style={{ fontSize: isMobile?13:14, color:T.textMid, lineHeight:1.65, fontFamily:"'Inter',sans-serif", margin:0 }}>{cap.desc}</p>
    </div>
  );
}

// ─────────────────────────────────────────────
// Skills CTA
// ─────────────────────────────────────────────
function SkillsCTA({ isMobile }: { isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  const { ref, visible }      = useReveal(0.15);
  return (
    <div
      id="contact"
      ref={ref}
      style={{
        textAlign: "center", marginTop: isMobile ? 60 : 96,
        transition: "opacity 0.8s ease, transform 0.8s ease",
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        padding:   isMobile ? "0 4px" : "0",
      }}
    >
      <h3 style={{
        fontFamily: "'Poppins',sans-serif",
        fontSize:   isMobile ? "clamp(1.5rem,7vw,2rem)" : "clamp(1.75rem,3.5vw,2.6rem)",
        fontWeight: 800, color: T.text, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "0 0 12px",
      }}>
        Ready to Build Something Real?
      </h3>
      <p style={{
        fontFamily: "'Inter',sans-serif", fontSize: isMobile ? 15 : 16,
        color: T.textMid, maxWidth: 440, margin: "0 auto 28px", lineHeight: 1.7,
      }}>
        Whether it&apos;s a marketplace, a SaaS dashboard, or a business website —
        I build it properly, from backend to deployment.
      </p>
      <Link
        to="/contact"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          fontFamily: "'Poppins',sans-serif", fontWeight: 600, fontSize: isMobile ? 16 : 17,
          color: "#fff", background: hovered ? T.tealHover : T.tealDark,
          padding: isMobile ? "14px 0" : "15px 34px", borderRadius: 50, border: "none",
          textDecoration: "none", display: isMobile ? "flex" : "inline-flex",
          width: isMobile ? "100%" : "auto", maxWidth: isMobile ? 340 : "none",
          margin: isMobile ? "0 auto" : "0",
          alignItems: "center", justifyContent: "center", gap: 8,
          boxShadow: hovered ? "0 10px 34px rgba(45,212,191,0.48)" : "0 6px 24px rgba(45,212,191,0.38)",
          transition: "background 0.25s, transform 0.25s, box-shadow 0.25s",
          transform: hovered ? "scale(1.04)" : "scale(1)", cursor: "pointer",
        }}
      >
        Start a Project
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </Link>
    </div>
  );
}

// ─────────────────────────────────────────────

export default SkillsSection;

