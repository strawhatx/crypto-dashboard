// shared/notification.js

import React from "react";
import PropTypes from "prop-types";
import { Alert, AlertTitle } from "@mui/material";

const Notification = ({ title, message, severity }) => {
  return (
    <Alert severity={severity} sx={{ width: "100%", my: 2 }}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
};

Notification.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  severity: PropTypes.oneOf(["success", "info", "error", "warning"]).isRequired,
};

export { Notification };
