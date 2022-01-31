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

const Trending = () => {
  //'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
  //trending baes off the us market
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      axios
        .get("https://api.coingecko.com/api/v3/search/trending")
        .then((response) => {
          setTrending(response.data.coins);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card>
      <CardHeader title="Trending" />
      <CardContent>
        <TableContainer>
          <Table>
            <TableBody>
              {trending.slice(0, 4).map((coin) => (
                <TableRow
                  key={coin.item.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>
                    <img src={coin.item.thumb} height={30} />
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

export default Trending;
