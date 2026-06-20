import type { Metadata } from "next";
import { Fredoka, Inter } from "next/font/google";
import "animate.css";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "Mango Books — Online Book Borrowing Platform",
  description:
    "A seamless digital library experience. Explore, borrow, and enjoy books from anywhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="bumblebee">
      <body
        className={`${inter.variable} ${fredoka.variable} min-h-screen flex flex-col bg-base-100 font-sans antialiased`}
      >
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
