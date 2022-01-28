import _axios from "axios";

//well leave this just incase we need comeback to reconfigure or something

const URI = process.env.REACT_APP_API_BASE_URI;

//we can use it if we need it;
const axios = _axios.create({
  baseURL: URI,
  ////withCredentials: true,
});

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

axios.interceptors.request.use(async (req) => {
  console.log(`${req.method} ${req.url}`);

  // Important: request interceptors **must** return the request.
  return req;
});

axios.interceptors.response.use((res) => {
  console.log(res.data.json);

  // Important: response interceptors **must** return the response.
  return res;
});

export { axios };
