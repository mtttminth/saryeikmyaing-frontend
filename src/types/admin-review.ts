import { Links, Meta } from "./common";

export type AdminReviewState = {
  adminReviewLoading: boolean;
  adminReviewErrors: any;
  success: boolean;
  adminReviewMessage: string;
  adminReviewList: AdminReviewList;
  adminReview: AdminReview[];
  reviewParam: ReviewParam;
  adminReviewCategories: AdminReviewCategories[];
  adminReviewDetail: AdminReviewDetail;
  relatedAdminReview: RelatedAdminReview[];
};

export type AdminReviewList = {
  data: AdminReview[];
  links: Links;
  meta: Meta;
  path: string;
  per_page: number;
  to: number;
  total: number;
};

export type AdminReviewCategories = {
  id: number;
  slug: string;
  name: string;
};

export type AdminReview = {
  id: number;
  reviewed_by: string;
  reviewed_date: string;
  content: string;
  category: string;
  book: Book;
};

export type AdminReviewDetail = {
  id: number;
  reviewed_by: string;
  reviewed_date: string;
  content: string;
  category: string;
  book: {
    id: number;
    name: string;
    price: number;
    authors: {
      id: number;
      name: string;
      slug: string;
    }[];
    image_url: string;
  };
};

export type RelatedAdminReview = {
  id: number;
  reviewed_by: string;
  reviewed_date: string;
  content: string;
  category: string;
  book: Book;
};

export type Book = {
  id: number;
  name: string;
  image_url: string;
};

export type ReviewParam = {
  category: number;
  page: number;
  perPage: number;
  keyword: string;
};
