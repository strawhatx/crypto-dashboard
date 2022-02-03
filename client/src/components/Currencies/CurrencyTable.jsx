import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import { allCoins } from "../../endpoints/coingecko";
import { numberWithCommas } from "../../util/coins-util";

const CurrencyTable = () => {
  const [currencies, setCurrencies] = useState([]);
  const currency = "usd";

  useEffect(() => {
    const interval = setInterval(async () => {
      //TODO: add paging if we can
      try {
        const { data } = await axios.get(allCoins(currency));

        setCurrencies(data);
      } catch (error) {
        console.log(error);
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader title="Currency" />
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>NAME</TableCell>
                <TableCell>PRICE</TableCell>
                <TableCell>CHANGE</TableCell>
                <TableCell>VOLUME</TableCell>
                <TableCell>MARKET CAP</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currencies.map((coin, index) => {
                const profit = coin?.price_change_percentage_24h >= 0;

                return (
                  <TableRow
                    key={coin.id}
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <img src={coin.image} alt="currency-tag" height={30} />
                      <Box>
                        <Typography variant="p" xs={{ fontSize: `${6}px` }}>
                          {coin.name}
                        </Typography>
                        {"  "}
                        <Typography variant="p" xs={{ fontSize: `${8}px` }}>
                          {coin.symbol}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="p" xs={{ fontSize: `${6}px` }}>
                        ${numberWithCommas(coin.current_price).toFixed(2)}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      style={{
                        color: profit > 0 ? "green" : "red",
                        fontWeight: 400,
                      }}
                    >
                      <Typography variant="p" xs={{ fontSize: `${6}px` }}>
                        {profit && "+"}{" "}
                        {coin.price_change_percentage_24h.toFixed(2)}%
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="p" xs={{ fontSize: `${6}px` }}>
                        {coin.total_volume}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="p" xs={{ fontSize: `${6}px` }}>
                        {coin.market_cap}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default CurrencyTable;
