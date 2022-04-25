import React, { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Button,
  Input,
  Typography,
  useTheme,
} from "@mui/material";
import useAuthStore from "../../../../../stores/authentication";
import { axios } from "../../../../../config/axios";
import { update } from "lodash";

const UserProfileGeneralImage = () => {
  const theme = useTheme();
  const [photoImg, setPhotoImg] = useState("");

  const { currentUser } = useAuthStore((state) => ({
    currentUser: state.currentUser,
    update: state.updateImage,
  }));

  const handleChange = (e) => {
    if (!e.target.files[0]) return;

    let img = e.target.files[0];

    update(img).then(() => {});
    axios
      .put("/accounts/", {
        uid: currentUser?.uid,
        image: img,
      })
      .then(() => {
        setPhotoImg(img);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (currentUser) {
      axios.get(`/accounts/image/${currentUser?.uid}`).then((response) => {
        setPhotoImg(response.image);
      });
    }
  }, [currentUser]);

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
            src={photoImg}
            alt={currentUser?.displayName}
            sx={{ width: 64, height: 64, mr: 2 }}
          />
          <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              type="file"
              onChange={handleChange}
              sx={{ display: "none" }}
            />
            <Button
              color="inherit"
              size="large"
              aria-label="change image"
              component="span"
              variant="text"
              sx={{ padding: theme.spacing(1.1, 2) }}
            >
              Change
            </Button>
          </label>
        </Box>
      </Box>
    </>
  );
};

export default UserProfileGeneralImage;
