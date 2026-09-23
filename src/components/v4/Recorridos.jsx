import React, { useCallback, useEffect, useRef, useState } from "react";
import CargaGranos from "./CargaGranos";
import RecorridoAgentes from "./RecorridoAgentes";
import { CUES, HITOS, PASOS_T, TOTAL } from "./RecorridoAgentesEscena";
import { Hero } from "./layout";
import { EsferaGranos, MapaAgentes } from "./TecnologiaMovil";

/**
 * Cuánto se alarga la franja gris por debajo de la construcción. La línea de
 * cambio de sección cae más abajo que el bloque de los pasos, sin mover el
 * título siguiente: es solo dónde se pinta el borde.
 */
const COLA_FRANJA = 0.15;

/**
 * La narrativa entera de /technology, de la portada al mapa de recorridos, con
 * UNA sola esfera y el scroll llevándola.
 *
 * Tres escenas encadenadas, y ninguna corta con la anterior:
 *
 *   1. La portada. La esfera está en su forma primitiva, quieta a la derecha.
 *   2. Los pasos. Bajando, la esfera se construye: rol, herramientas, hecha.
 *      Los tres pasos se leen a la izquierda mientras ocurre.
 *   3. Los caminos. Ya construida, la esfera baja y suelta su recorrido; la
 *      cámara se aleja y aparecen otros cuatro agentes con el suyo.
 *
 * LO ÚNICO PEGADO ES LA ESCENA. El texto baja a su ritmo de siempre, como en
 * cualquier página. Una versión anterior tenía además el texto clavado durante
 * cuatro pantallas mientras el scroll repartía la animación por fracciones de
 * un carril: nadie retenía la rueda, pero al bajar no se movía nada más que una
 * esfera, y eso se lee exactamente igual que un scroll secuestrado. La escena
 * puede quedarse quieta —es fondo, y el fondo se está quieto—; el texto no.
 *
 * De ahí sale la regla que gobierna el tiempo: el instante de la escena (`T`)
 * no viene de cuánto llevas de un carril, sino de QUÉ BLOQUE tienes delante.
 * Cada hito del relato es un bloque real del documento con un instante asociado
 * (ver HITOS), y T se interpola entre el bloque que acabas de pasar y el
 * siguiente. Así la escena sigue a la lectura en vez de al revés, y el ritmo se
 * ajusta moviendo bloques, no recalculando porcentajes.
 *
 * La única excepción: mientras hay un paso FIJADO por un clic, manda el clic —
 * y el primer gesto de scroll lo suelta. Es la única regla de precedencia que
 * hay, y es la que evita que el clic y la rueda se peleen por la misma esfera.
 */

/** Lo que tarda la esfera en ir al paso que se acaba de pulsar. */
const CLIC_MS = 520;
const suave = (x) => x * x * (3 - 2 * x);

/**
 * Qué está pasando, medido contra el centro de la ventana — que es donde de
 * verdad se lee.
 *
 * Devuelve dos cosas, y las dos salen de la misma medida:
 *
 *   `T`, el instante de escena. Se interpola entre el CENTRO del hito que
 *   acabas de pasar y el del siguiente. Antes del primero el tiempo no ha
 *   empezado; después del último ya ha terminado.
 *
 *   `activo`, el paso encendido. NO sale de T, sale de qué bloque ocupa el
 *   centro de la ventana. Derivarlo de T lo dejaba medio bloque por detrás: el
 *   paso solo se encendía al llegar su centro, y hasta entonces seguía
 *   encendido el anterior, que a esas alturas ya se había ido de la pantalla.
 *   Lo que se enciende tiene que ser lo que estás leyendo.
 */
/**
 * Dónde está un bloque EN EL FLUJO, en coordenadas de ventana.
 *
 * No vale `getBoundingClientRect` para los pasos: están pegados, así que su
 * caja se queda arriba mientras la página sigue bajando, y el tiempo se
 * quedaba congelado con ella. `offsetTop` ignora el pegado y dice dónde estaría
 * el bloque si no lo estuviera — que es justo lo que mide el avance.
 */
