/**
 * Validation Engine & Word Diff Utility
 */

// Normalize text: lowercase, remove punctuation, expand extra whitespace
export const normalizeText = (text) => {
  if (!text) return '';
  return text
    .toLowerCase()
    .trim()
    .replace(/[.,/#!$%^&*;:{}=\-_`~()?"'„“«»]/g, '') // remove punctuation including German quotation marks
    .replace(/\s+/g, ' ');
};

// Calculate Levenshtein Distance between two strings
export const calculateLevenshteinDistance = (a, b) => {
  const matrix = Array.from({ length: b.length + 1 }, (_, i) => [i]);
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
};

// Calculate similarity score between 0% and 100%
export const calculateSimilarity = (spoken, expected) => {
  const normSpoken = normalizeText(spoken);
  const normExpected = normalizeText(expected);

  if (!normSpoken && !normExpected) return 100;
  if (!normSpoken || !normExpected) return 0;
  if (normSpoken === normExpected) return 100;

  const distance = calculateLevenshteinDistance(normSpoken, normExpected);
  const maxLength = Math.max(normSpoken.length, normExpected.length);

  const charScore = Math.max(0, (1 - distance / maxLength) * 100);

  // Word-level accuracy bonus/penalty
  const spokenWords = normSpoken.split(' ');
  const expectedWords = normExpected.split(' ');

  let matchedWords = 0;
  expectedWords.forEach((word) => {
    if (spokenWords.includes(word)) {
      matchedWords++;
    }
  });

  const wordScore = (matchedWords / expectedWords.length) * 100;

  // Weighted score: 60% word accuracy + 40% character precision
  const finalScore = Math.round(wordScore * 0.6 + charScore * 0.4);
  return Math.min(100, Math.max(0, finalScore));
};

/**
 * Generate word-by-word diff for visualization
 * Returns array of objects: { word: string, status: 'match' | 'partial' | 'missing' | 'extra' }
 */
export const generateWordDiff = (spoken, expected) => {
  const normSpoken = normalizeText(spoken);
  const normExpected = normalizeText(expected);

  const spokenWords = normSpoken ? normSpoken.split(' ') : [];
  const expectedWords = normExpected ? normExpected.split(' ') : [];

  const rawExpectedWords = expected.split(' ');

  const result = [];
  let sIndex = 0;

  expectedWords.forEach((expWord, eIndex) => {
    const rawWord = rawExpectedWords[eIndex] || expWord;

    if (sIndex < spokenWords.length && spokenWords[sIndex] === expWord) {
      result.push({ word: rawWord, status: 'match' });
      sIndex++;
    } else {
      // Check if spoken word matches with minor character distance (e.g. missing accent or typo)
      let foundCloseMatch = false;
      if (sIndex < spokenWords.length) {
        const dist = calculateLevenshteinDistance(spokenWords[sIndex], expWord);
        if (dist <= 2 && expWord.length > 3) {
          result.push({ word: `${rawWord} (spoken: "${spokenWords[sIndex]}")`, status: 'partial' });
          sIndex++;
          foundCloseMatch = true;
        }
      }

      if (!foundCloseMatch) {
        // Check if expected word appears further ahead in spoken words
        const futureSpokenIndex = spokenWords.slice(sIndex).indexOf(expWord);
        if (futureSpokenIndex !== -1) {
          // Extra words were spoken beforehand
          for (let k = 0; k < futureSpokenIndex; k++) {
            result.push({ word: spokenWords[sIndex + k], status: 'extra' });
          }
          sIndex += futureSpokenIndex + 1;
          result.push({ word: rawWord, status: 'match' });
        } else {
          result.push({ word: rawWord, status: 'missing' });
        }
      }
    }
  });

  // Any remaining spoken words are extra
  while (sIndex < spokenWords.length) {
    result.push({ word: spokenWords[sIndex], status: 'extra' });
    sIndex++;
  }

  return result;
};

// Evaluate feedback message and status based on score
export const getFeedbackRating = (score) => {
  if (score >= 95) {
    return { title: 'Ausgezeichnet! (Perfect!)', tier: 'perfect', badgeColor: '#10b981' };
  } else if (score >= 80) {
    return { title: 'Sehr Gut! (Great Job!)', tier: 'great', badgeColor: '#3b82f6' };
  } else if (score >= 60) {
    return { title: 'Gut! (Good Try)', tier: 'good', badgeColor: '#f59e0b' };
  } else {
    return { title: 'Noch einmal üben (Needs Practice)', tier: 'retry', badgeColor: '#ef4444' };
  }
};
