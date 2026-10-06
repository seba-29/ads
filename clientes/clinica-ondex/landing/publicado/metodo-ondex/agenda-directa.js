/* ─────────────────────────────────────────────────────────────────────────────
   CLÍNICA ONDEX · KINESIOLOGÍA — agendamiento directo (muestra, 29-09-2026)
   ─────────────────────────────────────────────────────────────────────────────

   QUÉ HACE: saca la sección del formulario (#formulario) y la reemplaza por dos
   nuevas — reservar hora en la agenda de Medilink, y WhatsApp / llamada.

   ⚠️ ESTO ES UN PARCHE PARA LA MUESTRA, NO LA IMPLEMENTACIÓN FINAL.
   El sitio que se publica está compilado y no tenemos el código fuente acá, así
   que en vez de editar un bundle minificado de 400 KB —que el próximo build
   borraría— el cambio se hace al vuelo, desde este archivo suelto. Cuando esté
   el fuente, esto se borra y las dos secciones se escriben ahí, con el mismo
   HTML y las mismas clases que hay más abajo.
   Para revertir: borra la línea que carga este script en index.html. Nada más.

   🔴 POR QUÉ UN BOTÓN Y NO UN CALENDARIO EMBEBIDO: la agenda de Medilink
   responde con `X-Frame-Options: SAMEORIGIN`, o sea que solo su propio dominio
   puede mostrarla dentro de un iframe. Desde clinicaondex.cl se ve un recuadro
   EN BLANCO, sin ningún error visible — que es lo peor, porque parece que no
   cargó y no que está bloqueado. Verificado contra el servidor el 29-09-2026.

   EL LINK VA LIMPIO, sin `id_sucursal` ni `id_especialidad`: cada parámetro da
   un paso del flujo por contestado y lo salta. Así, la agenda abre en el paso 1
   ("Selecciona la sucursal") y el paciente elige sede, después especialidad, y
   recién ahí ve las horas. El detalle está en el comentario de `AGENDA`.
   ───────────────────────────────────────────────────────────────────────────── */
