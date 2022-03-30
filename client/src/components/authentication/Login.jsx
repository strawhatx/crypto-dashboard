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

const Login = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const { login, currentUser } = useAuthStore((state) => ({
    login: state.login,
    currentUser: state.currentUser,
  }));

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password shold be at least 6 characters!")
      .uppercase("Password must contain at least 1 uppercase!")
      .required("Password is required"),
    rememberMe: Yup.boolean(),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await login(values.email, values.password) //, values.rememberMe || false)
        .then(() => {
          setAuthToken(currentUser);
        })
        .then(() => {
          navigate("/dashboard");
        })
        .catch((error) => {
          console.log(error);
          setMessage({
            title: "ERROR",
            color: "error",
            text: "email and/or password is incorrect",
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

      <Box sx={{ mt: theme.spacing(4) }}>
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
            to={`/auth/forgot-password`}
          >
            Forgot Password?
          </Link>
        </Box>
        <TextField
          name="password"
          type="password"
          fullWidth
          label="Password"
          inputProps={{ maxLength: 255 }}
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
      </Box>

      <Box sx={{ mt: theme.spacing(4) }}>
        <FormGroup>
          <FormControlLabel
            disabled
            control={
              <Checkbox
                name="rememberMe"
                value={formik.values.rememberMe}
                onChange={formik.handleChange}
              />
            }
            label="Remember Me"
          />
        </FormGroup>
      </Box>

      <Box className="mt-8">
        <Button variant="contained" type="submit" size="large" fullWidth>
          Login
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

export default Login;
