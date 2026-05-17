import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";
import { ImageSlot } from "@/components/ImageSlot";
import { FadeUp } from "@/components/FadeUp";
import { QuoteModal } from "@/components/QuoteModal";

export const Route = createFileRoute("/products")({
  head: () => ({
    meta: [
      { title: "The Formulas — Atelier BCI" },
      {
        name: "description",
        content: "Professional single-dose masks, ampoules and powders for trade partners.",
      },
      { property: "og:title", content: "The Formulas — Atelier BCI" },
      { property: "og:description", content: "Professional single-dose formulas for trade." },
    ],
  }),
  component: ProductsPage,
});

type Category = "masks" | "ampoules" | "powders";
type Filter = "all" | Category;

const PRODUCTS: { key: string; category: Category }[] = [
  { key: "hydraMask", category: "masks" },
  { key: "purifyMask", category: "masks" },
  { key: "liftMask", category: "masks" },
  { key: "vitcAmp", category: "ampoules" },
  { key: "retinolAmp", category: "ampoules" },
  { key: "haAmp", category: "ampoules" },
  { key: "enzymePowder", category: "powders" },
  { key: "collagenPowder", category: "powders" },
  { key: "mineralPowder", category: "powders" },
];

function ProductsPage() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<Filter>("all");
  const [activeProduct, setActiveProduct] = useState<string | null>(null);

  const visible = PRODUCTS.filter((p) => filter === "all" || p.category === filter);

  const filters: Filter[] = ["all", "masks", "ampoules", "powders"];

  return (
    <section className="bg-background pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp>
          <h1 className="font-display text-[clamp(2.75rem,6vw,5rem)] leading-[1.05] tracking-tight">
            {t("products.title")}
          </h1>
        </FadeUp>
        <FadeUp delay={0.1}>
          <p className="mt-5 max-w-md text-base text-muted-foreground">{t("products.subtitle")}</p>
        </FadeUp>

        <div className="mt-12 flex flex-wrap gap-2 border-b border-border">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`relative px-5 py-3 text-sm tracking-wide transition-colors ${
                filter === f ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t(`products.filters.${f}`)}
              {filter === f && (
                <motion.span
                  layoutId="filter-underline"
                  className="absolute inset-x-0 -bottom-px h-px bg-primary"
                />
              )}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p) => {
              const name = t(`products.items.${p.key}.name`);
              return (
                <motion.article
                  key={p.key}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="group flex flex-col"
                >
                  <ImageSlot ratio="3:4" />
                  <div className="mt-5">
                    <span className="text-[10px] tracking-[0.25em] text-primary uppercase">
                      {t(`products.filters.${p.category}`)}
                    </span>
                    <h2 className="mt-2 font-display text-2xl leading-tight">{name}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(`products.items.${p.key}.desc`)}
                    </p>
                    <button
                      onClick={() => setActiveProduct(name)}
                      className="mt-5 self-start border border-primary px-5 py-2.5 text-xs tracking-[0.2em] text-primary uppercase hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {t("products.request")}
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      <QuoteModal
        open={activeProduct !== null}
        onClose={() => setActiveProduct(null)}
        productName={activeProduct ?? ""}
      />
    </section>
  );
}
