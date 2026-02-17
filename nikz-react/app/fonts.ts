import { Outfit, Fira_Code } from 'next/font/google'

// Display font: Outfit with single weight for performance
// Modern geometric sans with distinctive character
export const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-outfit',
  display: 'optional', // Avoid FOIT/FOUT - use fallback if font not loaded quickly
})

// Code font: Fira Code with single weight
export const firaCode = Fira_Code({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-fira-code',
  display: 'optional',
})
