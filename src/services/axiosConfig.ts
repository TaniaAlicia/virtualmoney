import axios from "axios";
import Cookies from "js-cookie";

const instance = axios.create({
  baseURL: "https://digitalmoney.digitalhouse.com/api",
});

instance.interceptors.response.use(
  response => response,
  error => {
    const message = error?.response?.data?.error;

    if (message?.includes("token is expired")) {
      Cookies.remove("token");
      window.location.href = "/login"; 
    }

    return Promise.reject(error);
  }
);

export default instance;



