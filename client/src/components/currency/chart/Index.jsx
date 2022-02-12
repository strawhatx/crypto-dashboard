import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { StarOutline } from "@mui/icons-material";
import axios from "axios";
import { getTicker } from "../../../endpoints/coinpaprika";
import { useEffect } from "react";
import CurrencyTitleToolbar from "./components/CurrencyTitleToolbar";
import NumberFormat from "react-number-format";
import { Box, Button, Card, CardHeader, Typography } from "@mui/material";

const CurrencyChart = () => {
  const [currency, setCurrency] = useState({});

  const { id } = useParams();

  const fetchCoin = async () => {
    try {
      const { data } = await axios.get(getTicker(id));

      setCurrency(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoin();

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
                <Typography variant="h2" component="div">
                  <Typography variant="p">
                    <NumberFormat
                      value={currency?.quotes?.USD?.price?.toFixed(2)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </Typography>
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
