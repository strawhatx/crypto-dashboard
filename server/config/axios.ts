import _axios from "axios";

//well leave this just incase we need comeback to reconfigure or something

const coins_uri = process.env.COINS_URI;
const access_token = process.env.COINS_ACCESS;

const coins_api = _axios.create({
  baseURL: coins_uri,
  ////withCredentials: true,
});

coins_api.defaults.headers.get["x-access-token"] = access_token ?? ""

//----------------------------------------------

const news_uri = process.env.NEWS_URI;

const news_api = _axios.create({
  baseURL: news_uri,
  ////withCredentials: true,
});

export { coins_api, news_api };
