export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    if (!query) {
      // This is the initial homepage view
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
      scrollbar-width: thin;
      scrollbar-color: #4B5563 #1F2937;
    }
    body::-webkit-scrollbar { width: 8px; }
    body::-webkit-scrollbar-track { background: #1F2937; }
    body::-webkit-scrollbar-thumb {
      background-color: #4B5563;
      border-radius: 20px;
      border: 2px solid #1F2937;
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes subtleSlideUp { from { transform: translateY(25px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
    
    #initialSearchSection, #browserViewSection {
      animation: subtleSlideUp 0.7s ease-out 0.2s forwards;
      opacity: 0;
    }
    .quick-link-item:focus-visible, .browser-control-button:focus-visible, #mainSearchBtn:focus-visible, #mainOpenInNewTabBtn:focus-visible, #urlBarBrowserView:focus-visible {
        outline: 2px solid #3B82F6; /* Tailwind's blue-500 */
        outline-offset: 2px;
    }
    #contentFrame {
      width: 100%;
      height: calc(100vh - 120px); /* Adjusted height for controls */
      border: 1px solid #374151; /* bg-gray-700 */
      border-radius: 0.375rem; /* rounded-md */
    }
    .hidden { display: none !important; }
  </style>
</head>
<body class="bg-gray-900 text-gray-100 flex flex-col items-center min-h-screen p-4 selection:bg-blue-600 selection:text-white overflow-hidden">

  <div id="initialSearchSection" class="w-full max-w-lg text-center">
    <h1 class="text-5xl sm:text-6xl font-extrabold mb-8">
      <span class="text-blue-500">Proxy</span><span class="text-gray-200">Search</span>
    </h1>
    <form id="mainSearchForm" class="mb-10">
      <div class="relative flex items-center shadow-xl rounded-full mb-3">
        <div class="absolute left-0 pl-4 flex items-center pointer-events-none z-10">
          <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clip-rule="evenodd" />
          </svg>
        </div>
        <input 
          type="text" 
          id="mainSearchInput"
          name="q_main" 
          placeholder="Search the web or enter a URL" 
          aria-label="Search the web or enter a URL"
          class="w-full py-3.5 pl-12 pr-4 text-gray-100 bg-gray-800 border border-gray-700 rounded-full focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-60 outline-none transition-all duration-200 ease-in-out placeholder-gray-500 text-base"
        />
      </div>
      <div class="flex justify-center gap-3">
        <button 
          type="submit" 
          id="mainSearchBtn"
          class="px-7 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transform hover:scale-105"
        >
          Search
        </button>
        <button 
          type="button" 
          id="mainOpenInNewTabBtn"
          class="px-7 py-2.5 bg-gray-700 hover:bg-gray-600 text-gray-200 font-medium rounded-md shadow-md hover:shadow-lg transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-blue-500 transform hover:scale-105"
        >
          Open in New Tab
        </button>
      </div>
    </form>
    <div class="quick-links-container">
      <div class="flex flex-wrap justify-center items-center gap-2.5 sm:gap-3.5">
        <a href="javascript:void(0);" onclick="loadInBrowser('/?q=https://www.youtube.com', 'https://www.youtube.com')" class="quick-link-item group bg-gray-800 hover:bg-gray-700 text-gray-300 font-normal py-1.5 px-3 rounded-md text-xs sm:text-sm inline-flex items-center transition-all duration-200 ease-in-out transform hover:-translate-y-px focus:outline-none">
          <img src="https://www.youtube.com/s/desktop/d1e6e8f6/img/favicon.ico" alt="YouTube" class="w-4 h-4 mr-1.5 sm:mr-2 rounded-sm" onerror="this.src='https://placehold.co/16x16/4B5563/E0E0E0?text=Y'; this.onerror=null;"/>
          <span class="group-hover:text-white transition-colors">YouTube</span>
        </a>
        <a href="javascript:void(0);" onclick="loadInBrowser('/?q=https://www.twitch.tv', 'https://www.twitch.tv')" class="quick-link-item group bg-gray-800 hover:bg-gray-700 text-gray-300 font-normal py-1.5 px-3 rounded-md text-xs sm:text-sm inline-flex items-center transition-all duration-200 ease-in-out transform hover:-translate-y-px focus:outline-none">
          <img src="https://static.twitchcdn.net/assets/favicon-32-e29e246c157142c94346.png" alt="Twitch" class="w-4 h-4 mr-1.5 sm:mr-2 rounded-sm" onerror="this.src='https://placehold.co/16x16/4B5563/E0E0E0?text=T'; this.onerror=null;"/>
          <span class="group-hover:text-white transition-colors">Twitch</span>
        </a>
         <a href="javascript:void(0);" onclick="loadInBrowser('/?q=https://zonikyo.github.io', 'https://zonikyo.github.io')" class="quick-link-item group bg-gray-800 hover:bg-gray-700 text-gray-300 font-normal py-1.5 px-3 rounded-md text-xs sm:text-sm inline-flex items-center transition-all duration-200 ease-in-out transform hover:-translate-y-px focus:outline-none">
          <img src="https://zonikyo.github.io/favicon.ico" alt="Neonwave" class="w-4 h-4 mr-1.5 sm:mr-2 rounded-sm" onerror="this.src='https://placehold.co/16x16/4B5563/E0E0E0?text=N'; this.onerror=null;"/>
          <span class="group-hover:text-white transition-colors">Neonwave</span>
        </a>
        <a href="javascript:void(0);" onclick="loadInBrowser('/?q=https://zonikyo.com', 'https://zonikyo.com')" class="quick-link-item group bg-gray-800 hover:bg-gray-700 text-gray-300 font-normal py-1.5 px-3 rounded-md text-xs sm:text-sm inline-flex items-center transition-all duration-200 ease-in-out transform hover:-translate-y-px focus:outline-none">
          <img src="https://zonikyo.com/favicon.ico" alt="Zonikyo" class="w-4 h-4 mr-1.5 sm:mr-2 rounded-sm" onerror="this.src='https://placehold.co/16x16/4B5563/E0E0E0?text=Z'; this.onerror=null;"/>
          <span class="group-hover:text-white transition-colors">Zonikyo</span>
        </a>
      </div>
    </div>
  </div>

  <div id="browserViewSection" class="w-full max-w-screen-xl hidden">
    <div id="browserControls" class="flex items-center gap-2 p-2 mb-3 bg-gray-800 rounded-lg shadow-md">
      <button id="homeBtn" title="Back to Search Home" class="browser-control-button p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-colors">🏠</button>
      <button id="backBtn" title="Back" class="browser-control-button p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">⬅️</button>
      <button id="forwardBtn" title="Forward" class="browser-control-button p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">➡️</button>
      <button id="reloadBtn" title="Reload" class="browser-control-button p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-colors">🔄</button>
      <form id="browserUrlForm" class="flex-grow">
        <input type="text" id="urlBarBrowserView" placeholder="Enter URL or search" class="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none placeholder-gray-400">
      </form>
      <button id="openInNewTabBrowserView" title="Open current page in new tab" class="browser-control-button p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-colors">↗️</button>
    </div>
    <iframe id="contentFrame" src="about:blank"></iframe>
  </div>

<script>
  const initialSearchSection = document.getElementById('initialSearchSection');
  const browserViewSection = document.getElementById('browserViewSection');
  const mainSearchForm = document.getElementById('mainSearchForm');
  const mainSearchInput = document.getElementById('mainSearchInput');
  const mainOpenInNewTabBtn = document.getElementById('mainOpenInNewTabBtn');
  
  const homeBtn = document.getElementById('homeBtn');
  const backBtn = document.getElementById('backBtn');
  const forwardBtn = document.getElementById('forwardBtn');
  const reloadBtn = document.getElementById('reloadBtn');
  const browserUrlForm = document.getElementById('browserUrlForm');
  const urlBarBrowserView = document.getElementById('urlBarBrowserView');
  const openInNewTabBrowserView = document.getElementById('openInNewTabBrowserView');
  const contentFrame = document.getElementById('contentFrame');

  let historyStack = [];
  let historyIndex = -1;

  function updateNavButtons() {
    backBtn.disabled = historyIndex <= 0;
    forwardBtn.disabled = historyIndex >= historyStack.length - 1;
  }

  function openInNewTab(proxiedUrl) {
    if (!proxiedUrl || proxiedUrl === 'about:blank') return;
    const newWindow = window.open('about:blank', '_blank', 'noopener,noreferrer');
    if (newWindow) {
      newWindow.location.href = proxiedUrl;
    } else {
      alert('Popup blocked. Please allow popups for this site.');
    }
  }
  
  function loadInBrowser(proxiedUrl, originalQuery) {
    initialSearchSection.classList.add('hidden');
    browserViewSection.classList.remove('hidden');
    browserViewSection.style.opacity = '1'; // Ensure it's visible after animation class is added

    contentFrame.src = proxiedUrl;
    urlBarBrowserView.value = originalQuery; // Show the original user input

    // Manage history
    if (historyStack[historyIndex] !== proxiedUrl) {
        historyStack = historyStack.slice(0, historyIndex + 1); // Clear forward history if new navigation
        historyStack.push(proxiedUrl);
        historyIndex++;
    }
    updateNavButtons();
  }

  // Event listener for the main search form on the homepage
  mainSearchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = mainSearchInput.value.trim();
    if (!query) return;
    const proxiedUrl = '/?q=' + encodeURIComponent(query);
    loadInBrowser(proxiedUrl, query);
  });

  // Event listener for "Open in New Tab" on the homepage
  mainOpenInNewTabBtn.addEventListener('click', () => {
    const query = mainSearchInput.value.trim();
    if (!query) return;
    const proxiedUrl = '/?q=' + encodeURIComponent(query);
    openInNewTab(proxiedUrl);
  });
  
  // Quick links handler (global function called by onclick)
  window.loadInBrowser = loadInBrowser;


  // Browser view controls
  homeBtn.addEventListener('click', () => {
    browserViewSection.classList.add('hidden');
    initialSearchSection.classList.remove('hidden');
    initialSearchSection.style.opacity = '1';
    mainSearchInput.value = ''; // Clear homepage search input
    // Optionally clear iframe and history
    // contentFrame.src = 'about:blank';
    // historyStack = [];
    // historyIndex = -1;
    // updateNavButtons();
  });

  backBtn.addEventListener('click', () => {
    if (historyIndex > 0) {
      historyIndex--;
      const targetProxiedUrl = historyStack[historyIndex];
      contentFrame.src = targetProxiedUrl;
      // Update URL bar with the 'q' param from the proxied URL
      try {
        const urlParams = new URL(targetProxiedUrl, window.location.origin).searchParams;
        urlBarBrowserView.value = urlParams.get('q') || '';
      } catch (e) {
         urlBarBrowserView.value = decodeURIComponent(targetProxiedUrl.substring(targetProxiedUrl.indexOf('/?q=') + 5));
      }
      updateNavButtons();
    }
  });

  forwardBtn.addEventListener('click', () => {
    if (historyIndex < historyStack.length - 1) {
      historyIndex++;
      const targetProxiedUrl = historyStack[historyIndex];
      contentFrame.src = targetProxiedUrl;
       try {
        const urlParams = new URL(targetProxiedUrl, window.location.origin).searchParams;
        urlBarBrowserView.value = urlParams.get('q') || '';
      } catch (e) {
         urlBarBrowserView.value = decodeURIComponent(targetProxiedUrl.substring(targetProxiedUrl.indexOf('/?q=') + 5));
      }
      updateNavButtons();
    }
  });

  reloadBtn.addEventListener('click', () => {
    if (contentFrame.src && contentFrame.src !== 'about:blank') {
      contentFrame.src = contentFrame.src; // Simple reload
    }
  });

  browserUrlForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newQuery = urlBarBrowserView.value.trim();
    if (!newQuery) return;
    const newProxiedUrl = '/?q=' + encodeURIComponent(newQuery);
    contentFrame.src = newProxiedUrl; // This will trigger iframe.onload
    // History will be updated in iframe.onload
  });

  openInNewTabBrowserView.addEventListener('click', () => {
    const currentProxiedUrl = contentFrame.src;
    openInNewTab(currentProxiedUrl);
  });

  contentFrame.addEventListener('load', () => {
    // This event fires when the iframe content has loaded.
    // The src of the iframe is the /?q=... URL.
    const currentLoadedProxiedUrl = contentFrame.src;
    if (currentLoadedProxiedUrl === 'about:blank') {
        updateNavButtons(); // Ensure buttons are correct if iframe is blanked
        return;
    }

    // Update URL bar with the actual 'q' parameter from the iframe's src
    let displayedQuery = '';
    try {
        // Use URL constructor to reliably parse the 'q' parameter from the iframe's src
        const frameUrl = new URL(currentLoadedProxiedUrl, window.location.origin); // Provide base if src is relative
        displayedQuery = frameUrl.searchParams.get('q') || '';
    } catch (e) {
        // Fallback for parsing, though should ideally not be needed with full URLs in src
        const qIndex = currentLoadedProxiedUrl.indexOf('/?q=');
        if (qIndex !== -1) {
            displayedQuery = decodeURIComponent(currentLoadedProxiedUrl.substring(qIndex + 5));
        }
    }
    urlBarBrowserView.value = displayedQuery;
    
    // Update history if the loaded URL is different from the current top of the stack
    // or if it's a new navigation not initiated by back/forward buttons
    if (historyStack[historyIndex] !== currentLoadedProxiedUrl) {
        // If current history index is not at the end, it means we navigated back then to a new page
        if (historyIndex < historyStack.length - 1) {
            historyStack = historyStack.slice(0, historyIndex + 1);
        }
        historyStack.push(currentLoadedProxiedUrl);
        historyIndex = historyStack.length - 1;
    }
    updateNavButtons();
  });
  
  // Initial state for nav buttons
  updateNavButtons();
  // Show initial search section by default after initial animations
  initialSearchSection.style.opacity = '1';

