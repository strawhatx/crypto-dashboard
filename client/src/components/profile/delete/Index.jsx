import React from "react";
import { Card, Box, Typography } from "@mui/material";
import UserProfileDeleteView from "./components/Delete";

const UserProfileDelete = () => {
  return (
    <Card sx={{ padding: 3, mt: 4 }}>
      <Box>
        <Typography component="h5" sx={{ fontWeight: 600 }}>
          Delete Account
        </Typography>
      </Box>
      <UserProfileDeleteView />
    </Card>
  );
};

export default UserProfileDelete;
