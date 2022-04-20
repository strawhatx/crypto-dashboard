import React from "react";
import { Box, TextField, useTheme } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import useAuthStore from "../../../../../stores/authentication";
import { axios } from "../../../../../config/axios";

const UserProfileGeneralDisplayNameField = () => {
  const theme = useTheme();

  const { currentUser, update } = useAuthStore((state) => ({
    currentUser: state.currentUser,
    update: state.updateDisplayName,
  }));

  const initialValues = { email: currentUser?.displayName };

  const schema = Yup.object().shape({
    displayName: Yup.string().required("display name is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      update(values.displayName)
        .then(async () => {
          await axios.put("/accounts/", {
            uid: currentUser?.uid,
            displayName: values.displayName,
          });
        })
        .then(() => {
          setSubmitting(false);
          resetForm(initialValues);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  //the form using formik to handle the submission
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{ display: "flex", mt: 4, alignItems: "center", width: "100%" }}
        >
          <TextField
            fullWidth
            type="text"
            label="Display Name"
            sx={{ margin: "0px 24px 0px 0px", flexGrow: 1 }}
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <LoadingButton
            size="large"
            type="submit"
            variant="text"
            loading={isSubmitting}
          >
            Save
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
};

export default UserProfileGeneralDisplayNameField;
