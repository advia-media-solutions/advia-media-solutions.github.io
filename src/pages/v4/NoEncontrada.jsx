import React from "react";
import Seo from "../../components/v4/Seo";
import { Cierre, Hero, Pagina } from "../../components/v4/layout";
import { Boton, Door, Key } from "../../components/v4/primitives";

/**
 * 404.
 *
 * No es sitio para vender: alguien buscaba algo y no está. Se dice, y se dan
 * las tres puertas que cubren casi todo lo que puede estar buscando.
 */
export default function NoEncontrada() {
  return (
    <Pagina>
      <Seo path="/404" title="Página no encontrada | Advia" description="Esta página no existe." />
      <Hero
        titular={
          <>
            Esta página no <Key>existe</Key>
          </>
        }
        lede="Puede que el enlace esté mal, o que la página ya no esté donde estaba. Desde aquí se llega a todo lo demás."
        acciones={<Boton href="/">Volver al inicio</Boton>}
      />
      <Cierre
        titular={
          <>
            Lo que probablemente venías a <Key>buscar</Key>
          </>
        }
        doors={
          <>
            <Door href="/navegacion-activa">Qué es la Navegación Activa</Door>
            <Door href="/products">Qué activamos</Door>
            <Door href="/blog">El blog</Door>
          </>
        }
      />
    </Pagina>
  );
}
