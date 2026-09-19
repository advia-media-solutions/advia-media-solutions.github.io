import React from "react";
import {
  CALLES,
  EJES,
  ESTADIO,
  MENORES,
  METROS,
  PARQUES,
  VIAS_ROTULO,
} from "./MapaOficinaDatos";

/**
 * Plano de la oficina: Paseo de la Castellana 154.
 *
 * Las calles son las de verdad: la geometría viene de OpenStreetMap,
 * proyectada a este viewBox (ver MapaOficinaDatos.js). Aquí solo se decide
 * qué se pinta y cómo: tres pesos de vía, los parques y el estadio como
 * manchas, las dos paradas de metro entre las que cae la oficina, y el punto
 * dorado en la acera este de la Castellana, en la esquina con San Germán.
 *
 * Los nombres de calle van escritos SOBRE su calle con un textPath, pero no
 * sobre el trazado real: ese tiene los quiebros de OpenStreetMap —cambios de
 * calzada, un jog en una esquina— y el texto se torcía letra a letra al
 * pasar por ellos. La guía de cada rótulo es una recta que pasa por el punto
 * elegido de la calle con la dirección media de la calle en ese tramo. Sigue
 * la calle sin repetir sus tropiezos. Son pocos y elegidos a mano: los que
 * hacen falta para situarse viniendo en metro o en coche.
 */

/** Los puntos de un path de solo M/L. */
function puntosDe(d) {
  return (d.match(/-?[\d.]+,-?[\d.]+/g) || []).map((par) => par.split(",").map(Number));
}

/** El punto a la fracción `f` (0–1) de la longitud de la polilínea. */
function puntoEn(puntos, f) {
  const largos = [0];
  for (let i = 1; i < puntos.length; i += 1) {
    largos.push(largos[i - 1] + Math.hypot(puntos[i][0] - puntos[i - 1][0], puntos[i][1] - puntos[i - 1][1]));
  }
  const objetivo = f * largos[largos.length - 1];
  for (let i = 1; i < puntos.length; i += 1) {
    if (largos[i] >= objetivo) {
      const t = (objetivo - largos[i - 1]) / (largos[i] - largos[i - 1] || 1);
      return [
        puntos[i - 1][0] + (puntos[i][0] - puntos[i - 1][0]) * t,
        puntos[i - 1][1] + (puntos[i][1] - puntos[i - 1][1]) * t,
      ];
    }
  }
  return puntos[puntos.length - 1];
}

/* Cuánto tramo de calle, a cada lado del rótulo, se promedia para sacar su
   dirección (fracción de la longitud), y cuánto mide la recta guía a cada
   lado (px). La recta va sobrada de largo para que quepa el nombre entero. */
const VENTANA = 0.18;
const MEDIA_GUIA = 90;

/** La recta guía del rótulo: pasa por el punto elegido con la dirección media del tramo. */
function guiaDe(d, en) {
  const puntos = puntosDe(d);
  const f = parseFloat(en) / 100;
  const centro = puntoEn(puntos, f);
  const a = puntoEn(puntos, Math.max(0, f - VENTANA));
  const b = puntoEn(puntos, Math.min(1, f + VENTANA));
  const largo = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
  const ux = (b[0] - a[0]) / largo;
  const uy = (b[1] - a[1]) / largo;
  const x0 = centro[0] - ux * MEDIA_GUIA;
  const y0 = centro[1] - uy * MEDIA_GUIA;
  const x1 = centro[0] + ux * MEDIA_GUIA;
  const y1 = centro[1] + uy * MEDIA_GUIA;
  return `M${x0.toFixed(1)},${y0.toFixed(1)} L${x1.toFixed(1)},${y1.toFixed(1)}`;
}

/* La oficina, en coordenadas del plano: acera este de la Castellana, justo
   al norte de la boca de San Germán. Colocada sobre el plano real. */
const OFICINA = { x: 191, y: 216 };

/* Rótulo de cada calle y en qué punto de su recorrido se centra (0–100 %).
   El centro del tramo visible no siempre es el mejor sitio: en la Castellana
   se queda a la altura de la oficina, por el eje central de las calzadas. */
