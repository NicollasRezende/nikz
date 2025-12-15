// components/features/ThemeToggle.tsx
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-14 h-14 rounded-xl flex items-center justify-center bg-slate-800/90 border border-slate-700/50">
        <i className="fas fa-circle-notch fa-spin text-cyan-400" />
      </div>
    );
  }

  const isDark = theme === "dark";

  return (
    <motion.button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="relative w-14 h-14 rounded-xl overflow-hidden group"
      aria-label="Toggle theme"
    >
      {/* Background gradient */}
      <div className={`absolute inset-0 transition-all duration-500 ${
        isDark
          ? 'bg-linear-to-br from-slate-800/90 to-slate-900/90'
          : 'bg-linear-to-br from-blue-50 to-cyan-50'
      }`} />

      {/* Border */}
      <div className={`absolute inset-0 rounded-xl border transition-all duration-500 ${
        isDark
          ? 'border-slate-700/50 group-hover:border-cyan-500/50'
          : 'border-blue-200 group-hover:border-blue-400'
      }`} />

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        animate={isDark ? {
          boxShadow: [
            '0 0 0px rgba(6, 182, 212, 0)',
            '0 0 20px rgba(6, 182, 212, 0.3)',
            '0 0 0px rgba(6, 182, 212, 0)',
          ],
        } : {
          boxShadow: [
            '0 0 0px rgba(59, 130, 246, 0)',
            '0 0 20px rgba(59, 130, 246, 0.3)',
            '0 0 0px rgba(59, 130, 246, 0)',
          ],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />

      {/* Icon container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {/* Moon icon (Dark mode) */}
        <motion.div
          initial={false}
          animate={{
            scale: isDark ? 1 : 0,
            rotate: isDark ? 0 : -90,
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.3, type: "spring" }}
          className="absolute"
        >
          <i className="fas fa-moon text-xl text-cyan-400 drop-shadow-lg" />
        </motion.div>

        {/* Sun icon (Light mode) */}
        <motion.div
          initial={false}
          animate={{
            scale: !isDark ? 1 : 0,
            rotate: !isDark ? 0 : 90,
            opacity: !isDark ? 1 : 0,
          }}
          transition={{ duration: 0.3, type: "spring" }}
          className="absolute"
        >
          <motion.i
            className="fas fa-sun text-xl text-yellow-500 drop-shadow-lg"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
      </div>

      {/* Decorative corner */}
      <div className={`absolute top-0 right-0 w-6 h-6 transition-all duration-500 ${
        isDark
          ? 'bg-linear-to-br from-cyan-500/10 to-transparent'
          : 'bg-linear-to-br from-yellow-300/30 to-transparent'
      } rounded-bl-xl rounded-tr-xl`} />
    </motion.button>
  );
}
