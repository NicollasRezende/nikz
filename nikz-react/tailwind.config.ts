import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Colors
        primary: {
          DEFAULT: '#00c6ff',
          light: '#4d8cff',
          dark: '#0099cc',
        },
        // Secondary Colors
        secondary: {
          DEFAULT: '#9d5cfc',
          light: '#b47dff',
          dark: '#7a3fd6',
        },
        // Accent Colors
        accent: {
          DEFAULT: '#ff56b1',
          light: '#ff89d0',
          dark: '#d63388',
        },
        // Dark Theme
        dark: {
          bg: '#0a1022',
          card: '#1a1f3a',
          border: '#2a2f4a',
          hover: '#252b4a',
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out',
        'scale-in': 'scale-in 0.6s ease-out',
        'shake': 'shake 0.5s ease-in-out',
        'blink': 'blink 1s infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
        'spin-slow': 'spin 30s linear infinite',
        'glow': 'glow 3s ease-in-out infinite',
      },
      keyframes: {
        'fade-up': {
          'from': {
            opacity: '0',
            transform: 'translateY(30px)',
          },
          'to': {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        'scale-in': {
          'from': {
            opacity: '0',
            transform: 'scale(0.9)',
          },
          'to': {
            opacity: '1',
            transform: 'scale(1)',
          },
        },
        'shake': {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-5px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(5px)' },
        },
        'blink': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 198, 255, 0.4)',
            transform: 'scale(1)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(0, 198, 255, 0.6)',
            transform: 'scale(1.02)',
          },
        },
        'glow': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 198, 255, 0.3)',
          },
          '50%': {
            boxShadow: '0 0 40px rgba(0, 198, 255, 0.6)',
          },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
