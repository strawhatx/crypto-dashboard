import React, { useState } from "react";
import {
  Box,
  Icon,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import eyeFill from "@iconify/icons-eva/eye-fill";
import eyeOffFill from "@iconify/icons-eva/eye-off-fill";
import useAuthStore from "../../../../stores/authentication";

const UserProfileChangePasswordView = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { update } = useAuthStore((state) => ({
    update: state.updatePassword,
  }));

  const initialValues = { password: "" };

  const schema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password shold be at least 6 characters!")
      .uppercase("Password must contain at least 1 uppercase!")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      await update(values.password) //, values.rememberMe || false)
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

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{ display: "flex", mt: 4, alignItems: "center", width: "100%" }}
        >
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? "text" : "password"}
            label="Password"
            {...getFieldProps("password")}
            sx={{ margin: "0px 24px 0px 0px", flexGrow: 1 }}
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
          <LoadingButton
            size="large"
            type="submit"
            variant="text"
            loading={isSubmitting}
          >
            Edit
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
};

export default UserProfileChangePasswordView;
