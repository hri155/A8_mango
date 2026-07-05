"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface BorrowButtonProps {
  bookId?: string;
  bookTitle: string;
  availableQuantity: number;
}

export default function BorrowButton({
  bookTitle,
  availableQuantity,
}: BorrowButtonProps) {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const handleBorrow = () => {
    if (!session?.user) {
      toast.error("Please login first to borrow this book.");
      router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`);
      return;
    }

    if (availableQuantity <= 0) {
      toast.error("Sorry, this book is currently unavailable.");
      return;
    }

    toast.custom(
      (t) => (
        <div
          className={`card w-80 bg-base-100 shadow-2xl border border-primary/30 animate__animated ${
            t.visible ? "animate__fadeInDown" : "animate__fadeOutUp"
          }`}
        >
          <div className="card-body p-4">
            <h3 className="font-bold text-base">Confirm borrow</h3>
            <p className="text-sm text-base-content/70">
              Do you want to borrow{" "}
              <span className="font-semibold">{bookTitle}</span>?
            </p>

            <div className="card-actions justify-end mt-2">
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => toast.dismiss(t.id)}
              >
                Cancel
              </button>

              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={() => {
                  toast.dismiss(t.id);
                  toast.success(`Borrow confirmed for "${bookTitle}"!`);
                }}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      ),
      { duration: 8000 }
    );
  };

  return (
    <button
      type="button"
      onClick={handleBorrow}
      className="btn btn-primary btn-lg gap-2 animate__animated animate__pulse animate__infinite animate__slower"
      disabled={availableQuantity <= 0}
    >
      {availableQuantity <= 0 ? "Out of Stock" : "Borrow This Book"}
    </button>
  );
}