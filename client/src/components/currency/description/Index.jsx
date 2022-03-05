import React from "react";
import PropTypes from "prop-types";
import { Card, CardContent, Typography, Box, CardHeader } from "@mui/material";
import Parse from "html-react-parser";
import { useTheme } from "@mui/system";

const CurrencyDescription = ({ name, rank, description }) => {
  const theme = useTheme();
  return (
    <>
      <Card>
        <CardHeader />
        <CardContent
          sx={{
            "& h3": { mb: theme.spacing(0.5) },
            "& p": { mb: theme.spacing(2) },
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: theme.spacing(1),
            }}
          >
            <Typography variant="h4" sx={{ mr: theme.spacing(2) }}>
              About {name}
            </Typography>
            <Typography
              variant="span"
              sx={{
                display: "inline-flex",
                verticalAlign: "top",
                alignItems: "center",
                lineHeight: 1.2,
                outlineOffset: 2,
                borderRadius: 5,
                padding: theme.spacing(0.8, 2),
                background: theme.palette.secondary.main,
                color: theme.palette.primary.contrastText,
              }}
            >
              Rank #{rank}
            </Typography>
          </Box>

          {Parse(description)}
        </CardContent>
      </Card>
    </>
  );
};

CurrencyDescription.defaultProps = {
  name: "",
  rank: 0,
  description: "",
};

CurrencyDescription.propTypes = {
  name: PropTypes.string,
  rank: PropTypes.number,
  description: PropTypes.string,
};

export default CurrencyDescription;