const CALLES_ROTULO = [
  { id: "castellana", texto: "Paseo de la Castellana", en: "49%", eje: true },
  { id: "san-german", texto: "C. de San Germán", en: "50%" },
  { id: "fleming", texto: "C. del Dr. Fleming", en: "32%" },
  { id: "alcocer", texto: "Av. de Alberto Alcocer", en: "60%" },
  { id: "habana", texto: "P.º de la Habana", en: "64%" },
];

/* Material Symbols Outlined · directions_subway (24px, wght 400), del
   catálogo oficial. Nunca redibujado. */
function IconoMetro({ x, y }) {
  return (
    <g className="v4-mapa__metro" transform={`translate(${x - 7} ${y - 7})`}>
      <circle cx="7" cy="7" r="8" />
      <svg x="1" y="1" width="12" height="12" viewBox="0 -960 960 960" aria-hidden="true">
        <path d="M240-120v-40l60-40q-59 0-99.5-40.5T160-340v-380q0-83 77-121.5T480-880q172 0 246 37t74 123v380q0 59-40.5 99.5T660-200l60 40v40H240Zm0-440h200v-120H240v120Zm420 80H240h480-60Zm-140-80h200v-120H520v120ZM340-320q25 0 42.5-17.5T400-380q0-25-17.5-42.5T340-440q-25 0-42.5 17.5T280-380q0 25 17.5 42.5T340-320Zm280 0q25 0 42.5-17.5T680-380q0-25-17.5-42.5T620-440q-25 0-42.5 17.5T560-380q0 25 17.5 42.5T620-320Zm-320 40h360q26 0 43-17t17-43v-140H240v140q0 26 17 43t43 17Zm180-520q-86 0-142.5 10T258-760h448q-18-20-74.5-30T480-800Zm0 40h226-448 222Z" />
      </svg>
    </g>
  );
}

/** `descripcion` es el texto alternativo del plano, en el idioma de la página. */
export default function MapaOficina({ descripcion }) {
  const cuzco = METROS.find((m) => m.nombre === "Cuzco");
  const bernabeu = METROS.find((m) => m.nombre === "Santiago Bernabéu");

  return (
    <svg
      className="v4-mapa"
      viewBox="0 0 400 400"
      role="img"
      aria-label={descripcion}
    >
      <defs>
        {CALLES_ROTULO.map((r) => {
          const via = VIAS_ROTULO.find((v) => v.id === r.id);
          return via ? (
            <path key={r.id} id={`v4-mapa-via-${r.id}`} d={guiaDe(via.d, r.en)} />
          ) : null;
        })}
      </defs>

      <g className="v4-mapa__parques">
        {PARQUES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      {ESTADIO.map((d) => (
        <path key={d} className="v4-mapa__estadio" d={d} />
      ))}
      <g className="v4-mapa__menores">
        {MENORES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g className="v4-mapa__calles">
        {CALLES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
      <g className="v4-mapa__ejes">
        {EJES.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>

      <g className="v4-mapa__rotulo">
        {CALLES_ROTULO.map((r) => (
          <text key={r.id} className={r.eje ? "v4-mapa__rotulo--eje" : undefined}>
            <textPath href={`#v4-mapa-via-${r.id}`} startOffset="50%" textAnchor="middle">
              {r.texto}
            </textPath>
          </text>
        ))}
        <text x="233" y="339" textAnchor="middle">
          Estadio
        </text>
        <text x="233" y="351" textAnchor="middle">
          Santiago
        </text>
        <text x="233" y="363" textAnchor="middle">
          Bernabéu
        </text>
        {cuzco ? (
          <text x={cuzco.x + 12} y={cuzco.y + 4}>
            Cuzco
          </text>
        ) : null}
        {bernabeu ? (
          <text x={bernabeu.x - 12} y={bernabeu.y + 4} textAnchor="end">
            Santiago Bernabéu
          </text>
        ) : null}
      </g>

      {cuzco ? <IconoMetro x={cuzco.x} y={cuzco.y} /> : null}
      {bernabeu ? <IconoMetro x={bernabeu.x} y={bernabeu.y} /> : null}

      <g className="v4-mapa__oficina">
        <circle className="v4-mapa__halo" cx={OFICINA.x} cy={OFICINA.y} r="16" />
        <circle className="v4-mapa__punto" cx={OFICINA.x} cy={OFICINA.y} r="6" />
      </g>

      <text className="v4-mapa__credito" x="392" y="393" textAnchor="end">
        © OpenStreetMap
      </text>
    </svg>
  );
}
