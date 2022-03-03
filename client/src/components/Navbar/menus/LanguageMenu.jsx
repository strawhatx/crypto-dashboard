import React, { useState, useEffect } from "react";
import {
  all_languages,
  popular_languages,
} from "../../../assets/i18n/languages";
import { useLanguageStore } from "../../../stores/global";
import { Button, Grid, Box, Typography, TextField } from "@mui/material";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import BasicDialog from "../../dialog/Index";
import NoResultsImg from "../../../assets/images/no-results.svg";

const LanguageMenu = () => {
  const [search, setSearch] = useState("");

  const theme = useTheme();
  const [t, i18n] = useTranslation();

  const { selected, update } = useLanguageStore((state) => ({
    selected: state.language,
    update: state.updateLanguage,
  }));

  const handlePopularSearch = () => {
    return popular_languages.filter(
      (lang) =>
        lang.label.toLowerCase().includes(search?.toLowerCase()) ||
        lang.value.toLowerCase().includes(search?.toLowerCase())
    );
  };

  const handleAllSearch = () => {
    return all_languages.filter(
      (lang) =>
        lang.label.toLowerCase().includes(search?.toLowerCase()) ||
        lang.value.toLowerCase().includes(search?.toLowerCase())
    );
  };

  useEffect(() => {
    i18n.changeLanguage(selected.toLowerCase(), () =>
      console.log("language changed")
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const popularGrid = (
    <Box classNames="popular" sx={{ mb: theme.spacing(4) }}>
      <Typography sx={{ pb: theme.spacing(2) }}>Popular</Typography>
      <Grid container spacing={1}>
        {handlePopularSearch().map((e, i) => (
          <Grid key={e.value} item xs={6} md={4}>
            <Button
              //fullWidth
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

  const allGrid = (
    <Box classNames="all">
      <Typography sx={{ pb: theme.spacing(2) }}>All</Typography>
      <Grid container spacing={1}>
        {handleAllSearch().map((e, i) => (
          <Grid key={e.value} item xs={6} md={4}>
            <Button
              //fullWidth
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

  const NoResults = (
    <Box
      className="no-results"
      sx={{
        display: "flex",
        padding: theme.spacing(4),
        mt: theme.spacing(5),
        justifyContent: "center",
      }}
    >
      <Box sx={{ display: "block" }}>
        <Box>
          <img
            src={NoResultsImg}
            className="no-results-img"
            alt="no results"
            style={{ margin: "auto" }}
          />
        </Box>
        <Box>
          <p>No search results</p>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <BasicDialog
        btnTitle={selected}
        title="Select a language"
        children={
          <Box sx={{ pb: theme.spacing(5) }}>
            <Box classNames="search" sx={{ mb: theme.spacing(4) }}>
              <TextField
                label="Search"
                size="small"
                fullWidth
                onChange={(e) => setSearch(e.target.value)}
              />
            </Box>
            {handlePopularSearch().length > 0 && popularGrid}

            {handleAllSearch().length > 0 && allGrid}

            {handlePopularSearch().length <= 0 &&
              handleAllSearch().length <= 0 &&
              NoResults}
          </Box>
        }
      />
    </>
  );
};

export default LanguageMenu;
