import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent, IconButton, useTheme } from "@mui/material";
import { Close } from "@mui/icons-material";

const VideoDialog = ({ children, open, setOpen }) => {
  const theme = useTheme();

  return (
    <>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
        maxWidth="md"
        sx={{
          "& .MuiPaper-root": { backgroundColor: "black", overflowY: "unset" },
        }}
      >
        {open && (
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{
              position: "absolute",
              right: -60,
              top: -14,
              color: theme.palette.grey[400],
            }}
          >
            <Close fontSize="large" />
          </IconButton>
        )}
        <DialogContent sx={{ padding: 0 }}>{children}</DialogContent>
      </Dialog>
    </>
  );
};

VideoDialog.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.any.isRequired,
};

export default VideoDialog;
