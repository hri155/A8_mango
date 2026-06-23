import { NextResponse } from "next/server";
import { applyCorsHeaders, corsPreflightResponse } from "@/lib/cors";
import { getBookById } from "@/lib/books";

export async function OPTIONS(request: Request) {
  return corsPreflightResponse(request);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const book = getBookById(id);

  if (!book) {
    return applyCorsHeaders(
      request,
      NextResponse.json({ error: "Book not found" }, { status: 404 })
    );
  }

  return applyCorsHeaders(request, NextResponse.json(book));
}
