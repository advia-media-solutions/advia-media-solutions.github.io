import React from "react";

/**
 * BOCETO · Un agente, entre cientos.
 *
 * Lo que hace concreto todo lo anterior: una ficha de agente, las preguntas que
 * se hace por culpa de sus factores de decisión, y los sitios donde aterriza
 * una de esas preguntas. El pie recuerda lo que no se puede dibujar —que detrás
 * hay cientos corriendo a la vez—, que es de donde sale el volumen planificable.
 *
 * En estático y marcado como boceto: la pieza definitiva se animará, pero el
 * contenido ya se lee y así se valida antes de invertir en el movimiento.
 */
export default function AgenteEjemplo({ nota, agente, preguntas, aterriza, pie }) {
  return (
    <figure className="v4-agente">
      <figcaption className="v4-label v4-label--faint">{nota}</figcaption>

      <div className="v4-agente__ficha">
        <div className="v4-label v4-label--gold">El agente</div>
        <p className="v4-subheading">{agente.quien}</p>
        <dl className="v4-agente__campos">
          {agente.campos.map((campo) => (
            <div className="v4-agente__campo" key={campo.clave}>
              <dt className="v4-label v4-label--faint">{campo.clave}</dt>
              <dd className="v4-body">{campo.valor}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="v4-agente__flujo">
        <div className="v4-label v4-label--faint">Se hace estas preguntas</div>
        <ol className="v4-agente__preguntas">
          {preguntas.map((p, i) => (
            <li className="v4-agente__pregunta" key={p.texto} data-abierta={p.abre ? "true" : undefined}>
              <span className="v4-agente__num">{`0${i + 1}`}</span>
              <span className="v4-body">{p.texto}</span>
              <span className="v4-chip">{p.donde}</span>
            </li>
          ))}
        </ol>

        <div className="v4-agente__salida">
          <div className="v4-label v4-label--faint">{aterriza.rotulo}</div>
          <ul className="v4-agente__sitios">
            {aterriza.sitios.map((sitio) => (
              <li className="v4-body" key={sitio}>
                {sitio}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="v4-agente__pie">{pie}</p>
    </figure>
  );
}
