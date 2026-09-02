import React from "react";
import Seo from "../../components/v4/Seo";
import Constelacion from "../../components/v4/Constelacion";
import { Banda, Cabecera, Cierre, Hero, Pagina, Section, Split } from "../../components/v4/layout";
import Recorrido from "../../components/v4/Recorrido";

import { Cita, Door, Key, Label, Nota, Placeholder } from "../../components/v4/primitives";

/** Navegación Activa · el concepto (how, parte 1). */

const RECORRIDO = [
  { chip: "ChatGPT", texto: "«¿cuáles son los mejores SUV híbridos?»" },
  { chip: "Open Web", texto: "«prestaciones Kia Sportage vs Hyundai Tucson»" },
  { chip: "YouTube", texto: "«vídeo review de Kia Sportage»" },
  { chip: "Open Web", texto: "«coches chinos SUV»" },
  { chip: "YouTube", texto: "«Omoda vs MG vs BYD»" },
];

function ContrasteHero() {
  const columnas = [
    {
      label: "Pasiva",
      titulo: "Te entretienen",
      texto: "El algoritmo elige qué ves. No había una pregunta, así que no hay nada que responder.",
      destacada: false,
    },
    {
      label: "Activa",
      titulo: "Buscas algo",
      texto: "Hay una duda concreta detrás. Existe una respuesta que te sirve, y puede ser de una marca.",
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
        lede="En una te entretienen y el algoritmo elige por ti. En la otra buscas algo concreto, y existe una respuesta que te sirve."
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
                  La escena del <Key>metro</Key>
                </>
              }
              lede="Dos momentos de la misma persona, con cinco minutos de diferencia. En el primero no hay nada que responder; en el segundo, sí."
            />
            <div className="v4-mt-8">
              <Nota>
                La diferencia no está en el canal ni en el formato: está en quién decide qué se
                mira. En la navegación pasiva decide el algoritmo. En la activa decide la
                persona, y su búsqueda deja una pregunta explícita a la que responder.
              </Nota>
            </div>
          </div>
          <div className="v4-stack">
            <Placeholder>
              Ilustración · storyboard
              <br />
              Esperando el metro, scroll en Instagram
            </Placeholder>
            <Placeholder>
              Ilustración · storyboard
              <br />
              Buscando auriculares para correr
            </Placeholder>
          </div>
        </Split>
      </Section>

      <Section surface="graphite">
        <Cabecera
          titular={
            <>
              Para que la publicidad sea relevante tiene que <Key>ayudar</Key> a quien la ve
            </>
          }
          lede="Y solo puedes ayudar a alguien cuando está intentando decidir algo."
        />
        <div className="v4-mt-12">
          <Cita fuente="Blog · Introducción a la Navegación Activa, I">
            «La publicidad pasa, de ser publicidad, a formar parte del <Key>contenido</Key>.»
          </Cita>
        </div>
      </Section>

      <Section>
        <div className="v4-recorrido__cabeza">
          <Cabecera
            titular={
              <>
                Nadie planifica para <Key animado={false}>ese recorrido</Key>
              </>
            }
          />

        </div>
        <Recorrido
          paradas={RECORRIDO}
          nota={
            <Nota meta="Su decisión no ocurre en un canal: ocurre en cinco preguntas que ningún plan de medios contempla.">
              <span className="v4-strong">Mujer de 35 años</span> quiere cambiar a un coche más
              eficiente.
            </Nota>
          }
        />
      </Section>

      <Section surface="inset">
        <Cabecera
          titular={
            <>
              Los caminos son infinitos, pero las paradas son <Key>finitas</Key>
            </>
          }
          lede="Cada recorrido es único; las paradas se repiten. Por eso se pueden predecir, y por eso una anécdota se convierte en un volumen de audiencia planificable."
        />
        <div className="v4-mt-12">
          <Constelacion />
        </div>
      </Section>

      <Cierre
        titular={
          <>
            Predecimos dónde va a buscar tu consumidor y ponemos ahí la <Key>respuesta</Key> de
            tu marca
          </>
        }
        doors={
          <>
            <Door href="/technology">Cómo lo predecimos</Door>
            <Door href="/products">Qué activamos</Door>
          </>
        }
      />
    </Pagina>
  );
}
