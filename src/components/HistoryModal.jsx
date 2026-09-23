import React from 'react';
import { X, Trophy, Volume2, CheckCircle, XCircle } from 'lucide-react';
import { speakText } from '../utils/ttsUtils';

export default function HistoryModal({ history, onClose, onClearHistory }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Trophy size={22} style={{ color: '#f59e0b' }} />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Session Practice Log</h3>
          </div>
          <button className="action-icon-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-body">
          {history.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 20px', color: 'var(--text-dim)' }}>
              No sentence attempts in this session yet. Complete your first practice round!
            </div>
          ) : (
            history.map((item, idx) => (
              <div key={idx} className="history-item">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '4px', background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc' }}>
                      {item.sentence.level}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Mode: {item.mode === 'DE_TO_EN' ? 'DE→EN' : item.mode === 'EN_TO_DE' ? 'EN→DE' : 'Listen&Repeat'}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginLeft: 'auto' }}>
                      {item.timestamp}
                    </span>
                  </div>

                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fff' }}>
                    Target: "{item.sentence.de}"
                  </div>

                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Spoken: "{item.spoken}"
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px', marginLeft: '16px' }}>
                  <div 
                    style={{ 
                      padding: '4px 12px', 
                      borderRadius: '12px', 
                      fontWeight: 800, 
                      fontSize: '0.9rem',
                      background: item.score >= 80 ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                      color: item.score >= 80 ? '#34d399' : '#f87171'
                    }}
                  >
                    {item.score}%
                  </div>

                  <button 
                    className="action-icon-btn" 
                    style={{ width: '32px', height: '32px' }}
                    onClick={() => speakText(item.sentence.de, 'de-DE')}
                    title="Listen to German Audio"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {history.length > 0 && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              className="btn-secondary" 
              onClick={onClearHistory}
              style={{ padding: '8px 16px', fontSize: '0.88rem' }}
            >
              Clear Session Log
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
