import React from "react";
import OptOut from "../src/pages/OptOut";

export default function OptOutPage(props) {
  return <OptOut {...props} />;
}

export async function getServerSideProps({ req, res, query }) {
  // Per-visitor state: must never be cached at any layer.
  res.setHeader("Cache-Control", "no-store");

  // Reading the request cookie is correct here, unlike on the events service's
  // own page routes: /api/opt-out answers with a 303, so the browser re-issues
  // a GET after storing the cookie and this request reflects the new state.
  //
  // Strict comparison against "1", matching isOptedOut upstream: a leftover
  // empty value must read as opted in, never the other way round.
  return {
    props: {
      optedOut: req.cookies?.advia_optout === "1",
      upstreamError: query.error === "upstream",
    },
  };
}
