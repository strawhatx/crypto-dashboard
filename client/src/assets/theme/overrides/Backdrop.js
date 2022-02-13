import { alpha } from "@mui/material/styles";

export const Backdrop = (theme) => {
  const low = alpha(theme.palette.grey[900], 0.48);
  const high = alpha(theme.palette.grey[900], 1);

  return {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          background: [
            `rgb(22,28,36)`,
            `-moz-linear-gradient(75deg, ${low} 0%, ${high} 100%)`,
            `-webkit-linear-gradient(75deg, ${low} 0%, ${high} 100%)`,
            `linear-gradient(75deg, ${low} 0%, ${high} 100%)`,
          ],
          "&.MuiBackdrop-invisible": {
            background: "transparent",
          },
        },
      },
    },
  };
};