(function () {
  "use strict";

  // EL CALENDARIO VA ADENTRO DEL LANDING. Esto es lo que antes no se podia.
  //
  // La agenda de Medilink manda `X-Frame-Options: SAMEORIGIN`: solo su propio dominio puede
  // mostrarla en un iframe. Desde aca se veia un recuadro EN BLANCO, sin error visible.
  // Esta pagina es NUESTRA, asi que la cabecera la ponemos nosotros y se puede embeber.
  //
  // Y no es solo comodidad: reserva contra el mismo Medilink, pero ofreciendo lo que ofrece la
  // asistente por WhatsApp, que es mas de lo que muestra el portal publico de Medilink (ese
  // filtra por un permiso por ficha que en esta clinica quedo incoherente y no es editable).
  var ORIGEN = "https://agentes.heatchile.com";
  // `origen=kine` dice de qué campaña vino la persona. NO es la etiqueta: la plataforma traduce
  // esa clave contra una lista blanca del cliente, así que un enlace con un origen inventado no
  // pone nada. Sin esto, una reserva de kinesiología y una de ondas de choque se ven idénticas
  // en el CRM y la campaña no se puede medir.
  // 🔴 LOS PARAMETROS DEL ANUNCIO VIAJAN DESDE ESTA URL HASTA LA RESERVA.
  //
  // Meta los agrega al link del anuncio, así que llegan en la URL de esta página. El formulario
  // que sacamos los capturaba y por ahí funcionaba el cruce anuncio ↔ etapa del panel de ads. Si
  // no se los pasamos al calendario, esos agendamientos caen en "sin anuncio identificado" y el
  // reporte le dice al cliente que su mejor canal no existe — ya pasó en septiembre con esta
  // misma landing: trajo 71 oportunidades y 12 agendamientos y aparecía en cero.
  //
  // ⚠️ `utm_term` es el CONJUNTO y `utm_content` el ANUNCIO. `utm_medium` viene con el literal
  // "paid" y no sirve para atribuir; no se manda.
  function paramsDelAnuncio() {
    var busca = window.location.search || "";
    var quiero = ["utm_campaign", "utm_term", "utm_content", "utm_source"];
    var out = [];
    for (var i = 0; i < quiero.length; i++) {
      var m = busca.match(new RegExp("[?&]" + quiero[i] + "=([^&]+)"));
      if (m && m[1]) out.push(quiero[i] + "=" + m[1]);
    }
    return out.length ? "&" + out.join("&") : "";
  }

  var RESERVA = ORIGEN + "/reserva/clinica-ondex?origen=ondas" + paramsDelAnuncio();

  // Respaldo: si el iframe no carga, el boton de siempre. Ver `caerAlBoton`.
  var AGENDA =
    "https://9ea1a6b3595bdce574791fa8d16a5b51254732d8.agenda.softwaremedilink.com" +
    "/agenda/sucursal?modalidad=1";

  // El WhatsApp donde contesta María Paz. El texto predefinido no es adorno: le
  // dice de qué landing viene la persona, así que la atribución de los leads que
  // entran por acá sale gratis, en el primer mensaje.
  var WA =
    "https://wa.me/56952296611?text=" +
    encodeURIComponent(
      "Hola, vengo del sitio del Método Ondex y tengo una duda antes de agendar.",
    );
  var TEL = "+56951776311"; // línea de la clínica

  // ── MEDICIÓN EN META ───────────────────────────────────────────────────────
  //
  // 🔴 SIN ESTO EL LANDING NO LE MANDA NINGÚN "LEAD" A META. Lo mandaba el formulario al
  // enviarse, y este archivo lo reemplaza por la agenda + WhatsApp + llamada, que no medían nada.
  // Medido el 01-10-2026: visitas sí, leads cero desde las 13:00. La campaña optimiza por Lead.
  //
  // Lead = cualquiera de las tres formas de dar la mano: reservar, escribir o llamar. Va con
  // `content_name` para separarlas en el Administrador de eventos. WhatsApp y llamada mandan
  // además `Contact`. El AGENDAMIENTO real (Schedule) NO se manda acá: lo manda el CRM cuando la
  // oportunidad entra a Agendados, y mandarlo de los dos lados lo contaría doble.
  //
  // Se dispara desde el landing y no desde la agenda porque la agenda vive en un iframe de otro
  // dominio, donde el navegador bloquea las cookies del anuncio: sin ellas Meta no puede ligar el
  // evento al anuncio que trajo a la persona.
  //
  // Una vez por tipo y por visita: el que toca WhatsApp tres veces es una persona, no tres leads.
  var medidos = {};
  function medir(tipo, eventId) {
    // Va antes del chequeo del píxel: si un bloqueador saca a Meta, la grabación igual se marca.
    marcar("lead_" + tipo);
    if (typeof window.fbq !== "function" || medidos[tipo]) return;
    medidos[tipo] = true;
    var id = eventId || tipo + "-" + Date.now() + "-" + Math.random().toString(36).slice(2);
    window.fbq("track", "Lead", { content_name: tipo }, { eventID: id });
    if (tipo === "whatsapp" || tipo === "llamada") {
      window.fbq("track", "Contact", { content_name: tipo }, { eventID: "contacto-" + id });
    }
  }

  // ── MEDICIÓN EN CLARITY ────────────────────────────────────────────────────
  //
  // Eventos para filtrar grabaciones: quién reservó, quién escribió, quién llamó, en qué paso de
  // la agenda se fue y a quién no le cargó. Los pasos de la agenda (`agenda_sede`,
  // `agenda_horas`, `agenda_datos`) los avisa ella misma por mensaje: Clarity no puede grabar
  // adentro de un iframe de otro dominio, así que sin ese aviso solo se vería que la persona
  // llegó a la agenda. Una vez por evento y por visita, igual que el píxel.
  var marcados = {};
  function marcar(evento) {
    if (typeof window.clarity !== "function" || marcados[evento]) return;
    marcados[evento] = true;
    window.clarity("event", evento);
  }

  // ── DE QUÉ ANUNCIO VIENE EL QUE ESCRIBE POR WHATSAPP ───────────────────────
  //
  // El mensaje de WhatsApp NO lleva nada agregado: es el saludo de siempre. Lo que se anota es el
  // CLIC: esta landing, los parámetros del anuncio de esta visita y si venía de un anuncio. Nada de
  // la persona. Cuando entra la conversación con este saludo, la plataforma la cruza con el clic de
  // esta landing de justo antes y el contacto queda con su campaña, conjunto y anuncio. Si no se
  // puede saber con certeza, queda "sin identificar": no se adivina.
  //
  // sendBeacon sobrevive a que se abra WhatsApp y, con texto plano, no pide permiso de CORS. Una
  // vez por visita, como el píxel. Si falla, el botón abre WhatsApp igual: esto nunca lo frena.
  var clicAvisado = false;
  function avisarClicWhatsapp() {
    if (clicAvisado) return;
    clicAvisado = true;
    try {
      var busca = window.location.search || "";
      var leer = function (clave) {
        var m = busca.match(new RegExp("[?&]" + clave + "=([^&]+)"));
        if (!m || !m[1]) return "";
        try { return decodeURIComponent(m[1].replace(/\+/g, " ")); } catch (_) { return ""; }
      };
      var utm = {};
      var claves = ["utm_campaign", "utm_term", "utm_content", "utm_source"];
      for (var i = 0; i < claves.length; i++) {
        var v = leer(claves[i]);
        if (v) utm[claves[i]] = v;
      }
      // Pagado = el link traía los parámetros del anuncio. `fbclid` NO cuenta: Facebook lo agrega
      // también a los links de publicaciones orgánicas.
      var pagado = Boolean(utm.utm_campaign || utm.utm_content || leer("utm_medium") === "paid");
      var cuerpo = JSON.stringify({ slug: "clinica-ondex", origen: "ondas", utm: utm, pagado: pagado });
      var url = ORIGEN + "/api/landing/clic";
      if (navigator.sendBeacon && navigator.sendBeacon(url, cuerpo)) return;
      fetch(url, { method: "POST", body: cuerpo, keepalive: true, mode: "no-cors", headers: { "Content-Type": "text/plain" } });
    } catch (_) {
      // Sin aviso, ese WhatsApp queda "sin identificar". El botón sigue funcionando.
    }
  }

  // Los botones se pintan después (ver `pintar`), así que se escucha en el documento.
  document.addEventListener(
    "click",
    function (e) {
      var a = e.target && e.target.closest ? e.target.closest("a.ox-btn") : null;
      if (!a) return;
      if (a.classList.contains("ox-wa")) {
        avisarClicWhatsapp();
        medir("whatsapp");
      }
      else if (a.classList.contains("ox-tel")) medir("llamada");
      // El botón de respaldo solo aparece si la agenda no cargó: es la única forma de reservar.
      else if (a.classList.contains("ox-brand")) medir("agenda_externa");
    },
    true,
  );

  var CSS = [
    "#agenda-ondex{width:100%;scroll-margin-top:6rem;background:var(--background,#fbfbfd);padding:4rem 0 0}",
    "@media(min-width:640px){#agenda-ondex{padding:6rem 0 0}}",
    "#contacto-ondex{width:100%;scroll-margin-top:6rem;background:var(--background,#fbfbfd);padding:3rem 0 4rem}",
    "@media(min-width:640px){#contacto-ondex{padding:3.5rem 0 6rem}}",
    ".ox-wrap{margin:0 auto;padding:0 1rem}",
    ".ox-marco{margin-top:2rem;border-radius:var(--radius,.75rem);border:1px solid rgba(0,0,0,.06);background:#fff;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.06)}",
    "#ox-iframe{display:block;width:100%;height:560px;border:0;transition:height .2s ease}",
    ".ox-cargando{padding:3rem 1rem;text-align:center;font-size:.875rem;color:var(--muted-foreground,#5b6270)}",
    ".ox-w-agenda{max-width:56rem}.ox-w-dudas{max-width:48rem}",
    ".ox-pill-wrap{margin-bottom:1rem;text-align:center}",
    ".ox-pill{display:inline-flex;align-items:center;border-radius:9999px;border:1px solid rgba(255,255,255,.5);background:rgba(255,255,255,.4);padding:.5rem 1.25rem;font-size:1rem;font-weight:500;color:var(--muted-foreground,#5b6270);box-shadow:0 1px 2px rgba(0,0,0,.05);backdrop-filter:blur(12px)}",
    ".ox-h2{font-family:'Archivo Variable',Archivo,system-ui,sans-serif;margin:0 auto;max-width:42rem;text-align:center;font-size:1.875rem;font-weight:900;letter-spacing:-.025em;color:#2e323c;line-height:1.15}",
    "@media(min-width:640px){.ox-h2{font-size:2.25rem}}",
    ".ox-grad{background:linear-gradient(to top right,#12246b 0%,var(--brand,#1d48f8) 35%,#5b82ff 100%);-webkit-background-clip:text;background-clip:text;color:transparent}",
    ".ox-bajada{margin:1rem auto 0;max-width:34rem;text-align:center;font-size:.875rem;color:var(--muted-foreground,#5b6270)}",
    ".ox-cta{margin-top:2.5rem;text-align:center}",
    ".ox-pie{margin:1rem auto 0;max-width:30rem;font-size:.8125rem;color:var(--muted-foreground,#5b6270)}",
    ".ox-btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;border-radius:9999px;font-weight:600;text-decoration:none;transition:opacity .15s,transform .15s}",
    ".ox-btn:hover{opacity:.92;transform:translateY(-1px)}",
    ".ox-btn svg{width:1.125rem;height:1.125rem;flex:none}",
    ".ox-brand{background:var(--brand,#1d48f8);color:#fff;font-size:1.0625rem;padding:1rem 2.25rem;box-shadow:0 8px 24px rgba(29,72,248,.28)}",
    ".ox-card{border-radius:.75rem;border:1px solid rgba(0,0,0,.05);background:#fff;padding:2rem;text-align:center;box-shadow:0 1px 3px rgba(0,0,0,.06)}",
    "@media(min-width:640px){.ox-card{padding:2.5rem}}",
    ".ox-h3{font-family:'Archivo Variable',Archivo,system-ui,sans-serif;margin:0;font-size:1.5rem;font-weight:900;letter-spacing:-.025em;color:#2e323c}",
    ".ox-botones{margin-top:1.5rem;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.75rem}",
    "@media(min-width:640px){.ox-botones{flex-direction:row}}",
    ".ox-botones .ox-btn{width:100%;font-size:1rem;padding:.875rem 1.75rem}",
    "@media(min-width:640px){.ox-botones .ox-btn{width:auto}}",
    ".ox-wa{background:#25d366;color:#fff}",
    ".ox-tel{background:#fff;color:#2e323c;border:1px solid rgba(0,0,0,.12)}",
  ].join("\n");

  var FLECHA =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
  var ICONO_WA =
    '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.76-1.66-2.06-.17-.3-.02-.46.13-.61.14-.14.3-.35.45-.53.15-.18.2-.3.3-.5.1-.2.05-.38-.02-.53-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.38-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.07-.13-.27-.2-.57-.35z"/><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.21-8.24 8.21z"/></svg>';
  var ICONO_TEL =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>';

  var HTML =
    '<section id="agenda-ondex">' +
    '<div class="ox-wrap ox-w-agenda">' +
    '<div class="ox-pill-wrap"><span class="ox-pill">Ahora que conoces el Método Ondex</span></div>' +
    '<h2 class="ox-h2">Reserva tu evaluación <span class="ox-grad">ahora mismo</span></h2>' +
    '<p class="ox-bajada">Elige la sede, el día y la hora que te acomoden. Reservas aquí mismo y te llega la confirmación al instante.</p>' +
    '<div class="ox-marco" id="ox-marco">' +
    '<div class="ox-cargando" id="ox-cargando">Cargando las horas disponibles…</div>' +
    '<iframe id="ox-iframe" title="Reserva de hora en Clínica Ondex" src="' + RESERVA + '" style="display:none"></iframe>' +
    "</div>" +
    '<div class="ox-cta" id="ox-respaldo" hidden>' +
    '<a class="ox-btn ox-brand" target="_blank" rel="noopener noreferrer" href="' + AGENDA + '">Ver horas disponibles ' + FLECHA + "</a>" +
    '<p class="ox-pie">Se abre nuestra agenda en una pestaña nueva. Eliges sede, día y hora, y listo.</p>' +
    "</div></div></section>" +
    '<section id="contacto-ondex">' +
    '<div class="ox-wrap ox-w-dudas"><div class="ox-card">' +
    '<h3 class="ox-h3">¿Todavía te quedan dudas?</h3>' +
    '<p class="ox-bajada" style="margin-top:.5rem">Escríbenos por WhatsApp o llámanos y te ayudamos a elegir la hora que te sirve.</p>' +
    '<div class="ox-botones">' +
    '<a class="ox-btn ox-wa" target="_blank" rel="noopener noreferrer" href="' + WA + '">' + ICONO_WA + " Escribir por WhatsApp</a>" +
    '<a class="ox-btn ox-tel" href="tel:' + TEL + '">' + ICONO_TEL + " Llamar a la clínica</a>" +
    "</div></div></div></section>";

  // ── PUENTE CON EL IFRAME ───────────────────────────────────────────────────
  //
  // 🔴 UN IFRAME BLOQUEADO NO AVISA NADA. No dispara `error`, y `load` puede dispararse igual
  // con la pantalla del navegador adentro. Desde afuera no hay forma de leer si cargó: es otro
  // dominio. Por eso la señal la manda la propia página (`listo`), y si no llega en 8 segundos
  // se asume que no se pudo y se muestra el botón de siempre.
  //
  // Esto no es defensivo de más: hoy el dominio de este landing tiene que estar autorizado en
  // la cabecera de la plataforma. Si el landing se publica en un dominio nuevo y nadie lo
  // agregó, sin este respaldo la sección queda en blanco y no se reserva nada.
  var listo = false;

  function caerAlBoton() {
    if (listo) return;
    marcar("agenda_no_cargo");
    var marco = document.getElementById("ox-marco");
    var respaldo = document.getElementById("ox-respaldo");
    if (marco) marco.remove();
    if (respaldo) respaldo.removeAttribute("hidden");
  }

  window.addEventListener("message", function (e) {
    // Solo le creemos a nuestra propia página.
    if (e.origin !== ORIGEN) return;
    var d = e.data;
    if (!d || d.tipo !== "heat-reserva") return;

    // La agenda confirma la reserva (solo manda un id al azar, nada del paciente).
    if (d.reservada) {
      medir("reserva", typeof d.eventId === "string" ? d.eventId : null);
      return;
    }

    // En qué paso va la persona adentro de la agenda (ver MEDICIÓN EN CLARITY). Solo llegan el
    // nombre del paso y la clave de la sede; igual se valida la forma antes de anotarlos.
    if (typeof d.paso === "string" && /^[a-z]{1,20}$/.test(d.paso)) {
      marcar("agenda_" + d.paso);
      if (typeof d.sede === "string" && /^[a-z0-9-]{1,40}$/.test(d.sede) && typeof window.clarity === "function") {
        window.clarity("set", "sede", d.sede);
      }
    }

    if (!listo) {
      listo = true;
      var cargando = document.getElementById("ox-cargando");
      if (cargando) cargando.remove();
      var f0 = document.getElementById("ox-iframe");
      if (f0) f0.style.display = "block";
    }
    // El alto lo manda ella en cada paso: el de sedes mide poco y el de horas mucho. Se acota
    // por si llega un valor absurdo, para no dejar un hueco de kilómetros en el landing.
    var f = document.getElementById("ox-iframe");
    if (f && typeof d.alto === "number" && d.alto > 0) {
      f.style.height = Math.max(420, Math.min(Math.round(d.alto) + 24, 4000)) + "px";
    }
  });

  function pintar() {
    var vieja = document.getElementById("formulario");
    if (!vieja || document.getElementById("agenda-ondex")) return !!document.getElementById("agenda-ondex");
    var estilo = document.createElement("style");
    estilo.id = "ox-estilos";
    estilo.textContent = CSS;
    document.head.appendChild(estilo);
    var caja = document.createElement("div");
    caja.innerHTML = HTML;
    while (caja.firstChild) vieja.parentNode.insertBefore(caja.firstChild, vieja);
    vieja.remove();
    // Los enlaces del menú que apuntaban al formulario ahora llevan a la agenda.
    var anclas = document.querySelectorAll('a[href="#formulario"], a[href$="/#formulario"]');
    for (var i = 0; i < anclas.length; i++) anclas[i].setAttribute("href", "#agenda-ondex");
    setTimeout(caerAlBoton, 8000);
    return true;
  }

  // La página la pinta React, así que #formulario no existe todavía cuando corre
  // esto. Se espera a que aparezca y recién ahí se reemplaza; el observer se
  // desconecta solo al primer éxito y tiene un corte a los 15 s para no quedar
  // escuchando el DOM para siempre si algún día la sección cambia de id.
  if (!pintar()) {
    var obs = new MutationObserver(function () {
      if (pintar()) obs.disconnect();
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(function () {
      obs.disconnect();
    }, 15000);
  }
})();
