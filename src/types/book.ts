export type BookCategory = "Story" | "Tech" | "Science";

export interface Book {
  id?: string | number;
  _id?: string;
  title: string;
  author: string;
  description?: string;
  category?: string;
  image_url?: string;
  coverImage?: string;
  quantity?: number;
  availableQuantity?: number;
}

export const BOOK_CATEGORIES: BookCategory[] = ["Story", "Tech", "Science"];
