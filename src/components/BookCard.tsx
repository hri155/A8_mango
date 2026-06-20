import Image from "next/image";
import Link from "next/link";
import type { Book } from "@/types/book";

interface BookCardProps {
  book: Book;
  showViewDetails?: boolean;
  animateClass?: string;
}

export default function BookCard({
  book,
  showViewDetails = false,
  animateClass = "",
}: BookCardProps) {
  return (
    <div
      className={`card bg-base-100 shadow-lg hover:shadow-xl transition-shadow border border-base-200 ${animateClass}`}
    >
      <figure className="relative h-56 bg-base-200">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        <div className="badge badge-primary absolute top-3 right-3">
          {book.category}
        </div>
      </figure>
      <div className="card-body p-4">
        <h3 className="card-title text-base line-clamp-2">{book.title}</h3>
        <p className="text-sm text-base-content/70">{book.author}</p>
        <div className="card-actions justify-end mt-2">
          {showViewDetails ? (
            <Link
              href={`/books/${book.id}`}
              className="btn btn-primary btn-sm"
            >
              View Details
            </Link>
          ) : (
            <Link href={`/books/${book.id}`} className="btn btn-outline btn-sm">
              Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
