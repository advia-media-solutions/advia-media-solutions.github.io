import React from "react";
import T from "./T";
import { Key } from "./primitives";
import { cl, ease, entra, escenaEn, local } from "./comoFuncionaTiempo";
import { MARCA, CONVERSACIONES } from "./ComoFuncionaChat";

/**
 * Las cuatro escenas que vienen después de la conversación: qué fuentes pesan,
 * el plan de artículos, el calendario en la red de publishers y la nueva
 * medición. Cada una recibe el reloj y dibuja su instante; las cifras son de
 * ejemplo y viven aquí, los textos en `plataforma` del diccionario.
 */

const RELEVANCIA = [
  ["comparativaselectricos.es", 92],
  ["revistamotor.es", 84],
  ["foro-ev.net", 71],
  ["youtube.com", 58],
  ["guiacompra.com", 46],
  ["wikipedia.org", 31],
];
const UMBRAL = 70;

/* A qué fuente responde cada artículo del plan. */
const RESPONDE_A = ["comparativaselectricos.es", "revistamotor.es", "foro-ev.net", "youtube.com"];

/* Cada publicación: [artículo, publisher, semana]. */
const PUBLICACIONES = [
  [0, 0, 0], [0, 1, 0], [2, 2, 1], [1, 0, 1], [0, 5, 1],
  [2, 3, 2], [3, 1, 2], [1, 4, 2], [3, 2, 3], [3, 4, 3],
];
const SEMANAS = [0, 1, 2, 3];

/* Share of Answer antes y después de la activación, en %. */
const ANTES = { Tesla: 38, Hyundai: 24, Volkswagen: 17, [MARCA]: 12, MG: 9 };
const DESPUES = { Tesla: 31, [MARCA]: 27, Hyundai: 19, Volkswagen: 14, MG: 9 };
const ALTO_FILA = 52;

const clave = <Key animado={false} />;
const fuerte = <strong className="v4-key" />;

function Cabeza({ tr, c, k, sub, valores }) {
  return (
    <div className="v4-cf-cabeza">
      <span className="v4-label">{c(`${k}.rotulo`)}</span>
      <h3 className="v4-cf-cabeza__titulo">
        <T t={tr} k={`plataforma.${k}.titulo`} components={{ key: clave }} />
      </h3>
      {sub ? <p className="v4-cf-cabeza__sub">{c(`${k}.sub`, valores)}</p> : null}
    </div>
  );
}

