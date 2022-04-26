import React from "react";
import { Box, Button, Typography } from "@mui/material";

const UserProfileGeneralDelete = () => {
  const handleDelete = () => {
    // TODO: delete the user profile image in storage
    // TODO: delete the user profile in both databses
  };

  return (
    <Box sx={{ pt: 3 }}>
      <Typography component="h6" sx={{ mb: 3 }}>
        Delete your account and all of your source data. This is irreversible.
      </Typography>

      <Button
        size="large"
        type="submit"
        variant="outlined"
        color="error"
        onClick={handleDelete}
      >
        Delete Account
      </Button>
    </Box>
  );
};

export default UserProfileGeneralDelete;
