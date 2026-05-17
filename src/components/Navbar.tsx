import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AnimatePresence, motion } from "motion/react";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const links = [
    { to: "/products", label: t("nav.products") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
  ] as const;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "py-3 backdrop-blur-md"
          : "py-6"
      }`}
      style={{
        backgroundColor: scrolled ? "rgba(250, 248, 245, 0.85)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <Link to="/" className="font-display text-[22px] tracking-tight text-foreground">
          {t("brand")}
        </Link>

        <nav className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-sm tracking-wide text-foreground hover:text-primary transition-colors"
              activeProps={{ className: "text-sm tracking-wide text-primary" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/consumers"
            className="text-sm tracking-wide text-primary hover:opacity-70 transition-opacity"
          >
            {t("nav.consumers")} →
          </Link>
        </nav>

        <div className="hidden md:block">
          <LanguageSwitcher />
        </div>

        <button
          onClick={() => setOpen(true)}
          className="md:hidden flex flex-col gap-1.5"
          aria-label="Open menu"
        >
          <span className="h-px w-6 bg-foreground" />
          <span className="h-px w-6 bg-foreground" />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-background md:hidden"
          >
            <div className="flex items-center justify-between px-6 py-6">
              <span className="font-display text-[22px]">{t("brand")}</span>
              <button onClick={() => setOpen(false)} aria-label="Close" className="text-2xl">
                ×
              </button>
            </div>
            <nav className="flex flex-col gap-6 px-6 pt-8">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className="font-display text-3xl text-foreground"
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/consumers" className="font-display text-3xl text-primary">
                {t("nav.consumers")} →
              </Link>
              <div className="pt-8">
                <LanguageSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
