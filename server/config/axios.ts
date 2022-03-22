import _axios from "axios";

const coins_uri = process.env.COINS_URI;
const coins_token = process.env.COINS_ACCESS;

const coins_api = _axios.create({
  baseURL: coins_uri,
  headers: { "x-access-token": coins_token ?? "" },
  withCredentials: true,
});

//coins_api.defaults.headers.get["x-access-token"] = "x-access-token"

//----------------------------------------------
const twitter_uri = process.env.TWITTER_URI;
const twitter_token = process.env.TWITTER_BEARER_TOKEN;

const twitter_api = _axios.create({
  baseURL: twitter_uri,
  headers: {
    // Authorization was copied from the Postman headers
    Authorization: `Bearer ${twitter_token ?? ""}`,
  },
  withCredentials: true,
});

//----------------------------------------------

const news_uri = process.env.NEWS_URI;

const news_api = _axios.create({
  baseURL: news_uri,
  ////withCredentials: true,
});

export { coins_api, twitter_api, news_api };
