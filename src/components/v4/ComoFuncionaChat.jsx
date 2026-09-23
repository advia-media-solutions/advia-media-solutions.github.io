import React, { useMemo } from "react";
import {
  cl,
  ease,
  entra,
  escenaEn,
  local,
  progreso,
  ventana,
  INICIOS,
  FINALES,
} from "./comoFuncionaTiempo";

/**
 * Las tres primeras escenas comparten pantalla: la conversación con ChatGPT a
 * la izquierda y, al lado, lo que se saca de ella en cada paso —los agentes
 * que preguntan, las marcas que aparecen, las fuentes que cita—.
 *
 * La respuesta viene del diccionario con marcas cortas: <m> marca de otro,
 * <o> la marca del cliente, <c> una cita. Aquí se trocea y se escribe letra a
 * letra; el escáner ilumina las marcas al pasar y luego se encienden las citas.
 */

export const MARCA = "BYD";
export const CONVERSACIONES = 1240;

const MENCIONES = [
  ["Tesla", 471],
  ["Hyundai", 298],
  ["Volkswagen", 211],
  [MARCA, 149],
  ["MG", 111],
];

const FUENTES = [
  ["comparativaselectricos.es", "/suv-familiares-2026"],
  ["foro-ev.net", "/hilo/autonomia-real"],
  ["revistamotor.es", "/pruebas/suv-electricos"],
  ["guiacompra.com", "/coches/maletero"],
];

/* Trocea la respuesta y anota dónde empieza cada trozo en la cuenta de letras.
   Una cita cuenta como una sola letra: aparece de golpe. */
function trocear(texto) {
  let pos = 0;
  return [...texto.matchAll(/<([moc])>(.*?)<\/\1>|([^<]+)/g)].map(([, k, dentro, suelto]) => {
    const trozo = { k: k || "t", txt: k ? dentro : suelto, inicio: pos };
    trozo.largo = trozo.k === "c" ? 1 : trozo.txt.length;
    pos += trozo.largo;
    return trozo;
  });
}

/* Lo que aún no se ha escrito ocupa su sitio sin verse: así el marco tiene el
   mismo alto de principio a fin y nada salta mientras la respuesta llega. */
const Resto = ({ children }) => (
  <span className="v4-cf-chat__resto" aria-hidden="true">
    {children}
  </span>
);

function Respuesta({ t, texto }) {
  const trozos = useMemo(() => trocear(texto), [texto]);
  const total = trozos.reduce((n, z) => n + z.largo, 0);
  const escena = escenaEn(t);
  const escrito = total * cl((t - 2.3) / 2.4);
  const barrido = cl((local(t, 1) - 0.3) / 2.6);

  return (
    <div className="v4-cf-chat__respuesta">
      <p>
        {trozos.map((z, i) => {
          const vistas = Math.max(0, Math.min(z.largo, Math.ceil(escrito - z.inicio)));
          const marca = z.k === "m" || z.k === "o";
          const detectada = marca && escena >= 1 && (escena > 1 || barrido >= z.inicio / total);
          const citada =
            z.k === "c" && escena === 2 && local(t, 2) > 0.4 + (Number(z.txt) - 1) * 0.55;
          return (
            <span
              key={i}
              className={`v4-cf-chat__trozo v4-cf-chat__trozo--${z.k}`}
              data-detectada={detectada || undefined}
              data-citada={citada || undefined}
              data-pendiente={!vistas || undefined}
            >
              {z.k === "c" ? z.txt : z.txt.slice(0, vistas)}
              {z.k !== "c" && vistas < z.largo ? <Resto>{z.txt.slice(vistas)}</Resto> : null}
            </span>
          );
        })}
      </p>
      <span
        className="v4-cf-chat__escaner"
        aria-hidden="true"
        style={{
          top: `${barrido * 100}%`,
          opacity: escena === 1 && barrido > 0 && barrido < 1 ? 1 : 0,
        }}
      />
    </div>
  );
}

