import React from "react";
import { useTheme } from "@mui/system";
import { Button, Box, Grid, Typography } from "@mui/material";
import PropType from "prop-types";
import { useLanguageStore } from "../../../stores/app-settings";

const LanguageMenuAllGrid = ({ languages }) => {
  const theme = useTheme();

  const { selected, update } = useLanguageStore((state) => ({
    selected: state.language,
    update: state.setLanguage,
  }));

  return (
    <Box classNames="all">
      <Typography sx={{ pb: theme.spacing(2) }}>All</Typography>
      <Grid container spacing={1}>
        {languages.map((e, i) => (
          <Grid key={e.value} item xs={12} sm={12} md={4}>
            <Button
              fullWidth
              onClick={() => update(e.value)}
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
                    e.value === selected ? theme.palette.secondary.main : "",
                }}
              >
                {e.label}
              </Typography>
            </Button>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

LanguageMenuAllGrid.propType = {
  languages: PropType.array,
};

export default LanguageMenuAllGrid;
