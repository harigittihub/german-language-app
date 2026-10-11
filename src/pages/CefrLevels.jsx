import React from 'react';

const CEFR_DATA = [
  {
    level: 'A1',
    name: 'Beginner / Breakthrough',
    summary:
      'At the A1 level, learners can understand and use familiar everyday expressions and very basic phrases aimed at satisfying concrete needs. You can introduce yourself and others, ask and answer questions about personal details such as where you live, people you know, and things you have, and interact in a simple way provided the other person speaks slowly and clearly.',
  },
  {
    level: 'A2',
    name: 'Elementary / Waystage',
    summary:
      'At the A2 level, you can understand sentences and frequently used expressions related to areas of most immediate relevance, such as basic personal and family information, shopping, local geography, and employment. You can communicate during routine tasks requiring a simple and direct exchange of information on familiar matters and describe in simple terms aspects of your background and immediate environment.',
  },
  {
    level: 'B1',
    name: 'Intermediate / Threshold',
    summary:
      'At the B1 level, learners understand the main points of clear standard input on familiar matters regularly encountered in work, school, and leisure. You can deal with most situations likely to arise while traveling in a German-speaking area, produce simple connected text on topics that are familiar or of personal interest, and describe experiences, events, dreams, hopes, and ambitions with brief reasons and explanations.',
  },
  {
    level: 'B2',
    name: 'Upper-Intermediate / Vantage',
    summary:
      'At the B2 level, you can grasp the main ideas of complex text on both concrete and abstract topics, including technical discussions in your specialization field. You can interact with a degree of fluency and spontaneity that makes regular interaction with native speakers quite possible without strain for either party, and produce clear, detailed text on a wide range of subjects while explaining a viewpoint on a topical issue.',
  },
  {
    level: 'C1',
    name: 'Advanced / Effective Operational Proficiency',
    summary:
      'At the C1 level, you can comprehend a wide range of demanding, longer texts and recognize implicit meaning. You can express yourself fluently and spontaneously without much obvious searching for expressions, use language flexibly and effectively for social, academic, and professional purposes, and produce clear, well-structured, detailed text on complex subjects showing controlled use of organizational patterns and cohesive devices.',
  },
  {
    level: 'C2',
    name: 'Mastery / Proficiency',
    summary:
      'At the C2 level, you have virtually effortless understanding of everything heard or read. You can summarize information from different spoken and written sources, reconstructing arguments and accounts in a coherent presentation, and express yourself spontaneously, very fluently, and precisely, differentiating finer shades of meaning even in more complex situations.',
  },
];

export default function CefrLevels() {
  return (
    <div className="app-container">
      <div className="glass-card page-card">
        <div className="page-header">
          <div className="category-tag">CEFR Framework</div>
          <h1 className="page-title">German Language Proficiency Levels</h1>
          <p className="page-subtitle">
            The Common European Framework of Reference for Languages (CEFR) standardizes language competence from breakthrough beginner (A1) to full mastery (C2).
          </p>
        </div>

        <div className="cefr-grid">
          {CEFR_DATA.map((item) => (
            <div key={item.level} className="cefr-card">
              <div className="cefr-card-header">
                <span className="cefr-level-badge">{item.level}</span>
                <span className="cefr-level-title">{item.name}</span>
              </div>
              <p className="cefr-paragraph">{item.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
