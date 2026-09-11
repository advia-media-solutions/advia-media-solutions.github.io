import React from "react";

/**
 * BOCETO · La Navegación Activa es rica.
 *
 * Tres consumidores que acaban en el mismo producto por razones distintas y
 * pasando por sitios distintos. Es el argumento de la sección dibujado: si el
 * destino coincide pero el camino no, no se puede planificar por el destino.
 *
 * Está deliberadamente en estático y marcado como boceto: la pieza definitiva
 * se animará —los tres caminos trazándose a la vez, convergiendo—, pero el
 * contenido ya se lee, y así se valida antes de invertir en el movimiento.
 */
export default function Caminos({ nota, destino, consumidores }) {
  return (
    <figure className="v4-caminos">
      <figcaption className="v4-label v4-label--faint v4-caminos__nota">{nota}</figcaption>
      <div className="v4-caminos__cuerpo">
        <ol className="v4-caminos__lista">
          {consumidores.map((c) => (
            <li className="v4-camino" key={c.quien}>
              <div className="v4-camino__quien">
                <span className="v4-body v4-strong">{c.quien}</span>
                <span className="v4-camino__motivo">{c.motivo}</span>
              </div>
              <div className="v4-camino__paradas">
                {c.paradas.map((parada, i) => (
                  <React.Fragment key={`${parada}-${i}`}>
                    {i > 0 ? (
                      <span className="v4-camino__flecha" aria-hidden="true">
                        →
                      </span>
                    ) : null}
                    <span className="v4-chip">{parada}</span>
                  </React.Fragment>
                ))}
              </div>
            </li>
          ))}
        </ol>
        <div className="v4-caminos__destino">
          <span className="v4-caminos__llave" aria-hidden="true" />
          <span className="v4-body v4-strong">{destino}</span>
        </div>
      </div>
    </figure>
  );
}
