import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../../config/axios";
import CurrencyTitleToolbar from "./components/CurrencyTitleToolbar";
import Chart from "react-apexcharts";
import { Card, CardContent } from "@mui/material";
import { getDatetime, numberWithCommas } from "../../../util/coins-util";

const CurrencyChart = () => {
  const [coin, setCoin] = useState({});
  const [interval, setInterval] = useState("24h");
  const [series, setSeries] = useState([]);
  const { state } = useLocation();

  const decimalPlaces = () =>
    coin?.price >= 1
      ? 2
      : coin?.price?.split("").findIndex((e) => parseInt(e) > 0) + 2;

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(`coins/${state.uuid}`);

      setCoin(data.data.coin);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChart = async () => {
    try {
      const { data } = await axios.post(`/coins/history/`, {
        id: state.uuid,
        period: interval,
      });
      const history = data.data?.history;

      setSeries(
        history.map((item) => {
          return { x: getDatetime(item.timestamp), y: parseInt(item.price) };
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoin();
    fetchChart();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chart = {
    series: [
      {
        name: coin.name,
        data: series,
      },
    ],
    options: {
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: `${numberWithCommas(
          parseInt(coin.price).toFixed(decimalPlaces())
        )}`,
        align: "left",
        style: {
          fontSize: "45px",
          fontWeight: "medium",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          inverseColors: false,
          opacityFrom: 0.5,
          opacityTo: 0,
          stops: [0, 90, 100],
        },
      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      yaxis: {
        show: false,
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            // return (val / 1000000).toFixed(0);
          },
        },
      },
    },
  };

  return (
    <>
      <CurrencyTitleToolbar currency={coin} />
      <Card>
        <CardContent>
          <Chart
            options={chart.options}
            series={chart.series}
            type="area"
            height={350}
            width="100%"
          />
        </CardContent>
      </Card>
    </>
  );
};

export default CurrencyChart;
