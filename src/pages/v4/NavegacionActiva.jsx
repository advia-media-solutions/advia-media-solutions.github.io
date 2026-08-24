import React from "react";
import Seo from "../../components/v4/Seo";
import Constelacion from "../../components/v4/Constelacion";
import { Banda, Cabecera, Cierre, Grid, Hero, Pagina, Section, Split } from "../../components/v4/layout";
import { Cita, Door, Hueco, Key, Label, Nota, Placeholder } from "../../components/v4/primitives";
import { Secuencia } from "../../components/v4/blocks";

/** Navegación Activa · el concepto (how, parte 1). */

const RECORRIDO = [
  { chip: "ChatGPT", texto: "«¿qué SUV híbrido rinde mejor en ciudad?»" },
  { chip: "Web abierta", texto: "«consumo real del modelo que me gusta»" },
  { chip: "YouTube", texto: "«review larga, con la familia dentro»" },
  { chip: "Vuelve a buscar", texto: "«mantenimiento y garantía a cinco años»" },
];

const FACTORES = [
  {
    titulo: "Intencionalidad",
    pregunta: "¿Llegó buscando, o le llegó sin pedirlo?",
    subs: [
      ["Clasificación del contenido", "Cómo se clasifica esta página en los motores de búsqueda."],
      ["Volumen de búsqueda", "Qué volumen total de búsquedas relevantes conducen aquí."],
      ["Variedad de búsqueda", "Cuántas búsquedas distintas conducen aquí."],
    ],
  },
  {
    titulo: "Credibilidad",
    pregunta: "¿Le vale como fuente para lo que está decidiendo?",
    subs: [
      ["Medio especializado", "Si la pieza aparece en un medio del sector."],
      ["Profundidad del medio", "Cuántas piezas suyas responden preguntas relevantes."],
      ["Reputación del editor", "Qué peso tiene ese editor en la categoría."],
    ],
  },
  {
    titulo: "Experiencia",
    pregunta: "¿La respuesta encaja con lo que estaba preguntando?",
    subs: [
      ["Encaje del mensaje", "Si lo que dice la marca responde a esa duda concreta."],
      ["Encaje del contenido", "Si la pieza responde de verdad a la pregunta."],
      ["Privacidad", "Si el impacto respeta la privacidad de quien lo recibe."],
    ],
  },
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
          <Label tono={c.destacada ? "gold" : "faint"}>{c.label}</Label>
          <div className="v4-subheading v4-mt-5">{c.titulo}</div>
          <p className="v4-body v4-mt-5">{c.texto}</p>
        </div>
      ))}
    </div>
  );
}

function TarjetaFactor({ factor }) {
  return (
    <article className="v4-card" data-kpi="true">
      <div className="v4-dato__head">
        <span className="v4-subheading">{factor.titulo}</span>
        <span className="v4-kpi" style={{ color: "var(--accent-gold)" }}>
          <Hueco />
        </span>
      </div>
      <p className="v4-body">{factor.pregunta}</p>
      <div>
        {factor.subs.map(([nombre, desc]) => (
          <div
            key={nombre}
            style={{ padding: "var(--space-4) 0", borderTop: "1px solid var(--v4-line)" }}
          >
            <div className="v4-body v4-strong" style={{ fontWeight: "var(--fw-semibold)" }}>
              {nombre}
            </div>
            <div className="v4-body-s">{desc}</div>
          </div>
        ))}
      </div>
    </article>
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
        eyebrow="El concepto"
        xl
        titular={
          <>
            Hay dos formas de <Key>navegar</Key>.
          </>
        }
        lede="En una te entretienen y el algoritmo elige por ti. En la otra buscas algo concreto, y existe una respuesta que te sirve."
        banda={
          <Banda caption="Las dos formas">
            <ContrasteHero />
          </Banda>
        }
      />

      <Section>
        <Split align="start">
          <div>
            <Cabecera
              eyebrow="Pasiva vs. activa"
              titular={
                <>
                  La escena del <Key>metro</Key>.
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

      <Section surface="inset">
        <Cabecera
          eyebrow="Por qué importa"
          titular={
            <>
              Para que una marca sea relevante tiene que <Key>ayudar</Key> a quien la ve.
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
        <Cabecera
          eyebrow="Así busca una persona"
          titular={
            <>
              Nadie planifica para <Key>ese recorrido</Key>.
            </>
          }
          lede="Mujer, 35 años, quiere cambiar de coche. Su decisión no ocurre en un canal: ocurre en cuatro preguntas que ningún plan de medios contempla."
        />
        <div className="v4-mt-16">
          <Secuencia nodos={RECORRIDO} />
        </div>
        <p className="v4-label v4-label--faint v4-mt-10">
          La secuencia se construye punto a punto con el scroll. Este es el estado final, y el
          fallback estático que leen los crawlers y los LLMs.
        </p>
      </Section>

      <Section surface="graphite">
        <Cabecera
          eyebrow="Y así buscan todas"
          titular={
            <>
              Los caminos son infinitos, pero las paradas son <Key>finitas</Key>.
            </>
          }
          lede="Cada recorrido es único; las paradas se repiten. Por eso se pueden predecir, y por eso una anécdota se convierte en un volumen de audiencia planificable."
        />
        <div className="v4-mt-12">
          <Constelacion />
        </div>
      </Section>

      <Section>
        <Cabecera
          eyebrow="Qué hace buena a una respuesta"
          titular={
            <>
              La atención dice cuánto te miran. Falta saber si te estaban <Key>buscando</Key>.
            </>
          }
          lede="Un formato que bloquea la navegación retiene mucha atención y aun así interrumpe. Valoramos cada impacto desde la perspectiva de quien lo recibe, con tres factores puntuados de 0 a 100."
        />
        <Grid cols={3} className="v4-mt-12">
          {FACTORES.map((f) => (
            <TarjetaFactor key={f.titulo} factor={f} />
          ))}
        </Grid>
        <p className="v4-label v4-label--faint v4-mt-8">
          Los rangos por factor se calculan por campaña. Cifras agregadas pendientes de dato real.
        </p>
      </Section>

      <Cierre
        titular={
          <>
            Predecimos dónde va a buscar tu consumidor y ponemos ahí la <Key>respuesta</Key> de
            tu marca.
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
