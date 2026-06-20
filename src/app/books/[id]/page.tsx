import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import BorrowButton from "@/components/BorrowButton";
import { auth } from "@/lib/auth";
import { getBookById } from "@/lib/books";
import { headers } from "next/headers";

interface BookDetailsPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: BookDetailsPageProps): Promise<Metadata> {
  const { id } = await params;
  const book = getBookById(id);
  return {
    title: book ? `${book.title} | Mango Books` : "Book Not Found",
  };
}

export default async function BookDetailsPage({ params }: BookDetailsPageProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  const { id } = await params;
  const book = getBookById(id);

  if (!book) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-10">
      <Link href="/all-books" className="btn btn-ghost btn-sm mb-6 gap-1">
        ← Back to All Books
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start animate__animated animate__fadeIn">
        <div className="relative aspect-[3/4] max-w-md mx-auto lg:mx-0 w-full rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src={book.image_url}
            alt={book.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>

        <div className="space-y-6">
          <div>
            <span className="badge badge-primary mb-3">{book.category}</span>
            <h1 className="text-3xl md:text-4xl font-bold">{book.title}</h1>
            <p className="text-lg text-base-content/70 mt-2">
              by {book.author}
            </p>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-base-content/80 leading-relaxed">
              {book.description}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`badge badge-lg ${
                book.available_quantity > 0 ? "badge-success" : "badge-error"
              }`}
            >
              {book.available_quantity > 0
                ? `${book.available_quantity} copies left`
                : "Out of stock"}
            </span>
          </div>

          <BorrowButton
            bookTitle={book.title}
            availableQuantity={book.available_quantity}
          />
        </div>
      </div>
    </div>
  );
}
