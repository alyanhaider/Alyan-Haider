import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export interface SharedNavProps {
  activePage?: "home" | "about" | "faq" | "work" | "process" | "contact";
}

const SHARED_NAV_CSS = `
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

@media (max-width: 600px) {
  :root { --nav-h: 68px; }
}

/* —— HEADER —— (extracted from homepage) */
header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  display: flex;
  align-items: flex-end;
  height: var(--nav-h);
  padding-bottom: 8px;
}

.header-inner {
  width: calc(100% - 80px);
  max-width: 1200px;
  margin: 0 auto;
  height: 58px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  background: rgba(255,255,255,0.80);
  backdrop-filter: blur(18px) saturate(160%);
  -webkit-backdrop-filter: blur(18px) saturate(160%);
  border: 1px solid rgba(167,139,250,0.20);
  border-radius: 50px;
  box-shadow: 0 4px 24px rgba(167,139,250,0.10), 0 1px 0 rgba(255,255,255,0.95) inset;
  transition: background 0.3s, box-shadow 0.3s;
}

.header-inner.scrolled {
  background: rgba(255,255,255,0.92);
  box-shadow: 0 8px 36px rgba(167,139,250,0.14), 0 1px 0 rgba(255,255,255,1) inset;
}

.logo {
  font-family: 'Poppins', sans-serif;
  font-weight: 700; font-size: 1.15rem;
  color: var(--text); letter-spacing: -0.02em;
  white-space: nowrap; flex-shrink: 0;
}
.logo span { color: var(--teal-dark); }

nav { display: flex; align-items: center; gap: 2px; }

nav a {
  position: relative;
  font-family: 'Poppins', sans-serif;
  font-weight: 500; font-size: 15px;
  color: var(--text-mid); text-decoration: none;
  padding: 8px 16px; border-radius: 50px;
  transition: color .25s, background .25s, transform .25s;
  white-space: nowrap;
}

nav a::after {
  content: '';
  position: absolute;
  bottom: 5px; left: 50%;
  transform: translateX(-50%) scaleX(0);
  width: calc(100% - 26px); height: 2px;
  background: var(--teal-dark); border-radius: 2px;
  transition: transform .3s ease, opacity .3s ease;
  opacity: 0;
}

nav a:hover { color: var(--text); background: rgba(94,234,212,0.09); transform: scale(1.05); }
nav a:hover::after { transform: translateX(-50%) scaleX(1); opacity: 1; }
nav a.active { color: var(--text); }
nav a.active::after { transform: translateX(-50%) scaleX(1); opacity: 1; }

.nav-cta {
  font-family: 'Poppins', sans-serif !important;
  font-weight: 600 !important; font-size: 14px !important;
  color: #fff !important;
  background: linear-gradient(135deg, var(--teal-dark), var(--purple)) !important;
  padding: 9px 22px !important;
  box-shadow: 0 4px 16px rgba(94,234,212,0.30);
  transition: transform .25s ease, box-shadow .25s ease !important;
}
.nav-cta::after { display: none !important; }
.nav-cta:hover {
  transform: scale(1.06) !important;
  box-shadow: 0 6px 24px rgba(94,234,212,0.45) !important;
  background: linear-gradient(135deg, var(--teal-dark), var(--purple)) !important;
}

.hamburger {
  display: none; flex-direction: column; justify-content: center;
  gap: 5px; width: 38px; height: 38px;
  background: none; border: none; cursor: pointer; padding: 6px;
}
.hamburger span {
  display: block; width: 22px; height: 2px;
  background: var(--text-mid); border-radius: 2px;
  transition: all .3s ease;
}
.hamburger.open span:nth-child(1) { transform: rotate(45deg) translate(5px,5px); }
.hamburger.open span:nth-child(2) { opacity: 0; width: 0; }
.hamburger.open span:nth-child(3) { transform: rotate(-45deg) translate(5px,-5px); }

.mobile-menu {
  display: none; position: fixed; inset: 0; z-index: 999;
  background: rgba(249,248,255,0.97);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  flex-direction: column; align-items: center; justify-content: center; gap: 6px;
  opacity: 0; pointer-events: none; transition: opacity .3s ease;
}
.mobile-menu.open { display: flex; opacity: 1; pointer-events: all; }
.mobile-menu a {
  font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 1.55rem;
  color: var(--text); text-decoration: none;
  padding: 14px 48px; border-radius: 16px;
  width: 100%; max-width: 300px; text-align: center;
  transition: background .2s, color .2s;
}
.mobile-menu a:hover { background: rgba(94,234,212,0.12); color: var(--teal-dark); }

@media (max-width: 1024px) {
  nav a { font-size: 14px; padding: 7px 13px; }
}

@media (max-width: 860px) {
  nav { display: none; }
  .hamburger { display: flex; }
}

@media (max-width: 600px) {
  .header-inner { width: calc(100% - 32px); height: 52px; padding: 0 18px; }
}

@media (max-width: 768px) {
  .header-inner {
    backdrop-filter: blur(8px) saturate(120%) !important;
    -webkit-backdrop-filter: blur(8px) saturate(120%) !important;
  }

  .mobile-menu {
    backdrop-filter: none !important;
    -webkit-backdrop-filter: none !important;
    background: rgba(249,248,255,0.99) !important;
  }
}
`.trim();

