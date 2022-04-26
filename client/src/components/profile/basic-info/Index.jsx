import React from "react";
import { Card, Box, Typography } from "@mui/material";
import UserProfileBasicInfoDisplayNameField from "./components/DisplayName";
import UserProfileBasicInfoEmailField from "./components/Email";
import UserProfileBasicInfoImage from "./components/Image";

const UserProfileBasicInfo = () => {
  return (
    <Card sx={{ padding: 3 }}>
      <Box>
        <Typography component="h5" sx={{ fontWeight: 600 }}>
          Basic Details
        </Typography>
      </Box>
      <UserProfileBasicInfoImage />
      <UserProfileBasicInfoDisplayNameField />
      <UserProfileBasicInfoEmailField />
    </Card>
  );
};

export default UserProfileBasicInfo;
