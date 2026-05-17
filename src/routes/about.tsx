import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion } from "motion/react";
import { ImageSlot } from "@/components/ImageSlot";
import { FadeUp } from "@/components/FadeUp";
import { SvgDivider } from "@/components/SvgDivider";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Atelier BCI" },
      { name: "description", content: "Atelier BCI: 20+ years of professional cosmetic formulas, made in Europe." },
      { property: "og:title", content: "About — Atelier BCI" },
      { property: "og:description", content: "An internationally operating niche firm in professional cosmetics." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useTranslation();
  return (
    <section className="bg-background">
      <div className="pt-24 md:pt-28">
        <div style={{ height: "60vh" }} className="relative">
          <ImageSlot ratio="16:9" className="absolute inset-0 h-full" priority />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-20 md:py-32">
        <FadeUp>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.05] tracking-tight">
            {t("about.title")}
          </h1>
        </FadeUp>

        <div className="mt-16 space-y-20">
          {(["s1", "s2", "s3"] as const).map((s, i) => (
            <div key={s}>
              <FadeUp>
                <h2 className="font-display text-3xl md:text-4xl">{t(`about.${s}Heading`)}</h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
                  {t(`about.${s}Text`)}
                </p>
              </FadeUp>
              {i < 2 && <SvgDivider className="mt-16 text-border" />}
            </div>
          ))}
        </div>

        <div className="mt-24">
          <FadeUp>
            <h2 className="font-display text-3xl md:text-4xl">{t("about.s4Heading")}</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="mt-10">
              <EuropeMap />
            </div>
          </FadeUp>
          <FadeUp delay={0.2}>
            <p className="mt-6 text-sm italic text-muted-foreground">{t("about.s4Caption")}</p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function EuropeMap() {
  // Simplified Europe outline + dot markers
  const dots = [
    { cx: 245, cy: 175, label: "NL" },
    { cx: 250, cy: 200, label: "BE" },
    { cx: 285, cy: 195, label: "DE" },
    { cx: 220, cy: 230, label: "FR" },
    { cx: 230, cy: 290, label: "ES" },
    { cx: 295, cy: 275, label: "IT" },
    { cx: 200, cy: 145, label: "UK" },
    { cx: 340, cy: 215, label: "AT" },
    { cx: 380, cy: 250, label: "GR" },
  ];

  return (
    <div className="relative">
      <svg viewBox="0 0 500 380" className="w-full text-border">
        {/* Stylized Europe blob */}
        <path
          d="M150 120 C 180 95, 230 95, 270 110 C 320 95, 380 110, 410 145 C 440 175, 435 220, 410 250 C 425 280, 400 320, 360 325 C 320 340, 270 330, 240 320 C 200 335, 155 320, 140 290 C 110 280, 100 235, 115 200 C 105 165, 125 135, 150 120 Z"
          fill="var(--placeholder)"
          stroke="currentColor"
          strokeWidth="1"
        />
        {dots.map((d, i) => (
          <g key={d.label}>
            <motion.circle
              cx={d.cx}
              cy={d.cy}
              r="4"
              fill="var(--primary)"
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.08, duration: 0.4 }}
            />
            <motion.circle
              cx={d.cx}
              cy={d.cy}
              r="10"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0.6, 1.4, 0.6], opacity: [0.6, 0, 0.6] }}
              transition={{ delay: 0.4 + i * 0.08, duration: 2.4, repeat: Infinity }}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
