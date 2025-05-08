export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    if (!query) {
      return new Response(
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proxy Search</title>
  <style>
    body {
      font-family: sans-serif;
      background: #f5f5f5;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
    }
    .search-box {
      background: white;
      padding: 2rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.1);
      text-align: center;
    }
    input[type="text"] {
      width: 100%;
      padding: 0.75rem;
      margin-top: 1rem;
      border-radius: 8px;
      border: 1px solid #ccc;
      font-size: 1rem;
    }
    button {
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      border: none;
      background: #007BFF;
      color: white;
      font-size: 1rem;
      margin-top: 1rem;
      cursor: pointer;
    }
  </style>
</head>
<body>
  <div class="search-box">
    <h1>🔎 Proxy Search</h1>
    <form method="GET">
      <input type="text" name="q" placeholder="Enter URL or Search..." />
      <br />
      <button type="submit">Go</button>
    </form>
  </div>
</body>
</html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    const isProbablyUrl = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-z]{2,}\/?.*$/.test(query);

    let targetUrl: string;
    if (isProbablyUrl) {
      targetUrl = query.startsWith("http") ? query : `https://${query}`;
    } else {
      targetUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    }

    const res = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    let contentType = res.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {
      // For non-HTML content like images, CSS, JS, just pipe it through
      return new Response(res.body, {
        status: res.status,
        headers: res.headers,
      });
    }

    let html = await res.text();

    // Rewrite links, scripts, images, styles, fonts
    html = html.replace(/(href|src|action)="(.*?)"/g, (match, attr, link) => {
      if (link.startsWith("#") || link.startsWith("mailto:") || link.startsWith("javascript:")) return match;

      let newUrl = link;
      try {
        const base = new URL(targetUrl);
        newUrl = new URL(link, base).toString();
      } catch (_) {}

      return `${attr}="/?q=${encodeURIComponent(newUrl)}"`;
    });

    html = html.replace(/url\(['"]?(.*?)['"]?\)/g, (match, url) => {
      if (url.startsWith("data:")) return match;

      let newUrl = url;
      try {
        const base = new URL(targetUrl);
        newUrl = new URL(url, base).toString();
      } catch (_) {}

      return `url('/?q=${encodeURIComponent(newUrl)}')`;
    });

    return new Response(html, {
      status: res.status,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    });
  },
};
