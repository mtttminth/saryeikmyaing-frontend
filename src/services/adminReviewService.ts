import { ReviewParam } from "@/types/admin-review";
import api from "./api";

const getAdminReviews = async (params: ReviewParam) => {
  const formattedParams = {
    ...params,
    keyword: params.keyword,
    category_id: params.category,
  };
  return api
    .get(`/admin-reviews`, { params: formattedParams })
    .then((response) => response.data);
};

const getAdminReviewCategories = async () => {
  return api.get(`/admin-review-categories`).then((response) => response.data);
};

const getAdminReviewsDetail = async (id: number) => {
  return api.get(`/admin-reviews/${id}`).then((response) => response.data);
};

const getRelatedAdminReview = async (id: number) => {
  return api
    .get(`/admin-reviews/${id}/related`)
    .then((response) => response.data);
};
export default {
  getAdminReviews,
  getAdminReviewCategories,
  getAdminReviewsDetail,
  getRelatedAdminReview,
};
