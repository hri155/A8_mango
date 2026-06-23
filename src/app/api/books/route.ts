import { NextRequest, NextResponse } from "next/server";
import { applyCorsHeaders, corsPreflightResponse } from "@/lib/cors";
import { getAllBooks, searchBooks } from "@/lib/books";
import type { BookCategory } from "@/types/book";

export async function OPTIONS(request: Request) {
  return corsPreflightResponse(request);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q") ?? "";
  const category = searchParams.get("category") as BookCategory | "All" | null;
  const featured = searchParams.get("featured");

  if (featured === "true") {
    return applyCorsHeaders(
      request,
      NextResponse.json(getAllBooks().slice(0, 4))
    );
  }

  let books = query ? searchBooks(query) : getAllBooks();

  if (category && category !== "All") {
    books = books.filter((book) => book.category === category);
  }

  return applyCorsHeaders(request, NextResponse.json(books));
}
