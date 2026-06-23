import { auth } from "@/lib/auth";
import { applyCorsHeaders, corsPreflightResponse } from "@/lib/cors";
import { toNextJsHandler } from "better-auth/next-js";

const handler = toNextJsHandler(auth);

export async function OPTIONS(request: Request) {
  return corsPreflightResponse(request);
}

export async function GET(request: Request) {
  const response = await handler.GET(request);
  return applyCorsHeaders(request, response);
}

export async function POST(request: Request) {
  const response = await handler.POST(request);
  return applyCorsHeaders(request, response);
}
