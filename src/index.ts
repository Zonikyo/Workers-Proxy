export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const searchQuery = url.searchParams.get("q");

    if (pathname === "/" && !searchQuery) {
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

    if (searchQuery) {
      // Handle search query (mock for now)
      return new Response(
        `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Search Results</title>
</head>
<body style="font-family: sans-serif; padding: 2rem;">
  <h1>🔍 Search Results for: "${searchQuery}"</h1>
  <p>(This is where your proxy magic or real search results will show.)</p>
  <a href="/" style="display: inline-block; margin-top: 1rem;">← Back to Home</a>
</body>
</html>`,
        {
          headers: {
            "Content-Type": "text/html",
          },
        }
      );
    }

    // 404 fallback
    return new Response("Not Found", { status: 404 });
  },
};
