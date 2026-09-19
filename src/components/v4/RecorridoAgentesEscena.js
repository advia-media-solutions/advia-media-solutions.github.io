/**
 * El anillo de agentes: la geometría y el reloj de la pieza.
 *
 * Aquí no hay React ni DOM. Solo el guion —dónde está cada agente, por qué
 * paradas pasa y cuándo aterriza cada bola— y las cuentas que traducen ese
 * guion a un instante concreto. El componente se limita a pintarlo.
 *
 * La pieza cuenta una cosa de principio a fin, y con UNA SOLA esfera: la que
 * está en la portada es la que se construye con los tres pasos, la que baja a
 * soltar su recorrido, y la que se queda como agente 1 cuando la cámara se
 * aleja y aparecen los otros cuatro. No hay relevo entre piezas ni fundido
 * entre dos objetos parecidos: es el mismo motor, la misma esfera, todo el rato.
 *
 * Por eso el orden importa. Se construye un agente; el agente sale a buscar;
 * lo que deja son paradas; y esas paradas se repiten entre agentes. Cuando
 * todos han soltado, las paradas compartidas pulsan. Ese pulso es el dato: ahí
 * es donde una marca puede ser la respuesta para varias personas a la vez.
 *
 * Las coordenadas son las del lienzo autor de 1920 x 1080, en píxeles y con el
 * origen en el centro del anillo. La cámara las recorre; el mundo no se mueve.
 */

/* ── El reloj ─────────────────────────────────────────────────────────────── */

/**
 * Cuándo empieza cada escena. La unidad son segundos del boceto, pero aquí no
 * corre ningún reloj: el scroll es el que se traduce a este eje (ver
 * Recorridos.jsx). Se mantienen los segundos porque son los tiempos con los que
 * se compuso la pieza, y las distancias entre ellos son el ritmo aprobado.
 *
 * Las tres primeras son los pasos de construcción; las cuatro siguientes, las
 * escenas del boceto, desplazadas para caber detrás.
 */
export const CUES = {
  Rol: 0,           // 01 · le damos un rol
  Herramientas: 3,  // 02 · le damos herramientas
  Construido: 6,    // 03 · recogemos el recorrido; la esfera ya está hecha
  Suelta: 9,        // empieza a soltar bolas
  Zoom: 12,         // la cámara se aleja
  Otros: 16,        // entran los otros cuatro agentes
  General: 23,      // plano general, con las coincidencias marcadas
};
/** Lo que dura la pieza entera. */
export const TOTAL = 27;

/**
 * Progreso del morph de la esfera (lo que el motor llama `progreso`): de la
 * forma primitiva de la portada a la esfera facetada entera. El 0.42 es la
 * clave intermedia del motor, así que el paso 02 cae exactamente en ella.
 */
export const morphEn = (T) => entre([CUES.Rol, CUES.Herramientas, CUES.Construido],
                                    [0, 0.42, 1], SUAVE.seno)(T);

/** En qué paso estamos. Los tres van en el mismo carril, uno por tramo. */
export function pasoEn(T) {
  if (T < CUES.Herramientas) return 0;
  if (T < CUES.Construido) return 1;
  return 2;
}

/** El T de cada paso: el instante en que su bloque de texto está centrado. */
export const PASOS_T = [CUES.Rol, CUES.Herramientas, CUES.Construido];

/**
 * Los hitos del relato, en orden: el instante de escena al que corresponde
 * cada bloque de texto que se cruza bajando.
 *
 * El scroll NO se reparte por fracciones del carril: se reparte entre estos
 * hitos, y cada hito es un bloque real del documento. La diferencia importa —
 * con fracciones, el texto tiene que estar clavado para que las cuentas
 * cuadren, y una página con el texto clavado cuatro pantallas se lee como un
 * scroll secuestrado aunque no lo sea. Anclando a bloques, el texto baja a su
 * ritmo de siempre y la escena lo sigue.
 *
 * Los tres primeros son los pasos. Los demás no llevan texto: son el aire que
 * necesita el mapa para dibujarse, y su altura es lo que le da tiempo.
 */
