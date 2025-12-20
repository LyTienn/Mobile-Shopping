import HttpClient from "../api/HttpClient";

const fetchAllProduct = () => {
  return HttpClient.get("/products", { limit: 20 });
};

const fetchDetailProduct = (id) => {
  return HttpClient.get(`/products/${id}`);
};

export { fetchAllProduct, fetchDetailProduct };