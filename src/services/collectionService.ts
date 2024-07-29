import api from "./api";

const getCollections = async () => {
  return api.get(`/collections`).then((response) => response.data);
};

export default {
  getCollections,
};
