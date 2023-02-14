import axios from "axios";
import config from "../configs";
import i18n from "./languages/i18n";

let store;
export const storeInjector = (injectedStore) => {
  store = injectedStore;
};

const axiosInstance = axios.create({
  baseURL: config.baseURL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.params = { ...config.params, lang: i18n.language };
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;
