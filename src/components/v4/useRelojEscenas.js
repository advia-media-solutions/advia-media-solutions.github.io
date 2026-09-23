import { useCallback, useEffect, useState } from "react";
import { INICIOS, TOTAL, instanteQuieto } from "./comoFuncionaTiempo";

/**
 * El reloj de «Cómo funciona». Avanza con requestAnimationFrame solo cuando la
 * pieza está en pantalla y no se ha pausado; fuera de pantalla no gasta nada.
 *
 * Con `prefers-reduced-motion` no corre: se queda en el final de la escena
 * elegida, con todo dibujado, y se navega pulsando los pasos.
 */
export default function useRelojEscenas(raiz) {
  const [t, setT] = useState(0);
  const [parada, setParada] = useState(false);
  const [quieto, setQuieto] = useState(false);
  const [visible, setVisible] = useState(false);
  /* Hasta dónde corre el reloj tras pulsar un paso; null = vuelta continua. */
  const [tope, setTope] = useState(null);

  useEffect(() => {
    const consulta = window.matchMedia("(prefers-reduced-motion: reduce)");
    const aplicar = () => setQuieto(consulta.matches);
    aplicar();
    consulta.addEventListener("change", aplicar);
    return () => consulta.removeEventListener("change", aplicar);
  }, []);

  useEffect(() => {
    if (quieto) setT(instanteQuieto(0));
  }, [quieto]);

  useEffect(() => {
    const nodo = raiz.current;
    if (!nodo) return undefined;
    const observador = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.2,
    });
    observador.observe(nodo);
    return () => observador.disconnect();
  }, [raiz]);

  const enMarcha = visible && !parada && !quieto;

  useEffect(() => {
    if (!enMarcha) return undefined;
    let antes = performance.now();
    let cuadro;
    const paso = (ahora) => {
      const dt = Math.min((ahora - antes) / 1000, 0.1);
      antes = ahora;
      setT((v) => (tope === null ? (v + dt) % TOTAL : Math.min(v + dt, tope)));
      cuadro = requestAnimationFrame(paso);
    };
    cuadro = requestAnimationFrame(paso);
    return () => cancelAnimationFrame(cuadro);
  }, [enMarcha, tope]);

  /* Quien pulsa un paso quiere leerlo: el paso se cuenta entero y el reloj se
     para al final, con todo dibujado, en vez de llevárselo al siguiente a los
     cinco segundos. Vuelve a correr con «Reproducir». */
  useEffect(() => {
    if (tope !== null && t >= tope) setParada(true);
  }, [t, tope]);

  const irA = useCallback(
    (i) => {
      if (quieto) {
        setT(instanteQuieto(i));
        return;
      }
      setT(INICIOS[i] + 0.01);
      setTope(instanteQuieto(i));
      setParada(false);
    },
    [quieto]
  );
  const alternar = useCallback(() => {
    setTope(null);
    setParada((p) => !p);
  }, []);

  return { t, parada, quieto, irA, alternar };
}
