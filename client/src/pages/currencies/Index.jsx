import React from "react";
import { Box, Container, Typography } from "@mui/material";
import TrendingCarousel from "../../components/currencies/carousel/Index";
import CurrencyTable from "../../components/currencies/table/Index";
import { useTheme } from "@mui/system";

const Currencies = () => {
  const theme = useTheme();

  return (
    <>
      {/** Hero */}
      <Box
        className="hero"
        sx={{
          pt: theme.spacing(1.25),
          pb: theme.spacing(15),
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            component="div"
            sx={{
              mb: theme.spacing(0.6),
              py: theme.spacing(5),
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            Currencies
          </Typography>
        </Container>

        <Box>
          <Container maxWidth="lg">
            <TrendingCarousel />
          </Container>
        </Box>
      </Box>

      {/**Currencies */}
      <Box sx={{ mt: -8, pb: 1 }}>
        <Container maxWidth="lg">
          <CurrencyTable />
        </Container>
      </Box>
    </>
  );
};

export default Currencies;
