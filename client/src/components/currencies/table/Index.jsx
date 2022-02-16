import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
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
  Avatar,
} from "@mui/material";
import axios from "../../../config/axios";
import { useTheme } from "@mui/system";

const CurrenciesTable = () => {
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);
  const size = 30;
  const navigate = useNavigate();

  const theme = useTheme();

  const handleSearch = async () => {
    try {
      const { data } = await axios.post("coins/", { page, size, search });
      setTotal(data.data.stats.totalCoins);
      setCoins(data.data.coins);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => handleSearch(), []);

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
              {coins.map((coin, index) => {
                const profit = parseInt(coin.change) >= 0;
                return (
                  <TableRow
                    key={coin.uuid}
                    hover
                    onClick={() =>
                      navigate(`/currencies/${coin.name}`, {
                        state: { uuid: coin.uuid, name: coin.name },
                      })
                    }
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      borderRadius: 5,
                    }}
                  >
                    <TableCell sx={{ display: "flex" }}>
                      <Avatar
                        src={coin.iconUrl}
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
                            value={coin.price?.toFixed(2)}
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
                            value={`${profit && "+"} ${parseInt(
                              coin.change
                            )?.toFixed(2)}%`}
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
                            value={coin["24hVolume"]?.toFixed(2)}
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
                            value={coin.marketCap?.toFixed(2)}
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
          count={parseInt((total / size).toFixed(0))}
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
            handleSearch();
          }}
        />
      </CardContent>
    </Card>
  );
};

export default CurrenciesTable;
