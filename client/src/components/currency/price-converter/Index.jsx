import {
  Box,
  Breadcrumbs,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { NavigateNext } from "@mui/icons-material";
import React from "react";
import { useLocation } from "react-router-dom";
import { useTheme } from "@mui/system";

const CurrencyPriceConverter = ({ coinName, cionIconUrl, coinPrice }) => {
  const { state } = useLocation();
  const theme = useTheme();

  return (
    <Box sx={{ border: 1, borderRadius: 16, mb: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 0%",
            flexDirection: "row",
            padding: theme.spacing(3.5, 4),
          }}
        >
          <Avatar
            src={coinIconUrl}
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
          <Box>
            <TextField
              size="small"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 0%",
            flexDirection: "row",
            padding: theme.spacing(3.5, 4),
          }}
        >
          <Avatar
            src={coinIconUrl}
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
          <Box>
            <TextField
              size="small"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CurrencyPriceConverter;
