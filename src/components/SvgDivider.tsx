import { motion } from "motion/react";

export function SvgDivider({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 2"
      className={`h-px w-full ${className}`}
      preserveAspectRatio="none"
    >
      <motion.line
        x1="0"
        y1="1"
        x2="200"
        y2="1"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-20%" }}
        transition={{ duration: 1.4, ease: "easeOut" }}
      />
    </svg>
  );
}