export const HITOS = [
  { t: CUES.Rol, paso: 0 },
  { t: CUES.Herramientas, paso: 1 },
  { t: CUES.Construido, paso: 2 },
  { t: CUES.Suelta, alto: 70, titular: true },
  { t: CUES.Zoom, alto: 60 },
  { t: CUES.Otros, alto: 90 },
  { t: CUES.General, alto: 70, pie: true },
];

/**
 * Los dos colores de fondo de la escena, y cuándo cambia de uno a otro.
 *
 * La construcción va sobre el gris claro del sistema; el mapa, sobre marfil de
 * página. No es solo la superficie de la página: el sombreador de la esfera
 * mezcla el fondo DENTRO del vidrio, así que el motor tiene que virar con ella
 * (ver `fondo()` en EsferaFacetada) o la bola se queda con un halo del color
 * anterior. El corte cae donde la esfera se va: cambia de sitio, cambia de
 * fondo.
 */
export const FONDOS = { construccion: "--surface-inset", mapa: "--surface-page" };
export const enConstruccion = (T) => T < CUES.Suelta;

/* ── La geometría del motor ───────────────────────────────────────────────── */

/* Unidades del motor (ver EsferaFacetada): la bola mide 0.40, la corona de
   centros 1.03, y el encuadre mete 3.88 en la dimensión menor del lienzo. De
   ahí sale la escala con la que cada agente pide su esfera. */
const U_BOLA = 0.40;
const U_CUERPO = 1.03;
const U_ENCUADRE = 3.88;

/** Radio del cuerpo de un agente, en píxeles del lienzo autor. */
export const R_CUERPO = 120;
/** Radio de una bola ya colocada. Es la misma para los cinco agentes: las bolas
    son materia de la misma esfera, no el tamaño del agente que las soltó. */
export const R_BOLA = (R_CUERPO * U_BOLA) / U_CUERPO;

/** Solape entre bolas del motor (JOURNEY_OVERLAP): una sale antes de que la
    anterior haya llegado. */
const SOLAPE = 0.55;

/** Margen del lienzo de cada agente, para que la esfera no se corte al soltar. */
const MARGEN = 340;

/** El lienzo autor: todo lo que compone la pieza se mide contra esta caja. */
export const ANCHO = 1920;
export const ALTO = 1080;

/**
 * Una parada: dónde cae, en qué medio, de qué lado se cuelga su etiqueta y,
 * si hace falta, cuánto se sube o baja la etiqueta (`dy`, en unidades del
 * mapa) para que no se pise con el trazo que llega a la bola.
 */
const parada = (x, y, medio, lado = 1, dy = 0) => ({ x, y, medio, lado, dy });

/**
 * El anillo, aplanado.
 *
 * El boceto se compuso casi cuadrado —unos 2100 x 1800—, y el cuadro es 16:9.
 * Puesto ahí dentro dejaba dos franjas de marfil a los lados y el dibujo se
 * quedaba pequeño en medio. Ensanchándolo y bajándole el alto, el anillo pasa a
 * 1.73:1, que ya es casi la proporción del cuadro, y ocupa lo que tiene que
 * ocupar.
 *
 * Es un estirón del PLANO, no de las piezas: las esferas y las bolas siguen
 * midiendo lo mismo (su tamaño sale de R_CUERPO, no de estas coordenadas). Lo
 * único que cambia es dónde cae cada cosa, y los recorridos quedan más tendidos
 * — que además es como se lee un camino sobre un mapa.
 */
const ESTIRON = { x: 1.22, y: 0.82 };
/** Centro del anillo: el alto se aplasta contra él, no contra el origen. */
const CENTRO_Y = 1120;
const aplanarY = (y) => CENTRO_Y + (y - CENTRO_Y) * ESTIRON.y;
/** Un punto del boceto, ya en el cuadro: para señalar paradas desde fuera. */
export const enMapa = (x, y) => [x * ESTIRON.x, aplanarY(y)];
const aplanar = (a) => ({
  ...a,
  pos: [a.pos[0] * ESTIRON.x, aplanarY(a.pos[1])],
  paradas: a.paradas.map((p) => ({ ...p, x: p.x * ESTIRON.x, y: aplanarY(p.y) })),
});

