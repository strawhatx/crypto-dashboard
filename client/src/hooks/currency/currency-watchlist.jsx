import { useState, useEffect } from "react";
import { axios } from "../../config/axios";
import _axios from "axios";

export const useCurrencyWatchlist = (id) => {
  const [error, setError] = useState(false);
  const [checked, setChecked] = useState(false);

  const fetchResult = async () => {
    let cancel;

    axios({
      method: "GET",
      url: `/watchlists/${id}`,
      cancelToken: new _axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        const result = res.result;

        setChecked(result);
      })
      .catch((e) => {
        if (_axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel();
  };

  useEffect(() => {
    fetchResult();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return { error, checked, setChecked };
};
