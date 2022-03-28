import { useState, useEffect } from "react";
import axios from "../config/axios";
import _axios from "axios";

export const useCurrencyHook = (id) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [coin, setCoin] = useState({});

  const fetchCoin = async () => {
    let cancel;

    axios({
      method: "GET",
      url: `coins/${id}`,
      cancelToken: new _axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setCoin(res.data.data.coin);
        setLoading(false);
      })
      .catch((e) => {
        if (_axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  };

  useEffect(() => {
    fetchCoin();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { loading, error, coin };
};
