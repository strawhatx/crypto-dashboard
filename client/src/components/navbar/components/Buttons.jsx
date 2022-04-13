import React from "react";
import { IconButton, Box } from "@mui/material";
import LanguageImg from "../../../assets/images/language.svg";
import CurrencyImg from "../../../assets/images/currency.svg";
import { useModalStore } from "../../../stores/app-settings";

const NavbarModalButtons = () => {
  const { setIsCurrenciesOpen, setIsLanguagesOpen } = useModalStore(
    (state) => ({
      setIsCurrenciesOpen: state.setIsCurrenciesOpen,
      setIsLanguagesOpen: state.setIsLanguagesOpen,
    })
  );

  return (
    <>
      <Box>
        <IconButton
          color="primary"
          aria-label="currencies"
          onClick={() => setIsCurrenciesOpen(true)}
          sx={{
            display: "inline-flex",
            backgroundColor: "transparent",
            border: 0,
            padding: 1,
            transition:
              "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            color: "inherit",
          }}
        >
          <img
            src={CurrencyImg}
            className="currency-img"
            alt="currency"
            style={{ margin: "auto" }}
          />
        </IconButton>
      </Box>
      <Box sx={{ ml: 2 }}>
        <IconButton
          color="primary"
          aria-label="languages"
          onClick={() => setIsLanguagesOpen(true)}
          sx={{
            display: "inline-flex",
            backgroundColor: "transparent",
            border: 0,
            padding: 1,
            transition:
              "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
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
      </Box>
    </>
  );
};

export default NavbarModalButtons;
