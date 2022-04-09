import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogContent, useTheme } from "@mui/material";
import BasicDialogTitleWithClose from "./Title";

const BasicDialog = ({ title, children, open, setOpen, size = "md" }) => {
  const theme = useTheme();

  return (
    <>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth={size}
      >
        <BasicDialogTitleWithClose
          id="customized-dialog-title"
          title={title}
          onClose={() => setOpen(false)}
        />

        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </>
  );
};

BasicDialog.propTypes = {
  title: PropTypes.string,
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.any.isRequired,
  size: PropTypes.string,
};

export default BasicDialog;
