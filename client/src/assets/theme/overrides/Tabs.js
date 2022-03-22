// ----------------------------------------------------------------------

export const Tabs = (theme) => {
  return {
    MuiTabs: {
      styleOverrides: {
        root: {
          marginBottom: theme.spacing(1),
        },
        flexContainer: {
          display: "inline-flex",
          position: "relative",
          zIndex: 1,
        },
        scroller: {
          [theme.breakpoints.up("md")]: {
            padding: "0 8px",
          },
        },
        indicator: {
          top: 3,
          bottom: 3,
          right: 3,
          height: "auto",
          background: "none",
          "&:after": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            left: 4,
            right: 4,
            bottom: 0,
            borderRadius: 8,
            backgroundColor: theme.palette.secondary.main,
          },
        },
      },
    },
  };
};

export const Tab = (theme) => {
  return {
    MuiTab: {
      styleOverrides: {
        root: {
          "&:hover": { opacity: 1 },

          minWidth: 96,
          [theme.breakpoints.up("md")]: {
            minWidth: 120,
          },

          "&.Mui-selected": {
            color: theme.palette.secondary.contrastText,
          },
        },
      },
    },
  };
};
