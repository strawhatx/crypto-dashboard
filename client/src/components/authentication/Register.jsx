import React, { useState } from "react";
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
import { axios } from "../../config/axios";

const RegisterForm = () => {
  const [message, setMessage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const theme = useTheme();
  const { register } = useAuthStore((state) => ({ register: state.register }));

  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    subscribe: false,
    acceptTerms: false,
  };

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
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      register(values.email, values.password, values.subscribe)
        .then(async (response) => {
          console.log(response);
          await axios.post("/accounts/", {
            uid: response.user.uid,
            email: response.user.email,
            isSubscribed: values.subscribe,
          });
        })
        .then(() => {
          setSubmitting(false);
          resetForm(initialValues);
        })
        .catch((error) => {
          setMessage({
            title: "ERROR",
            severity: "error",
            text: "Registration failed please contacct us for assistance.",
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
          <TextField
            fullWidth
            autoComplete="confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            label="Confirm Password"
            {...getFieldProps("confirmPassword")}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    <Icon icon={showConfirmPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={Boolean(touched.confirmPassword && errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
          />
        </Box>

        <Box sx={{ mt: theme.spacing(3) }}>
          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="subscribe"
                  value={values.subscribe}
                  onChange={handleChange}
                />
              }
              label="Subscribe"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="acceptTerms"
                  value={values.acceptTerms}
                  onChange={handleChange}
                />
              }
              label="I agree with the Terms and conditions."
            />
            {errors.acceptTerms && touched.acceptTerms ? (
              <Box
                sx={{
                  color: "#FF4842",
                  lineHeight: 1.5,
                  fontSize: `${0.75}rem`,
                  textAlign: "left",
                  mt: theme.spacing(0.2),
                  mx: theme.spacing(2),
                  mb: 0,
                }}
              >
                {errors.acceptTerms}
              </Box>
            ) : null}
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
            Register
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
              Sign Up
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

export default RegisterForm;
