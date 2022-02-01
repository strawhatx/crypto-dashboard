import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const Movers = () => {
  //'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
  //top 30 gainers
  //top 30 losers
  const [movers, setMovers] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("https://api.coingecko.com/api/v3/search/trending")
        .then((response) => {
          setMovers(response.data.coins);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 12000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography sx={{ fontSize: `${21}px`, fontWeight: 500 }}>
          Biggest Movers
        </Typography>
        <TableContainer>
          <Table>
            <TableBody>
              {movers.slice(0, 4).map((coin) => (
                <TableRow
                  key={coin.item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <img src={coin.item.thumb} alt="currency-tag" height={30} />
                  </TableCell>
                  <TableCell>
                    <Typography variant="p" xs={{ fontSize: `${6}px` }}>
                      {coin.item.name}
                    </Typography>
                    {"  "}
                    <Typography variant="p" xs={{ fontSize: `${8}px` }}>
                      {coin.item.symbol}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="p" xs={{ fontSize: `${6}px` }}>
                      {parseFloat(coin.item.price_btc).toFixed(6)}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default Movers;
