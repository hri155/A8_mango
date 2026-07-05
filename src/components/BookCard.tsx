import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
  showViewDetails?: boolean;
  animateClass?: string;
  eagerImage?: boolean;
}

export default function BookCard({
  book,
  showViewDetails = false,
  animateClass = "",
  eagerImage = false,
}: BookCardProps) {
  const bookId = book._id?.toString() || book.id?.toString();

  return (
    <div
      className={`card bg-base-100 shadow-lg hover:shadow-xl transition-shadow border border-base-200 ${animateClass}`}
    >
      <figure className="relative h-56 bg-base-200">
        <Image
          src={book.image_url || book.coverImage || "/book-placeholder.jpg"}
          alt={book.title || "Book cover"}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          loading={eagerImage ? "eager" : "lazy"}
        />

        <div className="badge badge-primary absolute top-3 right-3">
          {book.category || "Book"}
        </div>
      </figure>

      <div className="card-body p-4">
        <h3 className="card-title text-base line-clamp-2">
          {book.title}
        </h3>

        <p className="text-sm text-base-content/70">
          {book.author}
        </p>

        <div className="card-actions justify-end mt-2">
          {bookId ? (
            <Link
              href={`/books/${bookId}`}
              className={
                showViewDetails
                  ? "btn btn-primary btn-sm"
                  : "btn btn-outline btn-sm"
              }
            >
              {showViewDetails ? "View Details" : "Details"}
            </Link>
          ) : (
            <button type="button" className="btn btn-disabled btn-sm">
              Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}