import { useState, useEffect } from "react";
import axios from "../config/axios";
import _axios from "axios";

export const useTwitterHook = (query = "") => {
  const [error, setError] = useState(false);
  const [tweets, setTweets] = useState([]);

  const fetchTweets = async () => {
    let cancel;

    axios({
      method: "GET",
      url: `twitter-news/${query}`,
      cancelToken: new _axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setTweets(res.data.statuses);
      })
      .catch((e) => {
        if (_axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  };

  useEffect(() => {
    fetchTweets();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return { error, tweets };
};
