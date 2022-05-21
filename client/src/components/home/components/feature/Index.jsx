import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { useTheme } from "@mui/system";
import HomeFeatureBlocks from "./components/Blocks";

const HomeFeature = () => {
  const theme = useTheme();

  return (
    <Container
      maxWidth="lg"
      sx={{
        pt: theme.spacing(16),
        pb: theme.spacing(4),
      }}
    >
      <Box>
        <Typography
          variant="h2"
          component="div"
          sx={{
            textAlign: "center",
            pb: theme.spacing(2),
          }}
        >
          Boost up with Our <br />
          Great Features
        </Typography>
      </Box>
      <Box>
        <Typography
          variant="p"
          component="div"
          sx={{
            textAlign: "center",
            pb: theme.spacing(8),
            fontSize: 22,
          }}
        >
          crypto came into being clear vision to become a global leader
        </Typography>
      </Box>

      <Box sx={{ mb: 4 }}>
        <HomeFeatureBlocks />
      </Box>
    </Container>
  );
};

export default HomeFeature;
