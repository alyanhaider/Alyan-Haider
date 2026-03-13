// Legacy contact page (kept for reference)
import React, {useEffect, useMemo, useRef, useState} from 'react';
import SharedNav from '../components/SharedNav';

declare global {
  interface Window {
    gsap?: any;
  }
}

type Status = 'idle' | 'sending' | 'sent';

const CONTACT_PAGE_CSS_BASE = [
  "@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@300;400;500;600;700;800&display=swap');",
  '@keyframes signalPulse{0%,100%{opacity:.4;transform:scaleX(1)}50%{opacity:1;transform:scaleX(1.02)}}',
  '@keyframes statusBlink{0%,100%{opacity:1}49%{opacity:1}50%{opacity:0}99%{opacity:0}}',
  '@keyframes radarSweep{0%{transform:translateX(-100%)}100%{transform:translateX(100vw)}}',
  '@keyframes transmitPulse{0%{transform:scale(1);opacity:1}50%{transform:scale(1.08);opacity:.7}100%{transform:scale(1);opacity:1}}',
  '@keyframes slideUp{from{transform:translateY(40px);opacity:0}to{transform:translateY(0);opacity:1}}',
  '@keyframes successReveal{from{transform:translateY(60px) scale(.95);opacity:0}to{transform:translateY(0) scale(1);opacity:1}}',
  '@keyframes waveformDraw{from{stroke-dashoffset:1000}to{stroke-dashoffset:0}}',
  '@keyframes cursorRotate{to{transform:translate(-50%,-50%) rotate(360deg)}}',
  '@keyframes marqueeScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}',
  '@keyframes scanLine{0%{top:0%;opacity:0}5%{opacity:1}95%{opacity:1}100%{top:100%;opacity:0}}',
  '@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}',
  '*,*::before,*::after{box-sizing:border-box}',
  'body.contact-page-body{background:#07060f;min-height:100vh;overflow-x:hidden;font-family:Poppins,sans-serif;color:#fff;cursor:none}',
  'body.contact-page-body.contact-page-mobile{cursor:auto}',
  '.signal-canvas{position:fixed;inset:0;width:100vw;height:100vh;z-index:0;pointer-events:none;background:transparent}',
  '.cursor-dot,.cursor-ring{position:fixed;left:50%;top:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%)}',
  '.cursor-dot{width:6px;height:6px;background:#2DD4BF;border-radius:50%;transition:none;mix-blend-mode:difference}',
  '.cursor-dot.cursor-dot--shrink{width:4px;height:4px}',
  '.cursor-ring{width:32px;height:32px;border:1px solid rgba(45,212,191,.6);border-radius:50%;transition:left .08s ease,top .08s ease,width .2s ease,height .2s ease,border-color .2s ease}',
  '.cursor-ring.cursor-ring--grow{width:54px;height:54px;border-color:rgba(45,212,191,1)}',
  '.status-indicator{position:fixed;top:24px;right:24px;z-index:1200;background:rgba(255,255,255,.04);border:1px solid rgba(45,212,191,.20);border-radius:50px;padding:8px 16px;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);display:flex;align-items:center;gap:8px}',
  '.status-dot{width:7px;height:7px;background:#22c55e;border-radius:50%;box-shadow:0 0 8px rgba(34,197,94,.8);animation:statusBlink 2s step-end infinite}',
  '.status-text{font-family:Inter,sans-serif;font-weight:500;font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:rgba(255,255,255,.70)}',
  '.contact-page{position:relative;z-index:1;min-height:100vh}',
  '.contact-grid{min-height:100vh;display:grid;grid-template-columns:1fr 1fr;gap:0}',
  '@media (max-width:767px){.contact-grid{grid-template-columns:1fr}.status-indicator{top:16px;right:16px}}',
  '@media (max-width:768px){.status-indicator,.field-input,.dropdown-trigger,.send-btn{backdrop-filter:none !important;-webkit-backdrop-filter:none !important}}',
].join('\n');

