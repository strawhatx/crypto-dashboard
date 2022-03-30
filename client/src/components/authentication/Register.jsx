import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { axios } from "../../config/axios";

const Register = () => {
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const { register } = useAuthStore((state) => ({ register: state.register }));

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
      //.min(6, "Password should be at least 6 characters!")
      //.uppercase("Password must contain at least 1 uppercase!")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password Confirmation is required"),
    subscribe: Yup.boolean(),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Accept Terms & Conditions is required"
    ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      subscribe: false,
      acceptTerms: false,
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      await register(values.email, values.password)
        .then(async (response) => {
          console.log(response);
          await axios.post("/accounts/", {
            uid: response.user.uid,
            email: response.user.email,
            isSubscribed: values.subscribe,
          });
        })
        .then(() => {
          navigate("/auth/login");
        })
        .catch((error) => {
          console.log(error);
          setMessage({
            title: "ERROR",
            color: "error",
            text: "Registration failed please contacct us for assistance.",
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
                name="subscribe"
                value={formik.values.subscribe}
                onChange={formik.handleChange}
              />
            }
            label="Subscribe"
          />
        </FormGroup>

        <FormGroup>
          <FormControlLabel
            disabled
            control={
              <Checkbox
                name="acceptTerms"
                value={formik.values.acceptTerms}
                onChange={formik.handleChange}
              />
            }
            label="I agree with the Terms and conditions."
          />
        </FormGroup>
      </Box>

      <Box className="mt-8">
        <Button variant="contained" type="submit" size="large" fullWidth>
          Register
        </Button>
      </Box>
    </form>
  );

  return (
    <>
      <BasicDialog
        btnTitle="Sign Up"
        type="signup"
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
              Register
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

export default Register;
