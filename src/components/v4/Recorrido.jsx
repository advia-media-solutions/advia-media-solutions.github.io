import React, { useEffect, useRef, useState } from "react";
import escenaMerecePena from "./escena";
import RecorridoMovil from "./movil/RecorridoMovil";

/**
 * El recorrido de una decisión: la esfera suelta sus bolas y cada una se queda
 * en una parada, con el trazo dibujándose entre ellas.
 *
 * Todo lo que se mueve es una sola escena 3D — las paradas SON las bolas y el
 * trazo es geometría, no un SVG por encima. Es la diferencia con la versión
 * anterior: allí los puntos eran SVG y la esfera WebGL, dos sistemas de
 * coordenadas que había que mantener en sincronía a mano. Aquí no hay nada que
 * sincronizar, y por eso la bola aterriza exactamente en su sitio.
 *
 * Lo único que sigue siendo HTML son las etiquetas, colgadas de la posición
 * proyectada de cada bola. El texto tiene que ser texto: es lo que leen los
 * buscadores, los lectores de pantalla y quien no tenga WebGL.
 *
 * Y la curva no es un capricho: una recta con cuatro paradas equidistantes
 * parece un plan, y lo que dice la sección es que nadie planifica para este
 * recorrido.
 */
/**
 * Interruptor de la escena. En false la sección se lee en columna, que es el
 * mismo fallback que ve quien no tiene WebGL — útil para aislar problemas sin
 * tocar el resto.
 */
const CON_ESCENA = true;

/**
 * El color va en la etiqueta, no en la bola.
 *
 * Se probó teñir las bolas —color por medio, tonos del oro, apagar el núcleo—
 * y ninguna salió bien: son vidrio translúcido de 20px que refracta el fondo,
 * así que o el color no se leía o dejaba de parecer la misma pieza. La etiqueta
 * es texto sobre un fondo plano: ahí un color se lee siempre.
 *
 * El oro se queda para la web, que es donde la marca ya vive. Los otros dos no
 * llevan el color de su marca —son suyos, no nuestros—: llevan color del
 * sistema.
 */
const MEDIOS = {
  Web: "v4-chip--gold",
  YouTube: "v4-chip--rojo",
  ChatGPT: "",
};

/**
 * Dónde se coloca la ficha de cada parada, en el orden del recorrido.
 *
 * Va emparejada con el perfil de la curva (PARADAS_CURVA en EsferaFacetada):
 * cada pose apunta al hueco que deja la curva EN esa parada. Alternar
 * arriba/abajo no servía — el perfil no es simétrico, y en los dos tramos
 * tendidos tres fichas seguidas caían a la misma altura y se leían como una
 * sola línea corrida.
 *
 * Si se cambia el perfil, hay que revisar esta lista: son el mismo dibujo.
 */
const POSES = ["alta", "baja", "pico", "dcha", "izda"];

/**
 * Color de fondo real de la sección, para que la escena funda sus bordes
 * contra él. Antes era marfil fijo y la pieza solo servía sobre claro; ahora
 * vive sobre grafito, y con el marfil clavado la esfera se recortaba contra la
 * sección. Mismo procedimiento que en Ramas: se sube por los ancestros hasta el
 * primer color opaco, porque el lienzo es transparente y `getComputedStyle`
 * devuelve rgba(0,0,0,0) —que el motor leería como NEGRO—.
 */
function fondoDe(nodo) {
  for (let el = nodo; el; el = el.parentElement) {
    const c = getComputedStyle(el).backgroundColor;
    const m = c && c.match(/rgba?\((\d+), (\d+), (\d+)(?:, ([\d.]+))?\)/);
    if (m && (m[4] === undefined || Number(m[4]) > 0.9)) {
      return `rgb(${m[1]}, ${m[2]}, ${m[3]})`;
    }
  }
  return "#FCFDFD";
}

