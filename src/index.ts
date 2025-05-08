// Function to rewrite URLs in CSS, JS, and other assets to the proxy domain
const rewriteLinks = (body: string, baseUrl: string) => {
  // Regular expressions to match URLs in CSS, JS, images, etc.
  const linkRegex = /href="(https?:\/\/[^"]+)"/g;
  const scriptRegex = /src="(https?:\/\/[^"]+)"/g;
  const imageRegex = /src="(https?:\/\/[^"]+)"/g;

  // Rewrite links
  body = body.replace(linkRegex, (match, url) => {
    // If the URL is a full URL (i.e., not already rewritten), rewrite it
    return match.replace(url, `${baseUrl}${url}`);
  });

  body = body.replace(scriptRegex, (match, url) => {
    return match.replace(url, `${baseUrl}${url}`);
  });

  body = body.replace(imageRegex, (match, url) => {
    return match.replace(url, `${baseUrl}${url}`);
  });

  return body;
};

// Function to detect if the input is a valid URL
const isValidUrl = (str: string): boolean => {
  const pattern = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-z]{2,}\/?.*/;
  return pattern.test(str);
};

// Proxy request handler
addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const query = url.searchParams.get('q');

  if (query) {
    // If it's a search query (e.g., from DuckDuckGo), fetch it
    event.respondWith(fetch(`https://duckduckgo.com/?q=${encodeURIComponent(query)}`).then(async (response) => {
      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('text/html')) {
        const body = await response.text();
        const newBody = rewriteLinks(body, url.origin);

        return new Response(newBody, {
          headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'public, max-age=3600', // Add caching if necessary
          },
        });
      }

      // Return the response as-is for non-HTML content
      return response;
    }));
  } else if (isValidUrl(url.pathname)) {
    // If the URL path is a valid URL (direct access to a site), fetch the page
    event.respondWith(fetch(url.pathname).then(async (response) => {
      const contentType = response.headers.get('Content-Type');

      if (contentType && contentType.includes('text/html')) {
        const body = await response.text();
        const newBody = rewriteLinks(body, url.origin);

        return new Response(newBody, {
          headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'public, max-age=3600', // Add caching if necessary
          },
        });
      }

      // Return the response as-is for non-HTML content
      return response;
    }));
  } else {
    // If it's not a valid URL or query, return a simple homepage for search input
    event.respondWith(new Response(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Proxy Search</title>
          <style>
            body { font-family: Arial, sans-serif; }
            input[type="text"] { width: 80%; padding: 10px; font-size: 16px; }
            button { padding: 10px 20px; font-size: 16px; cursor: pointer; }
            .container { text-align: center; padding: 50px; }
            .search-result { margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Proxy Search</h1>
            <input type="text" id="searchInput" placeholder="Enter search term or URL" />
            <button onclick="search()">Search</button>

            <div class="search-result" id="searchResult"></div>
          </div>

          <script>
            function search() {
              const input = document.getElementById('searchInput').value;
              let url;

              if (/^https?:\/\//.test(input)) {
                url = input; // It's a URL, so just use it directly
              } else {
                url = '/?q=' + encodeURIComponent(input); // Assume it's a search query
              }

              window.location.href = url;
            }
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html; charset=UTF-8' }
    }));
  }
});
