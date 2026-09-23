import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Keyboard, AlertCircle } from 'lucide-react';
import { SpeechHandler, isSpeechRecognitionSupported } from '../utils/speechUtils';

export default function SpeechRecorder({ 
  practiceDirection, 
  onTranscriptReady, 
  onSubmit, 
  isProcessing 
}) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [showTypedFallback, setShowTypedFallback] = useState(false);
  const speechHandlerRef = useRef(null);

  const recLang = practiceDirection === 'DE_TO_EN' ? 'en-US' : 'de-DE';

  useEffect(() => {
    if (!isSpeechRecognitionSupported()) {
      setShowTypedFallback(true);
      setErrorMsg('Web Speech API is not supported in this browser. Please type below.');
      return;
    }

    speechHandlerRef.current = new SpeechHandler({
      lang: recLang,
      onResult: ({ display }) => {
        setTranscript(display);
        if (onTranscriptReady) onTranscriptReady(display);
      },
      onError: (msg) => {
        setErrorMsg(msg);
        setIsListening(false);
      },
      onEnd: () => {
        setIsListening(false);
      }
    });

    return () => {
      if (speechHandlerRef.current) {
        speechHandlerRef.current.stop();
      }
    };
  }, [recLang]);

  const toggleListening = () => {
    setErrorMsg('');
    if (!speechHandlerRef.current) return;

    if (isListening) {
      speechHandlerRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      speechHandlerRef.current.start();
      setIsListening(true);
    }
  };

  const handleManualSubmit = (e) => {
    if (e) e.preventDefault();
    if (transcript.trim() && onSubmit) {
      if (isListening && speechHandlerRef.current) {
        speechHandlerRef.current.stop();
      }
      onSubmit(transcript.trim());
    }
  };

  return (
    <div className="glass-card recording-area">
      <div className="mic-button-wrapper">
        <button
          type="button"
          className={`mic-btn ${isListening ? 'listening' : ''}`}
          onClick={toggleListening}
          disabled={showTypedFallback && !isSpeechRecognitionSupported()}
          title={isListening ? 'Stop Recording' : 'Start Recording'}
        >
          {isListening ? <MicOff size={32} /> : <Mic size={32} />}
        </button>
      </div>

      <div style={{ fontSize: '0.78rem', color: isListening ? '#ff4d6d' : 'var(--text-muted)', fontWeight: 600, fontFamily: 'var(--font-mono)' }}>
        {isListening ? 'RECORDING... SPEAK NOW' : 'TAP MICROPHONE TO SPEAK'}
      </div>

      <div className={`live-transcript-box ${!transcript ? 'placeholder' : ''}`}>
        {transcript ? (
          <span>"{transcript}"</span>
        ) : (
          <span>Spoken answer transcript will display here...</span>
        )}
      </div>

      {errorMsg && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#ff4d6d', fontSize: '0.8rem' }}>
          <AlertCircle size={14} />
          <span>{errorMsg}</span>
        </div>
      )}

      <button
        type="button"
        onClick={() => setShowTypedFallback(!showTypedFallback)}
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '0.75rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontFamily: 'var(--font-mono)'
        }}
      >
        <Keyboard size={12} />
        <span>{showTypedFallback ? 'HIDE KEYBOARD' : 'TYPE RESPONSE INSTEAD'}</span>
      </button>

      {showTypedFallback && (
        <form onSubmit={handleManualSubmit} className="text-fallback-wrapper">
          <input
            type="text"
            className="text-fallback-input"
            placeholder={practiceDirection === 'DE_TO_EN' ? 'Type English translation...' : 'Type German sentence...'}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />
        </form>
      )}

      <button
        className="submit-btn"
        onClick={handleManualSubmit}
        disabled={!transcript.trim() || isProcessing}
      >
        <Send size={16} />
        <span>VALIDATE RESPONSE</span>
      </button>
    </div>
  );
}
