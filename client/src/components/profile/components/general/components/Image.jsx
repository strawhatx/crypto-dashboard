import { Avatar, Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import useAuthStore from "../../../../../stores/authentication";

const UserProfileGeneralImage = () => {
  const theme = useTheme();
  const { currentUser } = useAuthStore((state) => ({
    currentUser: state.currentUser,
  }));

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <Typography component="h5" sx={{ fontWeight: 600 }}>
            Basic Details
          </Typography>
        </Box>
        <Box sx={{ pt: 3, alignItems: "center", display: "flex" }}>
          <Avatar
            src={currentUser?.photoURL}
            alt={currentUser?.displayName}
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <Button
            color="inherit"
            size="large"
            aria-label="change image"
            variant="text"
            sx={{ padding: theme.spacing(1.1, 2) }}
          >
            Change
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default UserProfileGeneralImage;
