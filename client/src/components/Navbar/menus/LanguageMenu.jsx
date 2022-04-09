import React, { useState, useEffect } from "react";
import {
  all_languages,
  popular_languages,
} from "../../../assets/i18n/languages";
import { useLanguageStore } from "../../../stores/app-settings";
import {
  Button,
  Grid,
  Box,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import BasicDialog from "../../dialog/Index";
import NoResultsImg from "../../../assets/images/no-results.svg";
import LanguageImg from "../../../assets/images/language.svg";

const LanguageMenu = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const { i18n } = useTranslation();

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
    <Box sx={{ ml: 2 }}>
      <IconButton
        color="primary"
        aria-label="currencies"
        onClick={() => setOpen(true)}
        sx={{
          display: "inline-flex",
          backgroundColor: "transparent",
          border: 0,
          fontSize: "1.5rem",

          padding: 1,
          transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          color: "inherit",
        }}
      >
        <img
          src={LanguageImg}
          className="language-img"
          alt="language"
          style={{ margin: "auto" }}
        />
      </IconButton>
      <BasicDialog
        btnTitle={selected}
        title="Select a language"
        type="language"
        open={open}
        setOpen={setOpen}
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
    </Box>
  );
};

export default LanguageMenu;
