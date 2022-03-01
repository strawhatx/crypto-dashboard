import { useState, useEffect } from "react";
import axios from "../config/axios";
import _axios from "axios";

export const useCurrencyReferenceHook = (page = 1, search) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);
  const [allCurrencies, setAllCurrencies] = useState([]);
  const [popularCurrencies, setPopularCurrencies] = useState([]);
  const size = 12;
  const popularKeys = ["USD", "EUR", "GBP"];

  const fetchCurrencies = async () => {
    let cancel;

    axios({
      method: "POST",
      url: "/app-currency/",
      data: { page, size, search },
      cancelToken: new _axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setTotal(res.data.data.stats.total);
        setAllCurrencies(res.data.data.currencies);
        setPopularCurrencies(
          res.data.data.currencies?.filter((e) =>
            popularKeys.includes(e.symbol?.toUpperCase())
          )
        );
        setLoading(false);
      })
      .catch((e) => {
        if (_axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  };

  useEffect(() => {
    fetchCurrencies();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search]);

  return { loading, error, size, total, allCurrencies, popularCurrencies };
};