const CONTACT_PAGE_CSS_NAV = [
  'body.contact-page-body .shared-header{z-index:1100}',
  'body.contact-page-body .header-inner{background:rgba(255,255,255,.06);border:1px solid rgba(45,212,191,.20);box-shadow:0 10px 40px rgba(0,0,0,.35)}',
  'body.contact-page-body .header-inner.scrolled{background:rgba(255,255,255,.08)}',
  'body.contact-page-body .logo{color:rgba(255,255,255,.92)}',
  'body.contact-page-body nav a{color:rgba(255,255,255,.66)}',
  'body.contact-page-body nav a:hover{color:rgba(255,255,255,.92);background:rgba(45,212,191,.08)}',
  'body.contact-page-body nav a::after{background:#2DD4BF}',
  'body.contact-page-body .nav-cta{background:rgba(45,212,191,.14);border:1px solid rgba(45,212,191,.24)}',
  'body.contact-page-body .hamburger span{background:rgba(255,255,255,.72)}',
  'body.contact-page-body .mobile-menu{background:rgba(7,6,15,.92);border:1px solid rgba(255,255,255,.08)}',
  'body.contact-page-body .mobile-menu a{color:rgba(255,255,255,.80)}',
].join('\n');

const CONTACT_PAGE_CSS_LAYOUT = [
  '.left-panel{position:sticky;top:0;height:100vh;display:flex;flex-direction:column;justify-content:center;padding:80px 60px;overflow:hidden;background:radial-gradient(ellipse 80% 60% at -10% 50%,rgba(45,212,191,.06) 0%,transparent 65%);border-right:1px solid rgba(255,255,255,.05)}',
  '.radar-beam{position:absolute;left:0;top:18%;height:1px;width:200px;background:linear-gradient(to right,transparent 0%,rgba(45,212,191,.6) 40%,rgba(45,212,191,1) 50%,rgba(45,212,191,.6) 60%,transparent 100%);animation:radarSweep 6s linear infinite;pointer-events:none;z-index:2;box-shadow:0 0 12px rgba(45,212,191,.5)}',
  '.section-label{font-family:Inter,sans-serif;font-weight:500;font-size:10px;color:#2DD4BF;letter-spacing:.28em;text-transform:uppercase;margin-bottom:40px;animation:slideUp .8s ease .2s both}',
  '.headline-wrap{position:relative}',
  '.headline-scanline{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(45,212,191,.75),transparent);opacity:.55;animation:scanLine 4.2s ease-in-out infinite;pointer-events:none}',
  '.headline{margin:0;font-family:Poppins,sans-serif}',
  '.hl-line{display:block;letter-spacing:-.06em;line-height:.88}',
  '.hl-lets{font-weight:800;font-size:clamp(4.5rem,8vw,9rem);color:#fff;animation:slideUp .9s ease .3s both}',
  '.hl-build{font-weight:300;font-size:clamp(4.5rem,8vw,9rem);color:transparent;-webkit-text-stroke:1px rgba(255,255,255,.40);animation:slideUp .9s ease .45s both}',
  '.hl-something{font-weight:800;font-size:clamp(2.4rem,4.2vw,4.8rem);color:#2DD4BF;letter-spacing:-.05em;line-height:1;animation:slideUp .9s ease .55s both}',
  '.hl-real{font-weight:800;font-size:clamp(4.5rem,8vw,9rem);color:#fff;animation:slideUp .9s ease .65s both}',
  '.hl-real .dot{color:#2DD4BF;display:inline}',
  '.descriptor{margin-top:40px;font-family:Inter,sans-serif;font-weight:400;font-size:clamp(.82rem,1vw,.95rem);color:rgba(255,255,255,.40);line-height:1.9;white-space:pre-line;animation:slideUp .9s ease .8s both}',
  '.response-badge{margin-top:32px;display:inline-flex;align-items:center;gap:10px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:50px;padding:9px 18px;animation:slideUp .9s ease .95s both}',
  '.response-badge .pulse-dot{width:6px;height:6px;background:#2DD4BF;border-radius:50%;box-shadow:0 0 10px rgba(45,212,191,.9);animation:transmitPulse 2s ease-in-out infinite}',
  '.response-badge .text{font-family:Inter,sans-serif;font-weight:400;font-size:11px;color:rgba(255,255,255,.45)}',
  '.right-panel{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:80px 60px;position:relative}',
  '@media (max-width:767px){.left-panel{position:relative;height:auto;padding:80px 24px 48px;border-right:none;border-bottom:1px solid rgba(255,255,255,.05)}.right-panel{padding:48px 24px 80px}}',
].join('\n');

