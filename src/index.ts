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
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: #121212;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      margin: 0;
      animation: fadeIn 1s ease;
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .search-box {
      background: #1e1e1e;
      padding: 2rem;
      border-radius: 20px;
      box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
      text-align: center;
      width: 100%;
      max-width: 500px;
      animation: slideUp 0.7s ease;
    }
    @keyframes slideUp {
      from { transform: translateY(40px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    input[type="text"] {
      width: 100%;
      padding: 1rem;
      margin-top: 1rem;
      border-radius: 12px;
      border: 1px solid #444;
      background: #2c2c2c;
      color: #fff;
      font-size: 1rem;
    }
    button {
      padding: 0.75rem 1.5rem;
      border-radius: 12px;
      border: none;
      background: #00bcd4;
      color: white;
      font-size: 1rem;
      margin-top: 1rem;
      cursor: pointer;
      transition: background 0.3s;
    }
    button:hover {
      background: #00acc1;
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

    const isProbablyUrl = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-z]{2,}\/?(.*)?$/.test(query);

    let targetUrl: string;
    if (isProbablyUrl) {
      targetUrl = query.startsWith("http") ? query : `https://${query}`;
    } else {
      targetUrl = `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`;
    }

    const res = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    let contentType = res.headers.get("content-type") || "";

    if (!contentType.includes("text/html")) {
      return new Response(res.body, {
        status: res.status,
        headers: res.headers,
      });
    }

    let html = await res.text();

    html = html.replace(/(href|src|action)=["'](.*?)["']/gi, (match, attr, link) => {
      if (
        link.startsWith("#") ||
        link.startsWith("mailto:") ||
        link.startsWith("javascript:")
      ) {
        return match;
      }

      let newUrl = link;
      try {
        const base = new URL(targetUrl);
        newUrl = new URL(link, base).toString();
      } catch (_) {}

      return `${attr}="/?q=${encodeURIComponent(newUrl)}"`;
    });

    html = html.replace(/url\(['"]?(.*?)['"]?\)/g, (match, assetUrl) => {
      if (assetUrl.startsWith("data:")) return match;

      let newUrl = assetUrl;
      try {
        const base = new URL(targetUrl);
        newUrl = new URL(assetUrl, base).toString();
      } catch (_) {}

      return `url('/?q=${encodeURIComponent(newUrl)}')`;
    });

    html = html.replace(/<meta[^>]+http-equiv=["']refresh["'][^>]*>/gi, "");

    return new Response(html, {
      status: res.status,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
      },
    });
  },
};
