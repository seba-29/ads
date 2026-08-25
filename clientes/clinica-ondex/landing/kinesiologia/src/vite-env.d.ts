/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** URL del Inbound Webhook del workflow de GoHighLevel. */
  readonly VITE_GHL_WEBHOOK_URL?: string;
  /** Número de WhatsApp de la clínica, formato internacional (+56912345678). */
  readonly VITE_WHATSAPP_NUMERO?: string;
  /** Identificador de la landing, sin tildes ni espacios. Arma la etiqueta. */
  readonly VITE_LANDING_ORIGEN?: string;
  /** Nombre de la landing como lo lee una persona en la ficha del contacto. */
  readonly VITE_LANDING_NOMBRE?: string;
  /** ID del píxel de Meta. Si va vacío, el píxel no se carga. */
  readonly VITE_META_PIXEL_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
