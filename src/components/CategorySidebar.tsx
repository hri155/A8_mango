"use client";

import type { BookCategory } from "@/types/book";
import { BOOK_CATEGORIES } from "@/types/book";

interface CategorySidebarProps {
  selected: BookCategory | "All";
  onSelect: (category: BookCategory | "All") => void;
}

export default function CategorySidebar({
  selected,
  onSelect,
}: CategorySidebarProps) {
  const categories: (BookCategory | "All")[] = ["All", ...BOOK_CATEGORIES];

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="card bg-base-100 shadow-md border border-base-200 sticky top-24">
        <div className="card-body p-4">
          <h2 className="card-title text-lg mb-2">Categories</h2>
          <ul className="menu menu-vertical gap-1 p-0">
            {categories.map((category) => (
              <li key={category}>
                <button
                  type="button"
                  onClick={() => onSelect(category)}
                  className={
                    selected === category
                      ? "active bg-primary text-primary-content font-semibold"
                      : ""
                  }
                >
                  {category === "All" ? "All Books" : category}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  );
}
