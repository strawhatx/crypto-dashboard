import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { useFormik } from "formik";
import * as Yup from "yup";
import BasicDialog from "../dialog/Index";
import { useAuthStore } from "../../stores/authentication";
import { Notification } from "../Notification";
import logo from "../../assets/images/logo.svg";
import { setAuthToken } from "../../config/axios";

const ForgotPassword = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const { resetPassword, currentUser } = useAuthStore((state) => ({
    login: state.login,
    currentUser: state.currentUser,
  }));

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await resetPassword(values.email)
        .then(() => {
          setMessage({
            title: "SUCCESS",
            color: "success",
            text: "Check your inbox for further instructions",
          });
        })
        .catch((error) => {
          console.log(error);
          setMessage({
            title: "ERROR",
            color: "error",
            text: "Failed to reset password",
          });
        });
    },
  });

  //the form using formik to handle the submission
  const form = (
    <form onSubmit={formik.handleSubmit}>
      <Box>
        <TextField
          name="email"
          type="email"
          label="Email"
          fullWidth
          inputProps={{ maxLength: 255 }}
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
      </Box>

      <Box className="mt-8">
        <Button variant="contained" type="submit" size="large" fullWidth>
          Reset Password
        </Button>
      </Box>
    </form>
  );

  return (
    <>
      <BasicDialog
        btnTitle="Sign In"
        type="signin"
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
                color={message.color}
                message={message.text}
              />
            )}

            <Box sx={{ width: "100%" }}>{form}</Box>

            <Box></Box>
          </Box>
        }
      />
    </>
  );
};

export default ForgotPassword;
