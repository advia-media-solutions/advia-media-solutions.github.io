import React from "react";
import Seo from "../../components/v4/Seo";
import Caminos from "../../components/v4/Caminos";
import Funnel from "../../components/v4/Funnel";
import Constelacion from "../../components/v4/Constelacion";
import { Banda, Cabecera, Cierre, Hero, Pagina, Section, Split } from "../../components/v4/layout";

import { Boton, Chips, Cita, Door, Key, Label, Nota } from "../../components/v4/primitives";

/** Navegación Activa · el concepto (how, parte 1). */

/* Tres consumidores, tres razones, tres caminos, el mismo producto al final.
   Los datos van aquí porque son contenido, no relleno del dibujo. */
const CAMINOS = [
  {
    quien: "Mujer, 35",
    motivo: "quiere gastar menos en combustible",
    paradas: ["ChatGPT", "Web", "YouTube"],
  },
  {
    quien: "Hombre, 52",
    motivo: "necesita cinco plazas y maletero",
    paradas: ["Web", "Redes sociales", "Web"],
  },
  {
    quien: "Mujer, 28",
    motivo: "su coche ya no pasa la ITV",
    paradas: ["YouTube", "ChatGPT", "Web"],
  },
];

/* El tramo del embudo donde ocurre la Navegación Activa: ni el arranque de
   awareness ni la conversión pura, sino la consideración que hay en medio. */
const FUNNEL = [
  { label: "Awareness", texto: "Brand-day, skins", peso: 2, destacado: false },
  {
    label: "Advia",
    texto: "De la parte baja de awareness a la consideración",
    peso: 3,
    destacado: true,
  },
  { label: "Performance", texto: "Conversión pura", peso: 2, destacado: false },
];

function ContrasteHero() {
  const columnas = [
    {
      label: "Pasiva",
      titulo: "Se entretienen",
      texto:
        "El algoritmo o los editores eligen por ellos lo que sale en pantalla. No había una " +
        "pregunta, así que no hay nada que responder.",
      destacada: false,
    },
    {
      label: "Activa",
      titulo: "Tienen una duda",
      texto:
        "Una frustración, una necesidad, una decisión que tomar. Ahí tu marca puede ser la " +
        "respuesta que necesitan.",
      destacada: true,
    },
  ];
  return (
    <div className="v4-grid" data-cols="2">
      {columnas.map((c) => (
        <div
          key={c.label}
          style={{
            paddingLeft: "var(--space-6)",
            borderLeft: `2px solid ${c.destacada ? "var(--accent-gold)" : "var(--v4-line-strong)"}`,
          }}
        >
          <Label tono={c.destacada ? "gold" : "faint"} tamano="m">
            {c.label}
          </Label>
          <div className="v4-subheading v4-mt-5">{c.titulo}</div>
          <p className="v4-body v4-mt-5">{c.texto}</p>
        </div>
      ))}
    </div>
  );
}

export default function NavegacionActiva() {
  return (
    <Pagina activo="Navegación Activa">
      <Seo
        path="/navegacion-activa"
        title="Navegación Activa — el momento en que alguien busca para decidir | Advia"
        description="Hay dos formas de navegar. En una el algoritmo elige por ti; en la otra buscas para decidir, y ahí una marca puede ser la respuesta."
      />

      <Hero
        titular={
          <>
            Hay dos formas de <Key>navegar</Key>
          </>
        }
        lede="En una, los consumidores se entretienen y el algoritmo elige por ellos. En la otra tienen una pregunta concreta, y existe una respuesta que les sirve: conviértete en ella y capitaliza la Navegación Activa."
        banda={
          <Banda>
            <ContrasteHero />
          </Banda>
        }
      />

      <Section>
        <Split align="start">
          <div>
            <Cabecera
              titular={
                <>
                  Dos momentos de la misma persona, con cinco minutos de{" "}
                  <Key>diferencia</Key>
                </>
              }
              lede="En el primero no hay nada que responder; en el segundo, sí."
            />
            <div className="v4-mt-8">
              <Door href="/blog">Lee nuestro blog</Door>
            </div>
          </div>
          <Nota>
            La diferencia no está en el canal ni en el formato: está en quién decide qué se
            mira. En la navegación pasiva decide el algoritmo. En la activa decide la persona,
            y su búsqueda deja una pregunta explícita a la que responder.
          </Nota>
        </Split>
      </Section>

      <Section surface="graphite">
        <Cabecera
          titular={
            <>
              Para que la publicidad sea útil para una marca, antes tiene que ser útil para su{" "}
              <Key>consumidor</Key>
            </>
          }
          lede="Capitalizar la Navegación Activa te posiciona como la respuesta que los consumidores necesitan."
        />
        <div className="v4-mt-12">
          <Cita fuente="Blog · Introducción a la Navegación Activa, I">
            «La publicidad pasa, de ser publicidad, a formar parte del <Key>contenido</Key>.»
          </Cita>
        </div>
      </Section>

      <Section surface="inset">
        <Cabecera
          titular={
            <>
              La Navegación Activa es <Key>rica</Key>. Cada recorrido es único
            </>
          }
          lede="Aunque distintos consumidores acaben en el mismo producto, llegan por razones distintas y navegan por caminos distintos. Todo eso es Navegación Activa, y hay que ser capaz de capitalizarla entera."
        />
        <div className="v4-mt-12">
          <Constelacion />
        </div>
        <Caminos
          nota="Boceto · pendiente de animar"
          destino="Acaban en el mismo coche"
          consumidores={CAMINOS}
        />
      </Section>

      <Section>
        <Cabecera
          titular={
            <>
              Capitaliza la visibilidad <Key>intencional</Key>
            </>
          }
          lede="Entre el momento en que aparece la necesidad y el momento en que se compra hay un tramo desordenado: el messy middle. Tu consumidor no baja por un embudo, da vueltas —explora, evalúa, vuelve a explorar— y en cada vuelta descarta marcas sin avisar a nadie."
        />
        <Funnel segmentos={FUNNEL} />
        <p className="v4-lede v4-mt-12">
          Ese tramo ha sido históricamente el difícil de trabajar: fragmentado, complejo y sin
          una forma clara de saber qué pasaba dentro. Ahora somos capaces de entenderlo y de
          poner tu marca justo donde se toman las decisiones.
        </p>
        <div className="v4-mt-10">
          <Chips items={["Reach", "Viewability", "VTR", "CTR", "Qualified Visits"]} />
        </div>
      </Section>

      <Cierre
        titular={
          <>
            Conoce a <Key>Vera</Key>, el motor de simulación de Navegación Activa de Advia
          </>
        }
        cta={<Boton href="/technology">Conoce a Vera</Boton>}
        doors={<Door href="/products">Qué activamos</Door>}
      />
    </Pagina>
  );
}
