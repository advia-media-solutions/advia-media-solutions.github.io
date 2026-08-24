import Document, { Html, Head, Main, NextScript } from "next/document";

/**
 * Fuentes del design system v1.0: Nunito Sans (300-800) para comunicación y UI,
 * Ubuntu Mono (400/700) para todo valor numérico. Inter se mantiene mientras
 * queden páginas sin migrar (blog, notas de prensa, legales); se cae en cuanto
 * la última salga del chrome antiguo.
 */
class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;500;600;700;800&family=Ubuntu+Mono:wght@400;700&family=Inter:wght@300;400;600&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
