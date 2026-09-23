import React from "react";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../components/v4/Seo";
import T from "../../components/v4/T";
import Recorridos from "../../components/v4/Recorridos";
import { Cierre, Pagina, Section } from "../../components/v4/layout";
import { Boton, Door } from "../../components/v4/primitives";

/** Tecnología · Vera, el cómo (how, parte 2). */

/* Con logotipo: las herramientas se reconocen antes por la marca que por el
   nombre. Los ids son los de simple-icons. Son nombres propios, así que no
   pasan por el diccionario. */
const HERRAMIENTAS = [
  { texto: "Google Search", logo: "google" },
  { texto: "YouTube", logo: "youtube" },
  { texto: "ChatGPT", logo: "openai" },
  { texto: "Pinterest", logo: "pinterest" },
];

export default function Tecnologia() {
  const { t } = useTranslation("tecnologia");

  /* Un agente es una carcasa a la que se le da un rol y unas herramientas. Los
     tres pasos son eso: quién es, con qué busca, y qué queda cuando termina.

     Los `chips` son lo que se le va echando a la esfera en cada paso: material
     concreto, no categorías. El paso 03 no lleva: ahí ya no se le echa nada, se
     va — y lo que aparece son las paradas que deja. */
  const pasos = t("pasos", { returnObjects: true }).map((paso, i) => ({
    ...paso,
    num: String(i + 1).padStart(2, "0"),
    chips: i === 1 ? HERRAMIENTAS : paso.chips,
  }));

  return (
    <Pagina activo="tecnologia">
      <Seo path="/technology" title={t("seo.title")} description={t("seo.description")} />

      <Recorridos
        titular={<T t={t} k="titular" />}
        lede={t("lede")}
        cabecera={t("cabecera")}
        pasos={pasos}
        mapa={<T t={t} k="mapa" />}
        pie={t("pie")}
        agentes={Object.values(t("agentes", { returnObjects: true }))}
      />

      {/* Corta a propósito: es una puerta, no una sección. Con el ritmo normal
          quedaba una pantalla casi vacía entre el mapa y el cierre. */}
      <Section className="v4-sec--corta">
        <Door href="/products">{t("door")}</Door>
      </Section>

      <Cierre
        titular={<T t={t} k="cierre.titular" />}
        lede={t("cierre.lede")}
        cta={<Boton href="/contact">{t("cierre.cta")}</Boton>}
      />
    </Pagina>
  );
}
