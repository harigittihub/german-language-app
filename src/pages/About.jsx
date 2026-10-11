import React from 'react';

export default function About() {
  return (
    <div className="app-container">
      <div className="glass-card page-card">
        <div className="page-header">
          <div className="category-tag">About Project</div>
          <h1 className="page-title">About Sprechen</h1>
          <p className="page-subtitle">
            AI-powered speaking practice designed to build active German oral fluency.
          </p>
        </div>

        <div className="page-content-body">
          <p>
            <strong>Sprechen</strong> is an interactive German speaking practice companion built with a minimalist Nothing-inspired interface. It allows language learners of all levels (A1 to C2) to practice speaking German sentences out loud.
          </p>
          <p>
            By listening to authentic phrases and speaking responses aloud, learners get real-time feedback and phonetic similarity scoring. This active recall and pronunciation reinforcement bridges the gap between passive comprehension and conversational confidence.
          </p>
          <div className="about-stats-grid">
            <div className="about-stat-item">
              <span className="about-stat-num">A1–C2</span>
              <span className="about-stat-label">Full CEFR Coverage</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-num">AI Voice</span>
              <span className="about-stat-label">Real-time Recognition</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-num">100% Free</span>
              <span className="about-stat-label">Accessible Practice</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
