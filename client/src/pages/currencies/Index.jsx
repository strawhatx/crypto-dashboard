import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Grid,
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";
import Trending from "../../components/Hot/Trending";
import Movers from "../../components/Hot/Movers";

const Currencies = () => {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      //TODO: add paging if we can
      axios
        .get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=30&page=1&sparkline=false"
        )
        .then((response) => {
          console.log(response.data);
          setCurrencies(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }, 4000);

    return () => clearInterval(interval);
  });

  return (
    <>
      {/** Hero */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          pt: `${1.25}rem`,
          pb: `${7.3}rem`,
          bgcolor: "black.dark",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            color="inherit"
            component="div"
            sx={{
              color: "#FFFFFF",
              mb: `${0.6}rem`,
              pt: `${5}rem`,
              pb: `${5}rem`,
              fontWeight: "bold",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Currencies
          </Typography>
        </Container>
      </Box>

      {/** Information */}
      <Box sx={{ mt: `${-8.75}rem`, pb: `${1}rem` }}>
        <Container
          maxWidth="md"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Trending />
            </Grid>
            <Grid item xs={12} md={6}>
              <Movers />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/**Currencies */}
      <Box>
        <Container maxWidth="md">
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
                    {currencies.map((coin, index) => (
                      <TableRow
                        key={coin.id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <img
                            src={coin.image}
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
                        <TableCell>
                          <Typography variant="p" xs={{ fontSize: `${6}px` }}>
                            {parseFloat(coin.current_price).toFixed(6)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="p" xs={{ fontSize: `${6}px` }}>
                            {parseFloat(
                              coin.price_change_percentage_24h
                            ).toFixed(6)}
                          </Typography>
                        </TableCell>
                        <TableCell>
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
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
};

export default Currencies;
