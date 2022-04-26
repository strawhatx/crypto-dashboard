import React, { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import useAuthStore from "../../../../../stores/authentication";
import { axios } from "../../../../../config/axios";

const UserProfileBasicInfoEmailField = () => {
  const [email, setEmail] = useState("");

  const { currentUser, update } = useAuthStore((state) => ({
    currentUser: state.currentUser,
    update: state.updateEmail,
  }));

  const handleSubmit = () => {
    update(email)
      .then(async () => {
        await axios.put("/accounts/", {
          uid: currentUser?.uid,
          email: email,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (currentUser) setEmail(currentUser?.email);
  }, [currentUser?.email]);

  return (
    <Box sx={{ display: "flex", mt: 4, alignItems: "center", width: "100%" }}>
      <TextField
        fullWidth
        type="email"
        label="Email Address"
        onInput={handleChange}
        sx={{ margin: "0px 24px 0px 0px", flexGrow: 1 }}
        value={email}
      />

      <Button size="large" type="submit" variant="text" onClick={handleSubmit}>
        Update
      </Button>
    </Box>
  );
};

export default UserProfileBasicInfoEmailField;
