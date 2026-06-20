"use client";

import { Toaster } from "react-hot-toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3500,
          style: {
            background: "#1f2937",
            color: "#fff",
          },
        }}
      />
    </>
  );
}
