export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    if (!query) {
      // Homepage with search bar
      return new Response(
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Proxy Search</title>
</head>
<body style="font-family: sans-serif; padding: 2rem;">
  <h1>🔎 Proxy Search</h1>
  <form method="GET">
    <input type="text" name="q" placeholder="Enter URL or Search..." style="padding: 0.5rem; width: 300px;" />
    <button type="submit" style="padding: 0.5rem;">Go</button>
  </form>
</body>
</html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    const isProbablyUrl = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-z]{2,}(/.*)?$/.test(query);

    let targetUrl: string;
    if (isProbablyUrl) {
      // It's a URL — normalize and fetch it
      targetUrl = query.startsWith("http") ? query : `https://${query}`;
    } else {
      // It's a search — go to DuckDuckGo
      targetUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    }

    // Fetch target content
    const res = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    let html = await res.text();

    // Rewriting all hrefs to go through the proxy again
    html = html.replace(/href="(.*?)"/g, (match, href) => {
      if (href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("javascript:")) {
        return match; // leave alone
      }

      let newHref = href;
      if (!href.startsWith("http")) {
        // make relative links absolute
        const base = new URL(targetUrl);
        newHref = new URL(href, base).toString();
      }

      // Rewrite to go through proxy
      return `href="/?q=${encodeURIComponent(newHref)}"`;
    });

    // Rewriting src attributes for scripts, images, etc., to go through the proxy as well
    html = html.replace(/(src|href)="(http[^"]+)"/g, (match, attribute, link) => {
      if (link.startsWith("http")) {
        return `${attribute}="/?q=${encodeURIComponent(link)}"`;
      }
      return match; // leave non-absolute URLs unchanged
    });

    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
};
