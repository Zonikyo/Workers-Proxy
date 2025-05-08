export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const searchQuery = url.searchParams.get("q");

    if (!searchQuery) {
      // Show homepage with search form
      return new Response(
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Search Portal</title>
</head>
<body style="font-family: sans-serif; padding: 2rem;">
  <h1>🌐 Welcome to the Search Portal</h1>
  <form method="GET" action="/">
    <input type="text" name="q" placeholder="Search for things..." style="padding: 0.5rem; width: 300px;" />
    <button type="submit" style="padding: 0.5rem;">Search</button>
  </form>
</body>
</html>`,
        {
          headers: {
            "Content-Type": "text/html",
          },
        }
      );
    }

    // Proxy to DuckDuckGo search
    const targetUrl = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(searchQuery)}`;
    const duckRes = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0", // Helps bypass bot protection
      },
    });

    const duckHtml = await duckRes.text();

    // Return raw DuckDuckGo HTML
    return new Response(duckHtml, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  },
};
