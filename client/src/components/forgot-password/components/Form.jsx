import React from "react";
import { Box, TextField } from "@mui/material";
import { useTheme } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import PropTypes from "prop-types";
import { useAuthStore } from "../../../stores/authentication";

const ForgotPasswordForm = ({ setMessage }) => {
  const theme = useTheme();
  const initialValues = { email: "" };
  const { resetPassword } = useAuthStore((state) => ({
    resetPassword: state.resetPassword,
  }));

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await resetPassword(values.email)
        .then(() => {
          setMessage({
            title: "SUCCESS",
            severity: "success",
            text: "Check your inbox for further instructions",
          });
        })
        .then(() => {
          setSubmitting(false);
          resetForm(initialValues);
        })
        .catch((error) => {
          console.log(error);
          setMessage({
            title: "ERROR",
            severity: "error",
            text: "Failed to reset password",
          });
        });
    },
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  //the form using formik to handle the submission
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box>
          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="Email address"
            {...getFieldProps("email")}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />
        </Box>

        <Box sx={{ mt: theme.spacing(3) }}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Reset Password
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
};

ForgotPasswordForm.propType = {
  setMessage: PropTypes.any,
};

export default ForgotPasswordForm;
