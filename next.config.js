const { i18n } = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  /* Rutas por idioma (/ y /en): las traducciones las carga next-i18next. */
  i18n,
  // Hay un package-lock.json en el home del usuario y Next 15 infiere ESE
  // directorio como raíz del workspace, con lo que `next start` busca el build
  // donde no está. Fijamos la raíz al propio proyecto.
  outputFileTracingRoot: __dirname,
  poweredByHeader: false,
  /* Las rutas van en inglés. Estas tres nacieron en castellano en la rama de
     la v4 y pudieron circular en enlaces de preview: 301 a su nombre final.
     Con i18n, Next aplica cada regla también con el prefijo /en. */
  async redirects() {
    return [
      { source: "/navegacion-activa", destination: "/active-navigation", permanent: true },
      {
        source: "/products/geo/posicionamiento-ia",
        destination: "/products/geo/ai-positioning",
        permanent: true,
      },
      {
        source: "/products/geo/publicidad-ia",
        destination: "/products/geo/ai-advertising",
        permanent: true,
      },
    ];
  },
  compress: true,
  async rewrites() {
    return [
      // Standalone technical/compliance doc served straight from public/,
      // outside the _app layout (no nav, no footer).
      { source: "/pixels", destination: "/pixels.html" },
    ];
  },
  async headers() {
    return [
      {
        source: "/.well-known/:path*",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET, HEAD, OPTIONS" },
          { key: "Access-Control-Allow-Headers", value: "*" },
          { key: "Access-Control-Allow-Credentials", value: "false" },
          { key: "Access-Control-Max-Age", value: "86400" },
          { key: "Cache-Control", value: "public, max-age=86400, must-revalidate" },
        ],
      },
    ];
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "react-helmet": require("path").resolve(
        __dirname,
        "src/shims/react-helmet.js"
      ),
    };
    return config;
  },
};

module.exports = nextConfig;
