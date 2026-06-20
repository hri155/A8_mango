"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import BookCard from "@/components/BookCard";
import CategorySidebar from "@/components/CategorySidebar";
import type { Book, BookCategory } from "@/types/book";

function AllBooksContent() {
  const searchParams = useSearchParams();
  const initialCategory =
    (searchParams.get("category") as BookCategory | "All") || "All";

  const [books, setBooks] = useState<Book[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<BookCategory | "All">(initialCategory);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (category !== "All") params.set("category", category);

    fetch(`/api/books?${params.toString()}`)
      .then((res) => res.json())
      .then((data: Book[]) => {
        setBooks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search, category]);

  const resultText = useMemo(() => {
    if (loading) return "Loading books...";
    return `${books.length} book${books.length === 1 ? "" : "s"} found`;
  }, [books.length, loading]);

  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-2 animate__animated animate__fadeIn">
        All Books
      </h1>
      <p className="text-base-content/70 mb-8">
        Search and filter our collection to find your perfect read.
      </p>

      <div className="form-control mb-8 max-w-2xl">
        <input
          type="search"
          placeholder="Search books by title..."
          className="input input-bordered input-lg w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <CategorySidebar selected={category} onSelect={setCategory} />

        <div className="flex-1">
          <p className="text-sm text-base-content/60 mb-4">{resultText}</p>

          {loading ? (
            <div className="flex justify-center py-16">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-16 text-base-content/60">
              <span className="text-5xl block mb-4">📭</span>
              No books match your search. Try a different title or category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {books.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AllBooksPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-24">
          <span className="loading loading-spinner loading-lg text-primary" />
        </div>
      }
    >
      <AllBooksContent />
    </Suspense>
  );
}
