import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ImageSlot } from "@/components/ImageSlot";
import { FadeUp, StaggerGroup, StaggerItem } from "@/components/FadeUp";
import { Counter } from "@/components/Counter";
import { SvgDivider } from "@/components/SvgDivider";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atelier BCI — Professional masks, ampoules & powders" },
      {
        name: "description",
        content:
          "Europe's specialist in professional single-dose masks, ampoules and powders. Trade-only.",
      },
      { property: "og:title", content: "Atelier BCI" },
      { property: "og:description", content: "Europe's specialist in professional cosmetic formulas." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { t } = useTranslation();
  return (
    <>
      <Opening />
      <WhoWeAre />
      <Formulas />
      <BuiltForTrade />
      <OrderSection />
    </>
  );
}

function Opening() {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, -200]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen overflow-hidden pt-28 md:pt-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pb-16 md:grid-cols-2 md:gap-16 md:pb-24">
        <div>
          <FadeUp>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] leading-[1.05] tracking-tight">
              {t("home.heroTitle")}
            </h1>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
              {t("home.heroSub")}
            </p>
          </FadeUp>
        </div>
        <motion.div style={{ y }} className="relative">
          <ImageSlot ratio="3:4" priority />
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-8 mx-auto flex max-w-7xl items-end justify-between px-6 text-muted-foreground">
        <SvgDivider className="max-w-[40%] text-border" />
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex items-center gap-2 text-xs tracking-[0.2em] uppercase"
        >
          {t("home.scroll")}
          <span>↓</span>
        </motion.div>
      </div>
    </section>
  );
}

function WhoWeAre() {
  const { t } = useTranslation();
  return (
    <section className="relative">
      <div className="grid md:grid-cols-2">
        <div className="relative min-h-[60vh]">
          <ImageSlot ratio="4:3" className="absolute inset-0 h-full" />
        </div>
        <div className="flex items-center bg-background px-6 py-20 md:px-16">
          <div className="max-w-md">
            <FadeUp>
              <span className="text-xs tracking-[0.25em] text-primary uppercase">
                {t("home.whoLabel")}
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <p className="mt-6 text-lg leading-relaxed text-foreground">
                {t("home.whoText")}
              </p>
            </FadeUp>

            <StaggerGroup className="mt-12 grid grid-cols-3 gap-6">
              <StaggerItem>
                <div className="font-display text-4xl text-primary">
                  <Counter to={20} suffix="+" />
                </div>
                <div className="mt-2 text-xs tracking-wide text-muted-foreground uppercase">
                  {t("home.stat1")}
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="font-display text-4xl text-primary">
                  <Counter to={3} />
                </div>
                <div className="mt-2 text-xs tracking-wide text-muted-foreground uppercase">
                  {t("home.stat2")}
                </div>
              </StaggerItem>
              <StaggerItem>
                <div className="font-display text-4xl text-primary">∞</div>
                <div className="mt-2 text-xs tracking-wide text-muted-foreground uppercase">
                  {t("home.stat3Label")}
                </div>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </div>
      </div>
    </section>
  );
}

function Formulas() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-66%"]);

  const cards = [
    { key: "masks", title: t("home.masksTitle"), desc: t("home.masksDesc") },
    { key: "ampoules", title: t("home.ampoulesTitle"), desc: t("home.ampoulesDesc") },
    { key: "powders", title: t("home.powdersTitle"), desc: t("home.powdersDesc") },
  ];

  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp>
          <span className="text-xs tracking-[0.25em] text-primary uppercase">
            {t("home.formulasLabel")}
          </span>
        </FadeUp>
        <FadeUp delay={0.1}>
          <h2 className="mt-4 font-display text-[clamp(2rem,4vw,3.5rem)] tracking-tight">
            {t("home.formulasHeading")}
          </h2>
        </FadeUp>
      </div>

      {/* Mobile: vertical carousel */}
      <div className="mt-12 flex gap-6 overflow-x-auto px-6 pb-4 md:hidden snap-x snap-mandatory">
        {cards.map((c) => (
          <FormulaCard key={c.key} title={c.title} desc={c.desc} className="min-w-[80%] snap-center" />
        ))}
      </div>

      {/* Desktop: pinned horizontal scroll */}
      <div ref={containerRef} className="relative mt-16 hidden md:block" style={{ height: "240vh" }}>
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-10 pl-[10vw]">
            {cards.map((c) => (
              <FormulaCard key={c.key} title={c.title} desc={c.desc} className="w-[60vw] max-w-[520px]" />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-7xl px-6">
        <FadeUp>
          <p className="text-sm italic text-muted-foreground">{t("home.formulasNote")}</p>
        </FadeUp>
      </div>
    </section>
  );
}

function FormulaCard({
  title,
  desc,
  className = "",
}: {
  title: string;
  desc: string;
  className?: string;
}) {
  const { t } = useTranslation();
  return (
    <motion.div
      whileHover={{ scale: 1.02, boxShadow: "0 24px 60px -20px rgba(26,26,26,0.25)" }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`group bg-surface ${className}`}
    >
      <ImageSlot ratio="3:4" />
      <div className="p-6">
        <h3 className="font-display text-2xl">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{desc}</p>
        <Link
          to="/products"
          className="mt-6 inline-block text-xs tracking-[0.2em] text-primary uppercase hover:opacity-70 transition-opacity"
        >
          {t("home.view")} →
        </Link>
      </div>
    </motion.div>
  );
}

function BuiltForTrade() {
  const { t } = useTranslation();
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-7xl space-y-24 px-6 md:space-y-32">
        <EditorialRow
          heading={t("home.row1Heading")}
          text={t("home.row1Text")}
          imageFirst
        />
        <EditorialRow
          heading={t("home.row2Heading")}
          text={t("home.row2Text")}
          imageFirst={false}
        />
      </div>
    </section>
  );
}

function EditorialRow({
  heading,
  text,
  imageFirst,
}: {
  heading: string;
  text: string;
  imageFirst: boolean;
}) {
  const image = (
    <div className="md:col-span-7">
      <ImageSlot ratio="4:3" />
    </div>
  );
  const copy = (
    <div className="flex items-center md:col-span-5">
      <div>
        <FadeUp>
          <h3 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] tracking-tight">
            {heading}
          </h3>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">{text}</p>
        </FadeUp>
      </div>
    </div>
  );
  return (
    <div className="grid items-center gap-10 md:grid-cols-12 md:gap-16">
      {imageFirst ? (
        <>
          {image}
          {copy}
        </>
      ) : (
        <>
          {copy}
          {image}
        </>
      )}
    </div>
  );
}

function OrderSection() {
  const { t } = useTranslation();
  return (
    <section style={{ backgroundColor: "#F0EBE3" }} className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <FadeUp>
          <h2 className="font-display text-[clamp(2.25rem,5vw,4rem)] tracking-tight">
            {t("home.orderHeading")}
          </h2>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
            {t("home.orderSub")}
          </p>
        </FadeUp>
        <FadeUp delay={0.2}>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/products"
              className="bg-primary px-8 py-3.5 text-sm tracking-wide text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {t("home.ctaPrimary")}
            </Link>
            <Link
              to="/contact"
              className="border border-primary px-8 py-3.5 text-sm tracking-wide text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {t("home.ctaSecondary")}
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
