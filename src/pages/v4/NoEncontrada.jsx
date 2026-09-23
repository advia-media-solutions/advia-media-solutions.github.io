import React from "react";
import { useTranslation } from "next-i18next/pages";
import Seo from "../../components/v4/Seo";
import T from "../../components/v4/T";
import { Cierre, Hero, Pagina } from "../../components/v4/layout";
import { Boton, Door } from "../../components/v4/primitives";

/**
 * 404.
 *
 * No es sitio para vender: alguien buscaba algo y no está. Se dice, y se dan
 * las tres puertas que cubren casi todo lo que puede estar buscando.
 */
export default function NoEncontrada() {
  const { t } = useTranslation("noEncontrada");
  return (
    <Pagina>
      <Seo path="/404" title={t("seo.title")} description={t("seo.description")} noindex />
      <Hero
        titular={<T t={t} k="titular" />}
        lede={t("lede")}
        acciones={<Boton href="/">{t("cta")}</Boton>}
      />
      <Cierre
        titular={<T t={t} k="cierre" />}
        doors={
          <>
            <Door href="/active-navigation">{t("doors.navegacion")}</Door>
            <Door href="/products">{t("doors.productos")}</Door>
            <Door href="/blog">{t("doors.blog")}</Door>
          </>
        }
      />
    </Pagina>
  );
}
