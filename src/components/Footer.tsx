import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="font-display text-[22px]">{t("brand")}</div>
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] text-primary uppercase">
              {t("footer.navHeading")}
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li><Link to="/products" className="hover:text-primary transition-colors">{t("nav.products")}</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">{t("nav.about")}</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">{t("nav.contact")}</Link></li>
              <li><Link to="/consumers" className="hover:text-primary transition-colors">{t("nav.consumers")}</Link></li>
            </ul>
            <div className="mt-6">
              <LanguageSwitcher />
            </div>
          </div>

          <div>
            <h4 className="text-xs tracking-[0.2em] text-primary uppercase">
              {t("footer.contactHeading")}
            </h4>
            <address className="not-italic mt-4 space-y-1 text-sm text-foreground">
              <div>Kastanjelaan 33</div>
              <div>2061ES Bloemendaal</div>
              <div>Netherlands</div>
              <div className="pt-2">
                <a href="tel:+31235264872" className="hover:text-primary transition-colors">
                  +31 (0)23 5264872
                </a>
              </div>
              <div>
                <a
                  href="mailto:info@beautycareinternational.com"
                  className="hover:text-primary transition-colors"
                >
                  info@beautycareinternational.com
                </a>
              </div>
            </address>
          </div>
        </div>

        <div className="mt-16 border-t border-border pt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {t("brand")}. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
}
