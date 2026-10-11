import React from 'react';

export default function Terms() {
  return (
    <div className="app-container">
      <div className="glass-card page-card">
        <div className="page-header">
          <div className="category-tag">Legal</div>
          <h1 className="page-title">Terms of Service</h1>
          <p className="page-subtitle">Last updated: October 2026</p>
        </div>

        <div className="page-content-body legal-content">
          <section>
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Sprechen, you acknowledge and agree to comply with these terms of service and all applicable laws and regulations.
            </p>
          </section>

          <section>
            <h2>2. Educational Use</h2>
            <p>
              Sprechen is provided as a free educational practice platform. The sentence banks, translations, and scoring algorithms are intended for self-study and reference purposes.
            </p>
          </section>

          <section>
            <h2>3. Intellectual Property</h2>
            <p>
              The user interface designs, custom themes, and compiled resources of Sprechen are protected under international copyright and intellectual property standards.
            </p>
          </section>

          <section>
            <h2>4. Disclaimer of Warranties</h2>
            <p>
              The application is provided "as is" without warranty of any kind, express or implied.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
