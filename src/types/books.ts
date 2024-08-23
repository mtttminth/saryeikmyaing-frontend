import { Links, Meta } from "./common";

export type BookState = {
  loading: boolean;
  bookErrors: any;
  success: boolean;
  bookMessage: string;
  bookListByAuthor: BookListByAuthor;
  booksByAuthor: BooksByAuthor[];
  bookListBySubCategory: BookListBySubCategory;
  booksBySubCategory: BooksBySubCategory[];
  bookListByCollection: BookListByCollection;
  booksByCollection: BooksByCollection[];
  bookListByTag: BookListByTag;
  booksByTag: BooksByTag[];
  bookParam: BookParam;
  bookDetail: BookDetail;
  relatedBook: RelatedBook[];
};

export type BookListByAuthor = {
  data: BooksByAuthor[];
  link: Links;
  meta: Meta;
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type BooksByAuthor = {
  id: number;
  name: string;
  slug: string;
  price: number;
  discounted_price: number;
  is_preorder: number;
  image_url: string;
};

export type BookListBySubCategory = {
  data: BooksBySubCategory[];
  link: Links;
  meta: Meta;
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type BooksBySubCategory = {
  id: number;
  name: string;
  slug: string;
  price: number;
  discounted_price: number;
  is_preorder: number;
  image_url: string;
};

export type BookListByCollection = {
  data: BooksByCollection[];
  link: Links;
  meta: Meta;
  path: string;
  per_page: number;
  to: number;
  total: number;
};
export type BooksByCollection = {
  id: number;
  name: string;
  slug: string;
  price: number;
  discounted_price: number;
  authors: Author[];
  is_preorder: number;
  image_url: string;
};

export type BookListByTag = {
  data: BooksByTag[];
  link: Links;
  meta: Meta;
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type BooksByTag = {
  id: number;
  name: string;
  slug: string;
  price: number;
  discounted_price: number;
  authors: Author[];
  is_preorder: number;
  image_url: string;
};

export type BookDetail = {
  id: number;
  name: string;
  slug: string;
  price: number;
  discounted_price: number;
  stock: number;
  description: string;
  page: string;
  size: string;
  paper_type: string;
  publication_detail: string;
  authors: Author[];
  preorder: PreorderDetail;
  images: string[];
  tags: Tag[];
};

export type RelatedBook = {
  id: number;
  name: string;
  slug: string;
  price: number;
  discounted_price: number;
  authors: Author[];
  is_preorder: number;
  image_url: string;
};

export type Author = {
  id: number;
  name: string;
  slug: string;
};

export type PreorderDetail = {
  id: number;
  discount_percentage: number;
};

export type Tag = {
  id: number;
  name: string;
  slug: string;
};
export type BookParam = {
  page: number;
  perPage: number;
};
