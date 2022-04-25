import { Card } from "@mui/material";
import React from "react";
import UserProfileGeneralDisplayNameField from "./components/DisplayName";
import UserProfileGeneralEmailField from "./components/Email";
import UserProfileGeneralImage from "./components/Image";

const UserProfileGeneral = () => {
  return (
    <Card sx={{ padding: 3 }}>
      <UserProfileGeneralImage />
      <UserProfileGeneralDisplayNameField />
      <UserProfileGeneralEmailField />
    </Card>
  );
};

export default UserProfileGeneral;
