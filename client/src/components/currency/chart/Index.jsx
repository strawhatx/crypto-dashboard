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
  const [currency, setCurrency] = useState({});
  const [interval, setInterval] = useState("1h");
  const [days, setDays] = useState(7);
  const [prices, setPrices] = useState([]);
  const [dates, setDates] = useState([]);
  const { state } = useLocation();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(`coin/history/${state.uuid}`);

      setCurrency(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChart = async () => {
    try {
      const current = new Date();

      const start = current;
      const end = current.setDate(current.getDate() + days);

      const { data } = await axios.get(`/coins/${state.uuid}`);

      setPrices(data.map((item) => item.price));
      setDates(data.map((item) => item.date));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoin();
    fetchChart();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  var options = {
    series: [
      {
        name: "STOCK ABC",
        data: prices,
      },
    ],
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
    labels: dates,
    xaxis: {
      type: "datetime",
    },
    yaxis: {
      opposite: true,
    },
    legend: {
      horizontalAlign: "left",
    },
  };

  return (
    <>
      <CurrencyTitleToolbar currency={currency} />
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
                    value={currency?.quotes?.USD?.price?.toFixed(2)}
                    displayType={"text"}
                    thousandSeparator={true}
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
          <Chart options={options} width="500" />
        </CardContent>
      </Card>
    </>
  );
};

export default CurrencyChart;
