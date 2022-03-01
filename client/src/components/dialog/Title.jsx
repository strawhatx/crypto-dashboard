import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/system";
import { DialogTitle, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const BasicDialogTitleWithClose = ({ title, onClose }) => {
  const theme = useTheme();
  return (
    <DialogTitle sx={{ m: 0, p: 2 }}>
      {title}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BasicDialogTitleWithClose.propTypes = {
  title: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default BasicDialogTitleWithClose;
