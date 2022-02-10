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
  TextField,
  Pagination,
} from "@mui/material";
import { getTickers } from "../../endpoints/coingecko";

const CurrencyTable = () => {
  const [error, setError] = useState("");
  const [currencies, setCurrencies] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    return currencies.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  const fetchCoins = () => {
    const interval = setInterval(async () => {
      try {
        const { data } = await axios.get(getTickers());

        setCurrencies(data);
      } catch (error) {
        console.log(error);
        setError(true);
      }
    }, 4000);

    return () => clearInterval(interval);
  };

  useEffect(() => {
    fetchCoins();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <Card>
      <CardHeader title="Cryptocurrency Prices by Rank" />
      <CardContent>
        <TextField
          label="Search For a Crypto Currency.."
          variant="outlined"
          style={{ fontSize: `${6}px`, marginBottom: 20, width: `${100}%` }}
          onChange={(e) => setSearch(e.target.value)}
        />
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
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((coin, index) => {
                  const profit = coin?.quotes.USD.percent_change_24h >= 0;
                  return (
                    <TableRow
                      key={coin.id}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                      }}
                    >
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>
                        <img
                          src={`https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.0/svg/color/${coin.symbol.toLowerCase()}.svg`}
                          alt="currency-tag"
                          height={30}
                        />
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
                          $ {coin?.quotes.USD.price?.toFixed(2)}
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
                          {coin?.quotes.USD.percent_change_24h?.toFixed(2)}%
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="p" xs={{ fontSize: `${6}px` }}>
                          {coin?.quotes.USD.volume_24h}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="p" xs={{ fontSize: `${6}px` }}>
                          {coin?.quotes.USD.market_cap}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Comes from @material-ui/lab */}
        <Pagination
          count={parseInt((handleSearch()?.length / 10).toFixed(0))}
          sx={{
            padding: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </CardContent>
    </Card>
  );
};

export default CurrencyTable;
