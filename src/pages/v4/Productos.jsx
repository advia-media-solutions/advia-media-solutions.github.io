import React from "react";
import Seo from "../../components/v4/Seo";
import { Banda, Cabecera, Cierre, Hero, Pagina, Section, Split } from "../../components/v4/layout";
import { Boton, Chips, Door, Key } from "../../components/v4/primitives";
import { Filas, ListaPanel } from "../../components/v4/blocks";

/** Productos · el hub. Enseña por qué hay dos productos; no los lista. */

const SUPERFICIES = ["Buscador", "Web abierta", "Vídeo", "Respuesta de la IA"];

const PUENTE = [
  {
    num: "01",
    titulo: "Open Web",
    desc: "Lee análisis, pruebas y comparativas.",
    rotulo: "La presencia",
    eco: "Se compra: hay inventario y se puja por él",
    tag: "Paid Media",
  },
  {
    num: "02",
    titulo: "YouTube",
    desc: "Busca la review larga antes de cerrar.",
    rotulo: "La presencia",
    eco: "Se compra: hay inventario y se puja por él",
    tag: "Paid Media",
  },
  {
    num: "03",
    titulo: "Redes sociales",
    desc: "Descubre, aunque no venía buscando.",
    rotulo: "La presencia",
    eco: "Se fabrica: hay que ser el contenido que circula",
    tag: "GEO",
  },
  {
    num: "04",
    titulo: "Respuestas de los LLMs",
    desc: "Pregunta directamente qué le conviene.",
    rotulo: "La presencia",
    eco: "Se fabrica: hay que ser la fuente que el modelo cita",
    tag: "GEO",
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
        eyebrow="Las activaciones"
        titular={
          <>
            Cada sitio donde pregunta admite una forma distinta de <Key>respuesta</Key>.
          </>
        }
        lede="Esta página no lista productos: explica por qué hay dos antes de que elijas puerta."
        banda={
          <Banda caption="Dónde pregunta tu consumidor">
            <Chips items={SUPERFICIES} />
          </Banda>
        }
      />

      <Section>
        <Cabecera
          eyebrow="El puente"
          titular={
            <>
              Donde hay inventario, la respuesta se <Key>compra</Key>. Donde no lo hay, se{" "}
              <Key>fabrica</Key>.
            </>
          }
          lede="Es toda la diferencia entre los dos productos, y no es una decisión nuestra: la impone el canal."
        />
        <div className="v4-mt-12">
          <Filas items={PUENTE} />
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
              ancho="100%"
              titular={
                <>
                  Navegación Activa en <Key>Paid Media</Key>.
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
              ancho="100%"
              titular={
                <>
                  Visibilidad Intencional en IA: <Key>GEO</Key>.
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
            Precampaña: qué está preguntando tu consumidor, <Key>antes de activar</Key>.
          </>
        }
        lede="Nos cuentas el objetivo, simulamos el recorrido de tu target y te enseñamos dónde puedes responderle."
        cta={<Boton href="/contact">Pedir una precampaña</Boton>}
      />
    </Pagina>
  );
}
