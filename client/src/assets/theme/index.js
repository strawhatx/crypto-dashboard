/*Crypto Portfolio Dashboard*/

// @mui material components
import { createTheme } from "@mui/material/styles";

/* Typography */
import { typography } from "./base/typography";
import { palette } from "./base/palette";
import { shape } from "./base/shape";
import { customShadows, shadow } from "./base/shadows";
import { ComponentsOverrides } from "./overrides";
import { breakpoints } from "@mui/system";

const theme = createTheme({
  palette: { ...palette },
  typography: { ...typography },
  shape: { ...shape },
  breakpoints: { ...breakpoints },
  shadows: [...shadow],
  shade: { ...customShadows },
});

theme.components = ComponentsOverrides(theme);

export default theme;
