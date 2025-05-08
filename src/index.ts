export default {
  async fetch(request: Request): Promise<Response> {
    return new Response(
      `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hello from Cloudflare Worker</title>
</head>
<body>
  <h1>It works! 🚀</h1>
  <p>You hit the Worker at: ${request.url}</p>
</body>
</html>`,
      {
        headers: {
          "Content-Type": "text/html",
        },
      }
    );
  },
};
