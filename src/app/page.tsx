import type { Metadata } from "next";
import Link from "next/link";
import FeaturedBooks, {
  CategoryShowcase,
  Marquee,
  WhyMangoBooks,
} from "@/components/HomeSections";

export const metadata: Metadata = {
  title: "Home | Mango Books",
  description: "Find your next read at Mango Books — your digital library platform.",
};

export default function HomePage() {
  return (
    <>
      <section className="hero min-h-[70vh] bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="hero-content text-center py-16 px-4">
          <div className="max-w-3xl animate__animated animate__fadeInDown">
            <span className="text-6xl mb-4 block">🥭📚</span>
            <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Find Your Next Read
            </h1>
            <p className="py-6 text-lg text-base-content/70 max-w-xl mx-auto">
              Discover thousands of stories, tech guides, and science books.
              Borrow digitally and read anywhere, anytime.
            </p>
            <Link href="/all-books" className="btn btn-primary btn-lg gap-2">
              Browse Now
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10 animate__animated animate__fadeIn">
            Featured Books
          </h2>
          <FeaturedBooks />
        </div>
      </section>

      <WhyMangoBooks />
      <CategoryShowcase />
    </>
  );
}
