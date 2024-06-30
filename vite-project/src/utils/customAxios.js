import axios from "axios";
const url = "https://strapi-store-server.onrender.com/api";

const comfFetch = axios.create({
  baseURL: url,
  /*headers: {
    Accept: "application/json",
    //Authorization: 'Bearer token'
  },*/
});

comfFetch.interceptors.request.use(
  (request) => {
    // old version
    // request.headers.common['Accept'] = 'application/json';
    request.headers["Accept"] = "application/json";

    console.log("request sent");
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default comfFetch;
