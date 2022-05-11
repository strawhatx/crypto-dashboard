import { axios } from "../config/axios";
import _axios from "axios";

export const getCurrencies = async (
  page,
  size,
  search,
  setTotal,
  setCoins,
  setError
) => {
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

export const getTrendingCurrencies = async (
  setLoading,
  setTrending,
  setError
) => {
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

export const getCurrencyChart = async (setSeries, setError) => {
  let cancel;

  axios({
    method: "POST",
    url: "/coins/history/",
    data: { id: id, period: interval },
    cancelToken: new _axios.CancelToken((c) => (cancel = c)),
  })
    .then((res) => {
      const history = res.data.data?.history;

      setSeries(
        history.map((item) => {
          return {
            x: getDatetime(item.timestamp),
            y: parseInt(item.price),
          };
        })
      );
    })
    .catch((e) => {
      if (_axios.isCancel(e)) return;
      setError(true);
    });

  return () => cancel();
};
