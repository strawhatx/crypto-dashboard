import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Container,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const theme = useTheme();
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      //TODO: add paging if we can
      axios
        .get("https://api.coingecko.com/api/v3/exchanges?per_page=30&page=1")
        .then((response) => {
          console.log(response.data);
          setExchanges(response.data);
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
        bgcolor="primary.main"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "left",
          pt: theme.spacing(1.25),
          pb: theme.spacing(7.3),
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h5"
            contrast="primary"
            component="div"
            color="primary.contrastText"
            sx={{
              mb: theme.spacing(0.6),
              pt: theme.spacing(5),
              pb: theme.spacing(5),
              fontWeight: theme.typography.fontWeightMedium,
              textAlign: { xs: "center", md: "left" },
            }}
          >
            Exchanges
          </Typography>
        </Container>
      </Box>

      {/**exchanges */}
      <Box sx={{ mt: theme.spacing(-8.75), pb: theme.spacing(1) }}>
        <Container maxWidth="lg">
          <Card>
            <CardHeader title="Currency" />
            <CardContent>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>{t("Name")}</TableCell>
                      <TableCell>{t("Price")}</TableCell>
                      <TableCell>CHANGE</TableCell>
                      <TableCell>{t("Volume")}</TableCell>
                      <TableCell>{t("Market Cap")}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {exchanges.map((coin, index) => (
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

export default Exchanges;
