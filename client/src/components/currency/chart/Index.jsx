import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Chart from "react-apexcharts";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
import { Box, Typography, Button } from "@mui/material";
import { chartIntervals } from "../../../util/coins-util";
import { useTheme } from "@mui/system";
import { useCurrencyChartHook } from "../../../hooks/currency-chart";

const CurrencyChart = ({ coinName, coinPrice }) => {
  const [interval, setInterval] = useState("24h");
  const { state } = useLocation();
  const { error, series } = useCurrencyChartHook(state.uuid, interval);
  const theme = useTheme();

  const chart = {
    series: [
      {
        name: coinName,
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

  const intervals = chartIntervals.map((i) => {
    const isActive = i === interval;
    return (
      <Button
        key={i}
        size="small"
        aria-label="watchlist"
        sx={{
          minWidth: theme.spacing(2.5),
          mr: theme.spacing(0.5),
          bgcolor: isActive ? theme.palette.grey[200] : "",
          color: !isActive ? theme.palette.grey[600] : "",
        }}
        onClick={() => setInterval(i)}
      >
        <span>{i}</span>
      </Button>
    );
  });

  return (
    <>
      <Box
        sx={{
          bgcolor: "transparent",
          color: theme.palette.grey[600],
          boxShadow: 0,
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <Box>
              <Typography variant="h4" component="div">
                <NumberFormat
                  value={coinPrice?.toString()}
                  displayType={"text"}
                  thousandSeparator={true}
                  decimalScale={
                    coinPrice >= 1
                      ? 2
                      : coinPrice?.split("").findIndex((e) => parseInt(e) > 0) +
                        2
                  }
                  prefix={"$"}
                />
              </Typography>
            </Box>

            <Box>{intervals}</Box>
          </Box>
        </Box>
        <Box>
          <Chart
            options={chart.options}
            series={chart.series}
            type="area"
            height={350}
            width="100%"
          />
        </Box>
      </Box>
    </>
  );
};

CurrencyChart.propType = {
  coinName: PropTypes.string,
  coinPrice: PropTypes.string,
};

export default CurrencyChart;
