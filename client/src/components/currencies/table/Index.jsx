import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
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
import { useCurrenciesHook } from "../../../hooks/currencies";

const CurrenciesTable = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { loading, error, coins, total, size } = useCurrenciesHook(
    page,
    search
  );

  const navigate = useNavigate();
  const { t } = useTranslation();

  const theme = useTheme();

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
                fontWeight: theme.typography.fontWeightMedium,
                textAlign: { xs: "center", sm: "left" },
                px: theme.spacing(2.5),
                py: theme.spacing(7),
              }}
            >
              {t("Cryptocurrency Prices by Rank")}
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
                {[t("Name"), t("Price"), t("Volume"), t("Market Cap")].map(
                  (item, index) => (
                    <TableCell
                      key={index}
                      sx={{
                        fontSize: ".95rem",
                        fontWeight: theme.typography.fontWeightMedium,
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
                const profit = coin.change?.toString() >= 0;
                return (
                  <TableRow
                    key={coin.uuid}
                    hover
                    onClick={() =>
                      navigate(`/currencies/${coin.name?.toLowerCase()}`, {
                        state: { uuid: coin.uuid, name: coin.name },
                      })
                    }
                    sx={{
                      "&:last-child td, &:last-child th": { border: 0 },
                      borderRadius: theme.spacing(5),
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
                            value={coin.price?.toString()}
                            displayType={"text"}
                            thousandSeparator={true}
                            decimalScale={
                              coin.price >= 1
                                ? 2
                                : coin.price
                                    ?.split("")
                                    .findIndex((e) => parseInt(e) > 0) + 2
                            }
                            prefix={"$"}
                          />
                        </Typography>
                      </Box>

                      <Box
                        align="right"
                        style={{
                          color: profit ? "#229A16" : "red",
                          fontWeight: 400,
                        }}
                      >
                        <Typography variant="p">
                          <NumberFormat
                            value={`${profit && "+"} ${coin.change}%`}
                            displayType={"text"}
                            decimalScale={2}
                            thousandSeparator={true}
                          />
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box>
                        <Typography variant="p">
                          {coin["24hVolume"] && (
                            <NumberFormat
                              value={coin["24hVolume"]?.toString()}
                              displayType={"text"}
                              defaultValue={"N/A"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          )}
                          {!coin["24hVolume"] && <span>N/A</span>}
                        </Typography>
                      </Box>
                      <Box align="right">
                        <Typography variant="p">-</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">
                      <Box>
                        <Typography variant="p">
                          {coin.marketCap && (
                            <NumberFormat
                              value={coin.marketCap?.toString()}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          )}
                          {!coin.marketCap && <span>N/A</span>}
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
          }}
        />
      </CardContent>
    </Card>
  );
};

export default CurrenciesTable;
