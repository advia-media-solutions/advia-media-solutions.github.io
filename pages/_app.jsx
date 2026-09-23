import React, { useEffect } from "react";
import "../src/index.css";
import "../src/styles/tokens.css";
import "../src/styles/v4.css";
import "../src/styles/v4-motion.css";
import "../src/styles/v4-cookies.css";
import "../src/styles/v4-como-funciona.css";
import "../src/styles/v4-como-funciona-escenas.css";
import CookieConsent from "../src/components/CookieConsent";
import { initializeGTM } from "../src/utils/gtm";
import Head from "next/head";
import Script from "next/script";
import { Nunito_Sans, Ubuntu_Mono } from "next/font/google";
import { appWithTranslation } from "next-i18next/pages";
import nextI18NextConfig from "../next-i18next.config";

/* Fuentes del design system, autoalojadas y precargadas por next/font: sin la
   hoja de Google Fonts, que bloqueaba el primer pintado (~0,8 s en móvil).
   Solo los pesos que usan los tokens (--fw-light/regular/semibold/bold). */
const sans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});
const mono = Ubuntu_Mono({ subsets: ["latin"], weight: ["400", "700"], display: "swap" });

/* Pisa las familias de tokens.css con las de next/font, que traen además una
   fuente de reserva con las métricas ajustadas para que el cambio no mueva nada. */
const FUENTES = `html:root {
  --font-sans: ${sans.style.fontFamily}, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: ${mono.style.fontFamily}, "SFMono-Regular", Menlo, Consolas, monospace;
}`;

/* GTM no compite con la página: entra cuando ya ha cargado y el navegador está libre. */
function cargarGTMSinPrisa() {
  const arrancar = () => {
    const cuandoLibre = window.requestIdleCallback || ((fn) => setTimeout(fn, 1));
    cuandoLibre(() => initializeGTM("GTM-PWN554Q3"));
  };
  if (document.readyState === "complete") arrancar();
  else window.addEventListener("load", arrancar, { once: true });
}

/**
 * Todas las páginas son del rediseño v4: traen su propia nav oscura y su propio
 * footer y viven sobre tokens.css.
 */
function MyApp({ Component, pageProps }) {
  useEffect(cargarGTMSinPrisa, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: FUENTES }} />
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* GTM noscript fallback not supported on export; using Script for gtm.js */}
      <Script id="gtm-consent-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];`}
      </Script>
      <Component {...pageProps} />
      <CookieConsent />
    </>
  );
}

/* Las traducciones llegan por props desde getStaticProps (o getServerSideProps,
   en el blog y opt-out) de cada ruta; appWithTranslation las monta en el provider. */
export default appWithTranslation(MyApp, nextI18NextConfig);
