import React, { useEffect } from "react";
import "../src/index.css";
import "../src/styles/tokens.css";
import "../src/styles/v4.css";
import "../src/styles/v4-motion.css";
import NavBar from "../src/components/NavBar";
import Footer from "../src/components/FooterComponent";
import CookieConsent from "../src/components/CookieConsent";
import { initializeGTM } from "../src/utils/gtm";
import Head from "next/head";
import Script from "next/script";
import PageHelmet from "../src/components/Helmet";

/**
 * Las páginas del rediseño v4 traen su propia nav oscura y su propio footer, y
 * viven sobre tokens.css en vez de sobre las clases corporate de Tailwind. Se
 * marcan con `Page.v4 = true` y aquí se les salta el chrome antiguo.
 *
 * Las páginas que aún no se han migrado (blog, notas de prensa, legales, opt-out)
 * siguen entrando por la rama de siempre, intactas.
 */
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      initializeGTM("GTM-PWN554Q3");
    }
  }, []);

  const esV4 = Component.v4 === true;

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* GTM noscript fallback not supported on export; using Script for gtm.js */}
      <Script id="gtm-consent-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];`}
      </Script>
      {esV4 ? (
        <>
          <Component {...pageProps} />
          <CookieConsent />
        </>
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-corporate-cream via-corporate-lightGray to-corporate-cream">
          <PageHelmet />
          <NavBar />
          <main>
            <Component {...pageProps} />
          </main>
          <Footer />
          <CookieConsent />
        </div>
      )}
    </>
  );
}

export default MyApp;