const CONTACT_PAGE_CSS_FORM = [
  '.form-area{position:relative}',
  '.form-panel{transition:opacity .5s ease,transform .5s ease}',
  '.form-area.sent .form-panel{opacity:0;transform:translateY(-20px);pointer-events:none}',
  '.form-head{margin-bottom:40px}',
  '.mission{font-family:Inter,sans-serif;font-weight:500;font-size:10px;color:rgba(255,255,255,.20);letter-spacing:.22em;margin-bottom:8px}',
  '.form-title{font-family:Poppins,sans-serif;font-weight:700;font-size:clamp(1.2rem,2vw,1.6rem);color:#fff;letter-spacing:.04em;margin-bottom:6px}',
  '.form-sub{font-family:Inter,sans-serif;font-weight:400;font-size:13px;color:rgba(255,255,255,.38)}',
  '.field-wrap{position:relative;margin-bottom:28px}',
  '.field-wrap.shake{animation:shake .36s ease}',
  '.field-label{display:flex;align-items:center;gap:8px;margin-bottom:8px}',
  '.field-code{font-family:Inter,sans-serif;font-weight:500;font-size:9px;color:rgba(255,255,255,.20);letter-spacing:.18em}',
  '.field-name{font-family:Inter,sans-serif;font-weight:600;font-size:9px;color:rgba(255,255,255,.45);letter-spacing:.22em;text-transform:uppercase}',
  '.field-input,.dropdown-trigger{width:100%;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-bottom:2px solid rgba(255,255,255,.12);border-radius:0;color:#fff;font-family:Inter,sans-serif;font-weight:400;font-size:15px;padding:14px 16px;outline:none;transition:border-color .2s ease,background .2s ease,box-shadow .2s ease,transform .2s ease;caret-color:#2DD4BF}',
  '.field-input::placeholder{color:rgba(255,255,255,.15)}',
  'textarea.field-input{resize:vertical}',
  '.field-input.focused,.dropdown-trigger.focused,.dropdown-trigger.open{background:rgba(45,212,191,.04);border-bottom-color:#2DD4BF;box-shadow:0 4px 20px rgba(45,212,191,.08)}',
  '.field-accent{position:absolute;bottom:0;left:0;width:0%;height:2px;background:linear-gradient(to right,#2DD4BF,#A78BFA);transition:width .3s ease}',
  '.field-accent.on{width:100%}',
  '.dropdown-trigger{display:flex;align-items:center;justify-content:space-between;cursor:pointer;user-select:none}',
  '.dropdown-value{color:rgba(255,255,255,.45)}',
  '.dropdown-value.has{color:rgba(255,255,255,.90)}',
  '.dropdown-chevron{color:rgba(255,255,255,.55);transition:transform .18s ease}',
  '.dropdown-chevron.open{transform:rotate(180deg)}',
  '.dropdown-menu{position:absolute;top:calc(100% + 4px);left:0;right:0;background:#0d0c1a;border:1px solid rgba(255,255,255,.10);border-radius:8px;z-index:50;overflow:hidden}',
  '.dropdown-option{padding:12px 16px;font-family:Inter,sans-serif;font-weight:400;font-size:13px;color:rgba(255,255,255,.65);cursor:pointer;transition:background .18s ease,color .18s ease}',
  '.dropdown-option:hover{background:rgba(45,212,191,.08);color:#fff}',
  '.send-btn{width:100%;margin-top:8px;height:56px;position:relative;overflow:hidden;border:none;border-radius:4px;cursor:pointer;background:linear-gradient(135deg,#2DD4BF 0%,#1ba090 50%,#A78BFA 100%);background-size:200% 100%;color:#07060f;font-family:Poppins,sans-serif;font-weight:700;font-size:14px;letter-spacing:.12em;text-transform:uppercase;transition:background-position .4s ease,box-shadow .25s ease,transform .25s ease;box-shadow:0 4px 30px rgba(45,212,191,.25)}',
  '.send-btn:hover{background-position:right center;box-shadow:0 8px 40px rgba(45,212,191,.45);transform:translateY(-1px)}',
  '.send-btn.sending,.send-btn:disabled{background:rgba(255,255,255,.06);border:1px solid rgba(45,212,191,.30);color:#2DD4BF;box-shadow:none;transform:none;cursor:not-allowed}',
  '.send-dots{display:inline-block;width:18px;text-align:left}',
  '.success-panel{position:absolute;inset:0;display:grid;place-items:center;animation:successReveal .6s cubic-bezier(.22,1,.36,1) .4s both}',
  '.success-inner{text-align:center;padding:24px}',
  '.success-badge{width:72px;height:72px;display:grid;place-items:center;margin:0 auto 28px;background:rgba(45,212,191,.12);border:1px solid rgba(45,212,191,.30);border-radius:50%}',
  '.success-title{font-family:Poppins,sans-serif;font-weight:800;font-size:clamp(1.6rem,3vw,2.4rem);color:#fff;letter-spacing:-.03em;margin:0 0 12px}',
  '.success-sub{font-family:Inter,sans-serif;font-weight:400;font-size:14px;color:rgba(255,255,255,.50);line-height:1.7;margin:0 0 32px}',
  '.success-wave{margin:0 auto 32px}',
  '.success-wave path{stroke-dasharray:1000;stroke-dashoffset:1000;animation:waveformDraw 1.5s ease .6s forwards}',
  '.success-reset{background:transparent;border:1px solid rgba(255,255,255,.12);color:rgba(255,255,255,.50);font-family:Poppins,sans-serif;font-weight:500;font-size:12px;letter-spacing:.08em;padding:10px 24px;border-radius:50px;cursor:pointer;transition:border-color .2s ease,color .2s ease,transform .2s ease}',
  '.success-reset:hover{border-color:rgba(45,212,191,.40);color:rgba(255,255,255,.80);transform:translateY(-1px)}',
].join('\n');

