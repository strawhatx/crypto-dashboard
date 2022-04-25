import React, { useState, useEffect } from "react";
import { Avatar, Box, Button, Input, useTheme } from "@mui/material";
import useAuthStore from "../../../../../stores/authentication";
import { axios } from "../../../../../config/axios";
import { storage, getDownloadURL, ref } from "../../../../../config/firebase";

const UserProfileGeneralImage = () => {
  const theme = useTheme();
  const [photoUrl, setPhotoUrl] = useState("");

  const { currentUser, update } = useAuthStore((state) => ({
    currentUser: state.currentUser,
    update: state.updateImage,
  }));

  const handleChange = (e) => {
    if (!e.target.files[0]) return;

    let img = e.target.files[0];

    update(img)
      .then(async () => {
        const imgRef = ref(storage, `profiles/${currentUser.uid}.png`);
        const photoURL = await getDownloadURL(imgRef);

        setPhotoUrl(photoURL);

        axios.put("/accounts/", {
          uid: currentUser?.uid,
          image: photoURL,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (currentUser) setPhotoUrl(currentUser?.photoURL ?? "");
  }, [currentUser?.photoURL]);

  return (
    <>
      <Box sx={{ pt: 3, alignItems: "center", display: "flex" }}>
        <Avatar
          src={photoUrl}
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
    </>
  );
};

export default UserProfileGeneralImage;
