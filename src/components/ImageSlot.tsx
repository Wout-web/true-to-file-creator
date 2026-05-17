import { motion, useInView } from "motion/react";
import { useRef } from "react";

type Ratio = "3:4" | "4:3" | "16:9" | "1:1" | "9:16";

const ratioMap: Record<Ratio, string> = {
  "3:4": "aspect-[3/4]",
  "4:3": "aspect-[4/3]",
  "16:9": "aspect-[16/9]",
  "1:1": "aspect-square",
  "9:16": "aspect-[9/16]",
};

interface Props {
  src?: string;
  alt?: string;
  ratio?: Ratio;
  className?: string;
  reveal?: boolean;
  priority?: boolean;
}

export function ImageSlot({
  src,
  alt = "",
  ratio = "3:4",
  className = "",
  reveal = true,
  priority = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-placeholder ${ratioMap[ratio]} ${className}`}
    >
      <motion.div
        initial={reveal ? { clipPath: "inset(100% 0 0 0)" } : undefined}
        animate={reveal && inView ? { clipPath: "inset(0% 0 0 0)" } : undefined}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-placeholder">
            <div className="flex flex-col items-center gap-2 opacity-80">
              <svg
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C9A96E"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
              <span
                className="text-xs italic tracking-wide"
                style={{ color: "#C9A96E", fontFamily: "var(--font-sans)" }}
              >
                [Photo]
              </span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default ImageSlot;
