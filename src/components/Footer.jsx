import React from 'react';
import { Link } from 'react-router-dom';

function GitHubIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-columns">
          {/* Column 1: Brand */}
          <div className="footer-col brand-col">
            <div className="footer-brand-header">
              <div className="brand-dot" />
              <span className="footer-brand-title">SPRECHEN</span>
            </div>
            <p className="footer-tagline">
              Practice speaking German sentences, A1 to C2.
            </p>
            <p className="footer-author">Built by an Inspirer.</p>
          </div>

          {/* Column 2: Product */}
          <div className="footer-col">
            <h2 className="footer-col-title">Product</h2>
            <ul className="footer-links-list">
              <li>
                <Link to="/" className="footer-link">Practice</Link>
              </li>
              <li>
                <Link to="/cefr-levels" className="footer-link">CEFR Levels</Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">About</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="footer-col">
            <h2 className="footer-col-title">Resources</h2>
            <ul className="footer-links-list">
              <li>
                <Link to="/privacy" className="footer-link">Privacy</Link>
              </li>
              <li>
                <Link to="/terms" className="footer-link">Terms</Link>
              </li>
              <li>
                <Link to="/contact" className="footer-link">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="footer-col">
            <h2 className="footer-col-title">Connect</h2>
            <div className="footer-social-links">
              <a
                href="#"
                className="social-icon-btn"
                aria-label="GitHub Profile"
                title="GitHub"
              >
                <GitHubIcon size={18} />
              </a>
              <a
                href="#"
                className="social-icon-btn"
                aria-label="LinkedIn Profile"
                title="LinkedIn"
              >
                <LinkedInIcon size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar for copyright and SEO */}
        <div className="footer-bottom-bar">
          <p className="footer-copyright-text">
            © 2026 Sprechen. All rights reserved.
          </p>
          <p className="footer-seo-text">
            A1 · A2 · B1 · B2 · C1 · C2 German Speaking Practice
          </p>
        </div>
      </div>
    </footer>
  );
}
