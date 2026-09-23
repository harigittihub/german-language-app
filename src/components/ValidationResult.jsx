import React from 'react';
import { CheckCircle2, RotateCcw, ArrowRight, Volume2, Sparkles, AlertTriangle, XCircle } from 'lucide-react';
import { generateWordDiff, getFeedbackRating } from '../utils/validationUtils';
import { speakText } from '../utils/ttsUtils';

export default function ValidationResult({ 
  spokenText, 
  expectedSentence, 
  practiceDirection,
  similarityScore, 
  onNextSentence, 
  onRetry 
}) {
  // Determine expected text string based on direction
  const expectedText = practiceDirection === 'DE_TO_EN' ? expectedSentence.en : expectedSentence.de;
  const rating = getFeedbackRating(similarityScore);
  const wordDiff = generateWordDiff(spokenText, expectedText);

  const handleListenCorrect = () => {
    const lang = practiceDirection === 'DE_TO_EN' ? 'en-US' : 'de-DE';
    speakText(expectedText, lang, 1.0);
  };

  return (
    <div className="glass-card validation-card">
      <div className="feedback-header">
        <div>
          <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: 'var(--text-dim)', fontWeight: 700 }}>
            Evaluation Feedback
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '2px', color: 'var(--text-main)' }}>
            {rating.title}
          </h2>
        </div>

        <div className="score-badge" style={{ background: rating.badgeColor }}>
          <Sparkles size={18} />
          <span>{similarityScore}% Match</span>
        </div>
      </div>

      {/* Word-by-Word Diff Breakdown */}
      <div>
        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
          Word Alignment & Pronunciation Diff:
        </div>

        <div className="diff-container">
          {wordDiff.map((item, idx) => (
            <span key={idx} className={`diff-chip ${item.status}`}>
              {item.status === 'match' && <CheckCircle2 size={12} style={{ marginRight: '4px' }} />}
              {item.status === 'missing' && <XCircle size={12} style={{ marginRight: '4px' }} />}
              {item.status === 'partial' && <AlertTriangle size={12} style={{ marginRight: '4px' }} />}
              {item.word}
            </span>
          ))}
        </div>
      </div>

      {/* Expected Answer Box */}
      <div style={{ padding: '14px 18px', background: 'rgba(0, 0, 0, 0.3)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-dim)', textTransform: 'uppercase', fontWeight: 700 }}>
              Expected Correct Answer:
            </span>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#34d399', marginTop: '2px' }}>
              "{expectedText}"
            </div>
          </div>

          <button 
            className="action-icon-btn"
            onClick={handleListenCorrect}
            title="Hear Correct Pronunciation"
            style={{ borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', borderColor: 'rgba(16, 185, 129, 0.4)', color: '#34d399' }}
          >
            <Volume2 size={20} />
          </button>
        </div>

        {spokenText && (
          <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            Your Transcribed Input: <span style={{ color: '#fff', italic: 'true' }}>"{spokenText}"</span>
          </div>
        )}
      </div>

      {/* Navigation / Retry Controls */}
      <div className="next-actions">
        <button className="btn-secondary" onClick={onRetry}>
          <RotateCcw size={18} />
          <span>Try Again</span>
        </button>

        <button className="btn-primary" onClick={onNextSentence}>
          <span>Next Sentence</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
