export type BookCategory = "Story" | "Tech" | "Science";

export interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  category: BookCategory;
  available_quantity: number;
  image_url: string;
}

export const BOOK_CATEGORIES: BookCategory[] = ["Story", "Tech", "Science"];
