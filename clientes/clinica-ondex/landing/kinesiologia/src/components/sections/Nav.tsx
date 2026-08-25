import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";


const URL_METODO = "https://metodoondex.clinicaondex.cl/";

/**
 * Los links a la landing hermana arrastran los parámetros de la URL actual
 * (fbclid, gclid, utm_*). Sin esto, alguien que llega por un anuncio a una
 * landing, cruza a la otra y convierte ahí, queda sin atribución: ni Meta ni
 * Google pueden saber de qué anuncio vino.
 */
function conAtribucion(href: string): string {
  if (!href.startsWith("http") || typeof window === "undefined") return href;
  const query = window.location.search;
  if (!query) return href;
  return href + (href.includes("?") ? "&" : "?") + query.slice(1);
}

const NAV_ITEMS = [
  { label: "Ondas de choque", href: URL_METODO },
  { label: "Kinesiología", href: "#kinesiologia" },   // esta misma página
];

export function Nav() {
  const [cursor, setCursor] = useState({ left: 0, width: 0, opacity: 0 });
  const [mobileOpen, setMobileOpen] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const moveCursor = (el: HTMLElement) => {
    setCursor({ left: el.offsetLeft, width: el.offsetWidth, opacity: 1 });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex flex-col items-center px-4 pt-4">
      <div className="flex w-fit items-center gap-2 rounded-full border border-border bg-white/80 py-2 pr-2 pl-4 shadow-sm backdrop-blur-md md:gap-9">
        <a href="#hero" aria-label="Volver arriba" className="block shrink-0">
          <img src="/logos/ondex-logo.png" alt="Clínica Ondex" className="h-6 w-auto" />
        </a>

        <ul
          ref={listRef}
          onMouseLeave={() => setCursor((c) => ({ ...c, opacity: 0 }))}
          className="relative hidden items-center md:flex"
        >
          <motion.li
            animate={cursor}
            transition={{ type: "spring", stiffness: 400, damping: 32 }}
            className="absolute inset-y-0 z-0 rounded-full bg-muted"
          />
          {NAV_ITEMS.map((item) => (
            <li
              key={item.label}
              className="relative z-10"
              onMouseEnter={(e) => moveCursor(e.currentTarget)}
            >
              <a
                href={conAtribucion(item.href)}
                className="block rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Menú mobile: los links de arriba se ocultan en pantallas chicas
            (no entran en la píldora) — este botón los deja disponibles sin
            tocar el CTA principal, que sigue visible siempre. */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileOpen}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <GradientButton size="xs" className="shrink-0 px-4 py-1.5 text-xs md:px-5 md:py-2 md:text-sm" asChild>
          <a href="#formulario">Quiero mi evaluación</a>
        </GradientButton>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mt-2 flex w-[calc(100%-2rem)] max-w-xs flex-col gap-1 rounded-2xl border border-border bg-white/95 p-2 shadow-lg backdrop-blur-md md:hidden"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={conAtribucion(item.href)}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                {item.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
