import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";
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

const CurrenciesTable = ({ currencies }) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const handleSearch = () => {
    return currencies.filter(
      (coin) =>
        coin.name.toLowerCase().includes(search.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
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
            {" "}
            <Typography
              variant="p"
              component="span"
              sx={{
                fontSize: `large`,
                fontWeight: 500,
                textAlign: { xs: "center", sm: "left" },
                px: `${8.5}px`,
                py: `${7}px`,
              }}
            >
              Cryptocurrency Prices by Rank
            </Typography>
            <TextField
              label="Search"
              size="small"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        }
      />
      <CardContent>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                {["Name", "Price", "Volume", "Market Cap"].map(
                  (item, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        fontSize: ".95rem",
                        fontWeight: 500,
                        textAlign: index > 0 ? "right" : "left",
                        color: "rgba(0, 0, 0, 0.45)",
                        py: 0,
                      }}
                    >
                      {item}
                    </TableCell>
                  )
                )}
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
                      hover
                      onClick={() => navigate(`/currencies/${coin.id}`)}
                      sx={{
                        "&:last-child td, &:last-child th": { border: 0 },
                        borderRadius: 5,
                      }}
                    >
                      <TableCell sx={{ display: "flex" }}>
                        <img
                          src={`https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.0/svg/color/${coin.symbol.toLowerCase()}.svg`}
                          alt="currency-tag"
                          width={40}
                          height={40}
                          style={{ marginRight: "1rem" }}
                        />
                        <Box>
                          <Box>
                            <Typography variant="p">{coin.name}</Typography>
                          </Box>

                          <Box>
                            <Typography variant="p">{coin.symbol}</Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box>
                          <Typography variant="p">
                            <NumberFormat
                              value={coin?.quotes.USD.price?.toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          </Typography>
                        </Box>

                        <Box
                          align="right"
                          style={{
                            color: profit > 0 ? "green" : "red",
                            fontWeight: 400,
                          }}
                        >
                          <Typography variant="p">
                            <NumberFormat
                              value={`${
                                profit && "+"
                              } ${coin?.quotes.USD.percent_change_24h?.toFixed(
                                2
                              )}%`}
                              displayType={"text"}
                              thousandSeparator={true}
                            />
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box>
                          <Typography variant="p">
                            <NumberFormat
                              value={coin?.quotes.USD.volume_24h?.toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          </Typography>
                        </Box>
                        <Box align="right">
                          <Typography variant="p">-</Typography>
                        </Box>
                      </TableCell>
                      <TableCell align="right">
                        <Box>
                          <Typography variant="p">
                            <NumberFormat
                              value={coin?.quotes.USD.market_cap?.toFixed(2)}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          </Typography>
                        </Box>
                        <Box align="right">
                          <Typography variant="p">-</Typography>
                        </Box>
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
            pt: 10,
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

CurrenciesTable.propType = {
  currencies: PropTypes.array.isRequired,
};

export default CurrenciesTable;
