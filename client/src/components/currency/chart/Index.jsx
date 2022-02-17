import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { StarOutline } from "@mui/icons-material";
import axios from "../../../config/axios";
import CurrencyTitleToolbar from "./components/CurrencyTitleToolbar";
import NumberFormat from "react-number-format";
import Chart from "react-apexcharts";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";

const CurrencyChart = () => {
  const [coin, setCoin] = useState({});
  const [interval, setInterval] = useState("24h");
  const [prices, setPrices] = useState([]);
  const [timestamps, setTimestamps] = useState([]);
  const { state } = useLocation();

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

      setTimestamps(history.map((item) => parseInt(item.timestamp)));

      setPrices(history.map((item) => parseInt(item.price)));
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
        name: "STOCK ABC",
        data: prices,
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },

      title: {
        text: "Fundamental Analysis of Stocks",
        align: "left",
      },
      subtitle: {
        text: "Price Movements",
        align: "left",
      },
      xaxis: {
        type: "datetime",
        tickAmount: 8,
        min: new Date("01/01/2014").getTime(),
        max: new Date("01/20/2014").getTime(),
        labels: {
          rotate: -15,
          rotateAlways: true,
          formatter: function (val, timestamp) {
            return moment(new Date(timestamp)).format("DD MMM YYYY");
          },
        },
      },
      yaxis: {
        opposite: true,
      },
      legend: {
        horizontalAlign: "left",
      },
    },
  };

  return (
    <>
      <CurrencyTitleToolbar currency={coin} />
      <Card>
        <CardHeader
          title={
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h4" component="div">
                  <NumberFormat
                    value={coin.price?.toString()}
                    displayType={"text"}
                    thousandSeparator={true}
                    decimalScale={
                      coin.price >= 1
                        ? 2
                        : coin.price
                            ?.split("")
                            .findIndex((e) => parseInt(e) > 0) + 2
                    }
                    prefix={"$"}
                  />
                </Typography>
              </Box>
              <Box>
                <Button
                  startIcon={
                    <StarOutline fontSize="small" htmlColor="inherit" />
                  }
                  aria-label="wathchlist"
                >
                  Add to Watchlist
                </Button>
              </Box>
            </Box>
          }
        ></CardHeader>
        <CardContent>
          <Chart options={chart.options} series={chart.series} width="100%" />
        </CardContent>
      </Card>
    </>
  );
};

export default CurrencyChart;
