"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import BookCard from "@/components/BookCard";
import Marquee from "@/components/Marquee";
import type { Book } from "@/types/book";

export default function FeaturedBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/books?featured=true")
      .then((res) => res.json())
      .then((data: Book[]) => {
        setBooks(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {books.map((book, index) => {
        const delays = [
          "animate__delay-0s",
          "animate__delay-1s",
          "animate__delay-2s",
          "animate__delay-3s",
        ];
        return (
          <BookCard
            key={book.id}
            book={book}
            showViewDetails
            animateClass={`animate__animated animate__fadeInUp ${delays[index] ?? ""}`}
          />
        );
      })}
    </div>
  );
}

export function CategoryShowcase() {
  const categories = [
    {
      name: "Story",
      emoji: "📖",
      description: "Immerse yourself in captivating narratives and timeless tales.",
      href: "/all-books?category=Story",
      color: "from-rose-400 to-pink-500",
    },
    {
      name: "Tech",
      emoji: "💻",
      description: "Master programming, design patterns, and modern software craft.",
      href: "/all-books?category=Tech",
      color: "from-blue-400 to-indigo-500",
    },
    {
      name: "Science",
      emoji: "🔬",
      description: "Explore the universe, genetics, and the wonders of discovery.",
      href: "/all-books?category=Science",
      color: "from-emerald-400 to-teal-500",
    },
  ];

  return (
    <section className="py-16 bg-base-200">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 animate__animated animate__fadeIn">
          Browse by Category
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={`card bg-gradient-to-br ${cat.color} text-white shadow-lg hover:scale-105 transition-transform animate__animated animate__zoomIn`}
            >
              <div className="card-body items-center text-center">
                <span className="text-5xl">{cat.emoji}</span>
                <h3 className="card-title text-2xl">{cat.name}</h3>
                <p className="text-white/90">{cat.description}</p>
                <span className="btn btn-sm btn-ghost text-white border-white/30 mt-2">
                  Explore →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WhyMangoBooks() {
  const features = [
    {
      icon: "🚀",
      title: "Instant Access",
      text: "Borrow digital books instantly without waiting in line.",
    },
    {
      icon: "🔒",
      title: "Secure Platform",
      text: "Protected with BetterAuth for safe login and data privacy.",
    },
    {
      icon: "📱",
      title: "Read Anywhere",
      text: "Fully responsive design works on mobile, tablet, and desktop.",
    },
    {
      icon: "🎯",
      title: "Smart Search",
      text: "Find your next read quickly with search and category filters.",
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 animate__animated animate__fadeIn">
          Why Mango Books?
        </h2>
        <p className="text-center text-base-content/70 mb-10 max-w-2xl mx-auto">
          A modern library experience designed for readers who love convenience,
          security, and a touch of tropical warmth.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="card bg-base-100 border border-base-200 shadow-md hover:shadow-lg transition-shadow animate__animated animate__fadeInUp"
            >
              <div className="card-body items-center text-center">
                <span className="text-4xl">{feature.icon}</span>
                <h3 className="card-title text-lg">{feature.title}</h3>
                <p className="text-sm text-base-content/70">{feature.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export { Marquee };
