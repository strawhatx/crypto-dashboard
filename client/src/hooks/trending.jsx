import { useState, useEffect } from "react";
import axios from "../config/axios";
import _axios from "axios";

export const useTrendingHook = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [trending, setTrending] = useState([]);

  const fetchCoins = async () => {
    let cancel;

    axios({
      method: "GET",
      url: "coins/trending/",
      cancelToken: new _axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setTrending(res.data.data.coins);
        setLoading(false);
      })
      .catch((e) => {
        if (_axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  };

  useEffect(() => fetchCoins(), []);

  return { loading, error, trending };
};
