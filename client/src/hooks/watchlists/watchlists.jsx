import { useState, useEffect } from "react";
import { axios } from "../../config/axios";
import _axios from "axios";
import useAuthStore from "../../stores/authentication";

export const useWatchlistsHook = (page = 1, search, num) => {
  const [error, setError] = useState(false);
  const [total, setTotal] = useState(0);
  const [coins, setCoins] = useState([]);
  const size = 30;

  const { currentUser } = useAuthStore((state) => ({
    currentUser: state.currentUser,
  }));

  const fetchCoins = async () => {
    let cancel;

    axios({
      method: "POST",
      url: "watchlists/search",
      data: { page, size, search, uid: currentUser.uid, num },
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
    if (!currentUser?.uid) return;

    fetchCoins();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, currentUser?.uid, num]);

  return { error, coins, total, size };
};
