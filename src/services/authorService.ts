import api from "./api";

const getAuthors = async () => {
  return api.get(`/authors`).then((response) => response.data);
};

const getAuthorDetail = async (id: number) => {
  return api.get(`/authors/${id}`).then((response) => response.data);
};
export default {
  getAuthors,
  getAuthorDetail,
};
