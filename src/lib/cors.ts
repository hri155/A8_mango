const STATIC_ORIGINS = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "https://mango-books-virid.vercel.app",
];

function getAllowedOrigins(): string[] {
  const origins = new Set(STATIC_ORIGINS);

  if (process.env.BETTER_AUTH_URL) origins.add(process.env.BETTER_AUTH_URL);
  if (process.env.NEXT_PUBLIC_APP_URL) origins.add(process.env.NEXT_PUBLIC_APP_URL);
  if (process.env.VERCEL_URL) origins.add(`https://${process.env.VERCEL_URL}`);

  return [...origins];
}

function isOriginAllowed(origin: string): boolean {
  if (getAllowedOrigins().includes(origin)) return true;

  // Allow Vercel preview/production subdomains (including team project URLs)
  if (/^https:\/\/[\w-]+(\.[\w-]+)*\.vercel\.app$/.test(origin)) return true;

  return false;
}

export function buildCorsHeaders(request: Request): HeadersInit {
  const origin = request.headers.get("origin");
  const headers: HeadersInit = {
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS",
    "Access-Control-Allow-Headers":
      "Content-Type, Authorization, X-Requested-With, Cookie, Set-Cookie",
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Max-Age": "86400",
  };

  if (origin && isOriginAllowed(origin)) {
    headers["Access-Control-Allow-Origin"] = origin;
    headers.Vary = "Origin";
  }

  return headers;
}

export function applyCorsHeaders(request: Request, response: Response): Response {
  const corsHeaders = buildCorsHeaders(request);
  const next = new Response(response.body, response);

  Object.entries(corsHeaders).forEach(([key, value]) => {
    next.headers.set(key, value);
  });

  return next;
}

export function corsPreflightResponse(request: Request): Response {
  return new Response(null, {
    status: 204,
    headers: buildCorsHeaders(request),
  });
}
