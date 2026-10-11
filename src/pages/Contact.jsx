import React from 'react';
import { Mail, MessageSquare } from 'lucide-react';

export default function Contact() {
  return (
    <div className="app-container">
      <div className="glass-card page-card">
        <div className="page-header">
          <div className="category-tag">Get in Touch</div>
          <h1 className="page-title">Contact Us</h1>
          <p className="page-subtitle">
            Have feedback, feature requests, or questions about Sprechen? We'd love to hear from you.
          </p>
        </div>

        <div className="page-content-body">
          <div className="contact-box">
            <div className="contact-icon-wrapper">
              <MessageSquare size={32} />
            </div>
            <h3>Send us an email</h3>
            <p>Direct communication for suggestions, grammar corrections, or collaborations.</p>
            <a href="mailto:contact@sprechen-app.com" className="btn-primary contact-btn">
              <Mail size={16} />
              <span>Email: contact@sprechen-app.com</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
