import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FadeUp } from "@/components/FadeUp";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Atelier BCI" },
      { name: "description", content: "Get in touch with Atelier BCI in Bloemendaal, the Netherlands." },
      { property: "og:title", content: "Contact — Atelier BCI" },
      { property: "og:description", content: "Trade inquiries, product info, private label." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(
      `${data.get("subject") ?? "Inquiry"} — ${data.get("name") ?? ""}`,
    );
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nCompany: ${data.get("company")}\nCountry: ${data.get("country")}\nEmail: ${data.get("email")}\n\nMessage:\n${data.get("message")}`,
    );
    window.location.href = `mailto:info@beautycareinternational.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <section className="bg-background pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="mx-auto max-w-7xl px-6">
        <FadeUp>
          <h1 className="font-display text-[clamp(2.75rem,6vw,5rem)] leading-[1.05] tracking-tight">
            {t("contact.title")}
          </h1>
        </FadeUp>

        <div className="mt-16 grid gap-16 md:grid-cols-2 md:gap-20">
          <div>
            <FadeUp>
              <h2 className="font-display text-2xl">{t("brand")}</h2>
              <address className="not-italic mt-5 space-y-1 text-base text-foreground">
                <div>Kastanjelaan 33</div>
                <div>2061ES Bloemendaal</div>
                <div>Netherlands</div>
              </address>
              <div className="mt-5 space-y-1 text-base">
                <a href="tel:+31235264872" className="block hover:text-primary transition-colors">
                  +31 (0)23 5264872
                </a>
                <a
                  href="mailto:info@beautycareinternational.com"
                  className="block hover:text-primary transition-colors"
                >
                  info@beautycareinternational.com
                </a>
              </div>
              <p className="mt-5 text-sm text-muted-foreground">{t("contact.hours")}</p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <div className="mt-10 aspect-[4/3] w-full overflow-hidden border border-border">
                <iframe
                  title="Map — Kastanjelaan 33, Bloemendaal"
                  src="https://maps.google.com/maps?q=Kastanjelaan%2033%2C%202061ES%20Bloemendaal%2C%20Netherlands&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  className="h-full w-full"
                  loading="lazy"
                />
              </div>
            </FadeUp>

            <p className="mt-8 text-sm italic text-muted-foreground">
              {t("contact.tradeNote")}{" "}
              <Link to="/consumers" className="underline hover:text-primary">
                /consumers
              </Link>
            </p>
          </div>

          <div>
            <FadeUp>
              <h2 className="font-display text-2xl">{t("contact.formTitle")}</h2>
            </FadeUp>
            {sent ? (
              <FadeUp>
                <p className="mt-8 text-base text-foreground">{t("contact.success")}</p>
              </FadeUp>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label={t("contact.name")} name="name" required />
                  <Field label={t("contact.company")} name="company" required />
                  <Field label={t("contact.country")} name="country" />
                  <Field label={t("contact.email")} name="email" type="email" required />
                </div>
                <label className="block">
                  <span className="text-xs tracking-[0.15em] text-muted-foreground uppercase">
                    {t("contact.subject")}
                  </span>
                  <select
                    name="subject"
                    className="mt-1 w-full border-b border-border bg-transparent py-2 text-sm focus:border-primary focus:outline-none"
                  >
                    <option>{t("contact.subjects.general")}</option>
                    <option>{t("contact.subjects.product")}</option>
                    <option>{t("contact.subjects.quote")}</option>
                    <option>{t("contact.subjects.private")}</option>
                    <option>{t("contact.subjects.other")}</option>
                  </select>
                </label>
                <Field label={t("contact.message")} name="message" textarea />
                <button
                  type="submit"
                  className="bg-primary px-8 py-3.5 text-sm tracking-wide text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  {t("contact.submit")}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const cls =
    "w-full border-b border-border bg-transparent py-2 text-sm focus:border-primary focus:outline-none transition-colors mt-1";
  return (
    <label className="block">
      <span className="text-xs tracking-[0.15em] text-muted-foreground uppercase">
        {label}
      </span>
      {textarea ? (
        <textarea name={name} required={required} rows={5} className={cls + " resize-none"} />
      ) : (
        <input name={name} type={type} required={required} className={cls} />
      )}
    </label>
  );
}
