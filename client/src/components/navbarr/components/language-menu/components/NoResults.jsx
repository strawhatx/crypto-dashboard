import React from "react";
import { useTheme } from "@mui/system";
import NoResultsImg from "../../../../../assets/images/no-results.svg";
import { Box } from "@mui/material";

const LanguageMenuNoResults = () => {
  const theme = useTheme();

  return (
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
};

export default LanguageMenuNoResults;
