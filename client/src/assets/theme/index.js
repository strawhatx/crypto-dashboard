/*Crypto Portfolio Dashboard*/

// @mui material components
import { createTheme } from "@mui/material/styles";

/* Typography */
import { inter } from "./base/typography";
import { colors } from "./base/colors";

export default createTheme({
  palette: { ...colors },
  typography: { ...inter },
});
