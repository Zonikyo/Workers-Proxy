export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    if (!query) {
      // Homepage with modern design and search bar
      return new Response(
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Proxy Search</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f0f2f5;
      margin: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
    .container {
      text-align: center;
      background: #fff;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 500px;
    }
    h1 {
      color: #333;
      font-size: 2rem;
    }
    input[type="text"] {
      padding: 12px 20px;
      width: 80%;
      max-width: 400px;
      border-radius: 25px;
      border: 1px solid #ddd;
      font-size: 1rem;
      margin-bottom: 20px;
      outline: none;
      transition: 0.3s ease;
    }
    input[type="text"]:focus {
      border-color: #4CAF50;
    }
    button {
      background-color: #4CAF50;
      color: white;
      padding: 12px 30px;
      border: none;
      border-radius: 25px;
      cursor: pointer;
      transition: 0.3s ease;
      font-size: 1rem;
    }
    button:hover {
      background-color: #45a049;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔎 Proxy Search</h1>
    <form method="GET">
      <input type="text" name="q" placeholder="Enter URL or Search..." />
      <button type="submit">Go</button>
    </form>
  </div>
</body>
</html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    // Updated URL regex to allow for more flexible matching
    const isProbablyUrl = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-z]{2,}\/?.*$/.test(query);

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

    // Ensure that fonts are loaded through the proxy (if they're loaded via URL)
    html = html.replace(/(href|src)="(https:\/\/fonts\.googleapis\.com[^\"]+)"/g, (match, attribute, link) => {
      return `${attribute}="/?q=${encodeURIComponent(link)}"`;
    });

    // Return the final HTML with the proxy rewrites
    return new Response(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
};
