// Function to rewrite URLs in HTML, CSS, JS, and images to the proxy domain
const rewriteLinks = (body: string, baseUrl: string) => {
  // Regular expressions to match URLs in CSS, JS, images, etc.
  const linkRegex = /href="(https?:\/\/[^"]+)"/g;
  const scriptRegex = /src="(https?:\/\/[^"]+)"/g;
  const imageRegex = /src="(https?:\/\/[^"]+)"/g;

  // Rewrite links to point to the proxy domain
  body = body.replace(linkRegex, (match, url) => {
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

// Function to detect if the string is a valid URL
const isValidUrl = (str: string): boolean => {
  const pattern = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-z]{2,}\/?.*/;
  return pattern.test(str);
};

// Proxy request handler
addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  const query = url.searchParams.get('q'); // Get the query parameter

  if (query) {
    // If it's a search query (from a search input), fetch search results from DuckDuckGo
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

      return response; // Return the response as-is for non-HTML content
    }));
  } else if (isValidUrl(url.pathname)) {
    // If the path is a valid URL (e.g., https://example.com), proxy the website
    event.respondWith(fetch(url.pathname).then(async (response) => {
      const contentType = response.headers.get('Content-Type');
      if (contentType && contentType.includes('text/html')) {
        const body = await response.text();
        const newBody = rewriteLinks(body, url.origin);

        return new Response(newBody, {
          headers: {
            'Content-Type': 'text/html; charset=UTF-8',
            'Cache-Control': 'public, max-age=3600',
          },
        });
      }

      return response; // Return non-HTML content like images, etc., as-is
    }));
  } else {
    // If it's neither a valid URL nor a search query, show a homepage for the user
    event.respondWith(new Response(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Proxy Search</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; text-align: center; }
            input[type="text"] { width: 60%; padding: 10px; font-size: 16px; }
            button { padding: 10px 20px; font-size: 16px; cursor: pointer; }
            .container { margin-top: 50px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Proxy Search</h1>
            <p>Enter a URL or search term:</p>
            <input type="text" id="searchInput" placeholder="Enter a search term or URL" />
            <button onclick="search()">Search</button>
          </div>
          <script>
            function search() {
              const input = document.getElementById('searchInput').value;
              let url;

              // If input is a valid URL, go directly to it, else treat as a search query
              if (/^https?:\/\//.test(input)) {
                url = input;
              } else {
                url = '/?q=' + encodeURIComponent(input); // Search query
              }

              window.location.href = url; // Redirect to the appropriate page
            }
          </script>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html; charset=UTF-8' }
    }));
  }
});
