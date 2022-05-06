import { useState, useEffect } from "react";
import { axios } from "../../config/axios";
import _axios from "axios";

export const useCurrenciesHook = (page = 1, search, size = 30) => {
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);
  const [coins, setCoins] = useState([]);

  const fetchCoins = async () => {
    let cancel;

    axios({
      method: "POST",
      url: "coins/search",
      data: { page, size, search },
      cancelToken: new _axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setTotal(res.data.data.stats.total);
        setCoins(res.data.data.coins?.filter((e) => e.price > 0));
      })
      .catch((e) => {
        if (_axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  };

  useEffect(() => {
    fetchCoins();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, size]);

  return { error, coins, total, size };
};