function Conversacion({ t, c }) {
  const escena = escenaEn(t);
  const prompt = c("chat.prompt");
  const escrita = prompt.slice(0, Math.round(prompt.length * cl((t - 0.5) / 1.6)));
  const cursor = t < 2.3 && Math.floor(t * 2.5) % 2 === 0;
  const estado = ["preguntando", "respondiendo", "escaneando", "extrayendo"][
    escena === 0 ? (t < 2.3 ? 0 : 1) : escena + 1
  ];

  return (
    <div className="v4-cf-chat">
      <div className="v4-cf-chat__barra">
        <span className="v4-cf-chat__motor">ChatGPT</span>
        <span className="v4-cf-chat__estado">
          <span
            className="v4-cf-chat__pulso"
            style={{ opacity: 0.675 + 0.325 * Math.sin(t * 6) }}
          />
          {c(`chat.estados.${estado}`)}
        </span>
      </div>
      <div className="v4-cf-chat__cuerpo">
        <div className="v4-cf-chat__pregunta">
          <span className="v4-cf__micro">{c("chat.agente")}</span>
          <div className="v4-cf-chat__burbuja">
            {escrita}
            <span className="v4-cf-chat__caret" style={{ opacity: cursor ? 1 : 0 }} />
            <Resto>{prompt.slice(escrita.length)}</Resto>
          </div>
        </div>
        <Respuesta t={t} texto={c("chat.respuesta")} />
      </div>
    </div>
  );
}

function Agentes({ t, c, fmt }) {
  const lista = c("agentes.lista", { returnObjects: true });
  return (
    <div className="v4-cf-lado" style={{ opacity: ventana(t, INICIOS[0], FINALES[0]) }}>
      <span className="v4-label">{c("agentes.rotulo")}</span>
      {lista.map((a, i) => {
        const o = cl((t - 0.2 - i * 0.5) / 0.4);
        return (
          <div
            key={a.id}
            className="v4-cf-agente"
            data-sobra={i >= 2 || undefined}
            style={entra(o, "Y", 8)}
          >
            <span className="v4-cf__micro">
              {a.id}
              <span className="v4-cf-agente__perfil"> · {a.perfil}</span>
            </span>
            <span className="v4-cf-agente__pregunta">{a.pregunta}</span>
            <span className="v4-cf__pastilla">{c("agentes.enCurso")}</span>
          </div>
        );
      })}
      <div className="v4-cf-agentes__total">
        <span className="v4-label">{c("agentes.conversaciones")}</span>
        <span className="v4-kpi">{fmt(CONVERSACIONES * ease(progreso(t, 0) * 1.05))}</span>
      </div>
    </div>
  );
}

function Menciones({ t, c, fmt }) {
  const k = ease((local(t, 1) - 0.3) / 2.8);
  return (
    <div className="v4-cf-lado" style={{ opacity: ventana(t, INICIOS[1], FINALES[1]) }}>
      <span className="v4-label">{c("menciones.rotulo", { n: fmt(CONVERSACIONES) })}</span>
      {MENCIONES.map(([nombre, v]) => (
        <div key={nombre} className="v4-cf-mencion" data-propia={nombre === MARCA || undefined}>
          <span className="v4-cf-mencion__nombre">{nombre}</span>
          <span className="v4-cf-mencion__cifra">{fmt(v * k)}</span>
          <span className="v4-cf-pista v4-cf-mencion__pista">
            <span className="v4-cf-pista__valor" style={{ width: `${((v * k) / 471) * 100}%` }} />
          </span>
        </div>
      ))}
    </div>
  );
}

function Fuentes({ t, c }) {
  const activa = escenaEn(t) === 2;
  return (
    <div className="v4-cf-lado" style={{ opacity: ventana(t, INICIOS[2], FINALES[2]) }}>
      <span className="v4-label">{c("fuentes.rotulo")}</span>
      {FUENTES.map(([dominio, ruta], i) => {
        const o = activa ? cl((local(t, 2) - 0.4 - i * 0.55) / 0.35) : 0;
        return (
          <div key={dominio} className="v4-cf-fuente" style={entra(o, "X", -12)}>
            <span className="v4-cf-fuente__num">{i + 1}</span>
            <span className="v4-cf-fuente__texto">
              <span className="v4-cf-fuente__dominio">{dominio}</span>
              <span className="v4-cf__micro v4-cf-fuente__ruta">{ruta}</span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default function EscenaChat({ t, c, fmt }) {
  return (
    <div className="v4-cf-chat-escena">
      <Conversacion t={t} c={c} />
      <div className="v4-cf-lados">
        <Agentes t={t} c={c} fmt={fmt} />
        <Menciones t={t} c={c} fmt={fmt} />
        <Fuentes t={t} c={c} />
      </div>
    </div>
  );
}
