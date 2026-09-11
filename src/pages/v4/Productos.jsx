import React from "react";
import Seo from "../../components/v4/Seo";
import { Cabecera, Cierre, Hero, Pagina, Section } from "../../components/v4/layout";
import { Boton, Door, Key } from "../../components/v4/primitives";
import Ramas from "../../components/v4/Ramas";

/** Productos · el hub. Enseña por qué hay dos productos; no los lista. */

/* Dos familias, no cuatro canales sueltos: es la estructura que ordena todo el
   producto. En una la presencia se compra; en la otra hay que fabricarla —y
   además se puede comprar, desde que ChatGPT tiene publicidad. */
const FAMILIAS = [
  {
    titulo: "Canales digitales convencionales",
    desc: "Donde ya hay inventario: la presencia se compra.",
    canales: ["Web", "YouTube", "Redes sociales"],
    tag: "Canales Digitales",
    via: "compra",
  },
  {
    titulo: "Entornos conversacionales",
    desc: "Donde contesta un modelo: la presencia se fabrica, y en ChatGPT además se compra.",
    canales: ["Respuesta orgánica", "Publicidad en ChatGPT"],
    tag: "Entornos Conversacionales",
    via: "fabrica",
  },
];

export default function Productos() {
  return (
    <Pagina activo="Productos">
      <Seo
        path="/products"
        title="Productos — dónde se compra la presencia y dónde se fabrica | Advia"
        description="La Navegación Activa ocurre en canales que funcionan distinto. Donde hay inventario la presencia se compra; donde no lo hay, se fabrica."
      />

      <Hero
        titular={
          <>
            La Navegación Activa ocurre en todos los canales donde tu consumidor{" "}
            <Key>busca</Key>
          </>
        }
        lede="Cada canal funciona distinto."
      />

      <Section>
        <Cabecera
          titular={
            <>
              La Navegación Activa ocurre en distintos canales, y te posicionamos en{" "}
              <Key>todos</Key>
            </>
          }
          lede="En unos la presencia se compra; en otros se fabrica."
        />
        <div className="v4-mt-16">
          <Ramas raiz="Navegación Activa" items={FAMILIAS} />
        </div>
      </Section>

      <Section surface="graphite">
        <Cabecera
          ancho="100%"
          titular={
            <>
              Navegación Activa en <Key>Canales Digitales</Key>
            </>
          }
          lede="Campañas en web, YouTube y tus redes sociales, colocadas sobre las fuentes que tu consumidor consulta mientras compara."
        />
        <div className="v4-mt-8">
          <Door href="/products/paid-media">Ver el producto</Door>
        </div>
      </Section>

      <Section>
        <Cabecera
          ancho="100%"
          titular={
            <>
              Navegación Activa en <Key>Entornos Conversacionales</Key>
            </>
          }
          lede="Paid media en ChatGPT y presencia orgánica en todos los modelos de IA. Vera entiende cómo se posiciona tu marca de manera orgánica en los modelos conversacionales y desarrolla una estrategia de mejora en base a las fuentes que el modelo utiliza."
        />
        <div className="v4-mt-8">
          <Door href="/products/geo">Ver el producto</Door>
        </div>
      </Section>

      <Cierre
        titular={
          <>
            Capitaliza la Navegación Activa en <Key>todos los canales</Key>
          </>
        }
        lede="Nos cuentas el objetivo, simulamos el recorrido de tu consumidor y te enseñamos dónde puedes responderle."
        cta={<Boton href="/contact">Entender mi Navegación Activa</Boton>}
      />
    </Pagina>
  );
}
