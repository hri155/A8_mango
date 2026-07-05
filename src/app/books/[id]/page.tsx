import { notFound } from "next/navigation";

import { getBookById } from "@/lib/books";
import BorrowButton from "@/components/BorrowButton";

type BookDetailsPageProps = {
  params: { id: string } | Promise<{ id: string }>;
};

export default async function BookDetailsPage({
  params,
}: BookDetailsPageProps) {
  const { id } = await Promise.resolve(params);

  const book = getBookById(id);

  if (!book) {
    notFound();
  }

  const safeBook = JSON.parse(JSON.stringify(book));

  const bookImage =
    safeBook.image_url ||
    safeBook.coverImage ||
    safeBook.image ||
    "/book-placeholder.jpg";

  const availableQuantity =
    safeBook.availableQuantity ??
    safeBook.available_quantity ??
    safeBook.quantity ??
    0;

  const totalQuantity = safeBook.quantity ?? availableQuantity;

  return (
    <section className="min-h-[70vh] px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="card bg-base-100 shadow-xl border overflow-hidden animate__animated animate__fadeInLeft">
            <figure>
              <img
                src={bookImage}
                alt={safeBook.title}
                className="w-full max-h-[560px] object-cover"
              />
            </figure>
          </div>

          <div className="space-y-6 animate__animated animate__fadeInRight">
            <div>
              <span className="badge badge-primary mb-3">
                {safeBook.category || "Uncategorized"}
              </span>

              <h1 className="text-4xl font-bold">{safeBook.title}</h1>

              <p className="text-lg text-base-content/70 mt-2">
                by {safeBook.author || "Unknown Author"}
              </p>
            </div>

            <div className="stats stats-vertical sm:stats-horizontal shadow border">
              <div className="stat">
                <div className="stat-title">Total Quantity</div>
                <div className="stat-value text-2xl">{totalQuantity}</div>
              </div>

              <div className="stat">
                <div className="stat-title">Available</div>
                <div className="stat-value text-2xl text-primary">
                  {availableQuantity}
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-2">Description</h2>
              <p className="text-base-content/80 leading-7">
                {safeBook.description || "No description available."}
              </p>
            </div>

            <BorrowButton
              bookId={safeBook._id?.toString() || safeBook.id?.toString()}
              bookTitle={safeBook.title}
              availableQuantity={availableQuantity}
            />
          </div>
        </div>
      </div>
    </section>
  );
}