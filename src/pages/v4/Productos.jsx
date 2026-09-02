import React from "react";
import Seo from "../../components/v4/Seo";
import { Cabecera, Cierre, Hero, Pagina, Section, Split } from "../../components/v4/layout";
import { Boton, Door, Key } from "../../components/v4/primitives";
import { ListaPanel } from "../../components/v4/blocks";
import Ramas from "../../components/v4/Ramas";

/** Productos · el hub. Enseña por qué hay dos productos; no los lista. */

/* Los canales del esquema (wireframe §02): dos donde la presencia se compra y
   dos donde se fabrica. El orden agrupa; el tag remata. */
const CANALES = [
  {
    titulo: "Open Web",
    desc: "Hay inventario. La presencia se compra.",
    tag: "Paid Media",
    via: "compra",
  },
  {
    titulo: "YouTube",
    desc: "Hay inventario. La presencia se compra.",
    tag: "Paid Media",
    via: "compra",
  },
  {
    titulo: "Redes sociales",
    desc: "Canal de descubrimiento. La presencia se fabrica.",
    tag: "GEO",
    via: "fabrica",
  },
  {
    titulo: "Respuestas de los LLMs",
    desc: "No hay inventario. La presencia se fabrica.",
    tag: "GEO",
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
          lede="En unos la presencia se compra; en otros se fabrica. No es una decisión nuestra: la impone el canal."
        />
        <div className="v4-mt-16">
          <Ramas raiz="Navegación Activa" items={CANALES} />
        </div>
        <p className="v4-label v4-label--faint v4-mt-8">
          Pendiente de confirmar: cómo se activa redes sociales y si la lista de canales se cierra
          aquí.
        </p>
      </Section>

      <Section surface="graphite">
        <Split>
          <div>
            <Cabecera
              eyebrow="Donde la respuesta se compra"
              eyebrowTamano="m"
              ancho="100%"
              titular={
                <>
                  Navegación Activa en <Key>Paid Media</Key>
                </>
              }
              lede="Campañas en Open Web y YouTube colocadas sobre las fuentes que tu consumidor consulta mientras compara."
            />
            <div className="v4-mt-8">
              <Door href="/products/paid-media">Ver el producto</Door>
            </div>
          </div>
          <ListaPanel items={["Territorios", "Producto", "Local"]} />
        </Split>
      </Section>

      <Section>
        <Split cols="2-3">
          <ListaPanel
            items={["Medimos cómo estás", "Diseñamos la estrategia", "Creamos el contenido"]}
          />
          <div>
            <Cabecera
              eyebrow="Donde la respuesta se fabrica"
              eyebrowTamano="m"
              ancho="100%"
              titular={
                <>
                  Visibilidad Intencional en IA: <Key>GEO</Key>
                </>
              }
              lede="No hay inventario que comprar. La única vía es ser la fuente que el modelo cita, y eso se construye."
            />
            <div className="v4-mt-8">
              <Door href="/products/geo">Ver el producto</Door>
            </div>
          </div>
        </Split>
      </Section>

      <Cierre
        titular={
          <>
            Precampaña: qué está preguntando tu consumidor, <Key>antes de activar</Key>
          </>
        }
        lede="Nos cuentas el objetivo, simulamos el recorrido de tu target y te enseñamos dónde puedes responderle."
        cta={<Boton href="/contact">Pedir un análisis precampaña</Boton>}
      />
    </Pagina>
  );
}
