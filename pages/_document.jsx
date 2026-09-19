import Document, { Html, Head, Main, NextScript } from "next/document";

/**
 * Fuentes del design system v1.0: Nunito Sans (300-800) para comunicación y UI,
 * Ubuntu Mono (400/700) para todo valor numérico. Inter se mantiene mientras
 * queden páginas sin migrar (hoy ninguna); se cae en cuanto
 * la última salga del chrome antiguo.
 */
class MyDocument extends Document {
  render() {
    /* El idioma del documento es el de la ruta: /en sirve lang="en". */
    const lang = this.props.__NEXT_DATA__?.locale || "es";
    return (
      <Html lang={lang}>
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
          {/*
            Marca el documento antes del primer pintado. Las entradas por scroll
            de v4-motion.css esconden el bloque hasta que el observador lo revela,
            y eso solo puede pasar si hay JS. Sin esta clase no se aplica ninguna
            regla que oculte: la página se sirve completa a quien no ejecuta JS
            —crawlers y LLMs incluidos—, que es justo lo que vendemos.
          */}
          <script
            dangerouslySetInnerHTML={{
              __html: "document.documentElement.classList.add('v4-js');",
            }}
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
