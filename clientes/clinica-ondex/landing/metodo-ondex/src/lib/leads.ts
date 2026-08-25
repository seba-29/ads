// Envío de los leads del formulario a GoHighLevel y disparo de los eventos de Meta.
//
// El formulario es propio (no un embed de GHL) para poder disparar el píxel en el
// momento exacto del envío y mandarle a GHL el `event_id` que deduplica ese evento
// contra el que la API de Conversiones envía después desde el CRM. Con un iframe
// de GHL esa pareja no se puede armar.

export interface LeadPayload {
  nombre: string;
  whatsapp: string;
  /** Sólo viene en la captura completa; en la parcial todavía no se preguntó. */
  dolor?: string;
  tiempo?: string;
}

/**
 * `parcial` = completó el paso 1 (nombre + WhatsApp) y todavía no terminó.
 * `completo` = envió el formulario entero.
 *
 * Los dos crean/actualizan el mismo contacto en GHL (hace upsert por teléfono),
 * así que quien abandona el paso 2 igual queda en el CRM y Heat lo puede tomar.
 */
export type TipoLead = "parcial" | "completo";

export type ResultadoEnvio =
  | { ok: true; eventId: string; guardadoEnCrm: boolean }
  | { ok: false; error: string };

const WEBHOOK_URL = import.meta.env.VITE_GHL_WEBHOOK_URL;
const WHATSAPP = import.meta.env.VITE_WHATSAPP_NUMERO;
// Dos formas del mismo dato, a propósito:
//   ORIGEN        -> identificador sin tildes ni espacios, para armar la etiqueta
//   ORIGEN_NOMBRE -> como lo lee una persona en la ficha del contacto
const ORIGEN = import.meta.env.VITE_LANDING_ORIGEN ?? "desconocido";
const ORIGEN_NOMBRE = import.meta.env.VITE_LANDING_NOMBRE ?? ORIGEN;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

function leerCookie(nombre: string): string | undefined {
  const prefijo = `${nombre}=`;
  for (const trozo of document.cookie.split("; ")) {
    if (trozo.startsWith(prefijo)) {
      return decodeURIComponent(trozo.slice(prefijo.length));
    }
  }
  return undefined;
}

function nuevoEventId(): string {
  // randomUUID sólo existe en contexto seguro (https). El fallback cubre
  // pruebas locales por http en una IP de red.
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `evt-${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
}

/**
 * Meta necesita `fbc` para atribuirle la conversión al anuncio. La cookie `_fbc`
 * la escribe el píxel, pero puede no existir todavía en el primer pageview: si en
 * la URL viene `fbclid` y la cookie aún no está, se arma con el formato de Meta.
 */
function obtenerFbc(params: URLSearchParams): string | undefined {
  const cookie = leerCookie("_fbc");
  if (cookie) return cookie;
  const fbclid = params.get("fbclid");
  return fbclid ? `fb.1.${Date.now()}.${fbclid}` : undefined;
}

function capturarAtribucion() {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
    utm_term: params.get("utm_term") ?? undefined,
    gclid: params.get("gclid") ?? undefined,
    fbclid: params.get("fbclid") ?? undefined,
    fbp: leerCookie("_fbp"),
    fbc: obtenerFbc(params),
    landing_url: window.location.href,
    referrer: document.referrer || undefined,
  };
}

/** Normaliza a E.164 chileno: +569XXXXXXXX. */
export function normalizarTelefono(valor: string): string {
  const digitos = valor.replace(/\D/g, "");
  if (digitos.startsWith("56")) return `+${digitos}`;
  if (digitos.length === 9 && digitos.startsWith("9")) return `+56${digitos}`;
  if (digitos.length === 8) return `+569${digitos}`;
  return `+${digitos}`;
}

export async function enviarLead(
  datos: LeadPayload,
  tipo: TipoLead,
): Promise<ResultadoEnvio> {
  const eventId = nuevoEventId();

  // Modo WhatsApp: si todavía no hay webhook configurado, la landing sigue
  // funcionando. El evento del píxel se dispara igual y la persona pasa a
  // hablar con el agente. El lead no queda en el CRM — es un estado
  // transitorio para poder publicar antes de tener el workflow, no el destino.
  if (!WEBHOOK_URL) {
    console.warn(
      "[leads] VITE_GHL_WEBHOOK_URL sin configurar — modo WhatsApp: este lead NO llega al CRM.",
    );
    return { ok: true, eventId, guardadoEnCrm: false };
  }

  const cuerpo = {
    evento: tipo === "parcial" ? "lead_parcial" : "lead_completo",
    first_name: datos.nombre.trim(),
    phone: normalizarTelefono(datos.whatsapp),
    zona_dolor: datos.dolor?.trim() || undefined,
    tiempo_dolor: datos.tiempo?.trim() || undefined,
    origen_landing: ORIGEN,
    origen_landing_nombre: ORIGEN_NOMBRE,
    event_id: eventId,
    ...capturarAtribucion(),
  };

  const controlador = new AbortController();
  const timeout = setTimeout(() => controlador.abort(), 10_000);

  try {
    const respuesta = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cuerpo),
      signal: controlador.signal,
    });
    if (!respuesta.ok) {
      return { ok: false, error: `GHL respondió ${respuesta.status}.` };
    }
    return { ok: true, eventId, guardadoEnCrm: true };
  } catch (e) {
    const abortado = e instanceof DOMException && e.name === "AbortError";
    return {
      ok: false,
      error: abortado ? "La conexión tardó demasiado." : "No se pudo conectar con GHL.",
    };
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Dispara el evento del píxel. El `eventID` tiene que ser el mismo que se le mandó
 * a GHL: así Meta reconoce el evento del navegador y el de la API de Conversiones
 * como uno solo y no lo cuenta dos veces.
 *
 * `Lead_Parcial` va como evento personalizado a propósito: sirve para armar públicos
 * de retargeting y para reportería, pero NUNCA se optimiza contra él. Si la campaña
 * optimizara hacia el paso 1, Meta buscaría gente que llena medio formulario y se va.
 */
export function dispararPixel(tipo: TipoLead, eventId: string): void {
  if (tipo === "parcial") {
    window.fbq?.("trackCustom", "Lead_Parcial", {}, { eventID: eventId });
  } else {
    window.fbq?.("track", "Lead", {}, { eventID: eventId });
  }
}

/** Link de WhatsApp con mensaje prellenado. `undefined` si no hay número configurado. */
export function urlWhatsApp(nombre?: string): string | undefined {
  if (!WHATSAPP) return undefined;
  const numero = WHATSAPP.replace(/\D/g, "");
  if (!numero) return undefined;
  const texto = nombre
    ? `Hola, soy ${nombre}. Acabo de completar el formulario en la web.`
    : "Hola, quiero información sobre una evaluación.";
  return `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
}
