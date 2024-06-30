import axios from "axios";
const url = "https://strapi-store-server.onrender.com/api";

const authFetch = axios.create({
  baseURL: url,
  /*headers: {
    Accept: "application/json",
    //Authorization: 'Bearer token'
  },*/
});

authFetch.interceptors.request.use(
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

export default authFetch;
