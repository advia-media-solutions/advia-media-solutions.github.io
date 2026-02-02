import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

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
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap"
            rel="stylesheet"
          />
          <Script
            id="advia-client"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.advia_ad_id = "advia-website";

                (function loadAdviaClient() {
                  const cachebuster = Date.now().toString(36);
                  const script = document.createElement("script");
                  script.src = \`https://cdn.advia.tech/js-client/index.js?cb=\${cachebuster}\`;
                  document.head.appendChild(script);
                })();
              `,
            }}
          />
          <Script
            id="advia-impression"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                const client = window.AdviaClientInstance;
                if (client) {
                  if (client.isReady()) {
                    console.log("Advia Client is ready, sending impression event.");
                    client.sendCustomEvent("impression", "lifecycle", {
                      timestamp: Date.now(),
                      placement: window.location.href,
                      adId: client.getAdId()
                    });
                  } else {
                    client.once("ready", () => {
                      console.log("Advia Client became ready, sending impression event.");
                      client.sendCustomEvent("impression", "lifecycle", {
                        timestamp: Date.now(),
                        placement: window.location.href,
                        adId: client.getAdId()
                      });
                    });
                  }
                } else {
                  window.addEventListener("advia:client-ready", (event) => {
                console.log("Advia Client loaded via event, sending impression event.");
                if (!window.AdviaClientInstance) return;
                    window.AdviaClientInstance.sendCustomEvent("impression", "lifecycle", {
                      timestamp: Date.now(),
                      placement: window.location.href,
                      adId: window.AdviaClientInstance.getAdId()
                    });
                });}
              `,
            }}
          />
        </Head>
        <body>
          {/* Advia tracking pixel */}
          <img
            src="https://events.advia.tech/v1/track?data=2Wvrdo3xgV87dwbfhbGRvYggjDsfbgRdnnjVixgjiIkMMWQfbIWUnBJOkl9jd770s0qi41FTaAReSIs2aRw9gyf4FguMzp8zaQb3q9zHK8E4ptnHMrcCbwE7rvfX13EcpzWIQGOhWR8yrhGDXuJQyusZEXrPlvzyywazdC.a8e9a38a"
            alt=""
            width="1"
            height="1"
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
