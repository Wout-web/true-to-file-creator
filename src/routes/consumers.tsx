import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { ImageSlot } from "@/components/ImageSlot";

export const Route = createFileRoute("/consumers")({
  head: () => ({
    meta: [
      { title: "For Consumers — Atelier BCI" },
      { name: "description", content: "Atelier BCI for home — coming soon." },
      { property: "og:title", content: "For Consumers — Atelier BCI" },
      { property: "og:description", content: "A new experience is on its way." },
    ],
  }),
  component: ConsumersPage,
});

function ConsumersPage() {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-screen bg-background">
      <div className="pointer-events-none absolute inset-0 grain opacity-60" />
      <div className="relative mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-2xl tracking-tight"
        >
          {t("brand")}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="mt-10 font-display text-[clamp(3rem,8vw,6rem)] leading-[1.05] tracking-tight"
        >
          {t("consumers.title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="mt-6 max-w-md text-base leading-relaxed text-muted-foreground"
        >
          {t("consumers.sub")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 w-full max-w-xs"
        >
          <ImageSlot ratio="3:4" priority />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1 }}
          className="mt-12 text-sm text-muted-foreground"
        >
          {t("consumers.discover")}{" "}
          <Link to="/" className="text-primary hover:opacity-70 transition-opacity">
            →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
