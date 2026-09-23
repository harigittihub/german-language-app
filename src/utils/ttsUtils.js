/**
 * Text-to-Speech (TTS) Synthesis Wrapper
 */

export const isTTSSupported = () => {
  return 'speechSynthesis' in window;
};

let availableVoices = [];

if (isTTSSupported()) {
  const loadVoices = () => {
    availableVoices = window.speechSynthesis.getVoices();
  };
  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }
}

export const speakText = (text, lang = 'de-DE', speed = 1.0, onEndCallback = null) => {
  if (!isTTSSupported()) {
    console.warn('Speech synthesis is not supported in this browser.');
    if (onEndCallback) onEndCallback();
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = speed; // e.g. 1.0 or 0.8

  // Try to pick the best matching native voice
  if (availableVoices.length === 0) {
    availableVoices = window.speechSynthesis.getVoices();
  }

  const langPrefix = lang.split('-')[0]; // 'de' or 'en'
  const matchingVoice = availableVoices.find(
    (voice) => voice.lang === lang || voice.lang.startsWith(langPrefix)
  );

  if (matchingVoice) {
    utterance.voice = matchingVoice;
  }

  if (onEndCallback) {
    utterance.onend = onEndCallback;
    utterance.onerror = onEndCallback;
  }

  window.speechSynthesis.speak(utterance);
};

export const stopSpeech = () => {
  if (isTTSSupported()) {
    window.speechSynthesis.cancel();
  }
};
