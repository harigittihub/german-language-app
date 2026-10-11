import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PracticeProvider } from './context/PracticeContext.jsx';
import Layout from './components/Layout.jsx';
import App from './App.jsx';
import CefrLevels from './pages/CefrLevels.jsx';
import About from './pages/About.jsx';
import Privacy from './pages/Privacy.jsx';
import Terms from './pages/Terms.jsx';
import Contact from './pages/Contact.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PracticeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<App />} />
            <Route path="cefr-levels" element={<CefrLevels />} />
            <Route path="about" element={<About />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PracticeProvider>
  </StrictMode>,
);