</script>
</body>
</html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    // Server-side proxy logic (if query is present)
    const isProbablyUrl = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-z]{2,}(\S*)?$/.test(query); // Regex allows paths/queries

    let targetUrl: string;
    if (isProbablyUrl) {
      targetUrl = query.startsWith("http://") || query.startsWith("https://") ? query : `https://${query}`;
    } else {
      // This is for search queries, use Yahoo as per original logic
      targetUrl = `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`;
    }

    try {
        const res = await fetch(targetUrl, {
          method: "GET",
          headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Language": "en-US,en;q=0.9",
            "Referer": new URL(targetUrl).origin + '/', // Set a generic referer
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
        const baseProxyUrl = `${url.protocol}//${url.host}/?q=`;

        // Rewrite URLs in HTML attributes (href, src, action)
        html = html.replace(/(href|src|action)=["'](.*?)["']/gi, (match, attr, link) => {
          if (
            link.startsWith("#") ||
            link.startsWith("mailto:") ||
            link.startsWith("javascript:") ||
            link.startsWith("data:")
          ) {
            return match;
          }

          let newUrlStr = link;
          try {
            const absoluteUrl = new URL(link, targetUrl).toString();
            newUrlStr = absoluteUrl;
          } catch (_) {
            // If it's not a valid URL or already absolute, use as is (will be prefixed by baseProxyUrl)
          }
          return `${attr}="${baseProxyUrl}${encodeURIComponent(newUrlStr)}"`;
        });

        // Rewrite URLs in CSS url()
        html = html.replace(/url\s*\(\s*['"]?(.*?)['"]?\s*\)/gi, (match, assetUrl) => {
          if (assetUrl.startsWith("data:") || assetUrl.startsWith("#")) return match;

          let newAssetUrlStr = assetUrl;
          try {
            const absoluteAssetUrl = new URL(assetUrl, targetUrl).toString();
            newAssetUrlStr = absoluteAssetUrl;
          } catch (_) {
            // Use as is
          }
          return `url('${baseProxyUrl}${encodeURIComponent(newAssetUrlStr)}')`;
        });
        
        // Rewrite srcset attributes
        html = html.replace(/srcset=["'](.*?)["']/gi, (match, srcsetLinks) => {
            const newSrcset = srcsetLinks.split(',').map(part => {
                const item = part.trim().split(/\s+/);
                if (item.length > 0 && item[0]) {
                    let newUrl = item[0];
                    try {
                        newUrl = new URL(item[0], targetUrl).toString();
                    } catch (_) {}
                    item[0] = `${baseProxyUrl}${encodeURIComponent(newUrl)}`;
                }
                return item.join(' ');
            }).join(', ');
            return `srcset="${newSrcset}"`;
        });


        html = html.replace(/<meta[^>]+http-equiv=["']refresh["'][^>]*>/gi, "");

        // Inject a base tag. The base href should be the proxied version of the target URL's base.
        let baseHrefForTag = targetUrl;
        try {
            const targetBase = new URL(targetUrl);
            baseHrefForTag = targetBase.origin + (targetBase.pathname.endsWith('/') ? targetBase.pathname : targetBase.pathname + '/');
        } catch(_) { /* use targetUrl as is if parsing fails */ }

        const proxiedBaseHref = `${baseProxyUrl}${encodeURIComponent(baseHrefForTag)}`;

        if (!/<head[^>]*>/i.test(html)) {
            html = "<head></head>" + html;
        }
        // Ensure base tag is first in head for best effect, or at least present
        if (html.includes("<base")) {
             html = html.replace(/<base[^>]*>/i, `<base href="${proxiedBaseHref}">`);
        } else {
             html = html.replace(/<head[^>]*>/i, `$&<base href="${proxiedBaseHref}">`);
        }


        return new Response(html, {
          status: res.status,
          headers: {
            "Content-Type": "text/html; charset=UTF-8",
            "Content-Security-Policy": "frame-ancestors *;", // Allow embedding in iframe from any origin
            "X-Frame-Options": "", // Allow framing
          },
        });

    } catch (e: any) {
        return new Response(`Error fetching or processing URL: ${e.message} for target: ${targetUrl}`, { status: 500 });
    }
  },
};
