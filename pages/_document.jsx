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
