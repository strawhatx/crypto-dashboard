import React, { useState } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import BasicDialog from "../dialog/Index";
import { useAuthStore } from "../../stores/authentication";
import { Notification } from "../Notification";
import logo from "../../assets/images/logo.svg";

const ForgotPassword = () => {
  const [message, setMessage] = useState(null);
  const theme = useTheme();
  const { resetPassword } = useAuthStore((state) => ({
    login: state.login,
  }));

  const initialValues = { email: "" };

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
  const form = (
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

  return (
    <>
      <BasicDialog
        btnTitle="Forgot Password"
        btnType="forgot"
        type="forgot"
        size="xs"
        children={
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="span"
              sx={{
                width: theme.spacing(10),
                height: theme.spacing(10),
                backgroundImage: `url(${logo})`,
                backgroundSize: "100%",
                backgroundPosition: "center",
                boxShadow: "0px 3px 6px rgb(0 0 0 / 7%)",
                backgroundRepeat: "no-repeat",
                borderRadius: theme.spacing(12.4),
              }}
            ></Typography>
            <Typography
              variant="h6"
              sx={{ mt: theme.spacing(2), mb: theme.spacing(0.5) }}
            >
              Login
            </Typography>
            <Typography
              variant="p"
              sx={{
                pb: theme.spacing(2),
                fontWeight: theme.typography.fontWeightMedium,
                color: theme.palette.grey[500],
              }}
            >
              To start using CryptoWatch
            </Typography>

            {message && (
              <Notification
                title={message.title}
                severity={message.severity}
                message={message.text}
              />
            )}

            <Box sx={{ width: "100%", pt: theme.spacing(1) }}>{form}</Box>
          </Box>
        }
      />
    </>
  );
};

export default ForgotPassword;
