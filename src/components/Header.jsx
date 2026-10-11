import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Flame, History, ShieldCheck } from 'lucide-react';
import { usePractice } from '../context/PracticeContext';

export default function Header() {
  const { streak, totalAttempted, totalCorrect, setIsHistoryOpen } = usePractice();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 100;

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="app-header">
      {/* Brand / Logo exactly as originally designed */}
      <Link to="/" className="brand-link" onClick={closeMobileMenu}>
        <div className="brand-container">
          <div className="brand-dot" />
          <h1 className="brand-title">SPRECHEN (AI)</h1>
        </div>
      </Link>

      {/* Right side container: Nav links + Stats + Mobile Toggle */}
      <div className="header-right-container">
        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Practice
          </Link>
          <Link
            to="/cefr-levels"
            className={`nav-link ${location.pathname === '/cefr-levels' ? 'active' : ''}`}
          >
            CEFR Levels
          </Link>
          <Link
            to="/about"
            className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          >
            About
          </Link>
        </nav>

        {/* Stats Badges (always visible on mobile & desktop) */}
        <div className="stats-bar">
          <div className="stat-pill" title="Practice Streak">
            <Flame size={14} style={{ color: '#ffb703' }} />
            <span>{streak} STREAK</span>
          </div>

          <div className="stat-pill" title="Accuracy Rate">
            <ShieldCheck size={14} style={{ color: '#00ff87' }} />
            <span>{accuracy}% ACCURACY</span>
          </div>

          <button
            className="action-icon-btn"
            onClick={() => setIsHistoryOpen(true)}
            title="Session History Log"
            aria-label="Session History Log"
            style={{ width: '32px', height: '32px' }}
          >
            <History size={16} />
          </button>
        </div>

        {/* Custom Animated Hamburger Button (mobile only) */}
        <button
          className={`custom-hamburger-btn ${mobileMenuOpen ? 'is-open' : ''}`}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          <span className="hamburger-line line-1" />
          <span className="hamburger-line line-2" />
          <span className="hamburger-line line-3" />
        </button>
      </div>

      {/* Mobile Navigation Dropdown Menu */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <Link
          to="/"
          className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
          onClick={closeMobileMenu}
        >
          Practice
        </Link>
        <Link
          to="/cefr-levels"
          className={`mobile-nav-link ${location.pathname === '/cefr-levels' ? 'active' : ''}`}
          onClick={closeMobileMenu}
        >
          CEFR Levels
        </Link>
        <Link
          to="/about"
          className={`mobile-nav-link ${location.pathname === '/about' ? 'active' : ''}`}
          onClick={closeMobileMenu}
        >
          About
        </Link>
      </div>
    </header>
  );
}