const CONTACT_PAGE_CSS_MARQUEE = [
  '.bottom-marquee{position:relative;z-index:2;padding:20px 0;background:rgba(255,255,255,.02);border-top:1px solid rgba(255,255,255,.05);overflow:hidden}',
  '.marquee-track{display:flex;width:max-content;animation:marqueeScroll 30s linear infinite}',
  '.bottom-marquee:hover .marquee-track{animation-play-state:paused}',
  '.marquee-row{display:flex;align-items:center;white-space:nowrap}',
  '.marquee-item{font-family:Inter,sans-serif;font-weight:500;font-size:11px;color:rgba(255,255,255,.22);letter-spacing:.18em;text-transform:uppercase;display:inline-flex;align-items:center}',
  '.marquee-item a{color:rgba(255,255,255,.22);text-decoration:none;transition:color .2s ease}',
  '.marquee-item a:hover{color:rgba(255,255,255,.75)}',
  '.marquee-sep{color:#2DD4BF;padding:0 18px}',
  '.marquee-fade{position:absolute;top:0;bottom:0;width:60px;z-index:2;pointer-events:none}',
  '.marquee-fade.left{left:0;background:linear-gradient(to right,#07060f,transparent)}',
  '.marquee-fade.right{right:0;background:linear-gradient(to left,#07060f,transparent)}',
].join('\n');

