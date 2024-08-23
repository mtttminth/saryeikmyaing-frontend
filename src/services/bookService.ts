import { BookParam } from "@/types/books";
import api from "./api";

const getBooksBySubCategory = async (id: number, params: BookParam) => {
  const formattedParams = {
    ...params,
  };
  return api
    .get(`/subcategories/${id}/books`, { params: formattedParams })
    .then((response) => response.data);
};

const getBooksByAuthor = async (id: number, params: BookParam) => {
  const formattedParams = {
    ...params,
  };
  return api
    .get(`/authors/${id}/books`, { params: formattedParams })
    .then((response) => response.data);
};

const getBookDetail = async (id: number) => {
  return api.get(`/books/${id}`).then((response) => response.data);
};

const getRelatedBook = async (id: number) => {
  return api.get(`/books/${id}/related`).then((response) => response.data);
};

const getBooksByCollection = async (id: number, params: BookParam) => {
  const formattedParams = {
    ...params,
  };
  return api
    .get(`/collections/${id}/books`, { params: formattedParams })
    .then((response) => response.data);
};

const getBooksByTag = async (id: number, params: BookParam) => {
  const formattedParams = {
    ...params,
  };
  return api
    .get(`/tags/${id}/books`, { params: formattedParams })
    .then((response) => response.data);
};

export default {
  getBooksBySubCategory,
  getBooksByAuthor,
  getBookDetail,
  getRelatedBook,
  getBooksByCollection,
  getBooksByTag,
};
