import { useState, useEffect } from "react";

function TypingText({ words, speed = 100, pause = 1000 }) {
  const [displayedText, setDisplayedText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];

    let timeout;
    if (!deleting && letterIndex <= currentWord?.length) {
      // typing letters
      timeout = setTimeout(() => {
        setDisplayedText(currentWord?.slice(0, letterIndex));
        setLetterIndex((prev) => prev + 1);
      }, speed);
    } else if (!deleting && letterIndex > currentWord?.length) {
      // word complete → wait, then start deleting
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && letterIndex >= 0) {
      // deleting letters
      timeout = setTimeout(() => {
        setDisplayedText(currentWord?.slice(0, letterIndex));
        setLetterIndex((prev) => prev - 1);
      }, speed / 2);
    } else if (deleting && letterIndex < 0) {
      // move to next word
      setDeleting(false);
      setLetterIndex(0);
      setWordIndex((prev) => (prev + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [letterIndex, deleting, wordIndex, words, speed, pause]);

  return <span className="fw-bold display-3">{displayedText}</span>;
}

export default TypingText;