function SignalCanvas({isMobile}: {isMobile: boolean}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let time = 0;
    let frameCount = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawWave = (opts: {
      amplitude: number;
      frequency: number;
      yCenter: number;
      phase: number;
      stroke: string;
      lineWidth: number;
    }) => {
      ctx.beginPath();
      for (let x = 0; x <= width; x += 2) {
        const y = opts.yCenter + Math.sin(x * opts.frequency + time + opts.phase) * opts.amplitude;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.strokeStyle = opts.stroke;
      ctx.lineWidth = opts.lineWidth;
      ctx.stroke();
    };

    const tick = () => {
      frameCount += 1;
      if (isMobile && frameCount % 2 !== 0) {
        rafRef.current = window.requestAnimationFrame(tick);
        return;
      }
      ctx.clearRect(0, 0, width, height);
      const amp = isMobile ? 0.4 : 1;
      const yCenter = height * 0.6;

      drawWave({amplitude: 18 * amp, frequency: time * 0.0008, yCenter, phase: 0, stroke: 'rgba(45,212,191,0.07)', lineWidth: 1.5});
      drawWave({amplitude: 10 * amp, frequency: time * 0.0012, yCenter, phase: Math.PI * 0.4, stroke: 'rgba(167,139,250,0.05)', lineWidth: 1});
      drawWave({amplitude: 6 * amp, frequency: time * 0.002, yCenter, phase: Math.PI * 0.8, stroke: 'rgba(94,234,212,0.04)', lineWidth: 0.8});

      time += 0.5;
      rafRef.current = window.requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener('resize', resize, {passive: true});
    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  return <canvas ref={canvasRef} className="signal-canvas" aria-hidden="true" />;
}

function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.left = `${targetX}px`;
      dot.style.top = `${targetY}px`;
    };

    const setHover = (hovering: boolean) => {
      ring.classList.toggle('cursor-ring--grow', hovering);
      dot.classList.toggle('cursor-dot--shrink', hovering);
    };

    const onOver = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      setHover(!!t.closest('.cursor-grow'));
    };
    const onOut = (e: Event) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      if (t.closest('.cursor-grow')) setHover(false);
    };

    const tick = () => {
      ring.style.left = `${targetX}px`;
      ring.style.top = `${targetY}px`;
      raf = window.requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, {passive: true});
    document.addEventListener('pointerover', onOver, true);
    document.addEventListener('pointerout', onOut, true);
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('pointerover', onOver, true);
      document.removeEventListener('pointerout', onOut, true);
      window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}

function StatusIndicator() {
  return (
    <div className="status-indicator" id="contactStatusIndicator">
      <span className="status-dot" aria-hidden="true" />
      <span className="status-text">AVAILABLE FOR WORK</span>
    </div>
  );
}

