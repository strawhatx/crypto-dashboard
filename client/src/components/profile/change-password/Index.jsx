import React from "react";
import { Card, Box, Typography } from "@mui/material";
import UserProfileChangePasswordView from "./components/ChangePassword";

const UserProfileDelete = () => {
  return (
    <Card sx={{ padding: 3, mt: 4 }}>
      <Box>
        <Typography component="h5" sx={{ fontWeight: 600 }}>
          Change Password
        </Typography>
      </Box>
      <UserProfileChangePasswordView />
    </Card>
  );
};

export default UserProfileDelete;
