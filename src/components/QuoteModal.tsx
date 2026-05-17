import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export function QuoteModal({
  open,
  onClose,
  productName,
}: {
  open: boolean;
  onClose: () => void;
  productName?: string;
}) {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (open) setSent(false);
  }, [open]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Quote request — ${productName ?? ""}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nCompany: ${data.get("company")}\nEmail: ${data.get("email")}\nProduct: ${data.get("product")}\n\nMessage:\n${data.get("message")}`,
    );
    window.location.href = `mailto:info@beautycareinternational.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-50 backdrop-blur-md"
            style={{ backgroundColor: "rgba(26,26,26,0.35)" }}
          />
          <motion.div
            initial={isDesktop ? { opacity: 0, scale: 0.96 } : { y: "100%" }}
            animate={isDesktop ? { opacity: 1, scale: 1 } : { y: 0 }}
            exit={isDesktop ? { opacity: 0, scale: 0.96 } : { y: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed z-50 bg-surface ${
              isDesktop
                ? "left-1/2 top-1/2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2"
                : "inset-x-0 bottom-0 max-h-[90vh] overflow-y-auto"
            }`}
          >
            <div className="p-8 md:p-10">
              <div className="flex items-start justify-between">
                <h3 className="font-display text-3xl">{t("quote.title")}</h3>
                <button
                  onClick={onClose}
                  className="text-2xl text-muted-foreground hover:text-foreground"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {sent ? (
                <p className="mt-8 text-sm text-foreground">{t("quote.success")}</p>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <Field label={t("contact.name")} name="name" required />
                  <Field label={t("contact.company")} name="company" required />
                  <Field label={t("contact.email")} name="email" type="email" required />
                  <Field
                    label={t("quote.product")}
                    name="product"
                    defaultValue={productName}
                    readOnly
                  />
                  <Field label={t("contact.message")} name="message" textarea />
                  <button
                    type="submit"
                    className="w-full bg-primary px-6 py-3 text-sm tracking-wide text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {t("quote.submit")}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  defaultValue,
  readOnly,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  defaultValue?: string;
  readOnly?: boolean;
}) {
  const cls =
    "w-full border-b border-border bg-transparent py-2 text-sm focus:border-primary focus:outline-none transition-colors";
  return (
    <label className="block">
      <span className="text-xs tracking-[0.15em] text-muted-foreground uppercase">
        {label}
      </span>
      {textarea ? (
        <textarea name={name} required={required} rows={4} className={cls + " resize-none mt-1"} />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          defaultValue={defaultValue}
          readOnly={readOnly}
          className={cls + " mt-1"}
        />
      )}
    </label>
  );
}