function BudgetDropdown({
  value,
  onChange,
  focused,
  setFocused,
}: {
  value: string;
  onChange: (v: string) => void;
  focused: string | null;
  setFocused: (v: string | null) => void;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);

  const options = useMemo(
    () => [
      '< $500 — Small task',
      '$500–$2,000 — Freelance project',
      '$2,000–$10,000 — Full product build',
      '$10,000+ — Long-term partnership',
      "Let's discuss — I have a unique project",
    ],
    [],
  );

  useEffect(() => {
    const onDocDown = (e: MouseEvent) => {
      const n = e.target as Node | null;
      if (!n) return;
      if (!wrapRef.current?.contains(n)) {
        setOpen(false);
        if (focused === 'budget') setFocused(null);
      }
    };
    document.addEventListener('mousedown', onDocDown);
    return () => document.removeEventListener('mousedown', onDocDown);
  }, [focused, setFocused]);

  return (
    <div className="field-wrap" ref={wrapRef}>
      <div className="field-label">
        <span className="field-code">[ 03 ]</span>
        <span className="field-name">PROJECT BUDGET</span>
      </div>

      <div
        className={`dropdown-trigger cursor-grow${open ? ' open' : ''}${focused === 'budget' ? ' focused' : ''}`}
        role="button"
        tabIndex={0}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => {
          setOpen((v) => !v);
          setFocused('budget');
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setOpen((v) => !v);
            setFocused('budget');
          }
          if (e.key === 'Escape') {
            setOpen(false);
            setFocused(null);
          }
        }}
      >
        <span className={`dropdown-value${value ? ' has' : ''}`}>{value || 'SELECT BUDGET RANGE'}</span>
        <svg
          className={`dropdown-chevron${open ? ' open' : ''}`}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      <div className={`field-accent${focused === 'budget' ? ' on' : ''}`} aria-hidden="true" />

      {open && (
        <div className="dropdown-menu" role="listbox" aria-label="Budget ranges">
          {options.map((opt) => (
            <div
              key={opt}
              className="dropdown-option cursor-grow"
              role="option"
              aria-selected={value === opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
                setFocused(null);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SuccessPanel({onReset}: {onReset: () => void}) {
  return (
    <div className="success-panel" aria-live="polite">
      <div className="success-inner">
        <div className="success-badge" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M20 6L9 17l-5-5"
              stroke="#2DD4BF"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h2 className="success-title">TRANSMISSION RECEIVED</h2>
        <p className="success-sub">Message received. I will be in touch within 24 hours.</p>

        <svg className="success-wave" width="200" height="40" viewBox="0 0 200 40" fill="none" aria-hidden="true">
          <path
            d="M 0 20 Q 25 5 50 20 Q 75 35 100 20 Q 125 5 150 20 Q 175 35 200 20"
            stroke="#2DD4BF"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>

        <button className="success-reset cursor-grow" type="button" onClick={onReset}>
          Send another message
        </button>
      </div>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({name: '', email: '', budget: '', message: ''});
  const [status, setStatus] = useState<Status>('idle');
  const [focused, setFocused] = useState<string | null>(null);
  const [shakeField, setShakeField] = useState<{[k: string]: boolean}>({});
  const [dots, setDots] = useState('');

  const mission = useMemo(() => `MSG_${Date.now().toString().slice(-3)}`, []);

  useEffect(() => {
    if (status !== 'sending') {
      setDots('');
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i = (i + 1) % 4;
      setDots('.'.repeat(i));
    }, 320);
    return () => window.clearInterval(id);
  }, [status]);

  const markShake = (fields: Array<'name' | 'email' | 'message'>) => {
    const next: {[k: string]: boolean} = {};
    fields.forEach((f) => (next[f] = true));
    setShakeField(next);
    window.setTimeout(() => setShakeField({}), 520);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'idle') return;

    const missing: Array<'name' | 'email' | 'message'> = [];
    if (!form.name.trim()) missing.push('name');
    if (!form.email.trim()) missing.push('email');
    if (!form.message.trim()) missing.push('message');
    if (missing.length) {
      markShake(missing);
      return;
    }

    setStatus('sending');
    // TODO: replace setTimeout with actual API call
    // e.g. await fetch('/api/contact', { method:'POST', body: JSON.stringify(form) })
    window.setTimeout(() => setStatus('sent'), 2000);
  };

  const reset = () => {
    setForm({name: '', email: '', budget: '', message: ''});
    setFocused(null);
    setStatus('idle');
  };

  return (
    <div className={`form-area${status === 'sent' ? ' sent' : ''}`} aria-label="Contact form">
      <form className="form-panel" onSubmit={onSubmit}>
        <div className="form-head">
          <div className="mission">{mission}</div>
          <div className="form-title">START A TRANSMISSION</div>
          <div className="form-sub">Fill in the brief. I&apos;ll get back within 24 hours.</div>
        </div>

        <div className={`field-wrap${shakeField.name ? ' shake' : ''}`}>
          <div className="field-label">
            <span className="field-code">[ 01 ]</span>
            <span className="field-name">YOUR NAME</span>
          </div>
          <input
            className={`field-input cursor-grow${focused === 'name' ? ' focused' : ''}`}
            type="text"
            placeholder="e.g. Alex Johnson"
            value={form.name}
            onChange={(e) => setForm((f) => ({...f, name: e.target.value}))}
            onFocus={() => setFocused('name')}
            onBlur={() => setFocused((v) => (v === 'name' ? null : v))}
            aria-invalid={!!shakeField.name}
          />
          <div className={`field-accent${focused === 'name' ? ' on' : ''}`} aria-hidden="true" />
        </div>

        <div className={`field-wrap${shakeField.email ? ' shake' : ''}`}>
          <div className="field-label">
            <span className="field-code">[ 02 ]</span>
            <span className="field-name">YOUR EMAIL</span>
          </div>
          <input
            className={`field-input cursor-grow${focused === 'email' ? ' focused' : ''}`}
            type="email"
            placeholder="e.g. alex@company.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({...f, email: e.target.value}))}
            onFocus={() => setFocused('email')}
            onBlur={() => setFocused((v) => (v === 'email' ? null : v))}
            aria-invalid={!!shakeField.email}
          />
          <div className={`field-accent${focused === 'email' ? ' on' : ''}`} aria-hidden="true" />
        </div>

        <BudgetDropdown
          value={form.budget}
          onChange={(v) => setForm((f) => ({...f, budget: v}))}
          focused={focused}
          setFocused={setFocused}
        />

        <div className={`field-wrap${shakeField.message ? ' shake' : ''}`}>
          <div className="field-label">
            <span className="field-code">[ 04 ]</span>
            <span className="field-name">TELL ME EVERYTHING</span>
          </div>
          <textarea
            className={`field-input cursor-grow${focused === 'message' ? ' focused' : ''}`}
            rows={5}
            placeholder={'Describe your project, idea, or problem.\nWhat does success look like for you?'}
            value={form.message}
            onChange={(e) => setForm((f) => ({...f, message: e.target.value}))}
            onFocus={() => setFocused('message')}
            onBlur={() => setFocused((v) => (v === 'message' ? null : v))}
            aria-invalid={!!shakeField.message}
          />
          <div className={`field-accent${focused === 'message' ? ' on' : ''}`} aria-hidden="true" />
        </div>

        <button className={`send-btn cursor-grow${status === 'sending' ? ' sending' : ''}`} type="submit" disabled={status !== 'idle'}>
          {status === 'idle' && 'SEND TRANSMISSION →'}
          {status === 'sending' && (
            <>
              TRANSMITTING<span className="send-dots">{dots}</span>
            </>
          )}
        </button>
      </form>

      {status === 'sent' && <SuccessPanel onReset={reset} />}
    </div>
  );
}

function BottomMarquee() {
  const items = useMemo(
    () => [
      {label: 'GITHUB', text: 'alyanhaider', href: 'https://github.com/alyanhaider'},
      {label: 'FIVERR', text: 'alyan_haider259', href: 'https://www.fiverr.com/alyan_haider259?public_mode=true'},
      {label: 'UPWORK', text: 'Alyan Haider', href: 'https://www.upwork.com/freelancers/~01d40fc58aa9e1f8fd?viewMode=1'},
      {label: 'EMAIL', text: 'alyanhaider369@gmail.com', href: 'mailto:alyanhaider369@gmail.com'},
      {label: 'WHATSAPP', text: '+92 325 562 9527', href: 'https://wa.me/923255629527'},
      {label: 'LINKEDIN', text: 'Alyan Haider', href: 'https://linkedin.com/in/'},
    ],
    [],
  );

  const Chunk = ({idx, hidden}: {idx: number; hidden: boolean}) => (
    <span aria-hidden={hidden}>
      {items.map((it, i) => (
        <span key={`${idx}-${it.label}-${i}`} className="marquee-item">
          <a className="cursor-grow" href={it.href} target={it.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
            {it.label} — {it.text}
          </a>
          <span className="marquee-sep" aria-hidden="true">
            ✦
          </span>
        </span>
      ))}
    </span>
  );

  return (
    <div className="bottom-marquee" aria-label="Contact links marquee">
      <div className="marquee-track">
        <div className="marquee-row">
          <Chunk idx={0} hidden={false} />
          <Chunk idx={1} hidden />
          <Chunk idx={2} hidden />
        </div>
      </div>
      <div className="marquee-fade left" aria-hidden="true" />
      <div className="marquee-fade right" aria-hidden="true" />
    </div>
  );
}

export default function ContactPage() {
  const [isMobile, setIsMobile] = useState(() => (typeof window !== 'undefined' ? window.innerWidth < 768 : false));
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize, {passive: true});
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (document.getElementById('contact-page-styles')) return;
    const style = document.createElement('style');
    style.id = 'contact-page-styles';
    style.textContent = [
      CONTACT_PAGE_CSS_BASE,
      CONTACT_PAGE_CSS_NAV,
      CONTACT_PAGE_CSS_LAYOUT,
      CONTACT_PAGE_CSS_FORM,
      CONTACT_PAGE_CSS_MARQUEE,
    ].join('\n');
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    document.body.classList.add('contact-page-body');
    document.body.classList.toggle('contact-page-mobile', isMobile);
    return () => {
      document.body.classList.remove('contact-page-body');
      document.body.classList.remove('contact-page-mobile');
    };
  }, [isMobile]);

  useEffect(() => {
    let tries = 0;
    const id = window.setInterval(() => {
      tries += 1;
      const gsap = (window as any).gsap;
      if (!gsap || !rootRef.current) {
        if (tries > 40) window.clearInterval(id);
        return;
      }

      window.clearInterval(id);
      const lines = rootRef.current.querySelectorAll('[data-headline-line]');
      const right = rootRef.current.querySelector('#contactRightPanel');
      const status = document.getElementById('contactStatusIndicator');

      if (lines?.length) {
        gsap.fromTo(
          lines,
          {opacity: 0, y: 40},
          {opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12, clearProps: 'transform,opacity'},
        );
      }
      if (right) {
        gsap.fromTo(
          right,
          {opacity: 0, x: 30},
          {opacity: 1, x: 0, duration: 0.8, ease: 'power3.out', clearProps: 'transform,opacity'},
        );
      }
      if (status) {
        gsap.fromTo(
          status,
          {opacity: 0, y: -16},
          {opacity: 1, y: 0, duration: 0.5, ease: 'power3.out', clearProps: 'transform,opacity'},
        );
      }
    }, 120);

    return () => window.clearInterval(id);
  }, []);

  return (
    <>
      <SignalCanvas isMobile={isMobile} />
      {!isMobile && <CustomCursor />}
      <StatusIndicator />

      <div className="contact-page" ref={rootRef}>
        <SharedNav />

        <div className="contact-grid">
          <aside className="left-panel" aria-label="Contact introduction">
            <div className="radar-beam" aria-hidden="true" />
            <div className="section-label" data-headline-line>
              — CONTACT
            </div>

            <div className="headline-wrap">
              <div className="headline-scanline" aria-hidden="true" />
              <h1 className="headline">
                <span className="hl-line hl-lets" data-headline-line>
                  LET&apos;S
                </span>
                <span className="hl-line hl-build" data-headline-line>
                  BUILD
                </span>
                <span className="hl-line hl-something" data-headline-line>
                  SOMETHING
                </span>
                <span className="hl-line hl-real" data-headline-line>
                  REAL<span className="dot">.</span>
                </span>
              </h1>
            </div>

            <p className="descriptor" data-headline-line>
              {'Full Stack Developer based in Pakistan.\nTurning ideas into production-ready products.\nAvailable for freelance, contract & full-time.'}
            </p>

            <div className="response-badge" data-headline-line>
              <span className="pulse-dot" aria-hidden="true" />
              <span className="text">Typically responds within 24 hours</span>
            </div>
          </aside>

          <section className="right-panel" id="contactRightPanel" aria-label="Start a transmission">
            <ContactForm />
          </section>
        </div>

        <BottomMarquee />
      </div>
    </>
  );
}
