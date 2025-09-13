import axios from "../config/Axios-config";

const fetchAllProduct = () => {
  return axios.get("/products?limit=12");
};

const fetchDetailProduct = (id) => {
  return axios.get(`/products/${id}`);
};

export { fetchAllProduct, fetchDetailProduct };