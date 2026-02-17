"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  number: string;
  title: string;
  className?: string;
}

export default function SectionHeading({
  number,
  title,
  className = "",
}: SectionHeadingProps) {
  return (
    <motion.h2
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className={`font-code text-2xl sm:text-3xl text-fg-primary mb-12 ${className}`}
    >
      <span className="text-accent-cyan font-bold">{number}</span>
      <span className="text-syntax-comment"> // </span>
      <span>{title}</span>
    </motion.h2>
  );
}
