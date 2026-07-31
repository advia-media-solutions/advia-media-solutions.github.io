// Thin proxy to events.advia.tech.
//
// This route deliberately does NOT build the opt-out cookie. It forwards the
// Set-Cookie header from the events service verbatim, so that service stays
// the single source of truth for the cookie string (see the invariants in
// advia-events-service/GDPR-OPT-OUT.md: set and clear must emit identical
// Domain, Path, SameSite and Secure, or opting back in silently no-ops).
//
// The cookie carries Domain=.advia.tech, so the browser accepts it from an
// advia.tech response exactly as it would from events.advia.tech.

const UPSTREAM = {
  out: "https://events.advia.tech/v1/optout",
  in: "https://events.advia.tech/v1/optout/clear",
};

const ALLOWED_ORIGINS = new Set([
  "https://advia.tech",
  "https://www.advia.tech",
]);

export default async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store");

  // POST only. Upstream exposes GET endpoints, which link scanners and
  // prefetchers can trigger; requiring POST here means this route cannot opt
  // anyone back in without a deliberate form submission.
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return res.status(403).end("Forbidden");
  }

  const url = UPSTREAM[req.body?.action];
  if (!url) {
    return res.status(400).end("Bad Request");
  }

  let upstream;
  try {
    upstream = await fetch(url, { redirect: "manual" });
  } catch {
    // If the events service is unreachable we cannot pretend the choice was
    // applied. The page renders a notice with the direct link instead.
    return res.redirect(303, "/opt-out?error=upstream");
  }

  // getSetCookie() keeps multiple Set-Cookie headers separate; the fallback is
  // safe here because upstream sets exactly one cookie.
  const cookies = upstream.headers.getSetCookie
    ? upstream.headers.getSetCookie()
    : [upstream.headers.get("set-cookie")].filter(Boolean);

  if (!cookies.length) {
    return res.redirect(303, "/opt-out?error=upstream");
  }

  res.setHeader("Set-Cookie", cookies);

  // 303 makes the browser re-issue a GET, so the page reads the cookie after
  // it has been stored and a refresh cannot resubmit.
  res.writeHead(303, { Location: "/opt-out" });
  return res.end();
}
