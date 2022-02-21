import { Box, TextField, Typography, Avatar } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/system";

const CurrencyPriceConverter = ({
  coinName,
  coinSymbol,
  coinIconUrl,
  coinPrice,
}) => {
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
              <Typography variant="p">{coinName}</Typography>
            </Box>

            <Box>
              <Typography variant="p">{coinSymbol}</Typography>
            </Box>
          </Box>
          <Box>
            <TextField
              size="small"
              //onChange={(e) => setSearch(e.target.value)}
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
              <Typography variant="p">{coinName}</Typography>
            </Box>

            <Box>
              <Typography variant="p">{coinSymbol}</Typography>
            </Box>
          </Box>
          <Box>
            <TextField
              size="small"
              //onChange={(e) => setSearch(e.target.value)}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

CurrencyInfobar.propType = {
  coinName: PropTypes.string.isRequired,
  coinSymbol: PropTypes.string.isRequired,
  coinIconUrl: PropTypes.string.isRequired,
  coinPrice: PropTypes.number.isRequired,
};

export default CurrencyPriceConverter;
