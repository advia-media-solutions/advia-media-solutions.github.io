import React, { useEffect, useRef } from "react";
import escenaMerecePena from "./escena";

/**
 * La esfera del hero.
 *
 * Está en su forma final —corona 0.63 y fusión 6.0, con las doce bolas ya
 * distinguiéndose— y gira despacio sobre sí misma. Nada más: no se desmonta, no
 * suelta bolas y no reacciona al scroll.
 *
 * Antes sí lo hacía: el lienzo era fijo, cubría la ventana entera y las doce
 * bolas se iban desprendiendo y clavando a lo largo de toda la página. Se
 * retiró porque una pieza que acompaña TODA la portada compite con lo que se
 * lee en cada sección, y porque el gesto de soltar bolas ya cuenta algo
 * concreto en /active-navigation —un recorrido con sus paradas—, donde tiene
 * sentido. Aquí el lienzo se queda dentro del hero, que es lo que ilustra.
 */
export default function EsferaHero() {
  const lienzo = useRef(null);
  const motor = useRef(null);

  useEffect(() => {
    let vivo = true;
    const canvas = lienzo.current;
    if (!canvas || !escenaMerecePena(canvas)) return undefined;

    import("./EsferaFacetada")
      .then(({ default: crearEsfera }) => {
        if (!vivo) return;
        const m = crearEsfera(canvas, {
          fondo: "#FCFDFD",
          /* Desplaza la cámara para que la esfera quede a la derecha, junto al
             lema y no encima de él. */
          corrimiento: 1,
          escalaCuerpo: 0.8,
        });
        requestAnimationFrame(() =>
          requestAnimationFrame(() => {
            if (!vivo) return;
            m.prepararFinal();
            motor.current = m;
            canvas.parentElement.dataset.listo = "true";
          })
        );
      })
      .catch(() => {
        /* Sin WebGL o sin three, el hero se queda como estaba: solo texto. */
      });

    return () => {
      vivo = false;
      if (motor.current) motor.current.destruir();
      motor.current = null;
    };
  }, []);

  return (
    <>
      <div className="v4-hero__pieza" aria-hidden="true">
        <canvas ref={lienzo} />
      </div>
      {/* En móvil la escena no se monta (ver escena.js) y en su lugar va la
          misma esfera, quieta: un fotograma del render de escritorio en WebP,
          que pesa lo que un icono. El hero es una columna flex y el CSS la
          ordena detrás del texto; en escritorio no existe. */}
      <img
        className="v4-hero__esfera-fija"
        src="/img/esfera-hero.webp"
        alt=""
        width="510"
        height="400"
        decoding="async"
      />
    </>
  );
}