/**
 * El estilo de cada medio en las etiquetas, el mismo que en Navegación Activa
 * (ver Recorrido.jsx): el oro para la web, que es donde la marca ya vive; el
 * rojo del sistema para YouTube; y ChatGPT sin tinte. Es lo que permite leer
 * de un vistazo por dónde pasa cada recorrido.
 */
export const MEDIOS = { Web: "v4-chip--gold", YouTube: "v4-chip--rojo", ChatGPT: "" };

/* ── El guion ─────────────────────────────────────────────────────────────── */

/**
 * Los cinco agentes, en anillo. El 1 arranca a la derecha y es el que se ve
 * solo durante la primera escena; el resto entran con el zoom.
 *
 * Cada uno lleva su ROL —quién es y qué busca—, que es lo que se le dio en la
 * construcción y lo que explica su recorrido. El del agente 1 es el mismo que
 * los granos que alimentan a la esfera. Los otros cuatro son BORRADOR: perfiles
 * de la misma categoría, para que se lea que son personas distintas buscando
 * lo mismo.
 *
 * Cuatro paradas están compartidas a propósito, y son el remate de la pieza:
 *   (-15, 980)   agentes 1 y 2
 *   (-315, 800)  agentes 1, 4 y 5
 *   (195, 1520)  agentes 2 y 3
 *   (15, 1850)   agentes 3 y 4
 */
export const AGENTES = [
  {
    pos: [1046, 760],
    rol: "agentes.a1",
    /* Las etiquetas de en medio se apartan del trazo: la de ChatGPT y la de
       YouTube suben, la de la web compartida baja. */
    paradas: [
      parada(885, 1115, "Web"),
      parada(645, 950, "ChatGPT", 1, -70),
      parada(345, 740, "YouTube", 1, -70),
      parada(-15, 980, "Web", 1, 75),
      parada(-315, 800, "ChatGPT", -1),
    ],
  },
  {
    /* A la derecha del centro: el titular del mapa vive pegado arriba a la
       izquierda, y este agente le caía encima. */
    pos: [250, 230],
    rol: "agentes.a2",
    paradas: [
      /* Etiqueta a la izquierda: a la derecha se montaba sobre el rol. */
      parada(45, 530, "YouTube", -1),
      parada(-15, 980, "Web"),
      parada(-60, 1260, "ChatGPT", -1),
      parada(195, 1520, "YouTube"),
    ],
  },
  {
    /* Arriba y a la derecha de donde estaba: deja libre la esquina de abajo
       a la derecha, que es donde va el pie del mapa. */
    pos: [1116, 1480],
    rol: "agentes.a3",
    paradas: [
      parada(765, 1580, "Web"),
      parada(495, 1355, "ChatGPT"),
      parada(195, 1520, "YouTube"),
      parada(15, 1850, "Web"),
    ],
  },
  {
    pos: [-646, 1990],
    rol: "agentes.a4",
    paradas: [
      parada(-255, 2030, "YouTube"),
      parada(15, 1850, "Web"),
      parada(-345, 1520, "ChatGPT", -1),
      parada(-250, 1120, "Web"),
      parada(-315, 800, "ChatGPT", -1),
    ],
  },
  {
    /* Más abajo que en el boceto: el titular del mapa vive pegado arriba a la
       izquierda, y a esa altura este agente le caía encima. */
    pos: [-1046, 1550],
    rol: "agentes.a5",
    paradas: [
      parada(-960, 1080, "Web", -1),
      parada(-800, 1260, "ChatGPT", -1),
      parada(-570, 1070, "YouTube", -1),
      parada(-315, 800, "ChatGPT", -1),
    ],
  },
]
  .map(aplanar)
  .map((a, i) => ({ ...a, i, fase: i * 1.3 }));

/* ── Interpolación ────────────────────────────────────────────────────────── */

export const acotar = (v, min, max) => Math.max(min, Math.min(max, v));