export default function Recorrido({ paradas, nota }) {
  const nodo = useRef(null);
  const lienzo = useRef(null);
  const motor = useRef(null);
  const [sitios, setSitios] = useState([]);

  useEffect(() => {
    if (!CON_ESCENA) return undefined;
    let vivo = true;
    const canvas = lienzo.current;
    if (!canvas || !escenaMerecePena(canvas)) return undefined;

    import("./EsferaFacetada")
      .then(({ default: crearEsfera }) => {
        if (!vivo) return;
        const m = crearEsfera(canvas, {
          fondo: fondoDe(canvas.parentElement),
          modo: "recorrido",
          /* Cinco paradas, cinco bolas. El resto se queda en el cuerpo, que
             sigue ahí junto a la entradilla cuando el recorrido ha terminado. */
          sueltas: paradas.length,
          /* Arriba a la derecha, a la altura de la entradilla. Fracción del
             lienzo (1120 x 690), así que el ajuste fino se hace en fracciones:
             partía de [0.82, 0.12], donde se salía del cuadro por arriba: los
             ~15px que baja el 0.142 bastan para que entre entera. En x va todo
             lo que da el cuadro sin cortarse por la derecha, para dejar libre
             el centro, que es por donde arranca el recorrido. */
          ancla: [0.92, 0.142],
          escalaCuerpo: 0.25,
          escalaSuelta: 0.5,
          /* El lienzo sobresale 110px por lado (ver .v4-recorrido__pieza) para
             que la esfera no se corte al soltar bolas. El motor descuenta este
             margen y sigue componiendo contra la caja de 1120 x 690. */
          sangrado: 110,
        });
        /* Se espera a que el lienzo tenga caja: al montar puede medir 0 y el
           motor no puede calcular nada con eso. */
        const cuandoHayaCaja = () => {
          if (!vivo) return;
          if (!canvas.clientWidth || !canvas.clientHeight) {
            requestAnimationFrame(cuandoHayaCaja);
            return;
          }
          m.prepararFinal();
          motor.current = m;
          canvas.parentElement.dataset.listo = "true";
        };
        requestAnimationFrame(cuandoHayaCaja);
      })
      .catch(() => {
        /* Sin WebGL quedan las etiquetas, que son el contenido de verdad. */
      });

    return () => {
      vivo = false;
      if (motor.current) motor.current.destruir();
      motor.current = null;
    };
  }, []);

  useEffect(() => {
    if (!CON_ESCENA) return undefined;
    const bloque = nodo.current;
    if (!bloque) return undefined;

    let pedido = 0;
    const medir = () => {
      pedido = 0;
      if (!motor.current) return;
      const caja = bloque.getBoundingClientRect();
      /* El recorrido avanza mientras el bloque cruza la pantalla. La ventana se
         cierra pronto a propósito: con el rango completo, la última parada
         aterrizaba cuando el bloque ya se había ido por arriba y no se veía
         caer. Ahora las cinco están puestas con el bloque aún centrado. */
      const total = caja.height + window.innerHeight;
      const bruto = (window.innerHeight - caja.top) / total;
      // Arranca 0.19 (antes 0.16) y cierra en 0.55 (antes 0.58): la primera bola
      // se despega un pelín más tarde y la última se posa un pelín antes.
      const p = Math.min(1, Math.max(0, (bruto - 0.19) / 0.36));
      motor.current.desmontar(p);
      /* `paradas()` devuelve un array nuevo cada vez, así que pasárselo tal cual
         a setSitios re-renderizaba el componente en CADA frame de scroll. Solo
         se actualiza cuando algo se mueve de verdad. */
      const nuevos = motor.current.paradas();
      setSitios((previos) => {
        if (previos.length !== nuevos.length) return nuevos;
        const igual = nuevos.every((n, i) => {
          const p0 = previos[i];
          return p0 && p0.puesta === n.puesta &&
                 Math.abs(p0.x - n.x) < 0.5 && Math.abs(p0.y - n.y) < 0.5;
        });
        return igual ? previos : nuevos;
      });
    };
    const alScroll = () => {
      if (!pedido) pedido = requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll);
    return () => {
      cancelAnimationFrame(pedido);
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
    };
  }, []);

  return (
    <div className="v4-recorrido" ref={nodo} data-plano={CON_ESCENA ? undefined : "true"}>
      <div className="v4-recorrido__lienzo">
        {CON_ESCENA ? (
          <div className="v4-recorrido__pieza" aria-hidden="true">
            <canvas ref={lienzo} />
          </div>
        ) : null}

        {/* La entradilla vive DENTRO del lienzo: el cuerpo se ancla a su lado,
            y para eso los dos tienen que compartir caja. */}
        {nota ? <div className="v4-recorrido__nota">{nota}</div> : null}

        {/* Bajo el corte no hay escena WebGL (escena.js): el recorrido se
            cuenta en RecorridoMovil, pegado y gobernado por el scroll. El CSS
            lo esconde en escritorio y esconde aquí la lista de paradas. */}
        <RecorridoMovil paradas={paradas} />

        <ol className="v4-recorrido__paradas">
          {paradas.map((parada, i) => {
            const sitio = sitios[i];
            return (
              <li
                /* Por índice y no por chip: ahora hay paradas que repiten
                   fuente ("Web" dos veces) y las claves chocarían. */
                key={`${parada.chip}-${i}`}
                className="v4-parada"
                /* La pose la fija el perfil, no el turno: ver POSES. */
                data-pose={POSES[i % POSES.length]}
                data-puesta={sitio && sitio.puesta ? "true" : undefined}
                style={{
                  "--v4-turno": i,
                  ...(sitio ? { "--v4-x": `${sitio.x}px`, "--v4-y": `${sitio.y}px` } : null),
                }}
              >
                <div className="v4-parada__ficha">
                  <span className={`v4-chip ${MEDIOS[parada.chip] || ""}`.trim()}>
                    {parada.chip}
                  </span>
                  <p className="v4-body">{parada.texto}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
