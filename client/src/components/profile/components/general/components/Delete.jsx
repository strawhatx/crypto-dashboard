import React, { useEffect, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import useAuthStore from "../../../../../stores/authentication";
import { axios } from "../../../../../config/axios";

const UserProfileGeneralDelete = () => {
  const handleDelete = () => {};

  return (
    <Box sx={{ pt: 3 }}>
      <Typography component="h6">
        Delete your account and all of your source data. This is irreversible.
      </Typography>
      <Button
        size="large"
        type="submit"
        variant="contained"
        onClick={handleDelete}
      >
        Delete Account
      </Button>
    </Box>
  );
};

export default UserProfileGeneralDelete;
