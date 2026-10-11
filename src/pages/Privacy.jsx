import React from 'react';

export default function Privacy() {
  return (
    <div className="app-container">
      <div className="glass-card page-card">
        <div className="page-header">
          <div className="category-tag">Legal</div>
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-subtitle">Last updated: October 2026</p>
        </div>

        <div className="page-content-body legal-content">
          <section>
            <h2>1. Information We Collect</h2>
            <p>
              Sprechen is designed with privacy-first principles. We do not store or sell your personal identifiable information. Speech audio recorded via your browser's Web Speech API is processed locally or through your browser provider's speech engine solely for real-time validation.
            </p>
          </section>

          <section>
            <h2>2. Audio and Microphone Access</h2>
            <p>
              Microphone access is requested strictly during active practice sessions. Audio data is not permanently stored on our servers.
            </p>
          </section>

          <section>
            <h2>3. Local Storage</h2>
            <p>
              Your streaks, accuracy metrics, and recent practice session history are saved locally in your browser memory for your convenience.
            </p>
          </section>

          <section>
            <h2>4. Contact</h2>
            <p>
              If you have any questions regarding this Privacy Policy, please reach out via our contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
