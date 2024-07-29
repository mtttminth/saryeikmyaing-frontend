import api from "./api";

const getPreorders = async () => {
  return api.get(`/preorders`).then((response) => response.data);
};

export default {
  getPreorders,
};