export const SUAVE = {
  lineal: (t) => t,
  entraSale: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  seno: (t) => -(Math.cos(Math.PI * t) - 1) / 2,
  sale: (t) => --t * t * t + 1,
  rebota: (t) => {
    const c1 = 1.70158;
    return 1 + (c1 + 1) * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
};

/**
 * Curva por tramos: `entradas` son los instantes y `salidas` los valores, con
 * una suavizante por tramo. Fuera del rango se queda en el extremo.
 */
export function entre(entradas, salidas, suaves) {
  return (t) => {
    if (t <= entradas[0]) return salidas[0];
    const ultimo = entradas.length - 1;
    if (t >= entradas[ultimo]) return salidas[ultimo];
    for (let i = 0; i < ultimo; i++) {
      if (t < entradas[i + 1]) {
        const ancho = entradas[i + 1] - entradas[i];
        const local = ancho === 0 ? 0 : (t - entradas[i]) / ancho;
        const suave = (Array.isArray(suaves) ? suaves[i] : suaves) || SUAVE.lineal;
        return salidas[i] + (salidas[i + 1] - salidas[i]) * suave(local);
      }
    }
    return salidas[ultimo];
  };
}

/* ── Las cuentas ──────────────────────────────────────────────────────────── */

/**
 * Cuándo suelta cada agente y cuánto tarda.
 *
 * El primero suelta ENTERO y a la vista. En el boceto entraba con tres bolas ya
 * puestas, porque la pieza empezaba ahí; aquí no puede: venimos de verlo
 * construirse, y una esfera que aparece medio deshecha se lee como un salto.
 * Termina justo antes de que la cámara empiece a alejarse.
 */
export function tiempos() {
  return AGENTES.map((a, i) => {
    const n = a.paradas.length;
    const etapa = i === 0 ? 0.9 : 0.85;
    const dur = etapa * (1 + (n - 1) * SOLAPE);
    const t0 = i === 0 ? CUES.Suelta : CUES.Otros + 0.1 + (i - 1) * 1.4;
    return { t0, etapa, dur, p0: 0, aterriza: (k) => t0 + (k * SOLAPE + 1) * etapa };
  });
}

const clave = (p) => `${p.x},${p.y}`;

/**
 * Las paradas agrupadas por posición, con quién aterriza en cada una y cuándo,
 * en orden. El primero de la lista pone la etiqueta; los demás pulsan al
 * llegar, que es lo que marca la coincidencia.
 */
export function coincidencias(tm) {
  const mapa = {};
  AGENTES.forEach((a, i) =>
    a.paradas.forEach((p, k) => {
      (mapa[clave(p)] = mapa[clave(p)] || []).push({ i, k, cuando: tm[i].aterriza(k) });
    })
  );
  Object.values(mapa).forEach((l) => l.sort((p, q) => p.cuando - q.cuando));
  return mapa;
}

/** La caja del lienzo de un agente: su cuerpo, sus paradas y el margen. */
export function cajaDe(a) {
  const xs = [a.pos[0] - R_CUERPO, a.pos[0] + R_CUERPO,
              ...a.paradas.flatMap((p) => [p.x - R_BOLA, p.x + R_BOLA])];
  const ys = [a.pos[1] - R_CUERPO, a.pos[1] + R_CUERPO,
              ...a.paradas.flatMap((p) => [p.y - R_BOLA, p.y + R_BOLA])];
  const l = Math.min(...xs) - MARGEN;
  const r = Math.max(...xs) + MARGEN;
  const t = Math.min(...ys) - MARGEN;
  const b = Math.max(...ys) + MARGEN;
  return { l, t, w: r - l, h: b - t };
}

/**
 * Lo que hay que pedirle al motor para que la esfera de este agente salga al
 * tamaño que le toca dentro de su caja, y no al que le tocaría si estuviera
 * sola en pantalla.
 */
export function opticaDe(caja) {
  const menor = Math.min(caja.w, caja.h);
  const escala = (R_CUERPO * U_ENCUADRE) / (U_CUERPO * menor);
  return {
    escalaCuerpo: escala,
    radioSuelta: U_BOLA * escala,
    grosorTrazo: 0.006 * escala * (U_ENCUADRE / U_CUERPO) * 0.85,
  };
}

/** Giro común: todas las esferas giran al mismo ritmo, cada una desfasada. */
export const anguloEn = (T, fase) => 0.6 + fase - 0.25 * T;

/**
 * La cámara. Arranca cerca del primer agente, se asienta, y con el zoom se
 * abre hasta encuadrar el anillo entero.
 */
/**
 * Encuadre de la construcción: la esfera a la derecha y un poco por encima del
 * centro, que es el hueco que deja la columna de texto. Se expresa en fracción
 * del cuadro para poder cambiarlo sin rehacer las cuentas.
 */
const CERCA = { escala: 1.59, x: 0.74, y: 0.50 };

/** La cámara que pone al agente 1 en un punto concreto del cuadro. */
function encuadrar(agente, escala, fx, fy) {
  return {
    cx: agente.pos[0] - (fx * ANCHO - ANCHO / 2) / escala,
    cy: agente.pos[1] - (fy * ALTO - ALTO / 2) / escala,
  };
}

/**
 * La cámara, de la portada al plano general.
 *
 * Tres tramos. Mientras se construye no se mueve: la esfera tiene que quedarse
 * quieta en su sitio para que lo que cambie sea ella y no el encuadre. En el
 * paso 03 baja y se aleja hasta el plano con el que arrancaba el boceto —ese es
 * el viaje—. Y de ahí en adelante, el recorrido de cámara aprobado.
 */
export function camaraEn(T) {
  const uno = AGENTES[0];
  const cerca = encuadrar(uno, CERCA.escala, CERCA.x, CERCA.y);
  /* Fin del viaje: la esfera se va a la derecha y se aleja, dejando sitio a su
     izquierda y por debajo para el recorrido que va a soltar — que tendido
     ocupa unos 1700 px de mundo de ancho. */
  const ESCALA_ABAJO = 0.90;
  const abajo = encuadrar(uno, ESCALA_ABAJO, 0.89, 0.50);
  /* Encuadre del plano general. Con el anillo aplanado (ver ESTIRON) mide unos
     2550 x 1480, y con las etiquetas puestas se va a unos 2950 x 1680: a 0.58
     entra entero en el cuadro con un margen estrecho. Su centro está en
     (0, 1120) por construcción. */
  const FUERA = 0.46;
  /* El plano general no va centrado: el titular del mapa ocupa el cuarto de
     arriba a la izquierda, así que el anillo se corre a la derecha para no
     meterse debajo. */
  const CORRIMIENTO = -260;

  const K = [CUES.Rol, CUES.Construido, CUES.Suelta, CUES.Zoom, CUES.Otros, TOTAL];
  const suaves = [SUAVE.lineal, SUAVE.entraSale, SUAVE.seno, SUAVE.entraSale, SUAVE.lineal];
  const s = entre(K, [CERCA.escala, CERCA.escala, ESCALA_ABAJO, ESCALA_ABAJO * 0.97,
                      FUERA, FUERA * 0.95], suaves)(T);
  const cx = entre(K, [cerca.cx, cerca.cx, abajo.cx, abajo.cx + 20, CORRIMIENTO, CORRIMIENTO], suaves)(T);
  const cy = entre(K, [cerca.cy, cerca.cy, abajo.cy, abajo.cy + 20, 1120, 1120], suaves)(T);
  return { s, cx, cy };
}

/**
 * Contra-escala de las etiquetas.
 *
 * El dibujo encoge dos veces —la cámara se aleja, y el lienzo autor se escala
 * al ancho que haya— y el texto no puede encoger con él: una etiqueta de medio
 * es texto, y el texto se lee al tamaño al que se lee. Esto deshace las dos
 * escalas, así que un chip mide en pantalla lo mismo de cerca que de lejos.
 *
 * Con tope, porque la cámara puede alejarse tanto que la compensación deje las
 * etiquetas más grandes que las bolas de las que cuelgan.
 */
export const contraEscala = (s, escalaLienzo) =>
  acotar(1 / (s * (escalaLienzo || 1)), 1, 6);
