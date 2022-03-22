import { useTheme, Box, Avatar } from "@mui/material";
import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useTwitterHook } from "../../../../hooks/twitter-news";

const CurrencySocialsTwitter = () => {
  const { state } = useLocation();
  const { error, tweets } = useTwitterHook(`${state.name} ${state.symbol}`);
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      {tweets.map((tweet, index) => (
        <Link
          key={index}
          sx={{
            display: "flex",
            flexDirection: "column",
            flexShrink: 0,
            border: `${1}px solid rgb(214, 214, 214)`,
            borderRadius: 4,
            padding: theme.spacing(2),
            height: 306,
            width: 246,
            mr: theme.spacing(4),
          }}
          to={tweet?.entities?.urls[0].url}
        >
          <Box sx={{ display: "flex", mb: theme.spacing(2) }}>
            <Box sx={{ display: "flex", mr: theme.spacing(1) }}>
              <Avatar
                src={tweet?.users?.urls[0].url}
                alt="currency-tag"
                width={40}
                height={40}
                style={{ marginRight: "1rem" }}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                fontWeight: theme.typography.fontWeightMedium,
                flex: "1 1 0%",
                overflow: "hidden",
              }}
            ></Box>
          </Box>
        </Link>
      ))}
    </Box>
  );
};

export default CurrencySocialsTwitter;