function enFlujo(el) {
  const base = el.offsetParent;
  const arriba = base
    ? base.getBoundingClientRect().top + el.offsetTop
    : el.getBoundingClientRect().top;
  return { arriba, alto: el.offsetHeight };
}

/**
 * Qué está pasando, medido contra el centro de la ventana — que es donde de
 * verdad se lee.
 *
 * Los hitos de los pasos son sus AIRES (el hueco de scroll que hay antes de
 * cada uno), no las tarjetas: las tarjetas viven en la columna pegada y no se
 * mueven con el documento. El centro de cada aire es el instante en que su
 * paso queda colocado, y de la distancia que le falta sale `desplaza`: lo que
 * hay que empujar la tarjeta hacia abajo para que suba hasta su sitio al ritmo
 * exacto del scroll, ni más deprisa ni más despacio.
 */
function estadoDe(nodos) {
  const centro = window.innerHeight / 2;
  const puntos = [];
  const desplaza = [];
  /* El último paso que ya ha llegado. Antes del primero se queda en el primero;
     pasados los tres, en el último — que es el que la esfera sigue contando
     mientras el mapa se dibuja. */
  let activo = 0;

  nodos.forEach((el, i) => {
    if (!el) return;
    const { arriba, alto } = enFlujo(el);
    const y = arriba + alto / 2;
    puntos.push({ t: HITOS[i].t, y });
    if (HITOS[i].paso != null) {
      desplaza[HITOS[i].paso] = Math.max(0, y - centro);
      if (y <= centro) activo = HITOS[i].paso;
    }
  });

  if (!puntos.length) return { T: 0, arrancado: false, activo: 0, desplaza };

  /* Arranca cuando el primer paso ha llegado a su sitio: ahí es cuando empieza
     a alimentar a la esfera, no antes. */
  const arrancado = centro >= puntos[0].y;
  if (!arrancado) return { T: puntos[0].t, arrancado, activo, desplaza };

  for (let i = 0; i < puntos.length - 1; i++) {
    if (centro <= puntos[i + 1].y) {
      const tramo = puntos[i + 1].y - puntos[i].y;
      const k = tramo <= 0 ? 1 : (centro - puntos[i].y) / tramo;
      return { T: puntos[i].t + (puntos[i + 1].t - puntos[i].t) * k, arrancado, activo, desplaza };
    }
  }
  return { T: puntos[puntos.length - 1].t, arrancado, activo, desplaza };
}

