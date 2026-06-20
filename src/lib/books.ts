import booksData from "@/data/books.json";
import type { Book, BookCategory } from "@/types/book";

const books = booksData as Book[];

export function getAllBooks(): Book[] {
  return books;
}

export function getFeaturedBooks(limit = 4): Book[] {
  return books.slice(0, limit);
}

export function getBookById(id: string): Book | undefined {
  return books.find((book) => book.id === id);
}

export function searchBooks(query: string): Book[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return books;
  return books.filter((book) =>
    book.title.toLowerCase().includes(normalized)
  );
}

export function filterBooksByCategory(category: BookCategory | "All"): Book[] {
  if (category === "All") return books;
  return books.filter((book) => book.category === category);
}
