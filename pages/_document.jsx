import Document, { Html, Head, Main, NextScript } from "next/document";

/*
 * Antes del primer pintado:
 * - `v4-js`: las entradas por scroll de v4-motion.css esconden el bloque hasta
 *   que el observador lo revela, y eso solo puede pasar si hay JS. Sin esta
 *   clase no se aplica ninguna regla que oculte: la página se sirve completa a
 *   quien no ejecuta JS —crawlers y LLMs incluidos—, que es justo lo que
 *   vendemos.
 * - `v4-consentido`: el aviso de cookies viene en el HTML (así se pinta con la
 *   página y no tras hidratar, cuando se convertía en el LCP); si ya hay
 *   elección guardada, esta clase lo esconde antes de que se vea.
 */
const MARCAS_DOCUMENTO = `document.documentElement.classList.add('v4-js');
try {
  var c = JSON.parse(localStorage.getItem('cookieConsent'));
  if (c && c.hasUserChosen) document.documentElement.classList.add('v4-consentido');
} catch (e) {}`;

/*
 * Los bloques `Reveal` que asoman al cargar se marcan visibles ya, sin esperar
 * a React, y con `data-inicial` entran sin fundido (v4-motion.css): el texto
 * que parte de opacidad 0 no cuenta para el LCP hasta que la transición acaba,
 * y en /about eso lo retrasaba a 4,7 s en móvil. Va justo detrás de <Main />,
 * cuando el HTML de la página ya está en el DOM.
 */
const PRIMERA_PANTALLA = `(function () {
  var alto = window.innerHeight;
  document.querySelectorAll('.v4-reveal').forEach(function (bloque) {
    if (bloque.getBoundingClientRect().top < alto) {
      bloque.setAttribute('data-visible', 'true');
      bloque.setAttribute('data-inicial', '');
    }
  });
})();`;

/**
 * Las fuentes (Nunito Sans y Ubuntu Mono) las sirve next/font desde _app:
 * autoalojadas y precargadas, sin la hoja de Google Fonts que bloqueaba el
 * primer pintado.
 */
class MyDocument extends Document {
  render() {
    /* El idioma del documento es el de la ruta: /en sirve lang="en". */
    const lang = this.props.__NEXT_DATA__?.locale || "es";
    return (
      <Html lang={lang}>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <script dangerouslySetInnerHTML={{ __html: MARCAS_DOCUMENTO }} />
          {/* En línea y no en v4-cookies.css: en dev el CSS llega con el JS y
              el aviso asomaría un instante antes de esconderse. */}
          <style
            dangerouslySetInnerHTML={{ __html: ".v4-consentido .v4-cookies{display:none}" }}
          />
        </Head>
        <body>
          <Main />
          <script dangerouslySetInnerHTML={{ __html: PRIMERA_PANTALLA }} />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
