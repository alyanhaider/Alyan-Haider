'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import SkillsSection from '../components/SkillsSection';
import SharedNav from '../components/SharedNav';
import profileImage from '../assets/images/profile image.png';
import project1Image from '../assets/images/project1image.jpg';
import project2Image from '../assets/images/project2image.jpg';
import project3Image from '../assets/images/project3image.jpg';

const CSS = `

  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Poppins:wght@400;500;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; }

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

  body {
    font-family: 'Inter', sans-serif;
    min-height: 100vh;
    overflow-x: hidden;
    background: #f9f8ff;
  }

  body::before {
    content: '';
    position: fixed;
    inset: 0;
    z-index: -1;
    background:
      radial-gradient(ellipse 72% 58% at 14%  8%,  rgba(167,139,250,0.42) 0%, transparent 68%),
      radial-gradient(ellipse 54% 44% at 82%  5%,  rgba(196,181,253,0.28) 0%, transparent 62%),
      radial-gradient(ellipse 48% 42% at 95% 52%,  rgba(94,234,212,0.32)  0%, transparent 62%),
      radial-gradient(ellipse 55% 48% at 48% 92%,  rgba(251,191,36,0.16)  0%, transparent 62%),
      radial-gradient(ellipse 52% 46% at 5%  85%,  rgba(45,212,191,0.26)  0%, transparent 62%),
      radial-gradient(ellipse 62% 42% at 52% 44%,  rgba(224,231,255,0.38) 0%, transparent 68%),
      #f9f8ff;
    animation: bgBreath 16s ease-in-out infinite alternate;
  }

  @keyframes bgBreath {
    0%   { filter: hue-rotate(0deg)   brightness(1.00); }
    50%  { filter: hue-rotate(7deg)   brightness(1.02); }
    100% { filter: hue-rotate(-5deg)  brightness(0.99); }
  }

  /* â”€â”€ HEADER â”€â”€ */
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

  /* â”€â”€ HERO â”€â”€ */
  #hero {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: center;
    padding-top: calc(var(--nav-h) + 48px);
    padding-bottom: 40px;
  }

  .hero-grid {
    width: 100%; max-width: 1200px;
    margin: 0 auto; padding: 0 48px;
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 72px; align-items: center;
  }

  .hero-left { display: flex; flex-direction: column; gap: 26px; justify-content: center; }

  .split-word { display: inline-block; overflow: hidden; }
  .split-char { display: inline-block; will-change: transform, opacity, filter; }

  .hero-h1 {
    font-family: 'Poppins', sans-serif;
    font-weight: 800;
    font-size: clamp(2.4rem, 4.8vw, 3.6rem);
    line-height: 1.08;
    /* FIX: solid dark colour so it's always visible against the pastel mesh */
    color: #0f0c1d;
    letter-spacing: -0.04em;
  }
  .hero-h1 .wave { display: inline-block; }

  /* "Alyan Haider" â€” solid black for maximum contrast */
  .hero-h1 .name-grad {
    color: #0f0c1d;
    display: block;
    margin-top: 4px;
    filter: none;
  }

  /* "Hi, I'm" line â€” force black so it can never blend with background */
  .hero-h1 .greeting-line {
    display: block;
    color: #0f0c1d !important;
    -webkit-text-fill-color: #0f0c1d !important;
  }

  .hero-role {
    font-family: 'Poppins', sans-serif;
    font-weight: 500;
    font-size: clamp(1rem, 1.8vw, 1.2rem);
    color: var(--teal-hover);
    letter-spacing: 0.04em;
    margin-top: -8px;
  }

  .hero-desc {
    font-family: 'Inter', sans-serif;
    font-size: clamp(1rem, 1.5vw, 1.13rem);
    font-weight: 400; line-height: 1.78;
    color: var(--text-mid); max-width: 510px;
  }
  .hero-desc strong { font-weight: 600; color: var(--text); }

  .hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; align-items: center; }

  .btn-primary {
    font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 17px; color: #fff;
    background: var(--teal-dark); padding: 15px 34px; border-radius: 50px; border: none;
    text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
    box-shadow: 0 6px 24px rgba(45,212,191,0.38);
    transition: background .25s, transform .25s, box-shadow .25s; cursor: pointer;
  }
  .btn-primary:hover { background: var(--teal-hover); transform: scale(1.05); box-shadow: 0 10px 34px rgba(45,212,191,0.48); }

  .btn-outline {
    font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 16px; color: var(--text-mid);
    background: rgba(255,255,255,0.75); padding: 14px 28px; border-radius: 50px;
    text-decoration: none; display: inline-flex; align-items: center; gap: 8px;
    border: 1px solid rgba(167,139,250,0.28);
    box-shadow: 0 2px 12px rgba(167,139,250,0.08);
    transition: background .25s, transform .25s, border-color .25s;
  }
  .btn-outline:hover { background: rgba(255,255,255,0.95); border-color: rgba(94,234,212,0.50); transform: scale(1.03); }

  /* â”€â”€ HERO RIGHT â”€â”€ */
  .hero-right { display: flex; flex-direction: column; align-items: center; gap: 22px; }
  .profile-outer { position: relative; display: flex; align-items: center; justify-content: center; }
  .ring { position: absolute; border-radius: 50%; pointer-events: none; }
  .ring-1 { width: 340px; height: 340px; border: 1px solid rgba(167,139,250,0.22); animation: spin 22s linear infinite; }
  .ring-2 { width: 386px; height: 386px; border: 1px dashed rgba(94,234,212,0.18); animation: spin 32s linear infinite reverse; }
  @keyframes spin { to { transform: rotate(360deg); } }

  .profile-circle {
    position: relative; width: 300px; height: 300px; border-radius: 50%;
    background: rgba(255,255,255,0.68);
    border: 2px solid rgba(167,139,250,0.22);
    box-shadow: 0 14px 52px rgba(167,139,250,0.16), 0 0 0 10px rgba(255,255,255,0.45);
    display: flex; align-items: center; justify-content: center; overflow: hidden;
    backdrop-filter: blur(8px);
  }

  .profile-placeholder { display: flex; flex-direction: column; align-items: center; gap: 10px; }
  .profile-placeholder svg { width: 68px; height: 68px; opacity: 0.20; color: var(--purple); }
  .profile-placeholder p { font-size: 11.5px; letter-spacing: .07em; text-transform: uppercase; color: var(--text-light); opacity: .5; }

  .profile-name { text-align: center; }
  .profile-name h2 { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: clamp(1.4rem, 2.4vw, 1.9rem); color: #333333; letter-spacing: -0.02em; }
  .profile-name p { font-size: 14px; color: var(--teal-dark); font-weight: 500; margin-top: 3px; letter-spacing: .04em; }

  /* â”€â”€ PARALLAX CARD â”€â”€ */
  .parallax-card-container {
    position: relative;
    width: 340px;
    height: 440px;
    transition: transform 0.2s linear;
    transform-style: preserve-3d;
    cursor: default;
    z-index: 10;
    perspective: 1000px;
  }
  .parallax-card-content {
    position: relative;
    width: 100%;
    height: 100%;
    background: rgba(31, 41, 55, 0.4);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 24px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 32px;
    transition: box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease;
    transform-style: preserve-3d;
    backface-visibility: hidden;
  }
  .parallax-card-container:hover .parallax-card-content {
    background: rgba(31, 41, 55, 0.5);
    border-color: rgba(255, 182, 193, 0.4);
    box-shadow:
      0 0 0 1px rgba(255, 182, 193, 0.2),
      0 25px 50px -12px rgba(255, 105, 150, 0.25),
      0 0 60px rgba(255, 150, 180, 0.12);
  }
  .parallax-layer {
    position: absolute;
    inset: 0;
    pointer-events: none;
    transform-style: preserve-3d;
  }
  .layer-bg {
    background: radial-gradient(circle at 20% 20%, rgba(255, 105, 180, 0.05) 0%, transparent 50%);
    transform: translateZ(-20px);
  }
  .layer-text {
    position: relative;
    z-index: 2;
    transform-style: preserve-3d;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    transition: transform 0.2s linear;
  }
  .parallax-title {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 1.25rem;
    color: #ffffff;
    margin-bottom: 12px;
    line-height: 1.3;
    letter-spacing: -0.01em;
    transition: transform 0.2s linear;
  }
  .parallax-desc {
    font-family: 'Inter', sans-serif;
    font-size: 0.88rem;
    line-height: 1.6;
    color: #d1d5db;
    font-weight: 400;
    transition: transform 0.2s linear;
  }
  .parallax-image-circle {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.3);
    background: rgba(255, 255, 255, 0.1);
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    transition: box-shadow 0.35s ease, border-color 0.35s ease, transform 0.2s linear;
    transform-style: preserve-3d;
  }
  .parallax-image-circle img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .parallax-card-container:hover .parallax-image-circle {
    box-shadow: 0 0 0 6px rgba(255, 150, 180, 0.25), 0 16px 40px rgba(0, 0, 0, 0.6);
    border-color: rgba(255, 182, 193, 0.45);
    transform: translateZ(100px) scale(1.05);
  }
  .parallax-card-container:hover .parallax-title {
    transform: translateZ(50px) scale(1.1);
  }
  .parallax-card-container:hover .parallax-desc {
    transform: translateZ(30px) scale(1.05);
  }

  /* â•â• MY PROJECTS â•â• */
  #projects {
    position: relative; width: 100%; min-height: 100vh; overflow: hidden;
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    padding: 80px 0 60px;
  }

  .projects-title-wrap { text-align: center; z-index: 20; padding: 0 24px; margin-bottom: 56px; }
  .projects-title-wrap h2 {
    font-family: 'Poppins', sans-serif; font-weight: 800;
    font-size: clamp(2.4rem, 5vw, 4rem);
    color: var(--text); letter-spacing: -0.04em; line-height: 1.0;
  }
  .projects-title-wrap p {
    font-family: 'Inter', sans-serif; font-size: clamp(0.85rem, 1.4vw, 1rem);
    color: var(--text-light); margin-top: 10px;
    text-transform: uppercase; letter-spacing: 0.1em;
  }

  .projects-cards {
    display: flex; flex-direction: row; justify-content: center; align-items: center;
    width: 100%; max-width: 1160px; padding: 0 24px; gap: 0 !important; z-index: 10;
    perspective: 2000px; transform-style: preserve-3d;
  }

  .proj-card {
    position: relative;
    flex: none;
    width: 260px;
    aspect-ratio: 2 / 3;
    min-height: unset;
    transform-style: preserve-3d; transform-origin: center center; will-change: transform;
  }

  .proj-face {
    position: absolute; inset: 0; width: 100%; height: 100%;
    border-radius: inherit; overflow: hidden;
    backface-visibility: hidden; -webkit-backface-visibility: hidden;
    border: 0 !important;
  }

  .proj-front { background: rgba(255,255,255,0.55); border: 1px solid rgba(167,139,250,0.18); }

  .proj-front-img {
    position: absolute; inset: 0; background-size: 300% 100%; background-repeat: no-repeat;
    background-image: url('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80');
  }
  .proj-front-img--0 { background-position: 0% 50%; }
  .proj-front-img--1 { background-position: 50% 50%; }
  .proj-front-img--2 { background-position: 100% 50%; }

  .proj-front::after { content: ''; position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; }

  .proj-front-overlay {
    position: absolute; inset: 0; background: rgba(255,255,255,0.12);
    display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 10px;
  }
  .proj-front-overlay::before {
    content: ''; font-family: 'Inter', sans-serif;
    font-size: 11px; letter-spacing: .08em; text-transform: uppercase;
    color: var(--text-light); opacity: 0.45;
  }

  /* Remove seams so the "front" looks like one unified image */
  .proj-card:not(:first-child) .proj-front { border-left: 0; }
  .proj-card:not(:last-child)  .proj-front { border-right: 0; }
  .proj-card:not(:first-child) .proj-back  { border-left: 0; }
  .proj-card:not(:last-child)  .proj-back  { border-right: 0; }

  .proj-back { position: relative; transform: rotateY(180deg); display: flex; align-items: stretch; border: 1px solid rgba(167,139,250,0.12); }
  .proj-back--light  { background: rgba(228,228,231,0.95); }
  .proj-back--accent { background: rgba(94,234,212,0.88); }
  .proj-back--dark   { background: rgba(26,26,46,0.95); }

  .proj-back::after {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.65) 40%, transparent 100%);
    border-radius: inherit;
  }

  .proj-back-inner { position: relative; z-index: 2 !important; background: transparent; width: 100%; display: flex; flex-direction: column; justify-content: space-between; padding: 32px 28px; }
  .proj-back-header { display: flex; justify-content: space-between; align-items: center; padding-bottom: 16px; border-bottom: 1px solid rgba(0,0,0,0.10); }
  .proj-back--dark .proj-back-header { border-bottom-color: rgba(255,255,255,0.12); }

  .proj-num { font-family: 'Inter', sans-serif; font-weight: 600; font-size: 0.8rem; letter-spacing: .06em; color: var(--text-mid); }
  .proj-back--accent .proj-num { color: var(--text); }
  .proj-back--dark   .proj-num { color: rgba(255,255,255,0.5); }

  .proj-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--text-light); opacity: 0.4; }
  .proj-back--dark .proj-dot { background: rgba(255,255,255,0.4); }
  .proj-back-body { flex: 1; display: flex; align-items: flex-end; }

  .proj-back-title {
    font-family: 'Poppins', sans-serif; font-weight: 800;
    font-size: clamp(1.8rem, 3vw, 2.8rem); line-height: 0.95;
    letter-spacing: -0.04em; color: var(--text);
  }
  .proj-back--dark .proj-back-title { color: #fff; }

  .proj-visit-overlay {
    position: absolute;
    inset: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.45);
    opacity: 0;
    transition: opacity 0.3s;
    border-radius: inherit;
  }
  .proj-back:hover .proj-visit-overlay { opacity: 1; }
  .proj-visit-overlay a {
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    font-size: 13px;
    color: #fff;
    text-decoration: none;
    padding: 12px 18px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.28);
    background: rgba(255,255,255,0.14);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    transition: transform 0.25s ease, background 0.25s ease, border-color 0.25s ease;
  }
  .proj-visit-overlay a:hover {
    transform: translateY(-1px);
    background: rgba(255,255,255,0.20);
    border-color: rgba(94,234,212,0.45);
  }

  @media (max-width: 767px) {
    .projects-cards { flex-direction: column; gap: 20px !important; padding: 0 20px; perspective: none; }
    .proj-card { width: 100%; aspect-ratio: 2 / 3; min-height: unset; border-radius: 20px !important; transform: rotateY(180deg) !important; }
    #projects { padding: 60px 0 60px; min-height: auto; }
  }

  /* â•â• PROCESS SECTION â•â• */
  #process { position: relative; height: 700vh; }

  .proc-sticky {
    position: sticky; top: 0; height: 100vh;
    display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden;
    padding-top: 120px;
  }

  .proc-sticky::before {
    content: ''; position: absolute; inset: 0;
    background: linear-gradient(160deg, rgba(99,102,241,0.20) 0%, rgba(15,12,41,0.90) 60%);
    z-index: 0;
  }

  .proc-header { position: relative; z-index: 3; text-align: center; max-width: 640px; padding: 0 24px; margin-bottom: 60px; flex-shrink: 0; opacity: 1; }

  .proc-label { font-family: 'Inter', sans-serif; font-size: 11.5px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: #818cf8; margin-bottom: 10px; }

  .proc-title { font-family: 'Poppins', sans-serif; font-weight: 700; font-size: clamp(1.9rem, 3.6vw, 2.7rem); line-height: 1.12; letter-spacing: -0.03em; color: #ffffff; margin-bottom: 12px; }

  .proc-title-accent { background: linear-gradient(90deg, #6366f1, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

  .proc-sub { font-family: 'Inter', sans-serif; font-size: clamp(0.88rem, 1.3vw, 1rem); line-height: 1.65; color: rgba(255,255,255,0.68); max-width: 540px; margin: 0 auto 20px; }

  .proc-bar-wrap { position: relative; width: min(480px, 75vw); height: 3px; margin: 0 auto; border-radius: 99px; overflow: hidden; }
  .proc-bar-bg { position: absolute; inset: 0; background: rgba(255,255,255,0.14); }
  .proc-bar-fill { position: absolute; top: 0; left: 0; bottom: 0; width: 0%; background: linear-gradient(90deg, #6366f1, #ec4899); }

  .proc-track-outer { display: none; }

  .proc-stage { position: relative; z-index: 2; width: 380px; height: 340px; perspective: 1200px; perspective-origin: 50% 40%; flex-shrink: 0; }

  .proc-card {
    position: absolute; inset: 0; padding: 40px;
    background: rgba(255,255,255,0.08); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px);
    border: 1px solid rgba(255,255,255,0.15); border-radius: 20px;
    display: flex; flex-direction: column; gap: 16px;
    box-shadow: 0 20px 60px rgba(0,0,0,0.35);
    will-change: transform, opacity; transform-style: preserve-3d;
  }

  .proc-card-slot-front  { transform: translateZ(0px)    scale(1);    opacity: 1;   z-index: 3; }
  .proc-card-slot-mid    { transform: translateZ(-120px) scale(0.92); opacity: 0.7; z-index: 2; }
  .proc-card-slot-back   { transform: translateZ(-240px) scale(0.85); opacity: 0.4; z-index: 1; }
  .proc-card-slot-hidden { transform: translateZ(-380px) scale(0.75); opacity: 0;   z-index: 0; }

  .proc-card-slot-front { border-color: rgba(99,102,241,0.55); box-shadow: 0 0 0 1px rgba(99,102,241,0.2), 0 24px 64px rgba(0,0,0,0.45); }
  .proc-card-slot-front.proc-card-last { border-color: #6366f1; box-shadow: 0 0 0 2px rgba(99,102,241,0.35), 0 24px 64px rgba(99,102,241,0.25); transform: translateZ(0px) scale(1.08); }

  .proc-card-top { display: flex; justify-content: space-between; align-items: flex-start; }

  .proc-step-num { font-family: 'Inter', sans-serif; font-size: 13px; font-weight: 600; letter-spacing: 0.14em; color: rgba(255,255,255,0.38); display: inline-block; }
  .proc-card-slot-front .proc-step-num { color: #818cf8; }

  .proc-icon { width: 40px; height: 40px; border-radius: 10px; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.12); display: flex; align-items: center; justify-content: center; }
  .proc-icon svg { width: 18px; height: 18px; stroke: rgba(255,255,255,0.55); }
  .proc-card-slot-front .proc-icon { background: rgba(99,102,241,0.18); border-color: rgba(99,102,241,0.4); }
  .proc-card-slot-front .proc-icon svg { stroke: #a5b4fc; }

  .proc-card-title { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 1.35rem; color: #ffffff; letter-spacing: -0.02em; line-height: 1.2; }
  .proc-card-desc { font-family: 'Inter', sans-serif; font-size: 0.9rem; line-height: 1.68; color: rgba(255,255,255,0.65); }

  .proc-counter { position: relative; z-index: 3; margin-top: 24px; font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.1em; color: rgba(255,255,255,0.35); text-transform: uppercase; flex-shrink: 0; }
  .proc-counter span { color: #818cf8; font-weight: 700; }

  .proc-ctas { position: relative; z-index: 3; display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; margin-top: 24px; opacity: 0; transform: translateY(16px); transition: opacity 0.5s ease, transform 0.5s ease; flex-shrink: 0; }
  .proc-ctas.visible { opacity: 1; transform: translateY(0); }

  .proc-btn-primary { font-family: 'Poppins', sans-serif; font-weight: 600; font-size: 15px; color: #fff; background: #6366f1; padding: 13px 28px; border-radius: 10px; text-decoration: none; box-shadow: 0 4px 18px rgba(99,102,241,0.38); transition: background 0.25s, transform 0.25s, box-shadow 0.25s; }
  .proc-btn-primary:hover { background: #4f46e5; transform: translateY(-2px); box-shadow: 0 8px 26px rgba(99,102,241,0.48); }

  .proc-btn-secondary { font-family: 'Poppins', sans-serif; font-weight: 500; font-size: 15px; color: rgba(255,255,255,0.85); background: transparent; padding: 13px 28px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.25); text-decoration: none; transition: background 0.25s, border-color 0.25s, transform 0.25s; }
  .proc-btn-secondary:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.5); transform: translateY(-2px); }

  @media (max-width: 860px) {
    #process { height: auto; }
    .proc-sticky { position: relative; height: auto; padding: 80px 24px 60px; justify-content: flex-start; gap: 0; }
    .proc-sticky::before { opacity: 0.7; }
    .proc-stage { width: 100%; max-width: 380px; height: auto; perspective: none; display: flex; flex-direction: column; gap: 16px; }
    .proc-card { position: relative; inset: auto; transform: none !important; opacity: 1 !important; width: 100%; }
    .proc-card-slot-front, .proc-card-slot-mid, .proc-card-slot-back, .proc-card-slot-hidden { transform: none; opacity: 1; z-index: 1; }
    .proc-counter { display: none; }
    .proc-ctas { opacity: 1; transform: none; margin-top: 32px; }
  }
  @media (max-width: 480px) {
    .proc-stage { max-width: 100%; }
    .proc-card { padding: 28px 22px; }
    .proc-title { font-size: 1.6rem; }
  }

  /* â”€â”€ RESPONSIVE â”€â”€ */
  @media (max-width: 1024px) {
    .hero-grid { gap: 44px; padding: 0 36px; }
    .ring-1 { width: 284px; height: 284px; }
    .ring-2 { width: 322px; height: 322px; }
    .profile-circle { width: 250px; height: 250px; }
    nav a { font-size: 14px; padding: 7px 13px; }
  }

  @media (max-width: 860px) {
    nav { display: none; }
    .hamburger { display: flex; }
    .hero-grid { grid-template-columns: 1fr; padding: 0 28px; gap: 40px; text-align: center; }
    .hero-right { order: -1; }
    .hero-ctas { justify-content: center; }
    .hero-desc { margin: 0 auto; }
    .hero-role { text-align: center; }
  }

  @media (max-width: 600px) {
    :root { --nav-h: 68px; }
    .header-inner { width: calc(100% - 32px); height: 52px; padding: 0 18px; }
    .hero-grid { padding: 0 20px; gap: 32px; }
    #hero { padding-top: calc(var(--nav-h) + 40px); }
    .ring-1 { width: 210px; height: 210px; }
    .ring-2 { width: 248px; height: 248px; }
    .profile-circle { width: 180px; height: 180px; }
    .hero-h1 { font-size: clamp(1.9rem, 9vw, 2.6rem); }
    .btn-primary { font-size: 15px; padding: 13px 26px; }
    .btn-outline { font-size: 14px; padding: 12px 22px; }
  }

  @media (max-width: 420px) {
    .hero-ctas { flex-direction: column; width: 100%; }
    .btn-primary, .btn-outline { justify-content: center; width: 100%; }
  }

`;

