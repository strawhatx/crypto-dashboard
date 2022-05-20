import React, { useState } from "react";
import { Container, Grid, Typography, Box, Button } from "@mui/material";
import { useTheme } from "@mui/system";
import { PlayCircleOutline } from "@mui/icons-material";
import HomeHeroVideo from "./components/Video";
import { useTranslation } from "react-i18next";
import chart from "../../../../assets/images/crypto-factory.png";

const HomeHero = () => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <Container
      maxWidth="lg"
      sx={{
        pt: theme.spacing(22),
        pb: theme.spacing(15),
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} sx={{ zIndex: 1 }}>
          <Box>
            <Typography
              variant="h1"
              component="div"
              sx={{
                textAlign: "left",
                justifyContent: "center",
                mb: 4,
              }}
            >
              {t("Manage Assets Smarter & Faster")}
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="p"
              component="div"
              sx={{
                textAlign: "left",
                justifyContent: "center",
                fontSize: 22,
                mb: 4,
              }}
            >
              {t(
                "Simply and securely buy, sell, and manage hundreds of cryptocurrencies."
              )}
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.primary.contrastText,
                color: theme.palette.primary.main,
                borderRadius: 5,
                mr: 4,
                boxShadow: "0 8px 13px #00000040",
                "&:hover": {
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.primary.contrastText,
                },
              }}
            >
              Download the app
            </Button>
            <Button
              variant="text"
              startIcon={<PlayCircleOutline />}
              sx={{ color: theme.palette.primary.contrastText }}
              onClick={() => setOpen(true)}
            >
              Watch the video
            </Button>
            <HomeHeroVideo open={open} setOpen={setOpen} />
          </Box>
        </Grid>
        <Grid item xs={0} sm={6} sx={{ zIndex: 1 }}>
          <Box>
            <img
              width={250}
              height={350}
              src={chart}
              style={{ width: "100%" }}
              alt="header-logo"
            />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HomeHero;
