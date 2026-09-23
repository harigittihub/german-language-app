/**
 * Web Speech API Recognition Wrapper
 */

export const isSpeechRecognitionSupported = () => {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
};

export class SpeechHandler {
  constructor({ lang = 'de-DE', onResult, onError, onEnd }) {
    this.lang = lang;
    this.onResult = onResult;
    this.onError = onError;
    this.onEnd = onEnd;
    this.recognition = null;
    this.isListening = false;

    this.init();
  }

  init() {
    if (!isSpeechRecognitionSupported()) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = this.lang;

    this.recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }

      if (this.onResult) {
        this.onResult({
          final: finalTranscript.trim(),
          interim: interimTranscript.trim(),
          display: (finalTranscript || interimTranscript).trim()
        });
      }
    };

    this.recognition.onerror = (event) => {
      this.isListening = false;
      let errorMsg = 'An error occurred during speech recognition.';

      switch (event.error) {
        case 'not-allowed':
        case 'permission-denied':
          errorMsg = 'Microphone permission was denied. Please allow microphone access in browser settings.';
          break;
        case 'no-speech':
          errorMsg = 'No speech was detected. Please try speaking closer to the microphone.';
          break;
        case 'audio-capture':
          errorMsg = 'No microphone was found. Please ensure a microphone is connected.';
          break;
        case 'network':
          errorMsg = 'Network connection error during speech recognition.';
          break;
        case 'aborted':
          errorMsg = 'Listening stopped.';
          break;
        default:
          errorMsg = `Speech recognition error: ${event.error}`;
      }

      if (this.onError) {
        this.onError(errorMsg);
      }
    };

    this.recognition.onend = () => {
      this.isListening = false;
      if (this.onEnd) {
        this.onEnd();
      }
    };
  }

  setLanguage(lang) {
    this.lang = lang;
    if (this.recognition) {
      this.recognition.lang = lang;
    }
  }

  start() {
    if (!this.recognition) {
      if (this.onError) this.onError('Speech recognition is not supported in this browser.');
      return;
    }
    if (this.isListening) return;

    try {
      this.recognition.lang = this.lang;
      this.recognition.start();
      this.isListening = true;
    } catch (err) {
      console.warn('Speech recognition start error:', err);
    }
  }

  stop() {
    if (!this.recognition || !this.isListening) return;
    try {
      this.recognition.stop();
    } catch (err) {
      console.warn('Speech recognition stop error:', err);
    }
    this.isListening = false;
  }
}
