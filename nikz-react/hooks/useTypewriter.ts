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
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentIndex];

    const typeNextChar = () => {
      setDisplayText((prevText) => {
        if (!isDeleting) {
          // Typing
          if (prevText.length < currentText.length) {
            const nextText = currentText.slice(0, prevText.length + 1);
            timeoutRef.current = setTimeout(typeNextChar, speed);
            return nextText;
          } else {
            // Finished typing, wait then start deleting
            timeoutRef.current = setTimeout(() => {
              setIsDeleting(true);
            }, delayBetween);
            return prevText;
          }
        } else {
          // Deleting
          if (prevText.length > 0) {
            const nextText = prevText.slice(0, -1);
            timeoutRef.current = setTimeout(typeNextChar, deleteSpeed);
            return nextText;
          } else {
            // Finished deleting, move to next text
            setIsDeleting(false);
            setCurrentIndex((prev) => (prev + 1) % texts.length);
            return prevText;
          }
        }
      });
    };

    // Iniciar animação
    timeoutRef.current = setTimeout(typeNextChar, isDeleting ? deleteSpeed : speed);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isDeleting, texts, speed, deleteSpeed, delayBetween]);

  return displayText;
}
