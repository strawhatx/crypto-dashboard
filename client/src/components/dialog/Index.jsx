import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Dialog, DialogContent, useTheme } from "@mui/material";
import BasicDialogTitleWithClose from "./Title";

const BasicDialog = ({
  btnTitle,
  btnType,
  title,
  children,
  type,
  size = "md",
  requestClose = false,
  setRequestClose,
}) => {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (requestClose) {
      setOpen(false);

      setRequestClose(false);
    }
  }, [requestClose]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const stylez = () => {
    let result = {};
    switch (btnType) {
      case "nav":
        result = {
          color: theme.palette.primary.contrastText,
          py: theme.spacing(0.25),
          mr: theme.spacing(2),
        };
        break;
      case "link":
        result = {
          py: theme.spacing(0.25),
          mr: theme.spacing(2),
        };
        break;
      case "forgot":
        result = {
          textDecoration: "none",
          alignContent: "flex-end",
          color: theme.palette.grey[500],
          py: theme.spacing(0.25),
          mr: theme.spacing(2),
        };
        break;
      default:
        result = {
          color: theme.palette.primary.contrastText,
          py: theme.spacing(0.25),
          mr: theme.spacing(2),
        };
        break;
    }

    return result;
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={open ? `${type}-dialog` : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClickOpen}
        sx={stylez()}
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
  btnType: PropTypes.oneOf(["nav", "link", "forgot"]).isRequired,
  title: PropTypes.string,
  children: PropTypes.any.isRequired,
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
  requestClose: PropTypes.bool,
  setRequestClose: PropTypes.any,
};

export default BasicDialog;
