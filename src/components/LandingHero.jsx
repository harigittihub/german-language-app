import React from 'react';
import { Sparkles, Mic, Layers, Cpu, Zap, Award } from 'lucide-react';
import { SENTENCE_BANK } from '../data/sentences';

export default function LandingHero({ selectedLevel, totalAttempted, accuracy }) {
  const totalSentences = SENTENCE_BANK.length;

  return (
    <div className="hero-banner">
      <div className="hero-tag">
        <Sparkles size={14} /> Next-Gen German AI Speaking Trainer
      </div>

      <h1 className="hero-heading">
        Master Spoken German with Instant Neural Speech Validation
      </h1>

      <p className="hero-description">
        Train your pronunciation, grammar fluency, and bidirectional translation across <strong>CEFR A1–C2 levels</strong>. Speak into your microphone and receive real-time word-by-word diff feedback.
      </p>

      <div className="hero-stats-row">
        <div className="hero-stat-card">
          <Layers size={22} style={{ color: '#34d399' }} />
          <div>
            <div className="hero-stat-val">{totalSentences}+</div>
            <div className="hero-stat-lbl">CEFR Sentences</div>
          </div>
        </div>

        <div className="hero-stat-card">
          <Cpu size={22} style={{ color: '#06b6d4' }} />
          <div>
            <div className="hero-stat-val">A1–C2</div>
            <div className="hero-stat-lbl">Proficiency Range</div>
          </div>
        </div>

        <div className="hero-stat-card">
          <Zap size={22} style={{ color: '#f59e0b' }} />
          <div>
            <div className="hero-stat-val">STT + TTS</div>
            <div className="hero-stat-lbl">Real-Time Validation</div>
          </div>
        </div>

        <div className="hero-stat-card">
          <Award size={22} style={{ color: '#10b981' }} />
          <div>
            <div className="hero-stat-val">{accuracy}%</div>
            <div className="hero-stat-lbl">Session Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  );
}
