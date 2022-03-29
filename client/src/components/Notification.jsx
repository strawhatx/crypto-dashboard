// shared/notification.js

import React from "react";
import PropTypes from "prop-types";
import { Alert, AlertTitle } from "@mui/material";

const Notification = ({ title, message, color }) => {
  return (
    <Alert severity={color}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  );
};

Notification.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["green", "blue", "red", "yellow", "lime"]).isRequired,
};

export { Notification };
