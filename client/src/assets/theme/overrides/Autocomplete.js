export const Autocomplete = (theme) => {
  return {
    MuiAutocomplete: {
      styleOverrides: {
        paper: {
          boxShadow: theme.shade.z20,
        },
      },
    },
  };
};
