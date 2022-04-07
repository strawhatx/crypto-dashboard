import React from "react";
import PropTypes from "prop-types";
import { Button, Dialog, DialogContent, useTheme } from "@mui/material";
import BasicDialogTitleWithClose from "./Title";

const BasicDialog = ({ btnTitle, title, children, type, size = "md" }) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? `${type}-dialog` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClickOpen}
        sx={{
          border: 1,
          borderColor: "#f5f5f5e3",
          color: theme.palette.primary.contrastText,
          py: theme.spacing(0.25),
          mr: theme.spacing(2),
        }}
      >
        {btnTitle}
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        fullWidth
        maxWidth={size}
      >
        <BasicDialogTitleWithClose
          id="customized-dialog-title"
          title={title}
          onClose={handleClose}
        />

        <DialogContent dividers>{children}</DialogContent>
      </Dialog>
    </>
  );
};

BasicDialog.propTypes = {
  btnTitle: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
};

export default BasicDialog;
