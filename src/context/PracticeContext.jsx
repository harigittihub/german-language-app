import React, { createContext, useContext, useState } from 'react';

const PracticeContext = createContext(null);

export function PracticeProvider({ children }) {
  const [streak, setStreak] = useState(0);
  const [totalAttempted, setTotalAttempted] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [history, setHistory] = useState([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const value = {
    streak,
    setStreak,
    totalAttempted,
    setTotalAttempted,
    totalCorrect,
    setTotalCorrect,
    history,
    setHistory,
    isHistoryOpen,
    setIsHistoryOpen,
  };

  return (
    <PracticeContext.Provider value={value}>
      {children}
    </PracticeContext.Provider>
  );
}

export function usePractice() {
  const context = useContext(PracticeContext);
  if (!context) {
    return {
      streak: 0,
      setStreak: () => {},
      totalAttempted: 0,
      setTotalAttempted: () => {},
      totalCorrect: 0,
      setTotalCorrect: () => {},
      history: [],
      setHistory: () => {},
      isHistoryOpen: false,
      setIsHistoryOpen: () => {},
    };
  }
  return context;
}
