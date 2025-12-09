// hooks/useTypewriter.ts
"use client";

import { useState, useEffect, useRef } from "react";

interface UseTypewriterOptions {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  delayBetween?: number;
}

export function useTypewriter({
  texts,
  speed = 100,
  deleteSpeed = 50,
  delayBetween = 2000,
}: UseTypewriterOptions): string {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentIndex];

    const typeNextChar = () => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
          timeoutRef.current = setTimeout(typeNextChar, speed);
        } else {
          // Finished typing, wait then start deleting
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
          }, delayBetween);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
          timeoutRef.current = setTimeout(typeNextChar, deleteSpeed);
        } else {
          // Finished deleting, move to next text
          setIsDeleting(false);
          setCurrentIndex((prev) => (prev + 1) % texts.length);
        }
      }
    };

    timeoutRef.current = setTimeout(typeNextChar, speed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [
    displayText,
    currentIndex,
    isDeleting,
    texts,
    speed,
    deleteSpeed,
    delayBetween,
  ]);

  return displayText;
}
