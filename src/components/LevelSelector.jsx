import React from 'react';
import { CEFR_LEVELS } from '../data/sentences';
import { ArrowLeftRight, Headphones, Languages } from 'lucide-react';

export default function LevelSelector({ 
  selectedLevel, 
  onSelectLevel, 
  practiceDirection, 
  onSelectDirection 
}) {
  return (
    <div className="glass-card controls-section">
      <div>
        <div className="control-label" style={{ marginBottom: '8px' }}>CEFR DIFFICULTY</div>
        <div className="level-pills-grid">
          {CEFR_LEVELS.map((level) => {
            const isActive = selectedLevel === level.id;
            return (
              <button
                key={level.id}
                className={`level-btn ${isActive ? 'active' : ''}`}
                onClick={() => onSelectLevel(level.id)}
              >
                {level.id}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <div className="control-label" style={{ marginBottom: '8px' }}>MODE</div>
        <div className="mode-toggle-container">
          <button
            className={`mode-btn ${practiceDirection === 'DE_TO_EN' ? 'active' : ''}`}
            onClick={() => onSelectDirection('DE_TO_EN')}
          >
            <Languages size={14} />
            <span>DE → EN</span>
          </button>

          <button
            className={`mode-btn ${practiceDirection === 'EN_TO_DE' ? 'active' : ''}`}
            onClick={() => onSelectDirection('EN_TO_DE')}
          >
            <ArrowLeftRight size={14} />
            <span>EN → DE</span>
          </button>

          <button
            className={`mode-btn ${practiceDirection === 'LISTEN_REPEAT' ? 'active' : ''}`}
            onClick={() => onSelectDirection('LISTEN_REPEAT')}
          >
            <Headphones size={14} />
            <span>REPEAT DE</span>
          </button>
        </div>
      </div>
    </div>
  );
}
