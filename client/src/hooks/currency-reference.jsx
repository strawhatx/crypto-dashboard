//Use the CurrencyReference search api to find individual currencies

import { useState, useEffect } from "react";
import axios from "../config/axios";
import _axios from "axios";

export const useCurrencyReferenceHook = (selectedCurrency = "USD") => {
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState({});

  const fetchCurrency = async () => {
    let cancel;

    axios({
      method: "POST",
      url: "/app-currency/",
      data: { page: 1, size: 1, search: selectedCurrency },
      cancelToken: new _axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setCurrency(res.data.data.currencies[0]);
      })
      .catch((e) => {
        if (_axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  };

  useEffect(() => {
    fetchCurrency();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCurrency]);

  return { error, currency };
};
