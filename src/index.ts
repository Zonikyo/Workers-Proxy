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
  <script src="https://cdn.tailwindcss.com"></script>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    body {
      font-family: 'Inter', sans-serif;
      animation: fadeIn 0.8s ease-out forwards;
      /* Custom scrollbar for dark theme */
      scrollbar-width: thin;
      scrollbar-color: #4B5563 #1F2937; /* thumb track - For Firefox */
    }
    /* For Webkit-based browsers (Chrome, Safari, Edge) */
    body::-webkit-scrollbar {
      width: 8px;
    }
    body::-webkit-scrollbar-track {
      background: #1F2937; /* bg-gray-800 */
    }
    body::-webkit-scrollbar-thumb {
      background-color: #4B5563; /* bg-gray-600 */
      border-radius: 20px;
      border: 2px solid #1F2937; /* bg-gray-800 - creates padding around thumb */
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes subtleSlideUp {
      from { transform: translateY(25px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    .search-content-wrapper {
      animation: subtleSlideUp 0.7s ease-out 0.2s forwards;
      opacity: 0; /* Start hidden for animation */
    }
    .quick-link-item:focus-visible { /* Enhanced focus for keyboard navigation */
        outline: 2px solid #3B82F6; /* Tailwind's blue-500 */
        outline-offset: 2px;
    }
  </style>
</head>
<body class="bg-gray-900 text-gray-100 flex flex-col items-center justify-center min-h-screen p-4 selection:bg-blue-600 selection:text-white">

  <div class="search-content-wrapper w-full max-w-lg text-center">
    <h1 class="text-5xl sm:text-6xl font-extrabold mb-8">
      <span class="text-blue-500">Proxy</span><span class="text-gray-200">Search</span>
    </h1>

    <form method="GET" class="mb-10">
      <div class="relative flex items-center shadow-xl rounded-full">
        <div class="absolute left-0 pl-4 flex items-center pointer-events-none z-10">
          <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
          </svg>
        </div>
        <input 
          type="text" 
          name="q" 
          placeholder="Search the web or enter a URL" 
          aria-label="Search the web or enter a URL"
          class="w-full py-3.5 pl-12 pr-4 text-gray-100 bg-gray-800 border border-gray-700 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60 outline-none transition-all duration-200 ease-in-out placeholder-gray-500 text-base"
        />
      </div>
      <button 
        type="submit" 
        class="mt-6 px-7 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transform hover:scale-105"
      >
        Search
      </button>
    </form>

    <div class="quick-links-container">
      <div class="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3.5">
        <a href="/?q=https://www.youtube.com" class="quick-link-item group bg-gray-800 hover:bg-gray-700 text-gray-300 font-normal py-1.5 px-3 rounded-md text-xs sm:text-sm inline-flex items-center transition-all duration-200 ease-in-out transform hover:-translate-y-px focus:outline-none">
          <img src="https://www.youtube.com/s/desktop/d1e6e8f6/img/favicon.ico" alt="YouTube" class="w-4 h-4 mr-1.5 sm:mr-2 rounded-sm" onerror="this.src='https://placehold.co/16x16/4B5563/E0E0E0?text=Y'; this.onerror=null;"/>
          <span class="group-hover:text-white transition-colors">YouTube</span>
        </a>
        <a href="/?q=https://www.twitch.tv" class="quick-link-item group bg-gray-800 hover:bg-gray-700 text-gray-300 font-normal py-1.5 px-3 rounded-md text-xs sm:text-sm inline-flex items-center transition-all duration-200 ease-in-out transform hover:-translate-y-px focus:outline-none">
          <img src="https://static.twitchcdn.net/assets/favicon-32-e29e246c157142c94346.png" alt="Twitch" class="w-4 h-4 mr-1.5 sm:mr-2 rounded-sm" onerror="this.src='https://placehold.co/16x16/4B5563/E0E0E0?text=T'; this.onerror=null;"/>
          <span class="group-hover:text-white transition-colors">Twitch</span>
        </a>
        <a href="/?q=https://zonikyo.github.io" class="quick-link-item group bg-gray-800 hover:bg-gray-700 text-gray-300 font-normal py-1.5 px-3 rounded-md text-xs sm:text-sm inline-flex items-center transition-all duration-200 ease-in-out transform hover:-translate-y-px focus:outline-none">
          <img src="https://zonikyo.github.io/favicon.ico" alt="Neonwave" class="w-4 h-4 mr-1.5 sm:mr-2 rounded-sm" onerror="this.src='https://placehold.co/16x16/4B5563/E0E0E0?text=N'; this.onerror=null;"/>
          <span class="group-hover:text-white transition-colors">Neonwave</span>
        </a>
        <a href="/?q=https://zonikyo.com" class="quick-link-item group bg-gray-800 hover:bg-gray-700 text-gray-300 font-normal py-1.5 px-3 rounded-md text-xs sm:text-sm inline-flex items-center transition-all duration-200 ease-in-out transform hover:-translate-y-px focus:outline-none">
          <img src="https://zonikyo.com/favicon.ico" alt="Zonikyo" class="w-4 h-4 mr-1.5 sm:mr-2 rounded-sm" onerror="this.src='https://placehold.co/16x16/4B5563/E0E0E0?text=Z'; this.onerror=null;"/>
          <span class="group-hover:text-white transition-colors">Zonikyo</span>
        </a>
      </div>
    </div>
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
      targetUrl = `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`;
    }

    const res = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0", // Standard User-Agent
      },
    });

    let contentType = res.headers.get("content-type") || "";

    // Pass through non-HTML content directly
    if (!contentType.includes("text/html")) {
      return new Response(res.body, {
        status: res.status,
        headers: res.headers,
      });
    }

    let html = await res.text();

    // Rewrite URLs in HTML attributes (href, src, action)
    html = html.replace(/(href|src|action)=["'](.*?)["']/gi, (match, attr, link) => {
      if (
        link.startsWith("#") ||
        link.startsWith("mailto:") ||
        link.startsWith("javascript:") ||
        link.startsWith("data:") // Allow data URIs
      ) {
        return match;
      }

      let newUrl = link;
      try {
        // Resolve relative URLs against the target URL's base
        const base = new URL(targetUrl);
        newUrl = new URL(link, base).toString();
      } catch (_) {
        // If parsing fails, use the link as is (it might be an absolute path or malformed)
      }
      
      return `${attr}="/?q=${encodeURIComponent(newUrl)}"`;
    });

    // Rewrite URLs in CSS url()
    html = html.replace(/url\(['"]?(.*?)['"]?\)/g, (match, assetUrl) => {
      if (assetUrl.startsWith("data:") || assetUrl.startsWith("#")) return match; // Allow data URIs and fragments

      let newUrl = assetUrl;
      try {
        const base = new URL(targetUrl);
        newUrl = new URL(assetUrl, base).toString();
      } catch (_) {
        // If parsing fails, attempt to use assetUrl as is
      }
      
      return `url('/?q=${encodeURIComponent(newUrl)}')`;
    });
    
    // Remove meta refresh tags that might redirect away from the proxy
    html = html.replace(/<meta[^>]+http-equiv=["']refresh["'][^>]*>/gi, "");

    // Inject a base tag to help resolve relative paths correctly on the client-side for proxied content
    // This is helpful for SPAs or sites that use client-side routing/asset loading extensively.
    // The base URL should be the URL of the page being proxied.
    const baseHref = targetUrl.endsWith('/') ? targetUrl : targetUrl + '/';
    // Ensure the base tag is added to the head. If no head, create one.
    if (!/<head[^>]*>/i.test(html)) {
        html = "<head></head>" + html;
    }
    html = html.replace(/<head[^>]*>/i, `$&<base href="/?q=${encodeURIComponent(baseHref)}">`);


    return new Response(html, {
      status: res.status,
      headers: {
        "Content-Type": "text/html; charset=UTF-8",
        // Remove or mitigate security headers from the origin that might break the proxy
        "Content-Security-Policy": "", 
        "X-Frame-Options": "",
      },
    });
  },
};
