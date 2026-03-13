import React, {useEffect, useMemo, useRef} from 'react';
import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {
  BriefcaseBusiness,
  Github,
  Globe,
  Linkedin,
  Mail,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import {Link} from 'react-router-dom';
import SharedNav from '../../components/SharedNav';
import profileImage from '../../assets/images/profile image.png';

gsap.registerPlugin(ScrollTrigger);

type Card = {title: string; desc: string; icon?: React.ReactNode};

export default function About() {
  const rootRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const profileCardRef = useRef<HTMLDivElement>(null);
  const techWrapRef = useRef<HTMLDivElement>(null);

  const techCards = useMemo<Card[]>(
    () => [
      {title: 'React', desc: 'Component-driven UI engineering.'},
      {title: 'Next.js', desc: 'Production-ready app architecture.'},
      {title: 'Node.js', desc: 'Scalable backend services & APIs.'},
      {title: 'TypeScript', desc: 'Type-safe, maintainable codebases.'},
      {title: 'MongoDB', desc: 'Flexible, performant data modeling.'},
      {title: 'REST APIs', desc: 'Clean endpoints & integrations.'},
      {title: 'Authentication Systems', desc: 'Secure sessions & access control.'},
      {title: 'Responsive UI', desc: 'Pixel-perfect layouts for all screens.'},
      {title: 'Performance Optimization', desc: 'Fast load, smooth interactions.'},
    ],
    [],
  );

  const links = useMemo(
    () => [
      {
        id: 'github',
        title: 'GitHub',
        desc: 'Open-source work & repositories.',
        href: 'https://github.com/alyanhaider',
        icon: <Github size={18} />,
        cta: 'Open GitHub',
      },
      {
        id: 'fiverr',
        title: 'Fiverr',
        desc: 'Hire me for web development gigs.',
        href: 'https://www.fiverr.com/alyan_haider259?public_mode=true',
        icon: <BriefcaseBusiness size={18} />,
        cta: 'Open Fiverr',
      },
      {
        id: 'upwork',
        title: 'Upwork',
        desc: 'Professional freelance profile.',
        href: 'https://www.upwork.com/freelancers/~01d40fc58aa9e1f8fd?viewMode=1',
        icon: <Globe size={18} />,
        cta: 'Open Upwork',
      },
      {
        id: 'linkedin',
        title: 'LinkedIn',
        desc: 'Connect and see my experience.',
        href: 'https://www.linkedin.com/in/',
        icon: <Linkedin size={18} />,
        cta: 'Open LinkedIn',
      },
      {
        id: 'email',
        title: 'Email',
        desc: 'Let’s discuss your project.',
        href: 'mailto:alyanhaider369@gmail.com',
        icon: <Mail size={18} />,
        cta: 'Send Email',
      },
      {
        id: 'whatsapp',
        title: 'WhatsApp',
        desc: 'Quick messages & availability.',
        href: 'https://wa.me/923255629527',
        icon: <MessageCircle size={18} />,
        cta: 'Message Me',
      },
    ],
    [],
  );

  const buildCards = useMemo<Card[]>(
    () => [
      {
        title: 'Starter Website',
        desc: 'Simple responsive single-page website with modern design and basic functionality. Delivered in 3 days.',
        icon: <Globe size={18} />,
      },
      {
        title: 'Professional Website',
        desc: 'Modern multi-page website with responsive design, dashboard, database integration, and payment support. Delivered in 6 days.',
        icon: <Sparkles size={18} />,
      },
      {
        title: 'Advanced Web Application',
        desc: 'Full-stack web application with authentication, dashboard, database, e-commerce, and custom functionality. Delivered in 10 days.',
        icon: <ShieldCheck size={18} />,
      },
    ],
    [],
  );

  useEffect(() => {
    if (window.innerWidth < 768) {
      gsap.config({force3D: false});
    }
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const heroEls = heroRef.current?.querySelectorAll('[data-hero]');
      if (heroEls?.length) {
        gsap.fromTo(
          heroEls,
          {y: 18, opacity: 0},
          {y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', stagger: 0.1},
        );
      }

      if (profileCardRef.current) {
        gsap.to(profileCardRef.current, {
          y: -10,
          duration: 3.6,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      }

      const blocks = gsap.utils.toArray<HTMLElement>('[data-animate="fade-up"]');
      blocks.forEach((el) => {
        gsap.fromTo(
          el,
          {y: 20, opacity: 0},
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {trigger: el, start: 'top 85%', once: true},
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (window.innerWidth < 768) return;
    const wrap = techWrapRef.current;
    if (!wrap) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = wrap.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const nx = (px - 0.5) * 2;
      const ny = (py - 0.5) * 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        wrap.style.setProperty('--mx', nx.toFixed(3));
        wrap.style.setProperty('--my', ny.toFixed(3));
      });
    };

    const onLeave = () => {
      wrap.style.setProperty('--mx', '0');
      wrap.style.setProperty('--my', '0');
    };

    wrap.addEventListener('mousemove', onMove);
    wrap.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      wrap.removeEventListener('mousemove', onMove);
      wrap.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} className="about-page">
      <SharedNav activePage="about" />

      <main className="about-main">
        {/* SECTION 1 — HERO INTRO */}
        <section className="about-hero" aria-label="About hero">
          <div className="container">
            <div className="hero-simple" ref={heroRef}>
              <h1 className="about-title" data-hero>
                Alyan Haider
              </h1>
              <p className="about-subtitle" data-hero>
                Full-Stack Web Developer{' \u00B7 '}Open to Work
              </p>
              <p className="about-desc" data-hero>
                I build modern web applications end to end{' \u2014 '}from landing pages to full SaaS platforms with authentication,
                dashboards, and databases. Based in Pakistan, working with clients worldwide. Available for freelance,
                contract, and full-time remote work.
              </p>
              <div className="hero-actions" data-hero>
                <Link className="btn-primary" to="/contact">
                  Contact Me
                </Link>
                <a className="btn-outline" href="/#projects">
                  View My Work
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2 — MY STORY */}
        <section className="about-section" id="story" aria-label="My story">
          <div className="container">
            <div className="section-grid" data-animate="fade-up">
              <div className="story-copy">
                <h2 className="section-title">My Journey</h2>
                <p className="section-text">
                  I started building web applications with a strong curiosity about how modern platforms work behind the
                  scenes. Over time, that curiosity turned into a deep focus on full-stack development — designing
                  interfaces, building backend systems, and connecting everything into scalable products.
                </p>
                <p className="section-text">
                  Today I focus on building modern platforms, dashboards, marketplaces, and scalable web systems that
                  deliver real value to businesses and users.
                </p>
              </div>

              <div className="story-card-wrap">
                  <div className="glass-profile-card" ref={profileCardRef} aria-label="Profile card">
                    <div className="profile-placeholder">
                      <div className="profile-silhouette" aria-hidden="true">
                        <img
                          src={profileImage}
                          alt=""
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            borderRadius: '50%',
                          }}
                        />
                      </div>
                      <div className="profile-meta">
                        <div className="profile-name">Alyan Haider</div>
                        <div className="profile-role">Full-Stack Web Developer</div>
                      </div>
                    </div>
                  <div className="profile-glow" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3 — TECHNOLOGY STACK */}
        <section className="about-section" aria-label="Technology stack">
          <div className="container">
            <div className="section-head" data-animate="fade-up">
              <h2 className="section-title">Technology Stack</h2>
              <p className="section-sub">
                A focused stack for building premium interfaces, reliable backend systems, and fast production apps.
              </p>
            </div>

            <div className="tech-wrap" ref={techWrapRef} data-animate="fade-up">
              <div className="tech-grid">
                {techCards.map((t, idx) => (
                  <div key={t.title} className="tech-card" style={{'--d': `${idx % 5}`} as React.CSSProperties}>
                    <div className="tech-card-top">
                      <span className="tech-dot" aria-hidden="true" />
                      <h3 className="tech-title">{t.title}</h3>
                    </div>
                    <p className="tech-desc">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4 — PROFESSIONAL LINKS */}
        <section className="about-section" aria-label="Professional links">
          <div className="container">
            <div className="section-head" data-animate="fade-up">
              <h2 className="section-title">Professional Links</h2>
              <p className="section-sub">Find me online or reach out directly.</p>
            </div>

            <div className="link-grid">
              {links.map((l) => (
                <div key={l.id} className="link-card" data-animate="fade-up">
                  <div className="link-icon" aria-hidden="true">
                    {l.icon}
                  </div>
                  <div className="link-body">
                    <h3 className="link-title">{l.title}</h3>
                    <p className="link-desc">{l.desc}</p>
                  </div>
                  <a className="link-cta" href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}>
                    {l.cta}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5 — WHAT I BUILD */}
        <section className="about-section" aria-label="What I build">
          <div className="container">
            <div className="section-head" data-animate="fade-up">
              <h2 className="section-title">What I Build</h2>
              <p className="section-sub">Services designed for modern products and real-world business needs.</p>
            </div>

            <div className="build-grid">
              {buildCards.map((c) => (
                <div key={c.title} className="build-card" data-animate="fade-up">
                  <div className="build-top">
                    <span className="build-icon" aria-hidden="true">
                      {c.icon}
                    </span>
                    <h3 className="build-title">{c.title}</h3>
                  </div>
                  <p className="build-desc">{c.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5b - PRICING */}
        <section className="about-section" aria-label="Pricing">
          <div className="container">
            <div className="section-head" data-animate="fade-up">
              <h2 className="section-title">Pricing</h2>
              <p className="section-sub">
                Transparent pricing with no hidden fees. Choose the package that fits your project.
              </p>
            </div>

            <div className="build-grid" data-animate="fade-up">
              {/* BASIC */}
              <div className="build-card">
                <div className="build-top">
                  <span className="build-icon">
                    <Globe size={18} />
                  </span>
                  <h3 className="build-title">Basic {'\u2014'} $80</h3>
                </div>
                <p className="build-desc">
                  Starter Website {'\u00B7'} 1 page {'\u00B7'} 2 revisions {'\u00B7'} 3-day delivery. Includes hosting setup,
                  social media icons, and 1 plugin installation.
                </p>
              </div>

              {/* STANDARD */}
              <div className="build-card">
                <div className="build-top">
                  <span className="build-icon">
                    <Sparkles size={18} />
                  </span>
                  <h3 className="build-title">Standard {'\u2014'} $200</h3>
                </div>
                <p className="build-desc">
                  Professional Website {'\u00B7'} 4 pages {'\u00B7'} 4 revisions {'\u00B7'} 6-day delivery. Includes content
                  upload, payment integration, opt-in form, speed optimization, and 3 plugin installations.
                </p>
              </div>

              {/* PREMIUM */}
              <div className="build-card">
                <div className="build-top">
                  <span className="build-icon">
                    <ShieldCheck size={18} />
                  </span>
                  <h3 className="build-title">Premium {'\u2014'} $350</h3>
                </div>
                <p className="build-desc">
                  Advanced Web Application {'\u00B7'} 7 pages {'\u00B7'} Unlimited revisions {'\u00B7'} 10-day delivery.
                  Includes e-commerce (10 products), payment integration, autoresponder, speed optimization, hosting setup,
                  and 5 plugin installations.
                </p>
              </div>
            </div>

            <div style={{textAlign: 'center', marginTop: '32px'}} data-animate="fade-up">
              <a
                className="btn-primary"
                href="https://www.fiverr.com/alyan_haider259"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Full Gig on Fiverr
              </a>
            </div>
          </div>
        </section>

        {/* SECTION 6 - FINAL CTA */}
        <section className="about-section about-cta" aria-label="Final call to action">
          <div className="container">
            <div className="cta-panel" data-animate="fade-up">
              <h2 className="cta-title">Let’s Build Something Great</h2>
              <p className="cta-desc">
                If you need a developer who can design, build, and scale modern web applications, let&apos;s start your
                project.
              </p>
              <div className="hero-actions">
                <Link className="btn-primary" to="/contact">
                  Contact Me
                </Link>
                <a className="btn-outline" href="/#projects">
                  View My Work
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
