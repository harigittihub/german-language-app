import React from 'react';
import { Flame, History, ShieldCheck } from 'lucide-react';

export default function Header({ streak, totalAttempted, totalCorrect, onOpenHistory }) {
  const accuracy = totalAttempted > 0 ? Math.round((totalCorrect / totalAttempted) * 100) : 100;

  return (
    <header className="app-header">
      <div className="brand-container">
        <div className="brand-dot" />
        <h1 className="brand-title">SPRECHEN (AI)</h1>
      </div>

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
          onClick={onOpenHistory} 
          title="Session History Log"
          style={{ width: '32px', height: '32px' }}
        >
          <History size={16} />
        </button>
      </div>
    </header>
  );
}
