"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import BookCard from "@/components/BookCard";
import CategorySidebar from "@/components/CategorySidebar";
import type { Book, BookCategory } from "@/types/book";
import { BOOK_CATEGORIES } from "@/types/book";

function isBookCategory(value: string | null): value is BookCategory {
  return BOOK_CATEGORIES.includes(value as BookCategory);
}

function AllBooksContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const urlCategory = searchParams.get("category");
  const urlSearch = searchParams.get("q") || "";
  const initialCategory = isBookCategory(urlCategory) ? urlCategory : "All";

  const [books, setBooks] = useState<Book[] | null>(null);
  const [search, setSearch] = useState(urlSearch);
  const [category, setCategory] =
    useState<BookCategory | "All">(initialCategory);

  const loading = books === null;

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const params = new URLSearchParams();

      if (search.trim()) params.set("q", search.trim());
      if (category !== "All") params.set("category", category);

      const query = params.toString();

      router.replace(query ? `/all-books?${query}` : "/all-books", {
        scroll: false,
      });
    }, 250);

    return () => window.clearTimeout(timeout);
  }, [search, category, router]);

  useEffect(() => {
    let ignore = false;

    const params = new URLSearchParams();

    if (search.trim()) params.set("q", search.trim());
    if (category !== "All") params.set("category", category);

    fetch(`/api/books?${params.toString()}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data: Book[]) => {
        if (!ignore) setBooks(data);
      })
      .catch(() => {
        if (!ignore) setBooks([]);
      });

    return () => {
      ignore = true;
    };
  }, [search, category]);

  const resultText = useMemo(() => {
    if (loading) return "Loading books...";

    const categoryText = category === "All" ? "all categories" : category;

    return `${books.length} book${
      books.length === 1 ? "" : "s"
    } found in ${categoryText}`;
  }, [books, category, loading]);

  const handleCategorySelect = (nextCategory: BookCategory | "All") => {
    setBooks(null);
    setCategory(nextCategory);
  };

  const handleSearchChange = (value: string) => {
    setBooks(null);
    setSearch(value);
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2 animate__animated animate__fadeIn">
            All Books
          </h1>

          <p className="text-base-content/70">
            Search and filter our collection to find your perfect read.
          </p>
        </div>

        <div className="badge badge-outline badge-lg animate__animated animate__pulse">
          Animate.css npm package active
        </div>
      </div>

      <div className="form-control mb-8 max-w-2xl">
        <label className="label" htmlFor="book-search">
          <span className="label-text">Search books by title</span>
        </label>

        <input
          id="book-search"
          type="search"
          placeholder="Search books by title..."
          className="input input-bordered input-lg w-full"
          value={search}
          onChange={(e) => handleSearchChange(e.target.value)}
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <CategorySidebar selected={category} onSelect={handleCategorySelect} />

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <p className="text-sm text-base-content/60">{resultText}</p>

            {category !== "All" && (
              <button
                type="button"
                className="btn btn-ghost btn-xs"
                onClick={() => handleCategorySelect("All")}
              >
                Clear category
              </button>
            )}
          </div>

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