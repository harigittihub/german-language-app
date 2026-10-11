import React from 'react';
import { Link } from 'react-router-dom';

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
