import React from "react";
import Seo from "../../components/v4/Seo";
import { Cabecera, Cierre, Grid, Hero, Pagina, Section } from "../../components/v4/layout";
import { Boton, Hueco, Key, Nota } from "../../components/v4/primitives";
import { TarjetaKpi } from "../../components/v4/blocks";

/** Nosotros · el why completo. Recibe la puerta del hero de la home. */

const EQUIPO = [
  { label: "Personas", valor: "12", desc: "El equipo hoy." },
  { label: "Áreas", valor: "3", desc: "Cada una liderada por un fundador." },
  { label: "Mercados", valor: <Hueco />, desc: "Pendiente de dato real." },
];

const CLIENTES = ["Grupos de agencias", "Sectores donde estamos", "Mercados activos"];

const VALORES = [
  "#WorkHardPlayHard",
  "#Superhuman",
  "#RightOverEasy",
  "#Imagine",
  "#WinAsOne",
];

export default function Nosotros() {
  return (
    <Pagina activo="Nosotros">
      <Seo
        path="/about"
        title="Nosotros — por qué existe Advia | Advia"
        description="Casi toda campaña se piensa desde el lado del anunciante. Fundamos Advia para trabajar desde el lado de quien busca."
      />

      <Hero
        eyebrow="Nosotros"
        titular={
          <>
            Estábamos convencidos de que la publicidad digital podía <Key>ser mejor</Key>.
          </>
        }
        lede="Veníamos de hacerla desde dentro, y empezamos incómodos con cómo se planificaba."
      />

      <Section>
        <Cabecera
          eyebrow="Por qué existe Advia"
          titular={
            <>
              Casi toda campaña se piensa desde el lado del anunciante. Fundamos Advia para
              trabajar desde el lado de quien <Key>busca</Key>.
            </>
          }
          lede="Es lógico que se piense desde el anunciante: es quien paga. Pero el impacto lo recibe otra persona, que en ese momento estaba intentando resolver algo suyo."
        />
        <div className="v4-mt-10" style={{ maxWidth: "900px" }}>
          <Nota>
            Cambiar de lado cambia qué se planifica: dejas de preguntarte dónde cabe tu anuncio y
            empiezas a preguntarte qué está intentando averiguar tu consumidor. De ahí sale
            Turning ads into answers.
          </Nota>
        </div>
      </Section>

      <Section surface="graphite">
        <Cabecera
          eyebrow="De dónde venimos"
          titular={
            <>
              Conocemos el ciclo de una campaña <Key>desde dentro</Key>.
            </>
          }
          lede="Tres fundadores con recorrido en Seedtag y GroupM: el lado del medio y el lado de la agencia, que es donde se ve qué se rompe entre el plan y el resultado."
        />
        <Grid cols={3} className="v4-mt-12">
          {EQUIPO.map((k) => (
            <TarjetaKpi key={k.label} label={k.label} valor={k.valor} desc={k.desc} />
          ))}
        </Grid>
      </Section>

      <Section>
        <Cabecera
          eyebrow="Con quién trabajamos"
          titular={
            <>
              Los grandes grupos de agencias, y los sectores donde <Key>estamos</Key>.
            </>
          }
        />
        <div className="v4-mt-12" style={{ maxWidth: "820px" }}>
          {CLIENTES.map((c) => (
            <div key={c} className="v4-linea">
              <span className="v4-lede" style={{ color: "var(--v4-fg)" }}>
                {c}
              </span>
              <span className="v4-mono">
                <Hueco />
              </span>
            </div>
          ))}
          <p className="v4-label v4-label--faint v4-mt-8">
            Nombres solo con permiso verificado. Por defecto, agregados y anónimos.
          </p>
        </div>
      </Section>

      <Section surface="inset">
        <Cabecera
          eyebrow="Valores"
          titular={
            <>
              Cinco cosas que decidimos <Key>antes</Key> de contratar a nadie.
            </>
          }
        />
        <div className="v4-chips v4-mt-12">
          {VALORES.map((v) => (
            <span
              key={v}
              className="v4-subheading"
              style={{
                background: "var(--v4-panel)",
                border: "1px solid var(--v4-panel-line)",
                padding: "var(--space-4) var(--space-6)",
                borderRadius: "var(--radius-pill)",
              }}
            >
              {v}
            </span>
          ))}
        </div>
      </Section>

      <Cierre
        titular={
          <>
            Cómo trabajamos, y a quién <Key>buscamos</Key>.
          </>
        }
        lede="Si te interesa el problema que estamos resolviendo, escríbenos aunque no haya una vacante abierta con tu nombre."
        cta={<Boton href="/contact">Únete al equipo</Boton>}
      />
    </Pagina>
  );
}
