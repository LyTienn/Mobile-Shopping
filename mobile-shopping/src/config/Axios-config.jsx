import axios from "axios";

const instance = axios.create({
  baseURL: "https://dummyjson.com",
  // withCredentials: true, //Gửi cookies cùng request
});

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response.data; //Trả data trực tiếp từ server
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;