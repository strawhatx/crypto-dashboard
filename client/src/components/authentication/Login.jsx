import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import { useTheme } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import { useAuthStore } from "../../stores/authentication";
import { Notification } from "../Notification";
import logo from "../../assets/images/logo.svg";
import { setAuthToken } from "../../config/axios";

const LoginForm = () => {
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useTheme();
  const { login, currentUser } = useAuthStore((state) => ({
    login: state.login,
    currentUser: state.currentUser,
  }));

  const initialValues = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password shold be at least 6 characters!")
      .uppercase("Password must contain at least 1 uppercase!")
      .required("Password is required"),
    rememberMe: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await login(values.email, values.password) //, values.rememberMe || false)
        .then(() => {
          setAuthToken(currentUser);
        })
        .then(() => {
          setSubmitting(false);
          resetForm(initialValues);
        })
        .catch((error) => {
          setMessage({
            title: "ERROR",
            severity: "error",
            text: "email and/or password is incorrect",
          });
        });
    },
  });

  const {
    errors,
    touched,
    handleSubmit,
    handleChange,
    isSubmitting,
    getFieldProps,
    values,
  } = formik;

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
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              flexDirection: "column",
              mb: theme.spacing(1.5),
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                alignContent: "flex-end",
                color: theme.palette.grey[500],
                "& hover": { textDecoration: "none" },
              }}
              to={`/forgot-password`}
            >
              Forgot Password?
            </Link>
          </Box>
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Box>

        <Box sx={{ mt: theme.spacing(3) }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="subscribe"
                  value={values.rememberMe}
                  onChange={handleChange}
                />
              }
              label="Remember Me"
            />
          </FormGroup>
        </Box>

        <Box sx={{ mt: theme.spacing(3) }}>
          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Sign In
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );

  return (
    <>
      <Card>
        <CardHeader />
        <CardContent>
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
              Sign In
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
        </CardContent>
      </Card>
    </>
  );
};

export default LoginForm;