export function EscenaRelevancia({ t, tr, c }) {
  const tipos = c("relevancia.tipos", { returnObjects: true });
  const lt = local(t, 3);
  return (
    <>
      <Cabeza tr={tr} c={c} k="relevancia" sub />
      <div className="v4-cf-relevancia">
        {RELEVANCIA.map(([dominio, nota], i) => {
          const g = ease((lt - 0.3 - i * 0.2) / 1);
          const alta = nota >= UMBRAL;
          return (
            <div key={dominio} className="v4-cf-rel" data-alta={alta || undefined}>
              <span className="v4-cf-rel__fuente">
                <span className="v4-cf-rel__dominio">{dominio}</span>
                <span className="v4-cf-rel__tipo">{tipos[i]}</span>
              </span>
              <span className="v4-cf-pista v4-cf-rel__pista">
                <span className="v4-cf-pista__valor" style={{ width: `${nota * g}%` }} />
              </span>
              <span className="v4-cf-rel__nota">{Math.round(nota * g)}</span>
              <span
                className="v4-cf-rel__marca"
                style={{ opacity: alta ? cl((lt - 2.2) / 0.4) : 0 }}
              >
                {c("relevancia.prioritaria")}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}

export function EscenaPlan({ t, tr, c }) {
  const articulos = c("plan.articulos", { returnObjects: true });
  return (
    <>
      <Cabeza tr={tr} c={c} k="plan" />
      <div className="v4-cf-plan">
        {articulos.map((a, i) => {
          const o = cl((local(t, 4) - 0.3 - i * 0.45) / 0.4);
          return (
            <article key={a.titulo} className="v4-cf-art" style={entra(o, "Y", 12)}>
              <div className="v4-cf-art__cabeza">
                <span className="v4-cf__etiqueta">{a.tipo}</span>
                <span className="v4-cf__micro">ART-0{i + 1}</span>
              </div>
              <span className="v4-cf-art__titulo">{a.titulo}</span>
              <span className="v4-cf__micro v4-cf-art__fuente">
                {c("plan.respondeA")} · {RESPONDE_A[i]}
              </span>
            </article>
          );
        })}
      </div>
    </>
  );
}

function Fila({ nombre, p, avance }) {
  return (
    <div className="v4-cf-cal__fila">
      <span className="v4-cf-cal__pub">{nombre}</span>
      {SEMANAS.map((w) => (
        <span key={w} className="v4-cf-cal__celda">
          {PUBLICACIONES.filter(([, pub, sem]) => pub === p && sem === w).map(([art]) => {
            const o = cl((avance * 4 - w - 0.35) / 0.3);
            return (
              <span
                key={art}
                className="v4-cf-cal__chip"
                style={{ opacity: o, transform: `scale(${0.8 + 0.2 * o})` }}
              >
                <span className="v4-cf-cal__prefijo">ART-</span>0{art + 1}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
}

export function EscenaCalendario({ t, tr, c }) {
  const publishers = c("calendario.publishers", { returnObjects: true });
  const articulos = c("plan.articulos", { returnObjects: true });
  const activa = escenaEn(t) === 5;
  const avance = activa ? cl((local(t, 5) - 0.4) / 4.2) : 0;
  const hechas = PUBLICACIONES.filter(([, , w]) => avance * 4 - w - 0.35 >= 0.3).length;

  return (
    <>
      <div className="v4-cf-cal__arriba">
        <Cabeza tr={tr} c={c} k="calendario" />
        <span className="v4-mono">
          {c("calendario.publicaciones", { n: hechas, total: PUBLICACIONES.length })}
        </span>
      </div>
      <div className="v4-cf-cal">
        <div className="v4-cf-cal__fila v4-cf-cal__fila--cabeza">
          <span />
          {SEMANAS.map((w) => (
            <span key={w} className="v4-cf__micro">{c("calendario.semana", { n: w + 1 })}</span>
          ))}
        </div>
        {publishers.map((nombre, p) => (
          <Fila key={nombre} nombre={nombre} p={p} avance={avance} />
        ))}
        <span
          className="v4-cf-cal__cabezal"
          aria-hidden="true"
          style={{ "--avance": avance, opacity: avance > 0 && avance < 1 ? 1 : 0 }}
        />
      </div>
      <div className="v4-cf-cal__leyenda">
        {articulos.map((a, i) => (
          <span key={a.titulo}>
            <strong>0{i + 1}</strong> {a.tipo}
          </span>
        ))}
      </div>
    </>
  );
}

function filasRanking(k) {
  const valores = Object.keys(ANTES).map((n) => ({
    n,
    v: ANTES[n] + (DESPUES[n] - ANTES[n]) * k,
  }));
  const orden = [...valores].sort((a, b) => b.v - a.v).map((x) => x.n);
  return valores.map(({ n, v }) => ({
    n,
    v,
    puesto: orden.indexOf(n),
    delta: Math.round(v - ANTES[n]),
  }));
}

export function EscenaMedicion({ t, tr, c, fmt }) {
  const activa = escenaEn(t) === 6;
  const k = activa ? ease((local(t, 6) - 0.9) / 2.2) : 0;
  const final = DESPUES[MARCA] - ANTES[MARCA];
  return (
    <>
      <Cabeza tr={tr} c={c} k="medicion" sub valores={{ n: fmt(CONVERSACIONES) }} />
      <div className="v4-cf-rank" style={{ height: Object.keys(ANTES).length * ALTO_FILA - 8 }}>
        {filasRanking(k).map((f) => (
          <div
            key={f.n}
            className="v4-cf-rank__fila"
            data-propia={f.n === MARCA || undefined}
            style={{ transform: `translateY(${f.puesto * ALTO_FILA}px)` }}
          >
            <span className="v4-cf-rank__puesto">{f.puesto + 1}</span>
            <span className="v4-cf-rank__nombre">{f.n}</span>
            <span className="v4-cf-pista v4-cf-rank__pista">
              <span className="v4-cf-pista__valor" style={{ width: `${(f.v / 40) * 100}%` }} />
            </span>
            <span className="v4-cf-rank__pct">{Math.round(f.v)}%</span>
            <span className="v4-cf-rank__delta">
              <span
                className="v4-cf__delta"
                style={{ opacity: f.n === MARCA && f.delta > 0 ? 1 : 0 }}
              >
                +{f.delta} pp
              </span>
            </span>
          </div>
        ))}
      </div>
      <div
        className="v4-cf-resumen"
        style={{ opacity: activa ? cl((local(t, 6) - 3.4) / 0.5) : 0 }}
      >
        <span>
          <T t={tr} k="plataforma.medicion.resumen" components={{ key: fuerte }} />
        </span>
        <span className="v4-cf__delta v4-cf-resumen__delta">+{final} pp</span>
      </div>
    </>
  );
}
