import React, { useMemo } from 'react';

const GERMAN_WORDS = [
  'Willkommen', 'Sprechen', 'Sprache', 'Zukunft', 'Freiheit', 
  'Wissen', 'Hoffnung', 'Reise', 'Wunder', 'Leben', 
  'Erfolg', 'Kultur', 'Abenteuer', 'Gedanke', 'Ausgezeichnet', 
  'Freude', 'Frieden', 'Universum', 'Zeit', 'Traum', 
  'Licht', 'Klarheit', 'Verstehen', 'Neugier', 'Weisheit'
];

export default function FloatingWordsBackground() {
  const floatingItems = useMemo(() => {
    return GERMAN_WORDS.map((word, idx) => {
      // Generate random positions, speeds, font sizes, and opacity for depth
      const top = Math.floor(Math.random() * 90) + 5; // 5% to 95%
      const left = Math.floor(Math.random() * 90) + 5;
      const duration = Math.floor(Math.random() * 25) + 25; // 25s to 50s
      const delay = Math.floor(Math.random() * -30); // negative delay so all appear immediately
      const fontSize = (Math.random() * 1.2 + 0.8).toFixed(2); // 0.8rem to 2.0rem
      const opacity = (Math.random() * 0.12 + 0.05).toFixed(2); // 0.05 to 0.17 subtle
      const driftX = (Math.random() * 200 - 100).toFixed(0); // -100px to +100px
      const driftY = (Math.random() * 120 - 60).toFixed(0);

      return {
        id: idx,
        word,
        style: {
          top: `${top}%`,
          left: `${left}%`,
          fontSize: `${fontSize}rem`,
          opacity: parseFloat(opacity),
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          '--drift-x': `${driftX}px`,
          '--drift-y': `${driftY}px`,
        }
      };
    });
  }, []);

  return (
    <div className="floating-words-container">
      {floatingItems.map((item) => (
        <span key={item.id} className="floating-word" style={item.style}>
          {item.word}
        </span>
      ))}
    </div>
  );
}