export default function Recorridos({ titular, lede, cabecera, pasos, mapa, pie, agentes = [] }) {
  const bloque = useRef(null);
  const hitos = useRef([]);
  const construccion = useRef(null);
  /* El viaje del clic en marcha, si lo hay. */
  const tween = useRef(0);

  const [T, setT] = useState(0);
  const [montado, setMontado] = useState(false);
  /* Si el relato ha empezado. En la portada todavía no, y ahí la esfera no se
     alimenta de nada: los granos son del paso, no del titular. */
  const [enRelato, setEnRelato] = useState(false);
  /* Cuánto le falta a cada tarjeta para llegar a su sitio en la columna. */
  const [desplaza, setDesplaza] = useState([0, 0, 0]);
  /* Dónde cae la franja gris dentro del bloque: la altura de la construcción,
     medida, para pintarla DETRÁS de la escena como una sección más. */
  const [banda, setBanda] = useState({ top: 0, alto: 0 });
  /* Si la esfera está sobre la franja gris: es lo que le dice al motor contra
     qué color fundir sus bordes. */
  const [sobreGris, setSobreGris] = useState(false);
  /* El paso que se está leyendo: el bloque que ocupa el centro de la ventana. */
  const [leyendo, setLeyendo] = useState(0);
  /* El paso que ha fijado un clic, o null si manda el scroll. Va en ref además
     de en estado porque lo lee el bucle de scroll, que no re-renderiza. */
  const fijado = useRef(null);
  const [fijo, setFijo] = useState(null);

  const desdeElScroll = useCallback(() => {
    const { T: t, arrancado, activo, desplaza } = estadoDe(hitos.current);
    setEnRelato(arrancado);
    setLeyendo(activo);
    /* En móvil y sin movimiento no hay columna pegada ni escena: las tarjetas
       van en flujo y no se empujan. */
    const quieto = window.matchMedia("(max-width: 900px), (prefers-reduced-motion: reduce)").matches;
    setDesplaza(quieto ? [0, 0, 0] : desplaza);
    /* La franja gris es un trozo del documento —la construcción— y se mueve
       con él como cualquier sección. La esfera está encima; el motor tiene que
       saber si en este momento la tiene debajo o no. */
    const caja = construccion.current;
    if (caja) {
      const r = caja.getBoundingClientRect();
      const centro = window.innerHeight / 2;
      setSobreGris(r.top <= centro && r.bottom + window.innerHeight * COLA_FRANJA >= centro);
    }
    if (fijado.current != null) return;
    setT(t);
  }, []);

  useEffect(() => () => cancelAnimationFrame(tween.current), []);

  /**
   * La franja gris se mide, no se declara: es exactamente la altura de la
   * construcción —cabecera, columna y aires—, y eso depende del texto, de la
   * tipografía y del ancho. Va en coordenadas del bloque, que es donde se pinta.
   */
  useEffect(() => {
    const caja = construccion.current;
    const raiz = bloque.current;
    if (!caja || !raiz) return undefined;
    const medir = () => {
      const a = caja.getBoundingClientRect();
      const b = raiz.getBoundingClientRect();
      setBanda({ top: a.top - b.top, alto: a.height + window.innerHeight * COLA_FRANJA });
    };
    const ojo = new ResizeObserver(medir);
    ojo.observe(caja);
    ojo.observe(raiz);
    medir();
    return () => ojo.disconnect();
  }, [pasos, cabecera]);

  useEffect(() => {
    const nodo = bloque.current;
    if (!nodo) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      /* Sin movimiento: el plano general, que es el que lleva el dato. Los tres
         pasos se leen enteros y no hay nada que perderse. */
      setT(TOTAL);
      setMontado(true);
      return undefined;
    }

    /* Un solo frame pendiente como mucho: el scroll dispara muchos más eventos
       que frames pinta el navegador, y medir cajas en cada uno es trabajo
       tirado. */
    let pendiente = 0;
    const alScroll = () => {
      /* Cualquier gesto de scroll suelta el paso fijado: quien mueve la página
         quiere volver a mandar, y el viaje que hubiera en marcha sobra. */
      fijado.current = null;
      cancelAnimationFrame(tween.current);
      if (pendiente) return;
      pendiente = requestAnimationFrame(() => {
        pendiente = 0;
        setFijo(null);
        desdeElScroll();
      });
    };

    const vigia = new IntersectionObserver(
      ([e]) => setMontado(e.isIntersecting),
      { rootMargin: "50% 0px" }
    );
    vigia.observe(nodo);

    window.addEventListener("scroll", alScroll, { passive: true });
    window.addEventListener("resize", alScroll);
    desdeElScroll();

    return () => {
      cancelAnimationFrame(pendiente);
      window.removeEventListener("scroll", alScroll);
      window.removeEventListener("resize", alScroll);
      vigia.disconnect();
    };
  }, [desdeElScroll]);

  /**
   * El clic lleva la esfera a un paso ahí donde estés, sin mover la página.
   *
   * Va, no salta: medio segundo de viaje, porque el sentido del paso está en
   * cómo cambia la esfera y un corte seco se salta justo eso. Es el único
   * momento en que el tiempo no viene del scroll — y lo cancela el primer gesto
   * de rueda, así que nunca hay dos mandos a la vez.
   */
  const fijarPaso = (i) => {
    fijado.current = i;
    setFijo(i);
    cancelAnimationFrame(tween.current);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setT(PASOS_T[i]);
      return;
    }
    let desde = null;
    const arranque = performance.now();
    const paso = (ahora) => {
      setT((previo) => {
        if (desde === null) desde = previo;
        const k = suave(Math.min(1, (ahora - arranque) / CLIC_MS));
        return desde + (PASOS_T[i] - desde) * k;
      });
      if (ahora - arranque < CLIC_MS) tween.current = requestAnimationFrame(paso);
    };
    tween.current = requestAnimationFrame(paso);
  };

  /* El paso encendido: el que se está leyendo, o el que haya fijado un clic.
     Los tres se leen enteros —pasan por delante, no se abren y se cierran—; lo
     que marca el activo es la tinta, que es lo que los ata a la esfera. */
  const activo = fijo != null ? fijo : leyendo;
  const alimentando = enRelato && T < CUES.Construido;
  const enConstruccion = sobreGris;
  const conIndice = HITOS.map((h, i) => ({ ...h, i }));

  return (
    <div className="v4-recorridos" ref={bloque}>
      {/* La franja gris de la construcción. Es un trozo del documento, se mueve
          con él y entra por abajo como cualquier cambio de sección: NO es la
          pantalla cambiando de color. Va debajo de la escena, así que la esfera
          se ve encima con la escena transparente. */}
      <div
        className="v4-recorridos__banda"
        aria-hidden="true"
        style={{ top: banda.top, height: banda.alto }}
      />
      {/* La escena, pegada a la ventana: acompaña a la portada y al relato
          entero, y se suelta cuando el bloque termina. La portada se le monta
          encima con margen negativo, así las dos comparten los primeros 100vh
          sin que la escena tenga que existir dos veces. */}
      <div className="v4-recorridos__pegado">
        <RecorridoAgentes T={T} montado={montado} fondo={enConstruccion ? "construccion" : "mapa"}>
          {/* Los granos: salen del lado del texto y caen dentro de la esfera.
              Van en su propia capa, centrada donde la cámara deja el cuerpo
              mientras se construye, porque lo que cuentan es el viaje. */}
          {pasos.map((paso, i) =>
            paso.chips ? (
              <CargaGranos
                key={`carga-${paso.num}`}
                chips={paso.chips}
                activo={alimentando && i === activo}
              />
            ) : null
          )}
        </RecorridoAgentes>
        {/* El titular del mapa vive AQUÍ, en la capa pegada, y no en el flujo:
            así se queda arriba mientras el mapa se dibuja y se va exactamente
            cuando se va el mapa. Pegado en el flujo, su contenedor terminaba
            después que la escena y el titular se quedaba solo mientras las
            esferas subían por debajo.

            El pie va en la esquina que dejan libre los agentes: llega cuando
            el mapa ya está entero, porque habla de coincidencias que antes no
            han pasado.

            En móvil los dos van dentro de MapaAgentes, que es la escena
            pegada de allí (en escritorio ese envoltorio no existe: display
            contents). Mismo texto, mismo orden. */}
        <MapaAgentes
          roles={agentes}
          titulo={
            mapa ? (
              <h2
                className="v4-recorridos__mapa-titulo v4-display-l"
                data-visible={T >= CUES.Suelta ? "true" : undefined}
              >
                {mapa}
              </h2>
            ) : null
          }
          pie={
            pie ? (
              <p
                className="v4-recorridos__pie v4-body"
                data-visible={T >= CUES.Otros + 3 ? "true" : undefined}
              >
                {pie}
              </p>
            ) : null
          }
        />
      </div>

      <Hero titular={titular} lede={lede} />

      {/* El relato. Texto en flujo normal por delante de la escena: baja a su
          ritmo, y cada bloque que pasa por el centro de la ventana es el que le
          dice a la esfera en qué instante está. */}
      <section className="v4-recorridos__relato">
        {/* La construcción: cabecera y pasos se van pegando uno debajo de otro
            —el tope de cada uno lo mide el efecto de arriba—, así que al final
            del tramo los tres están a la vista, apilados bajo el título. El
            contenedor es el que los suelta: cuando termina, se van todos. */}
        <div className="v4-wrap v4-recorridos__construccion" ref={construccion}>
          {/* UNA columna pegada, con la cabecera y los tres pasos dentro. No
              son tres `sticky`: con uno por tarjeta, al acabarse el contenedor
              cada una se soltaba en un momento distinto y se montaban unas
              sobre otras. Aquí la columna es un solo elemento pegado, así que
              cuando la sección termina se va ENTERA, con los tres pasos
              puestos.

              Lo que sube es cada tarjeta, empujada hacia abajo con `desplaza`
              hasta que su aire llega: el mismo efecto de llegar y quedarse, pero
              gobernado por el scroll y no por el pegado. */}
          {/* En móvil, la esfera va pegada arriba y se alimenta del paso que se
              lee (TecnologiaMovil.jsx). Hermana de la columna, no hija: se pega
              dentro de la construcción, no de la columna. */}
          <EsferaGranos pasos={pasos} />
          <div className="v4-recorridos__columna">
            <div className="v4-recorridos__cabecera">
              <h2 className="v4-subheading">{cabecera}</h2>
            </div>
            {conIndice
              .filter((h) => h.paso != null)
              .map((hito) => {
                const paso = pasos[hito.paso];
                if (!paso) return null;
                return (
                  <section
                    key={paso.num}
                    className="v4-recorridos__paso"
                    data-activo={hito.paso === activo ? "true" : undefined}
                    data-fijo={fijo === hito.paso ? "true" : undefined}
                    style={{ transform: `translateY(${desplaza[hito.paso] || 0}px)` }}
                  >
                    <div className="v4-recorridos__caja">
                      <button
                        type="button"
                        className="v4-recorridos__head"
                        onClick={() => fijarPaso(hito.paso)}
                      >
                        <span className="v4-fila__num">{paso.num}</span>
                        <h3 className="v4-subheading">{paso.titulo}</h3>
                      </button>
                      <p className="v4-body v4-recorridos__desc">{paso.desc}</p>
                      {/* El eco, en mono y en voz baja: es la lectura del paso,
                          no su continuación. Sin filete ni rótulo: con ellos
                          se leía como una cita de otro sitio. */}
                      {paso.eco ? <p className="v4-recorridos__eco">{paso.eco}</p> : null}
                    </div>
                  </section>
                );
              })}
          </div>

          {/* Los aires: uno por paso, y son sus hitos. Cada uno es el scroll
              que tarda ese paso en subir hasta su sitio, y su centro es el
              instante en que llega. El remate final es lo que mantiene la
              sección completa un rato antes de irse. */}
          {conIndice
            .filter((h) => h.paso != null)
            .map((hito) => (
              <div
                key={`aire-${hito.paso}`}
                className="v4-recorridos__aire"
                aria-hidden="true"
                ref={(el) => { hitos.current[hito.i] = el; }}
              />
            ))}
          <div className="v4-recorridos__remate" aria-hidden="true" />
        </div>

        {/* El mapa: solo los hitos, el aire que necesita para dibujarse, y su
            altura es lo que le da tiempo. Ni el titular ni el pie están aquí:
            viven en la escena pegada, y entran y se van con ella. */}
        <div className="v4-wrap v4-recorridos__mapa">
          {conIndice
            .filter((h) => h.paso == null)
            .map((hito) => (
              <div
                key={`hito-${hito.t}`}
                className="v4-recorridos__hito"
                ref={(el) => { hitos.current[hito.i] = el; }}
                style={{ minHeight: `${hito.alto}svh` }}
              />
            ))}
        </div>
      </section>
    </div>
  );
}
