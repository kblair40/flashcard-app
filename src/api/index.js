import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/",
  // baseURL: "https://flashcard-app.herokuapp.com/",
});

api.interceptors.request.use(
  // called everytime we make a request
  async (config) => {
    const my_token = await window.localStorage.getItem("auth-token");

    if (my_token) {
      config.headers.Authorization = `Bearer ${my_token}`;
    }
    return config;
  },
  // called only when there is an error in the request
  (err) => {
    console.log("ERROR IN AXIOS INSTANCE");
    return Promise.reject(err);
  }
);

export default api;
