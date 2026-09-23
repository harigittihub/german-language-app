import React, { useState, useEffect, useRef } from 'react';
import { Volume2, RefreshCw, Lightbulb, Gauge } from 'lucide-react';
import { speakText } from '../utils/ttsUtils';

const MATRIX_CHARS = '0123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export default function SentenceCard({ 
  sentence, 
  practiceDirection, 
  onGenerateNew 
}) {
  const [showHint, setShowHint] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);

  // Scramble animation state
  const [displayedPrompt, setDisplayedPrompt] = useState('');
  const [isScrambling, setIsScrambling] = useState(true);
  const animationRef = useRef(null);

  // Determine target prompt text safely
  let targetPromptText = '';
  let ttsTextToSpeak = '';
  let ttsLang = 'de-DE';

  if (sentence) {
    if (practiceDirection === 'DE_TO_EN') {
      targetPromptText = sentence.de || '';
      ttsTextToSpeak = sentence.de || '';
      ttsLang = 'de-DE';
    } else if (practiceDirection === 'EN_TO_DE') {
      targetPromptText = sentence.en || '';
      ttsTextToSpeak = sentence.de || '';
      ttsLang = 'de-DE';
    } else {
      // LISTEN_REPEAT
      targetPromptText = sentence.de || '';
      ttsTextToSpeak = sentence.de || '';
      ttsLang = 'de-DE';
    }
  }

  // Scramble Decoder Effect - Called unconditionally before any early return!
  useEffect(() => {
    if (!targetPromptText) return;

    setIsScrambling(true);
    let step = 0;
    const maxSteps = 10;
    const textLength = targetPromptText.length;

    if (animationRef.current) clearInterval(animationRef.current);

    animationRef.current = setInterval(() => {
      step++;
      const revealProgress = Math.floor((step / maxSteps) * textLength);

      let scrambled = targetPromptText.slice(0, revealProgress);
      for (let i = revealProgress; i < textLength; i++) {
        if (targetPromptText[i] === ' ') {
          scrambled += ' ';
        } else {
          const randomChar = MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
          scrambled += randomChar;
        }
      }

      setDisplayedPrompt(scrambled);

      if (step >= maxSteps) {
        clearInterval(animationRef.current);
        setDisplayedPrompt(targetPromptText);
        setIsScrambling(false);
      }
    }, 35);

    return () => {
      if (animationRef.current) clearInterval(animationRef.current);
    };
  }, [targetPromptText]);

  if (!sentence) return null;

  const handlePlayTTS = (speedRate) => {
    setIsPlaying(true);
    setPlaybackSpeed(speedRate);
    speakText(ttsTextToSpeak, ttsLang, speedRate, () => {
      setIsPlaying(false);
    });
  };

  return (
    <div className="glass-card sentence-box">
      <div className="sentence-header">
        <span className="category-tag">
          {sentence.level} • {sentence.category}
        </span>

        <div className="sentence-actions">
          <button 
            className={`action-icon-btn ${showHint ? 'active' : ''}`}
            onClick={() => setShowHint(!showHint)}
            title="Toggle Vocabulary Hint"
          >
            <Lightbulb size={16} />
          </button>

          <button 
            className="action-icon-btn"
            onClick={onGenerateNew}
            title="New Sentence"
          >
            <RefreshCw size={16} className={isScrambling ? 'scrambling' : ''} />
          </button>
        </div>
      </div>

      <div className={`target-text-display ${isScrambling ? 'scrambling' : ''}`}>
        {displayedPrompt || targetPromptText}
      </div>

      {/* Audio Playback Controls */}
      <div className="audio-controls-bar">
        <button 
          className="audio-btn" 
          onClick={() => handlePlayTTS(1.0)}
          title="Listen to German Audio"
        >
          <Volume2 size={16} />
          <span>{isPlaying && playbackSpeed === 1.0 ? 'PLAYING...' : 'LISTEN'}</span>
        </button>

        <button 
          className="audio-btn" 
          onClick={() => handlePlayTTS(0.8)}
          style={{ opacity: 0.8 }}
          title="Listen at slow speed"
        >
          <Gauge size={14} />
          <span>0.8X SLOW</span>
        </button>
      </div>

      {/* Hint drawer */}
      {showHint && (
        <div className="hint-box">
          <div>💡 <strong>Hint:</strong> {sentence.hint}</div>
          {sentence.grammar && (
            <div style={{ marginTop: '2px', opacity: 0.9 }}>📘 <strong>Grammar:</strong> {sentence.grammar}</div>
          )}
        </div>
      )}
    </div>
  );
}
