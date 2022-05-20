import { useState, useEffect } from "react";
import { axios } from "../../config/axios";
import _axios from "axios";

export const usePopularHook = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [popular, setPopular] = useState([]);

  const fetchCoins = async () => {
    let cancel;

    axios({
      method: "GET",
      url: "coins/popular/",
      cancelToken: new _axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setPopular(res.data.data.coins);
        setLoading(false);
      })
      .catch((e) => {
        if (_axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  };

  useEffect(() => fetchCoins(), []);

  return { loading, error, popular };
};
