import React from "react";
import { Box, Container } from "@mui/material";
import { useTheme } from "@mui/system";
import HomeHero from "./components/hero/Index";

const HomeView = () => {
  const theme = useTheme();

  return (
    <>
      {/** Hero */}
      <Box
        className="hero"
        sx={{
          height: "100vh",
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        <HomeHero />
        <Box
          className="shape-divider-hero"
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            overflow: "hidden",
            lineHeight: 0,
            transform: "rotate(180deg)",
            zIndex: 0,

            "& svg": {
              position: "relative",
              display: "block",
              width: "calc(163% + 1.3px)",
              height: "500px",
              transform: "rotateY(180deg)",

              "& path": {
                fill: "#FFFFFF",
              },
            },
          }}
        >
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </Box>
      </Box>

      {/**Currencies */}
      <Box sx={{ mt: -8, pb: 1 }}>
        <Container maxWidth="md"></Container>
      </Box>
    </>
  );
};

export default HomeView;
