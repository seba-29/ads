/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL del Inbound Webhook del workflow de GoHighLevel. */
  readonly VITE_GHL_WEBHOOK_URL?: string;
  /** Número de WhatsApp de la clínica, formato internacional (+56912345678). */
  readonly VITE_WHATSAPP_NUMERO?: string;
  /** Identifica de qué landing viene el lead: "kinesiologia" | "metodo". */
  readonly VITE_LANDING_ORIGEN?: string;
  /** ID del píxel de Meta. Si va vacío, el píxel no se carga. */
  readonly VITE_META_PIXEL_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
