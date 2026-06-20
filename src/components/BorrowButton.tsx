"use client";

import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

interface BorrowButtonProps {
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
      router.push("/login");
      return;
    }

    if (availableQuantity <= 0) {
      toast.error("Sorry, this book is currently unavailable.");
      return;
    }

    toast.success(`Successfully borrowed "${bookTitle}"! Enjoy your read.`);
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
