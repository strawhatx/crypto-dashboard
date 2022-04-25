import { Card, Box, Typography } from "@mui/material";
import React from "react";
import UserProfileGeneralDelete from "./components/Delete";
import UserProfileGeneralDisplayNameField from "./components/DisplayName";
import UserProfileGeneralEmailField from "./components/Email";
import UserProfileGeneralImage from "./components/Image";

const UserProfileGeneral = () => {
  return (
    <>
      <Card sx={{ padding: 3 }}>
        <Box>
          <Typography component="h5" sx={{ fontWeight: 600 }}>
            Basic Details
          </Typography>
        </Box>
        <UserProfileGeneralImage />
        <UserProfileGeneralDisplayNameField />
        <UserProfileGeneralEmailField />
      </Card>

      <Card sx={{ padding: 3 }}>
        <Box>
          <Typography component="h5" sx={{ fontWeight: 600 }}>
            Delete Account
          </Typography>
        </Box>
        <UserProfileGeneralDelete />
      </Card>
    </>
  );
};

export default UserProfileGeneral;
