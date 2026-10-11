import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingWordsBackground from './FloatingWordsBackground';
import HistoryModal from './HistoryModal';
import { usePractice } from '../context/PracticeContext';

export default function Layout() {
  const { history, isHistoryOpen, setIsHistoryOpen, setHistory } = usePractice();

  return (
    <div className="site-wrapper">
      {/* Ambient Floating German Words Background */}
      <FloatingWordsBackground />

      {/* Sticky Header with Logo, Nav, Stats */}
      <Header />

      {/* Main Content Area */}
      <main className="main-layout-content">
        <Outlet />
      </main>

      {/* Shared Footer */}
      <Footer />

      {/* History Modal (triggered from Header) */}
      {isHistoryOpen && (
        <HistoryModal
          history={history}
          onClose={() => setIsHistoryOpen(false)}
          onClearHistory={() => setHistory([])}
        />
      )}
    </div>
  );
}
