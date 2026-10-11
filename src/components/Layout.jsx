import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import FloatingWordsBackground from './FloatingWordsBackground';
import HistoryModal from './HistoryModal';
import { usePractice } from '../context/PracticeContext';

export default function Layout() {
  const { history, isHistoryOpen, setIsHistoryOpen, setHistory } = usePractice();
  const location = useLocation();

  return (
    <div className="site-wrapper">
      {/* Ambient Floating German Words Background */}
      <FloatingWordsBackground />

      {/* Sticky Header with Logo, Nav, Stats */}
      <Header />

      {/* Main Content Area with Smooth Route Transition */}
      <main className="main-layout-content">
        <div key={location.pathname} className="page-route-transition">
          <Outlet />
        </div>
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
