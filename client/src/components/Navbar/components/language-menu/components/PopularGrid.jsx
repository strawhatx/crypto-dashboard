import React from "react";

import { useTheme } from "@mui/system";
import { Button, Box, Grid, Typography } from "@mui/material";
import PropType from "prop-types";
import { useLanguageStore } from "../../../../../stores/app-settings";

const LanguageMenuPopularGrid = ({ languages }) => {
  const theme = useTheme();

  const { selected, update } = useLanguageStore((state) => ({
    selected: state.language,
    update: state.updateLanguage,
  }));

  return (
    <Box className="popular" sx={{ mb: theme.spacing(4) }}>
      <Typography sx={{ pb: theme.spacing(2) }}>Popular</Typography>
      <Grid container spacing={1}>
        {currencies?.map((e, i) => (
          <Grid key={i} item xs={12} sm={12} md={4}>
            <Button
              fullWidth
              onClick={() => update(e)}
              style={{
                flexDirection: "column",
                alignItems: "flex-start",
                height: theme.spacing(6),
              }}
            >
              <Typography
                variant="p"
                sx={{
                  color:
                    e.symbol === selected ? theme.palette.secondary.main : "",
                }}
              >
                {e.name} ({e.symbol})
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

LanguageMenuPopularGrid.propType = {
  languages: PropType.array,
};

export default LanguageMenuPopularGrid;
