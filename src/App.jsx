import React, { useState, useEffect, useCallback } from 'react';
import LevelSelector from './components/LevelSelector';
import SentenceCard from './components/SentenceCard';
import SpeechRecorder from './components/SpeechRecorder';
import ValidationResult from './components/ValidationResult';

import { SENTENCE_BANK } from './data/sentences';
import { calculateSimilarity } from './utils/validationUtils';
import { usePractice } from './context/PracticeContext';

export default function App() {
  const [selectedLevel, setSelectedLevel] = useState('A1');
  const [practiceDirection, setPracticeDirection] = useState('DE_TO_EN');
  const [currentSentence, setCurrentSentence] = useState(null);
  const [usedIds, setUsedIds] = useState([]);

  const [spokenTranscript, setSpokenTranscript] = useState('');
  const [validationData, setValidationData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Stats from Shared Context
  const {
    setStreak,
    setTotalAttempted,
    setTotalCorrect,
    setHistory,
  } = usePractice();

  // Pick a random sentence for the current level without repeating immediately
  const getRandomSentence = useCallback((level, currentUsedIds) => {
    const levelSentences = SENTENCE_BANK.filter((item) => item.level === level);
    if (levelSentences.length === 0) return null;

    let available = levelSentences.filter((item) => !currentUsedIds.includes(item.id));
    if (available.length === 0) {
      available = levelSentences;
      currentUsedIds = [];
    }

    const randomIndex = Math.floor(Math.random() * available.length);
    const chosen = available[randomIndex];
    setUsedIds([...currentUsedIds, chosen.id]);
    return chosen;
  }, []);

  // Initialize or update sentence on level change
  useEffect(() => {
    const initial = getRandomSentence(selectedLevel, []);
    setCurrentSentence(initial);
    setValidationData(null);
    setSpokenTranscript('');
  }, [selectedLevel, getRandomSentence]);

  const handleSelectLevel = (levelId) => {
    setSelectedLevel(levelId);
  };

  const handleSelectDirection = (direction) => {
    setPracticeDirection(direction);
    setValidationData(null);
    setSpokenTranscript('');
  };

  const handleGenerateNew = () => {
    const next = getRandomSentence(selectedLevel, usedIds);
    setCurrentSentence(next);
    setValidationData(null);
    setSpokenTranscript('');
  };

  const handleSubmitAnswer = (transcriptText) => {
    if (!currentSentence || !transcriptText) return;

    setIsProcessing(true);

    const expectedText = practiceDirection === 'DE_TO_EN' ? currentSentence.en : currentSentence.de;
    const score = calculateSimilarity(transcriptText, expectedText);

    const resultObj = {
      score,
      spoken: transcriptText,
      sentence: currentSentence,
      direction: practiceDirection,
    };

    setValidationData(resultObj);
    setTotalAttempted((prev) => prev + 1);

    if (score >= 80) {
      setStreak((prev) => prev + 1);
      setTotalCorrect((prev) => prev + 1);
    } else {
      setStreak(0);
    }

    const historyEntry = {
      sentence: currentSentence,
      spoken: transcriptText,
      score,
      mode: practiceDirection,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setHistory((prev) => [historyEntry, ...prev]);

    setIsProcessing(false);
  };

  const handleRetry = () => {
    setValidationData(null);
    setSpokenTranscript('');
  };

  return (
    <div className="app-container">
      {/* Minimalist Level & Mode Selector */}
      <LevelSelector
        selectedLevel={selectedLevel}
        onSelectLevel={handleSelectLevel}
        practiceDirection={practiceDirection}
        onSelectDirection={handleSelectDirection}
      />

      {/* Sentence Prompt Card */}
      <SentenceCard
        sentence={currentSentence}
        practiceDirection={practiceDirection}
        onGenerateNew={handleGenerateNew}
      />

      {/* Speech Input & Recording or Validation Results */}
      {!validationData ? (
        <SpeechRecorder
          practiceDirection={practiceDirection}
          onTranscriptReady={(text) => setSpokenTranscript(text)}
          onSubmit={handleSubmitAnswer}
          isProcessing={isProcessing}
        />
      ) : (
        <ValidationResult
          spokenText={validationData.spoken}
          expectedSentence={validationData.sentence}
          practiceDirection={practiceDirection}
          similarityScore={validationData.score}
          onNextSentence={handleGenerateNew}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