const ParallaxCard = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = -(e.clientY - rect.top - rect.height / 2) / 20;
    setRotate({ x, y });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      className="parallax-card-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateY(${rotate.x}deg) rotateX(${rotate.y}deg)`,
      }}
    >
        <div className="parallax-card-content">
          <div className="parallax-layer layer-bg" />
          <div className="layer-text">
            <div className="parallax-image-circle">
              <img
                src={profileImage}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '50%',
                }}
              />
            </div>
            <h3 className="parallax-title">Alyan Haider</h3>
            <p className="parallax-desc">
              I will build a modern full-stack web app with dashboard and database (Marketplace, E-commerce or Business Platform)
            </p>
        </div>
      </div>
    </div>
  );
};

export default function Portfolio() {
  const [procCountNum, setProcCountNum] = useState(1);
  const gsapLoaded = useRef(false);

  function openProject(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  function onProjectCardActivate(e: React.MouseEvent<HTMLDivElement>, url: string) {
    const target = e.target as HTMLElement | null;
    if (target?.closest('a')) return;
    openProject(url);
  }

  function onProjectCardKeyDown(e: React.KeyboardEvent<HTMLDivElement>, url: string) {
    const target = e.target as HTMLElement | null;
    if (target?.closest('a')) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openProject(url);
    }
  }

  function splitElementText(el: HTMLElement) {
    const children = Array.from(el.childNodes);
    children.forEach((child) => {
      if (child.nodeType !== Node.TEXT_NODE) return;
      const text = (child as Text).textContent || '';
      if (!text.trim().length) return;
      const frag = document.createDocumentFragment();
      Array.from(text).forEach((char) => {
        const s = document.createElement('span');
        s.className = 'split-char';
        s.style.cssText = 'display:inline-block;will-change:transform,opacity,filter;';
        s.textContent = char === ' ' ? '\u00A0' : char;
        frag.appendChild(s);
      });
      el.replaceChild(frag, child);
    });
  }

  function initHeroAnimation(gsap: any) {
    const h1 = document.getElementById('heroH1');
    const desc = document.getElementById('heroDesc');
    const ctas = document.getElementById('heroCtas');
    const heroRight = document.getElementById('heroRight');
    const nameGrad = document.getElementById('heroNameGrad');
    const heroRole = document.getElementById('heroRole');
    if (!h1 || !desc || !ctas || !heroRight) return;

    const greetingLine = h1.querySelector('.greeting-line') as HTMLElement;
    if (greetingLine) splitElementText(greetingLine);
    if (nameGrad) splitElementText(nameGrad);

    const allChars = h1.querySelectorAll('.split-char');
    h1.style.visibility = 'visible';

    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

    tl.from(allChars, {
      opacity: 0,
      filter: 'blur(24px)',
      y: 20,
      scale: 1.1,
      duration: 1.4,
      stagger: 0.032,
      delay: 0.1,
    });

    const wave = h1.querySelector('.wave');
    if (wave) {
      tl.from(
        wave,
        { scale: 0, rotation: -30, opacity: 0, duration: 0.5, ease: 'back.out(2)' },
        '-=1.0',
      );
    }

    if (heroRole) {
      tl.to(heroRole, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.7');
    }

    tl.to(desc, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');
    tl.to(ctas, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5');

    gsap.from(heroRight, { opacity: 0, x: 30, duration: 1.2, delay: 0.4, ease: 'power3.out' });
  }

  function initProjectsAnimation(gsap: any, ScrollTrigger: any) {
    if (window.innerWidth < 768) return;
    const section = document.getElementById('projects');
    const title = document.getElementById('projTitle');
    const cards = document.getElementById('projCards');
    const card0 = document.getElementById('projCard0');
    const card1 = document.getElementById('projCard1');
    const card2 = document.getElementById('projCard2');
    if (!section || !title || !cards || !card0 || !card1 || !card2) return;

    gsap.set(title, { y: 50, scale: 1.5, opacity: 0 });
    gsap.set(cards, { y: '70vh' });
    gsap.set(cards, { gap: '0px' });
    gsap.set(card0, { borderRadius: '20px 0 0 20px' });
    gsap.set(card1, { borderRadius: '0px' });
    gsap.set(card2, { borderRadius: '0 20px 20px 0' });
    gsap.set([card0, card1, card2], { transformPerspective: 1000, transformStyle: 'preserve-3d' });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=3600',
        scrub: 2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    tl.to(title, { y: 0, scale: 1, opacity: 1, duration: 1.2, ease: 'power3.out' });
    tl.to(cards, { y: '0%', duration: 1.5, ease: 'power3.out' }, '-=0.8');
    tl.to(cards, { gap: '24px', duration: 1.4, ease: 'power2.inOut' });
    tl.to([card0, card1, card2], { borderRadius: '20px', duration: 1.4, ease: 'power2.inOut' }, '<');
    tl.to([card0, card1, card2], {
      rotateY: 180,
      duration: 4,
      stagger: { each: 0.2 },
      ease: 'power2.inOut',
    });
    tl.to([card0, card1, card2], { y: 0, duration: 1.2, ease: 'power2.out' }, '<');
  }

  function initProcessAnimation(gsap: any, ScrollTrigger: any) {
    if (window.innerWidth <= 860) return;
    const section = document.getElementById('process');
    const sticky = document.querySelector('.proc-sticky') as HTMLElement | null;
    const procCards = Array.from(document.querySelectorAll('#procStage .proc-card')) as HTMLElement[];
    const barFill = document.getElementById('procBarFill');
    const procCtas = document.getElementById('procCtas');
    const header = document.getElementById('procHeader');
    const TOTAL = procCards.length;

    if (!section || !sticky || !barFill || !procCtas || !header) return;

    const SLOTS: Record<string, { z: number; scale: number; opacity: number }> = {
      front: { z: 0, scale: 1.0, opacity: 1 },
      mid: { z: -120, scale: 0.92, opacity: 0.7 },
      back: { z: -240, scale: 0.85, opacity: 0.4 },
      hidden: { z: -380, scale: 0.75, opacity: 0 },
    };

    function getSlot(cardIdx: number, activeIdx: number) {
      const diff = cardIdx - activeIdx;
      if (diff === 0) return 'front';
      if (diff === 1) return 'mid';
      if (diff >= 2) return 'back';
      return 'hidden';
    }

    function applySlots(activeIdx: number, animate: boolean) {
      procCards.forEach((card, i) => {
        const slot = getSlot(i, activeIdx);
        const s = SLOTS[slot];
        const isLast = i === TOTAL - 1 && slot === 'front';
        const scaleVal = isLast ? 1.08 : s.scale;
        const borderColor =
          slot === 'front'
            ? isLast
              ? '#6366f1'
              : 'rgba(99,102,241,0.55)'
            : 'rgba(255,255,255,0.15)';

        if (animate) {
          gsap.to(card, { z: s.z, scale: scaleVal, opacity: s.opacity, borderColor, duration: 0.7, ease: 'power3.out' });
          if (slot === 'front') {
            const icon = card.querySelector('.proc-icon');
            const title = card.querySelector('.proc-card-title');
            if (icon) gsap.fromTo(icon, { rotate: 0, scale: 0.8 }, { rotate: 8, scale: 1, duration: 0.5, ease: 'back.out(2)' });
            if (title) gsap.fromTo(title, { y: 10, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' });
          }
        } else {
          gsap.set(card, { z: s.z, scale: scaleVal, opacity: s.opacity, borderColor });
        }

        card.classList.remove(
          'proc-card-slot-front',
          'proc-card-slot-mid',
          'proc-card-slot-back',
          'proc-card-slot-hidden',
          'proc-card-last',
        );
        card.classList.add(`proc-card-slot-${slot}`);
        if (isLast) card.classList.add('proc-card-last');
      });
    }

    applySlots(0, false);
    let lastIdx = 0;

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: `+=${section.offsetHeight - window.innerHeight}`,
      scrub: 1,
      pin: sticky,
      pinSpacing: false,
      anticipatePin: 1,
      onUpdate(self: any) {
        const prog = self.progress;
        const activeIdx = Math.min(Math.round(prog * (TOTAL - 1)), TOTAL - 1);
        barFill.style.width = `${prog * 100}%`;
        setProcCountNum(activeIdx + 1);
        if (activeIdx !== lastIdx) {
          applySlots(activeIdx, true);
          lastIdx = activeIdx;
        }
        if (activeIdx === TOTAL - 1) procCtas.classList.add('visible');
        else procCtas.classList.remove('visible');
      },
    });
  }

  useEffect(() => {
    if (document.getElementById('portfolio-styles')) return;
    const style = document.createElement('style');
    style.id = 'portfolio-styles';
    style.textContent = CSS;
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, []);

  useLayoutEffect(() => {
    let cancelled = false;
    let mm: any;
    let refreshTimeouts: number[] = [];
    let onPageShow: ((e: PageTransitionEvent) => void) | null = null;

    function waitFor(condition: () => boolean, timeoutMs: number): Promise<boolean> {
      return new Promise((resolve) => {
        const start = performance.now();
        const tick = () => {
          if (cancelled) {
            resolve(false);
            return;
          }
          if (condition()) {
            resolve(true);
            return;
          }
          if (performance.now() - start >= timeoutMs) {
            resolve(false);
            return;
          }
          requestAnimationFrame(tick);
        };
        tick();
      });
    }

    function loadScript(src: string): Promise<void> {
      return new Promise((res) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          res();
          return;
        }
        const s = document.createElement('script');
        s.src = src;
        s.onload = () => res();
        document.head.appendChild(s);
      });
    }

    (async () => {
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js');
      await loadScript('https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js');

      // In React 18 dev (StrictMode), effects mount/unmount twice; script tags may exist before globals are ready.
      const globalsReady = await waitFor(
        () => Boolean((window as any).gsap) && Boolean((window as any).ScrollTrigger),
        4000,
      );
      if (cancelled || gsapLoaded.current || !globalsReady) return;
      gsapLoaded.current = true;
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      if (!gsap || !ScrollTrigger) return;
      gsap.registerPlugin(ScrollTrigger);
      initHeroAnimation(gsap);

      const safeRefresh = () => {
        if (cancelled) return;
        ScrollTrigger.refresh();
      };

      const clearGsapInlineStyles = () => {
        const targets = [
          '#heroH1',
          '#heroDesc',
          '#heroCtas',
          '#heroRole',
          '#heroRight',
          '#heroNameGrad',
          '#projects',
          '#process',
          '#projTitle',
          '#projCards',
          '#projCard0',
          '#projCard1',
          '#projCard2',
          '.proc-sticky',
        ];
        targets.forEach((sel) => {
          const el = document.querySelector(sel);
          if (el) gsap.set(el, { clearProps: 'all' });
        });
        gsap.set(document.querySelectorAll('.split-char'), { clearProps: 'all' });
      };

      const unwrapPinnedElement = (el: Element | null) => {
        let node = el as HTMLElement | null;
        while (node?.parentElement && node.parentElement.className.includes('pin-spacer')) {
          const parent = node.parentElement;
          parent.replaceWith(node);
        }
      };

      // Handle breakpoint/zoom changes (browser zoom triggers resize and can cross breakpoints)
      mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        const before = new Set(ScrollTrigger.getAll());
        initProjectsAnimation(gsap, ScrollTrigger);
        const created = ScrollTrigger.getAll().filter((t: any) => !before.has(t));
        return () => {
          created.forEach((t: any) => t.kill(true));
          unwrapPinnedElement(document.getElementById('projects'));
          clearGsapInlineStyles();
        };
      });

      mm.add('(min-width: 861px)', () => {
        const before = new Set(ScrollTrigger.getAll());
        initProcessAnimation(gsap, ScrollTrigger);
        const created = ScrollTrigger.getAll().filter((t: any) => !before.has(t));
        return () => {
          created.forEach((t: any) => t.kill(true));
          unwrapPinnedElement(document.querySelector('.proc-sticky'));
          clearGsapInlineStyles();
        };
      });

      // Ensure triggers/layout are correct even if scripts finished loading after the user already scrolled
      safeRefresh();
      requestAnimationFrame(() => safeRefresh());
      window.addEventListener(
        'load',
        () => {
          safeRefresh();
        },
        { once: true },
      );
      // Extra refreshes to handle late scroll restoration + font/layout shifts after reload/zoom
      refreshTimeouts.push(window.setTimeout(() => safeRefresh(), 250));
      refreshTimeouts.push(window.setTimeout(() => safeRefresh(), 1000));
      onPageShow = () => safeRefresh();
      window.addEventListener('pageshow', onPageShow, { passive: true });

      const projectImgs = Array.from(document.querySelectorAll('#projects img')) as HTMLImageElement[];
      if (projectImgs.length) {
        Promise.all(
          projectImgs.map((img) => {
            const anyImg = img as any;
            if (typeof anyImg.decode === 'function') return anyImg.decode().catch(() => undefined);
            if (img.complete) return Promise.resolve(undefined);
            return new Promise((res) => {
              img.addEventListener('load', () => res(undefined), { once: true });
              img.addEventListener('error', () => res(undefined), { once: true });
            });
          }),
        ).then(() => {
          safeRefresh();
        });
      }
    })();

    return () => {
      cancelled = true;
      gsapLoaded.current = false; // ← ADD: reset so animations reinit if user returns to homepage
      const gsap = (window as any).gsap;
      const ScrollTrigger = (window as any).ScrollTrigger;
      refreshTimeouts.forEach((t) => window.clearTimeout(t));
      refreshTimeouts = [];
      if (onPageShow) {
        window.removeEventListener('pageshow', onPageShow);
        onPageShow = null;
      }
      if (mm) {
        mm.revert();
        mm = null;
      }
      if (ScrollTrigger) {
        // Kill all triggers and revert ALL pinning (removes pin spacers from body)
        ScrollTrigger.getAll().forEach((t: any) => t.kill(true));
        ScrollTrigger.clearScrollMemory();
      }
      // Force unwrap/remove any leftover pin spacer wrappers so React can unmount cleanly
      document
        .querySelectorAll('.gsap-pin-spacer, .pin-spacer, [class*="pin-spacer"]')
        .forEach((spacer) => {
          const el = spacer as HTMLElement;
          const child = el.firstElementChild;
          if (child) el.replaceWith(child);
          else el.remove();
        });
      if (gsap) {
        // Clear all inline styles GSAP set on the projects and process sections
        const targets = [
          '#heroH1',
          '#heroDesc',
          '#heroCtas',
          '#heroRole',
          '#heroRight',
          '#heroNameGrad',
          '#projects',
          '#process',
          '#projTitle',
          '#projCards',
          '#projCard0',
          '#projCard1',
          '#projCard2',
          '.proc-sticky',
        ];
        targets.forEach((sel) => {
          const el = document.querySelector(sel);
          if (el) gsap.set(el, { clearProps: 'all' });
        });
        gsap.set(document.querySelectorAll('.split-char'), { clearProps: 'all' });
      }
    };
  }, []);

  return (
    <>
      <SharedNav activePage="home" />

      {/* â•â• HERO â•â• */}
      <section id="hero" aria-label="Hero introduction">
        <div className="hero-grid">
          <div className="hero-left" id="heroLeft">
            <h1 className="hero-h1" id="heroH1">
              <span className="greeting-line">
                Hi, I&apos;m <span className="wave">👋</span>
              </span>
              <span className="name-grad" id="heroNameGrad">
                Alyan Haider
              </span>
            </h1>

            <p className="hero-role" id="heroRole">
              Full Stack Developer
            </p>

            <p className="hero-desc" id="heroDesc">
              I craft <strong>fast, scalable, and modern web applications</strong> with a focus on elegant design, robust backend systems, and user-centric products that deliver <strong>real value</strong>.
            </p>

            <div className="hero-ctas" id="heroCtas">
              <Link to="/contact" className="btn-primary" aria-label="Get in touch with Alyan Haider">
                Get in Touch
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <a href="#projects" className="btn-outline" aria-label="View my work portfolio">
                View My Work
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <path d="M8 21h8M12 17v4" />
                </svg>
              </a>
            </div>
          </div>

          <div className="hero-right" id="heroRight">
            <ParallaxCard />
          </div>
        </div>
      </section>

      {/* â•â• MY PROJECTS â•â• */}
      <section id="projects" aria-label="My Projects">
        <div className="projects-title-wrap" id="projTitle">
          <h2>My Projects</h2>
          <p>Showcasing my latest work &amp; real-world applications</p>
        </div>

          <div className="projects-cards" id="projCards">
            {/* Card 0 */}
            <div
              className="proj-card"
              id="projCard0"
              role="link"
              tabIndex={0}
              aria-label="Open Project One website"
              onClick={(e) => onProjectCardActivate(e, 'https://fatah-hotel.vercel.app/')}
              onKeyDown={(e) => onProjectCardKeyDown(e, 'https://fatah-hotel.vercel.app/')}
            >
              <div className="proj-face proj-front">
                <div className="proj-front-img proj-front-img--0" />
                <div className="proj-front-overlay" />
              </div>
              <div className="proj-face proj-back proj-back--light">
                <img
                  src={project1Image}
                  alt=""
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 'inherit',
                    zIndex: 0,
                  }}
                />
                <div className="proj-visit-overlay">
                  <a href="https://fatah-hotel.vercel.app/" target="_blank" rel="noopener noreferrer">
                    Visit Site →
                  </a>
                </div>
                <div className="proj-back-inner">
                  <div className="proj-back-header">
                    <span className="proj-num">01</span>
                    <span className="proj-dot" />
                  </div>
                <div className="proj-back-body">
                  <h3 className="proj-back-title">
                    Project<br />One
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Card 1 */}
            <div
              className="proj-card"
              id="projCard1"
              role="link"
              tabIndex={0}
              aria-label="Open Project Two website"
              onClick={(e) => onProjectCardActivate(e, 'https://nexus-marketplace-smoky.vercel.app/')}
              onKeyDown={(e) => onProjectCardKeyDown(e, 'https://nexus-marketplace-smoky.vercel.app/')}
            >
              <div className="proj-face proj-front">
                <div className="proj-front-img proj-front-img--1" />
                <div className="proj-front-overlay" />
              </div>
              <div className="proj-face proj-back proj-back--accent">
                <img
                  src={project2Image}
                  alt=""
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 'inherit',
                    zIndex: 0,
                  }}
                />
                <div className="proj-visit-overlay">
                  <a
                    href="https://nexus-marketplace-smoky.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Site →
                  </a>
                </div>
                <div className="proj-back-inner">
                  <div className="proj-back-header">
                    <span className="proj-num">02</span>
                    <span className="proj-dot" />
                  </div>
                <div className="proj-back-body">
                  <h3 className="proj-back-title">
                    Project<br />Two
                  </h3>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
            <div
              className="proj-card"
              id="projCard2"
              role="link"
              tabIndex={0}
              aria-label="Open Project Three website"
              onClick={(e) => onProjectCardActivate(e, 'https://car-showcase-site-teal.vercel.app/')}
              onKeyDown={(e) => onProjectCardKeyDown(e, 'https://car-showcase-site-teal.vercel.app/')}
            >
              <div className="proj-face proj-front">
                <div className="proj-front-img proj-front-img--2" />
                <div className="proj-front-overlay" />
              </div>
              <div className="proj-face proj-back proj-back--dark">
                <img
                  src={project3Image}
                  alt=""
                  loading="lazy"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 'inherit',
                    zIndex: 0,
                  }}
                />
                <div className="proj-visit-overlay">
                  <a
                    href="https://car-showcase-site-teal.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Site →
                  </a>
                </div>
                <div className="proj-back-inner">
                  <div className="proj-back-header">
                    <span className="proj-num">03</span>
                    <span className="proj-dot" />
                  </div>
                <div className="proj-back-body">
                  <h3 className="proj-back-title">
                    Project<br />Three
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* â•â• PROCESS â•â• */}
      <SkillsSection />
    </>
  );
}
