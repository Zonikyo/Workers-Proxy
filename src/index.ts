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
        outline: 2px solid #3B82F6; 
        outline-offset: 2px;
    }
    #contentFrame {
      width: 100%;
      height: calc(100vh - 76px); 
      border: 1px solid #374151; 
      border-radius: 0.375rem; 
    }
    .hidden { display: none !important; }
  </style>
</head>
<body class="bg-gray-900 text-gray-100 flex flex-col items-center justify-center min-h-screen p-4 selection:bg-blue-600 selection:text-white overflow-x-hidden">

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

  <div id="browserViewSection" class="w-full hidden">
    <div id="browserControls" class="flex items-center gap-2 p-2 mb-3 bg-gray-800 rounded-lg shadow-md sticky top-0 z-20">
      <button id="homeBtn" title="Back to Search Home" class="browser-control-button p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-colors">🏠</button>
      <button id="backBtn" title="Back" class="browser-control-button p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">⬅️</button>
      <button id="forwardBtn" title="Forward" class="browser-control-button p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">➡️</button>
      <button id="reloadBtn" title="Reload" class="browser-control-button p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-colors">🔄</button>
      <form id="browserUrlForm" class="flex-grow">
        <input type="text" id="urlBarBrowserView" placeholder="Enter URL or search" class="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none placeholder-gray-400">
      </form>
      <button id="openInNewTabBrowserView" title="Open current page in new tab" class="browser-control-button p-2 bg-gray-700 hover:bg-gray-600 rounded-md text-gray-300 transition-colors">↗️</button>
    </div>
    <iframe id="contentFrame" src="about:blank" sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-popups-to-escape-sandbox allow-presentation allow-same-origin allow-scripts allow-top-navigation allow-top-navigation-by-user-activation"></iframe>
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
  const browserControls = document.getElementById('browserControls');


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
      console.warn('Popup blocked. Please allow popups for this site to open in a new tab.');
    }
  }
  
  function loadInBrowser(proxiedUrl, originalQuery) {
    initialSearchSection.classList.add('hidden');
    browserViewSection.classList.remove('hidden');
    browserViewSection.style.opacity = '1'; 

    contentFrame.src = proxiedUrl;
    urlBarBrowserView.value = originalQuery; 

    if (historyStack[historyIndex] !== proxiedUrl) {
        historyStack = historyStack.slice(0, historyIndex + 1); 
        historyStack.push(proxiedUrl);
        historyIndex++;
    }
    updateNavButtons();
  }

  mainSearchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = mainSearchInput.value.trim();
    if (!query) return;
    const proxiedUrl = '/?q=' + encodeURIComponent(query);
    loadInBrowser(proxiedUrl, query);
  });

  mainOpenInNewTabBtn.addEventListener('click', () => {
    const query = mainSearchInput.value.trim();
    if (!query) return;
    const proxiedUrl = '/?q=' + encodeURIComponent(query);
    openInNewTab(proxiedUrl);
  });
  
  window.loadInBrowser = loadInBrowser;


  homeBtn.addEventListener('click', () => {
    browserViewSection.classList.add('hidden');
    initialSearchSection.classList.remove('hidden');
    initialSearchSection.style.opacity = '1';
    mainSearchInput.value = ''; 
  });

  backBtn.addEventListener('click', () => {
    if (historyIndex > 0) {
      historyIndex--;
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
      contentFrame.contentWindow.location.reload(true); 
    }
  });

  browserUrlForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const newQuery = urlBarBrowserView.value.trim();
    if (!newQuery) return;
    const newProxiedUrl = '/?q=' + encodeURIComponent(newQuery);
    loadInBrowser(newProxiedUrl, newQuery); 
  });

  openInNewTabBrowserView.addEventListener('click', () => {
    const currentProxiedUrl = contentFrame.src;
    openInNewTab(currentProxiedUrl);
  });

  contentFrame.addEventListener('load', () => {
    const currentLoadedProxiedUrl = contentFrame.src;
    if (currentLoadedProxiedUrl === 'about:blank' || !currentLoadedProxiedUrl.startsWith(window.location.origin + '/?q=')) {
        updateNavButtons(); 
        return;
    }

    let displayedQuery = '';
    try {
        const frameUrl = new URL(currentLoadedProxiedUrl, window.location.origin); 
        displayedQuery = frameUrl.searchParams.get('q') || '';
    } catch (e) {
        const qIndex = currentLoadedProxiedUrl.indexOf('/?q=');
        if (qIndex !== -1) {
            displayedQuery = decodeURIComponent(currentLoadedProxiedUrl.substring(qIndex + 5));
        }
    }
    urlBarBrowserView.value = displayedQuery;
    
    if (historyStack[historyIndex] !== currentLoadedProxiedUrl) {
        if (historyIndex < historyStack.length - 1) { 
            historyStack = historyStack.slice(0, historyIndex + 1);
        }
        if (historyStack.length === 0 || historyStack[historyStack.length -1] !== currentLoadedProxiedUrl) {
             historyStack.push(currentLoadedProxiedUrl);
             historyIndex = historyStack.length - 1;
        } else if (historyStack[historyStack.length -1] === currentLoadedProxiedUrl && historyIndex !== historyStack.length -1) {
            historyIndex = historyStack.indexOf(currentLoadedProxiedUrl);
        }
    }
    updateNavButtons();
  });
  
  updateNavButtons();
  initialSearchSection.style.opacity = '1'; 

  const resizeObserver = new ResizeObserver(() => {
    if (!browserViewSection.classList.contains('hidden')) {
      const controlsHeight = browserControls.offsetHeight;
      const marginBottomControls = parseInt(window.getComputedStyle(browserControls).marginBottom);
      const bodyVerticalPadding = parseInt(window.getComputedStyle(document.body).paddingTop) + parseInt(window.getComputedStyle(document.body).paddingBottom);
      contentFrame.style.height = \`calc(100vh - \${controlsHeight + marginBottomControls + bodyVerticalPadding}px)\`;
    }
  });
  resizeObserver.observe(browserControls);

  const initialBrowserViewObserver = new MutationObserver((mutationsList, observer) => {
    for(const mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
            if (!browserViewSection.classList.contains('hidden')) {
                const controlsHeight = browserControls.offsetHeight;
                const marginBottomControls = parseInt(window.getComputedStyle(browserControls).marginBottom);
                const bodyVerticalPadding = parseInt(window.getComputedStyle(document.body).paddingTop) + parseInt(window.getComputedStyle(document.body).paddingBottom);
                contentFrame.style.height = \`calc(100vh - \${controlsHeight + marginBottomControls + bodyVerticalPadding}px)\`;
            }
        }
    }
  });
  initialBrowserViewObserver.observe(browserViewSection, { attributes: true });

</script>
</body>
</html>`,
        { headers: { "Content-Type": "text/html" } }
      );
    }

    // Server-side proxy logic
    const isProbablyUrl = /^(https?:\/\/)?[a-zA-Z0-9.-]+\.[a-z]{2,}(\S*)?$/.test(query); 
    let targetUrlString = query;

    if (isProbablyUrl) {
      targetUrlString = query.startsWith("http://") || query.startsWith("https://") ? query : `https://${query}`;
    } else {
      targetUrlString = `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`;
    }

    try {
        const targetUrl = new URL(targetUrlString); 
        const baseProxyUrl = `${url.protocol}//${url.host}/?q=`;

        // Fetch the target resource
        const res = await fetch(targetUrl.toString(), {
          method: request.method, // Use the original request method
          headers: { // Pass through certain headers, modify others
            ...request.headers, // Start with original request headers
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "Accept-Language": "en-US,en;q=0.9",
            "Referer": targetUrl.origin + '/', // Set a plausible referer
            "Host": targetUrl.host, // Set the Host header to the target's host
            // Remove headers that might cause issues or reveal proxying
            "X-Forwarded-For": "",
            "X-Forwarded-Host": "",
            "X-Forwarded-Proto": "",
          },
          body: request.method === 'POST' || request.method === 'PUT' ? request.body : undefined, // Pass body for POST/PUT
          redirect: 'manual', // Handle redirects manually to rewrite Location header
        });

        // Handle redirects
        if (res.status >= 300 && res.status < 400 && res.headers.has("location")) {
            let redirectedLocation = res.headers.get("location")!;
            try {
                // Resolve relative redirect locations against the target URL
                redirectedLocation = new URL(redirectedLocation, targetUrl).toString();
            } catch (_) {
                // If it's already absolute or malformed, use as is
            }
            const proxiedRedirectUrl = `${baseProxyUrl}${encodeURIComponent(redirectedLocation)}`;
            return new Response(null, {
                status: res.status,
                headers: {
                    ...res.headers, // Pass through original redirect headers
                    "Location": proxiedRedirectUrl,
                }
            });
        }
        
        // Clone headers to make them modifiable
        const responseHeaders = new Headers(res.headers);

        // Rewrite Set-Cookie headers
        const newCookies: string[] = [];
        if (responseHeaders.has("set-cookie")) {
            const originalCookies = responseHeaders.raw()['set-cookie'] || []; // Get raw array of cookie strings
            originalCookies.forEach(cookieStr => {
                let newCookie = cookieStr.replace(/Domain=[^;]+;?/i, ""); // Remove original domain
                newCookie = newCookie.replace(/Path=[^;]+;?/i, "Path=/;"); // Set path to root of proxy
                // newCookie = newCookie.replace(/Secure;?/i, ""); // Optional: Remove Secure if proxy is HTTP
                newCookies.push(newCookie);
            });
            responseHeaders.delete("set-cookie"); // Remove original Set-Cookie headers
            newCookies.forEach(nc => responseHeaders.append("set-cookie", nc)); // Add modified ones
        }
        
        // Remove problematic security headers from the target that might block proxying
        responseHeaders.delete("content-security-policy"); // Will add our own later
        responseHeaders.delete("content-security-policy-report-only");
        responseHeaders.delete("x-frame-options");
        responseHeaders.delete("x-content-type-options"); // Usually 'nosniff', can be kept but sometimes problematic

        // Add our own CSP
        responseHeaders.set("Content-Security-Policy", "frame-ancestors *; upgrade-insecure-requests;");


        let contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("text/html")) {
          return new Response(res.body, {
            status: res.status,
            statusText: res.statusText,
            headers: responseHeaders, // Use modified headers
          });
        }

        let html = await res.text();

        const resolveAndProxyUrl = (linkUrl: string, base: URL): string => {
            if (
                linkUrl.startsWith("#") ||
                linkUrl.startsWith("mailto:") ||
                linkUrl.startsWith("javascript:") ||
                linkUrl.startsWith("data:") ||
                linkUrl.startsWith("blob:") // Allow blob URLs as they are same-origin
            ) {
                return linkUrl;
            }
            try {
                const absoluteUrl = new URL(linkUrl, base).toString();
                return `${baseProxyUrl}${encodeURIComponent(absoluteUrl)}`;
            } catch (_) {
                return `${baseProxyUrl}${encodeURIComponent(linkUrl)}`; 
            }
        };
        
        // Remove integrity and nonce attributes first
        html = html.replace(/\s+integrity=["'][^"']*["']/gi, "");
        html = html.replace(/\s+nonce=["'][^"']*["']/gi, "");

        // Rewrite attributes like href, src, action, poster, data, formaction, background, cite
        html = html.replace(/(href|src|action|poster|data|formaction|background|cite)=["'](.*?)["']/gi, (match, attr, link) => {
          return `${attr}="${resolveAndProxyUrl(link, targetUrl)}"`;
        });

        // Rewrite URLs in inline style="..." attributes
        html = html.replace(/style=(["'])([^"']+?)\1/gi, (match, quote, styleContent) => {
            const newStyleContent = styleContent.replace(/url\s*\(\s*['"]?(.*?)['"]?\s*\)/gi, (urlMatch: string, assetUrl: string) => {
                return `url('${resolveAndProxyUrl(assetUrl, targetUrl)}')`;
            });
            return `style=${quote}${newStyleContent}${quote}`;
        });
        
        // Rewrite URLs in <style>...</style> tags
        html = html.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (match, styleAttrs, styleContent) => {
            let newStyleContent = styleContent.replace(/@import\s+['"](.*?)['"]/gi, (_: string, importUrl: string) => {
                return `@import "${resolveAndProxyUrl(importUrl, targetUrl)}"`;
            });
            newStyleContent = newStyleContent.replace(/url\s*\(\s*['"]?(.*?)['"]?\s*\)/gi, (_: string, assetUrl: string) => {
                return `url('${resolveAndProxyUrl(assetUrl, targetUrl)}')`;
            });
            return `<style${styleAttrs}>${newStyleContent}</style>`;
        });

        // Rewrite srcset attributes
        html = html.replace(/srcset=["'](.*?)["']/gi, (match, srcsetLinks) => {
            const newSrcset = srcsetLinks.split(',').map(part => {
                const item = part.trim().split(/\s+/);
                if (item.length > 0 && item[0]) {
                    item[0] = resolveAndProxyUrl(item[0], targetUrl);
                }
                return item.join(' ');
            }).join(', ');
            return `srcset="${newSrcset}"`;
        });

        html = html.replace(/<meta[^>]+http-equiv=["']refresh["'][^>]*>/gi, "");

        let effectiveBaseHref;
        try {
            effectiveBaseHref = new URL('.', targetUrl).href;
        } catch {
            effectiveBaseHref = targetUrl.toString(); 
        }
        const proxiedBaseForTag = `${baseProxyUrl}${encodeURIComponent(effectiveBaseHref)}`;

        if (!/<head[^>]*>/i.test(html)) {
            html = "<head></head>" + html; 
        }
        html = html.replace(/<base[^>]*>/gi, ""); 
        html = html.replace(/<head[^>]*>/i, `$&<base href="${proxiedBaseForTag}">`);

        responseHeaders.set("Content-Type", "text/html; charset=UTF-8");

        return new Response(html, {
          status: res.status,
          statusText: res.statusText,
          headers: responseHeaders, // Use modified headers
        });

    } catch (e: any) {
        const displayUrl = targetUrlString || query;
        return new Response(`Proxy Error: ${e.message} for target: ${displayUrl}. Check if the URL is correct and the server is reachable.`, { status: 502 });
    }
  },
};
