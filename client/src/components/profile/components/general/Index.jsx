import { Card } from "@mui/material";
import React from "react";
import UserProfileGeneralDisplayNameField from "./components/DisplayName";
import UserProfileGeneralImage from "./components/Image";

const UserProfileGeneral = () => {
  return (
    <Card sx={{ padding: 3 }}>
      <UserProfileGeneralImage />
      <UserProfileGeneralDisplayNameField />
    </Card>
  );
};

export default UserProfileGeneral;
