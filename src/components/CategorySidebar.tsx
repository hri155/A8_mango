"use client";

import type { BookCategory } from "@/types/book";
import { BOOK_CATEGORIES } from "@/types/book";

interface CategorySidebarProps {
  selected: BookCategory | "All";
  onSelect: (category: BookCategory | "All") => void;
}

const categoryIcons: Record<BookCategory | "All", string> = {
  All: "📚",
  Story: "📖",
  Tech: "💻",
  Science: "🔬",
};

export default function CategorySidebar({
  selected,
  onSelect,
}: CategorySidebarProps) {
  const categories: (BookCategory | "All")[] = ["All", ...BOOK_CATEGORIES];

  return (
    <aside className="w-full lg:w-64 shrink-0">
      <div className="card bg-base-100 shadow-md border border-base-200 sticky top-24 animate__animated animate__fadeInLeft">
        <div className="card-body p-4">
          <h2 className="card-title text-lg mb-2">Category Filter</h2>

          <p className="text-xs text-base-content/60 mb-2">
            Filter by Story, Tech, or Science.
          </p>

          <ul className="menu menu-vertical gap-1 p-0">
            {categories.map((category) => {
              const active = selected === category;

              return (
                <li key={category}>
                  <button
                    type="button"
                    onClick={() => onSelect(category)}
                    aria-pressed={active}
                    className={`justify-between ${
                      active
                        ? "active bg-primary text-primary-content font-semibold"
                        : "hover:bg-base-200"
                    }`}
                  >
                    <span>
                      <span className="mr-2">{categoryIcons[category]}</span>
                      {category === "All" ? "All Books" : category}
                    </span>

                    {active && <span className="badge badge-sm">Selected</span>}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
}