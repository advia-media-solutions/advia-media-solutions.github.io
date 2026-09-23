/**
 * Un trazo SVG con bolas que viajan por él. Motor imperativo: se le da el
 * progreso y coloca cada bola en el punto del camino que le toca, dibuja el
 * camino hasta la bola que va en cabeza y marca las paradas alcanzadas.
 *
 * Las paradas se dan como puntos (x, y) del viewBox; su posición a lo largo
 * del camino se busca una vez muestreando `getPointAtLength`, así el trazo se
 * puede dibujar a mano sin calcular longitudes.
 */
export function prepararTrazo(path, paradas) {
  const largo = path.getTotalLength();
  const N = 240;
  const muestras = [];
  for (let i = 0; i <= N; i += 1) {
    const s = (largo * i) / N;
    const pt = path.getPointAtLength(s);
    muestras.push({ s, x: pt.x, y: pt.y });
  }
  const enCamino = paradas.map(([x, y]) => {
    let mejor = muestras[0];
    let d0 = Infinity;
    muestras.forEach((m) => {
      const d = (m.x - x) ** 2 + (m.y - y) ** 2;
      if (d < d0) {
        d0 = d;
        mejor = m;
      }
    });
    return mejor.s / largo;
  });
  path.style.strokeDasharray = `${largo}`;
  return {
    largo,
    enCamino,
    punto: (f) => path.getPointAtLength(largo * Math.min(1, Math.max(0, f))),
  };
}

/**
 * Pinta un instante. `viajes[i]` es {desde, hasta} en progreso: cuándo sale
 * y cuándo llega la bola i. `bolas[i]` son los nodos a mover (transform en
 * unidades del viewBox, así que el <svg> escala con ellos); `fichas[i]` los
 * rótulos, que se encienden al llegar.
 */
export function pintarTrazo(trazo, path, bolas, fichas, viajes, p, easing) {
  let cabeza = 0;
  viajes.forEach((v, i) => {
    const t = Math.min(1, Math.max(0, (p - v.desde) / (v.hasta - v.desde)));
    const destino = trazo.enCamino[i];
    const f = destino * easing(t);
    const pt = trazo.punto(f);
    const bola = bolas[i];
    if (bola) {
      const visible = p > v.desde;
      bola.style.opacity = visible ? "1" : "0";
      /* Sale pequeña y crece al despegar: se desprende, no aparece. */
      const k = 0.55 + 0.45 * Math.min(1, t * 4);
      bola.style.transform = `translate(${pt.x}px, ${pt.y}px) scale(${k})`;
    }
    if (fichas[i]) fichas[i].dataset.puesta = t >= 1 ? "true" : "";
    if (visible(p, v)) cabeza = Math.max(cabeza, f);
  });
  path.style.strokeDashoffset = `${trazo.largo * (1 - Math.min(1, cabeza + 0.01))}`;
  /* Sin cabeza no hay trazo: con el guion a cero y los remates redondos el
     navegador pinta un punto en el arranque del camino. */
  path.style.opacity = cabeza > 0 ? "1" : "0";
}
const visible = (p, v) => p > v.desde;
