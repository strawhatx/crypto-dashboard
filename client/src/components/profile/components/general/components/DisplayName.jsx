import React, { useEffect, useState } from "react";
import { Box, TextField, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import useAuthStore from "../../../../../stores/authentication";
import { axios } from "../../../../../config/axios";

const UserProfileGeneralDisplayNameField = () => {
  const [name, setName] = useState("");

  const { currentUser, update } = useAuthStore((state) => ({
    currentUser: state.currentUser,
    update: state.updateDisplayName,
  }));

  const handleSubmit = () => {
    update(name)
      .then(async () => {
        await axios.put("/accounts/", {
          uid: currentUser?.uid,
          displayName: name,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (currentUser) setName(currentUser?.displayName);
  }, [currentUser?.displayName]);

  //the form using formik to handle the submission
  return (
    <Box sx={{ display: "flex", mt: 4, alignItems: "center", width: "100%" }}>
      <TextField
        fullWidth
        type="text"
        label="Display Name"
        onInput={handleChange}
        sx={{ margin: "0px 24px 0px 0px", flexGrow: 1 }}
        value={name}
      />

      <Button size="large" type="submit" variant="text" onClick={handleSubmit}>
        Save
      </Button>
    </Box>
  );
};

export default UserProfileGeneralDisplayNameField;