export default function SharedNav({ activePage }: SharedNavProps) {
  const location = useLocation();

  const NAV_LINKS = useMemo(
    () => [
      { label: "Home", to: "/" },
      { label: "My Work", to: "/work" },
      { label: "Process", to: "/process" },
      { label: "About Me", to: "/about" },
      { label: "FAQs", to: "/faq" },
    ],
    [],
  );

  const currentPath = location.pathname;

  const activePath = useMemo(() => {
    if (!activePage) return currentPath;
    const map: Record<NonNullable<SharedNavProps["activePage"]>, string> = {
      home: "/",
      work: "/work",
      process: "/process",
      about: "/about",
      faq: "/faq",
      contact: "/contact",
    };
    return map[activePage] || currentPath;
  }, [activePage, currentPath]);

  function isActive(path: string): boolean {
    if (path === "/") return activePath === "/";
    return activePath.startsWith(path);
  }

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (document.getElementById("shared-nav-styles")) return;
    const style = document.createElement("style");
    style.id = "shared-nav-styles";
    style.textContent = SHARED_NAV_CSS;
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    const threshold = 20;

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      let scrollTicking = false;
      const handleScroll = () => {
        if (!scrollTicking) {
          window.requestAnimationFrame(() => {
            setScrolled(window.scrollY > threshold);
            scrollTicking = false;
          });
          scrollTicking = true;
        }
      };

      handleScroll();
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }

    const onScroll = () => {
      setScrolled(window.scrollY > threshold);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };

    const onRouteLikeChange = () => closeMenu();

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("hashchange", onRouteLikeChange);
    window.addEventListener("popstate", onRouteLikeChange);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("hashchange", onRouteLikeChange);
      window.removeEventListener("popstate", onRouteLikeChange);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
    document.body.style.overflow = "";
  }

  function toggleMenu() {
    setMenuOpen((o) => {
      document.body.style.overflow = o ? "" : "hidden";
      return !o;
    });
  }

  return (
    <>
      <header>
        <div className={`header-inner${scrolled ? " scrolled" : ""}`} id="headerInner">
          <div className="logo">
            Alyan<span>.</span>
          </div>

          <nav aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className={isActive(link.to) ? "active" : ""}>
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="nav-cta">
              Contact
            </Link>
          </nav>

          <button
            className={`hamburger${menuOpen ? " open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            type="button"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`} role="dialog" aria-modal="true">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            onClick={() => {
              closeMenu();
            }}
          >
            {link.label}
          </Link>
        ))}
        <Link
          to="/contact"
          onClick={() => {
            closeMenu();
          }}
        >
          Contact
        </Link>
      </div>
    </>
  );
}
