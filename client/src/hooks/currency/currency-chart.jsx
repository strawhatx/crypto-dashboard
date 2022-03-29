import { useState, useEffect } from "react";
import { axios } from "../../config/axios";
import _axios from "axios";
import { getDatetime } from "../../util/coins-util";

export const useCurrencyChartHook = (id, interval) => {
  const [error, setError] = useState(false);
  const [series, setSeries] = useState([]);

  const fetchChart = async () => {
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

  useEffect(() => {
    fetchChart();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, interval]);

  return { error, series };
};
