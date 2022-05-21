import React from "react";
import { useNavigate } from "react-router-dom";
import NumberFormat from "react-number-format";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import {
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
} from "@mui/material";
import { usePopularHook } from "../../../../../hooks/currencies/popular";

const HomeMarketCurrenciesTable = () => {
  const { error, popular } = usePopularHook();

  const navigate = useNavigate();
  const { t } = useTranslation();

  const theme = useTheme();

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              py: 3,
              borderRadius: 5,
              height: 50,

              "& th": { border: 0, backgroundColor: theme.palette.grey[200] },
              "& th:first-of-type": {
                borderRadius: "10px 0 0 10px",
              },

              "& th:last-child": {
                borderRadius: "0 10px 10px 0",
              },
            }}
          >
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
          {popular.map((coin, index) => {
            const profit = coin.change?.toString() >= 0;
            return (
              <TableRow
                key={coin.uuid}
                hover
                onClick={() =>
                  navigate(`/currencies/${coin.name?.toLowerCase()}`, {
                    state: {
                      uuid: coin.uuid,
                      name: coin.name,
                      symbol: coin.symbol,
                    },
                  })
                }
                sx={{
                  "& td": { border: 0, py: 4 },
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
  );
};

export default HomeMarketCurrenciesTable;
