import { useRef, useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ArrowLeft, CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { GradientButton } from "@/components/ui/gradient-button";
import { dispararPixel, enviarLead, urlWhatsApp } from "@/lib/leads";

const gradientText =
  "bg-[linear-gradient(to_top_right,#12246b_0%,var(--brand)_35%,var(--brand)_65%,#12246b_100%)] bg-clip-text text-transparent";

// lucide-react ya no incluye el ícono de Instagram (es una marca registrada) — se dibuja a mano.
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

interface FormState {
  nombre: string;
  whatsapp: string;
  dolor: string;
  tiempo: string;
  /** Trampa anti-spam: invisible para una persona, los bots la llenan. */
  empresa: string;
}

const emptyForm: FormState = {
  nombre: "",
  whatsapp: "",
  dolor: "",
  tiempo: "",
  empresa: "",
};

const inputClass =
  "w-full rounded-lg border border-border bg-white px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/60 focus:border-brand focus:ring-1 focus:ring-brand focus:outline-none";

export function Formulario() {
  const reduceMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [paso, setPaso] = useState<1 | 2>(1);
  const [submitted, setSubmitted] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nombreEnviado, setNombreEnviado] = useState("");

  // Evita reenviar la captura parcial si la persona vuelve atrás y avanza de nuevo.
  const parcialEnviado = useRef(false);

  const waDirecto = urlWhatsApp();
  const waTrasEnvio = urlWhatsApp(nombreEnviado);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: reduceMotion
        ? { duration: 0 }
        : { staggerChildren: 0.15, delayChildren: 0.05 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0 : 0.5, ease: "easeOut" },
    },
  };

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [field]: e.target.value }));

  /**
   * Paso 1 → 2. Avanza de inmediato y manda la captura parcial en segundo plano:
   * nadie tiene que esperar una llamada de red para pasar de pantalla.
   *
   * Esta captura es la que rescata a quien abandona el paso 2. Con nombre y
   * WhatsApp, Heat ya puede empezar a conversar; el resto lo pregunta en el chat.
   */
  const handlePaso1 = (e: React.FormEvent) => {
    e.preventDefault();

    // Si la trampa viene llena es un bot: se finge éxito y no se envía nada.
    if (form.empresa.trim()) {
      setSubmitted(true);
      setForm(emptyForm);
      return;
    }

    setPaso(2);

    if (!parcialEnviado.current) {
      parcialEnviado.current = true;
      void enviarLead(
        { nombre: form.nombre, whatsapp: form.whatsapp },
        "parcial",
      ).then((resultado) => {
        if (resultado.ok) dispararPixel("parcial", resultado.eventId);
        else console.error("[formulario] captura parcial fallida:", resultado.error);
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (enviando) return;

    setEnviando(true);
    setError(null);

    const resultado = await enviarLead(form, "completo");

    if (resultado.ok) {
      dispararPixel("completo", resultado.eventId);
      setNombreEnviado(form.nombre.trim());
      setSubmitted(true);
      setForm(emptyForm);
    } else {
      setError(
        "No pudimos enviar tus datos. Escríbenos por WhatsApp y te atendemos al tiro.",
      );
      console.error("[formulario] envío fallido:", resultado.error);
    }

    setEnviando(false);
  };

  return (
    <section id="formulario" className="w-full scroll-mt-24 bg-background py-16 sm:py-24">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto max-w-6xl px-4"
      >
        <motion.div variants={itemVariants} className="mb-4 text-center">
          <span className="inline-flex items-center rounded-full border border-white/50 bg-white/40 px-5 py-2 text-base font-medium text-muted-foreground shadow-sm backdrop-blur-md">
            Ahora que sabes cómo reactivar tu rutina
          </span>
        </motion.div>

        <motion.h2
          variants={itemVariants}
          className="font-heading mx-auto max-w-2xl text-center text-3xl font-black tracking-tight text-[#2e323c] sm:text-4xl"
        >
          Tu rehabilitación{" "}
          <span className={gradientText}>empieza aquí.</span>
        </motion.h2>

        <motion.div
          variants={itemVariants}
          className="mx-auto mt-12 flex max-w-5xl flex-col overflow-hidden rounded-3xl border border-border shadow-xl md:flex-row"
        >
          <div className="relative min-h-[16rem] w-full md:min-h-[32rem] md:w-1/2">
            <img
              src="/foto-evaluacion.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>

          <div className="flex w-full flex-col justify-center bg-white p-8 md:w-1/2 md:p-12">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
                className="flex flex-1 flex-col items-center justify-center gap-4 py-12 text-center"
              >
                <CheckCircle2 className="h-12 w-12 text-brand" />
                <p className="font-heading text-xl font-black tracking-tight text-[#2e323c]">
                  ¡Listo!
                </p>
                <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                  Un agente de Ondex se va a contactar contigo dentro de los
                  próximos 5 minutos por WhatsApp para guiarte y agendar tu
                  evaluación.
                </p>
                {waTrasEnvio && (
                  <GradientButton size="sm" className="mt-2" asChild>
                    <a href={waTrasEnvio} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-5 w-5" />
                      Hablar ahora por WhatsApp
                    </a>
                  </GradientButton>
                )}
              </motion.div>
            ) : (
              <>
                <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                  Completa el formulario y uno de nuestros agentes se pondrá
                  en contacto contigo dentro de los próximos 5 minutos por
                  WhatsApp para guiarte y agendar tu evaluación.
                </p>

                <div className="mt-6 flex items-center gap-3">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                    <motion.div
                      className="h-full rounded-full bg-brand"
                      initial={false}
                      animate={{ width: paso === 1 ? "50%" : "100%" }}
                      transition={{ duration: reduceMotion ? 0 : 0.35, ease: "easeOut" }}
                    />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">
                    Paso {paso} de 2
                  </span>
                </div>

                {paso === 1 ? (
                  <motion.form
                    key="paso-1"
                    initial={{ opacity: 0, x: reduceMotion ? 0 : 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
                    onSubmit={handlePaso1}
                    className="mt-6 flex flex-col gap-4"
                  >
                    <div>
                      <label
                        htmlFor="nombre"
                        className="mb-1.5 block text-sm font-medium text-foreground"
                      >
                        Nombre
                      </label>
                      <input
                        id="nombre"
                        type="text"
                        required
                        value={form.nombre}
                        onChange={handleChange("nombre")}
                        className={inputClass}
                        placeholder="Tu nombre"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="whatsapp"
                        className="mb-1.5 block text-sm font-medium text-foreground"
                      >
                        WhatsApp
                      </label>
                      <input
                        id="whatsapp"
                        type="tel"
                        required
                        minLength={8}
                        value={form.whatsapp}
                        onChange={handleChange("whatsapp")}
                        className={inputClass}
                        placeholder="+56 9 1234 5678"
                      />
                    </div>

                    {/* Trampa anti-spam: fuera de pantalla y fuera del tab. */}
                    <div
                      aria-hidden="true"
                      style={{ position: "absolute", left: "-9999px" }}
                    >
                      <label htmlFor="empresa">Empresa</label>
                      <input
                        id="empresa"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={form.empresa}
                        onChange={handleChange("empresa")}
                      />
                    </div>

                    <GradientButton type="submit" size="sm" className="mt-2 w-full">
                      Continuar
                    </GradientButton>
                  </motion.form>
                ) : (
                  <motion.form
                    key="paso-2"
                    initial={{ opacity: 0, x: reduceMotion ? 0 : 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
                    onSubmit={handleSubmit}
                    className="mt-6 flex flex-col gap-4"
                  >
                    <div>
                      <label
                        htmlFor="dolor"
                        className="mb-1.5 block text-sm font-medium text-foreground"
                      >
                        ¿Dónde sientes el dolor o la molestia?
                      </label>
                      <input
                        id="dolor"
                        type="text"
                        required
                        value={form.dolor}
                        onChange={handleChange("dolor")}
                        className={inputClass}
                        placeholder="Ej: rodilla, hombro, espalda"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="tiempo"
                        className="mb-1.5 block text-sm font-medium text-foreground"
                      >
                        ¿Hace cuánto tiempo?
                      </label>
                      <input
                        id="tiempo"
                        type="text"
                        required
                        value={form.tiempo}
                        onChange={handleChange("tiempo")}
                        className={inputClass}
                        placeholder="Ej: 3 meses"
                      />
                    </div>

                    {error && (
                      <p
                        role="alert"
                        className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700"
                      >
                        {error}
                      </p>
                    )}

                    <GradientButton
                      type="submit"
                      size="sm"
                      className="mt-2 w-full"
                      disabled={enviando}
                    >
                      {enviando ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Enviando…
                        </>
                      ) : (
                        "Enviar"
                      )}
                    </GradientButton>

                    <button
                      type="button"
                      onClick={() => setPaso(1)}
                      disabled={enviando}
                      className="mx-auto inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Volver
                    </button>
                  </motion.form>
                )}
              </>
            )}

            <div className="mt-10 border-t border-border pt-8 text-center">
              <p className="mb-4 text-sm text-muted-foreground">
                ¿Prefieres escribirnos directo?
              </p>
              <div className="flex flex-col items-center gap-3">
                {waDirecto && (
                  <GradientButton variant="light" className="mx-auto" asChild>
                    <a href={waDirecto} target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-5 w-5" />
                      Hablar por WhatsApp
                    </a>
                  </GradientButton>
                )}
                <GradientButton variant="light" className="mx-auto" asChild>
                  <a
                    href="https://www.instagram.com/clinicaondex"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon className="h-5 w-5" />
                    Ver en Instagram
                  </a>
                </GradientButton>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
