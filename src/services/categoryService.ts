import api from "./api";

const getCategoriesWithSubcategories = async () => {
  return api.get(`/categories`).then((response) => response.data);
};

export default {
  getCategoriesWithSubcategories,
};
