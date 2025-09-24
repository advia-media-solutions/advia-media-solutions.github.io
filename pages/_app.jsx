import React, { useEffect } from "react";
import "../src/index.css";
import NavBar from "../src/components/NavBar";
import Footer from "../src/components/FooterComponent";
import CookieConsent from "../src/components/CookieConsent";
import { initializeGTM } from "../src/utils/gtm";
import Head from "next/head";
import Script from "next/script";
import PageHelmet from "../src/components/Helmet";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      initializeGTM("GTM-PWN554Q3");
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* GTM noscript fallback not supported on export; using Script for gtm.js */}
      <Script id="gtm-consent-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];`}
      </Script>
      <div className="min-h-screen bg-gradient-to-br from-corporate-cream via-corporate-lightGray to-corporate-cream">
        <PageHelmet />
        <NavBar />
        <main>
          <Component {...pageProps} />
        </main>
        <Footer />
        <CookieConsent />
      </div>
    </>
  );
}

export default MyApp;
