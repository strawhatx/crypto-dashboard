import React, { useState, useEffect } from "react";
import { all_languages, popular_languages } from "../../assets/i18n/languages";
import { useLanguageStore, useModalStore } from "../../stores/app-settings";
import { Box, TextField } from "@mui/material";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import BasicDialog from "../dialog/Index";
import LanguageMenuPopularGrid from "./components/PopularGrid";
import LanguageMenuNoResults from "./components/NoResults";
import LanguageMenuAllGrid from "./components/AllGrid";

const LanguageMenu = () => {
  const [search, setSearch] = useState("");

  const theme = useTheme();
  const { i18n } = useTranslation();

  const { selected } = useLanguageStore((state) => ({
    selected: state.language,
  }));

  const { isOpen, setOpen } = useModalStore((state) => ({
    isOpen: state.isLanguagesOpen,
    setOpen: state.setIsLanguagesOpen,
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

  return (
    <>
      <BasicDialog
        title="Select a language"
        type="language"
        open={isOpen}
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
            {handlePopularSearch().length > 0 && (
              <LanguageMenuPopularGrid languages={handlePopularSearch()} />
            )}

            {handleAllSearch().length > 0 && (
              <LanguageMenuAllGrid languages={handleAllSearch()} />
            )}

            {handlePopularSearch().length <= 0 &&
              handleAllSearch().length <= 0 && <LanguageMenuNoResults />}
          </Box>
        }
      />
    </>
  );
};

export default LanguageMenu;
