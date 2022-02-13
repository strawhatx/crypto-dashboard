import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StarOutline } from "@mui/icons-material";
import axios from "axios";
import { getTicker, getHistoricals } from "../../../endpoints/coinpaprika";
import CurrencyTitleToolbar from "./components/CurrencyTitleToolbar";
import NumberFormat from "react-number-format";
import { Box, Button, Card, CardHeader, Typography } from "@mui/material";

const CurrencyChart = () => {
  const [currency, setCurrency] = useState({});
  const [historical, setHistorical] = useState([]);
  const [days, setDays] = useState(1);
  const [options, setOptions] = useState({});
  const [series, setSeries] = useState([]);
  const { id } = useParams();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(getTicker(id));

      setCurrency(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChart = async () => {
    try {
      const { data } = await axios.get(getHistoricals(id));

      setHistorical(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoin();
    fetchChart();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      </Card>
    </>
  );
};

export default CurrencyChart;
