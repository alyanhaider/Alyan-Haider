import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const FOOTER_CSS = `
.site-footer {
  width: 100%;
  padding: 28px 24px;
  margin-top: 72px;
  text-align: center;
  font-family: 'Inter', sans-serif;
  color: var(--text-light, #8888aa);
  border-top: 1px solid rgba(167, 139, 250, 0.18);
}

.site-footer a {
  color: inherit;
  text-decoration: none;
}

.site-footer a:hover {
  text-decoration: underline;
}
`.trim();

export default function SiteFooter(): React.ReactElement {
  useEffect(() => {
    if (document.getElementById('site-footer-styles')) return;
    const style = document.createElement('style');
    style.id = 'site-footer-styles';
    style.textContent = FOOTER_CSS;
    document.head.appendChild(style);
  }, []);

  return (
    <footer className="site-footer">
      © {new Date().getFullYear()} Alyan Haider · <Link to="/contact">Contact</Link>
    </footer>
  );
}
