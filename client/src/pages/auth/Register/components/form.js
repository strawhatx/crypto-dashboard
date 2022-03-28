// components/register/components/form.js

import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AuthContext from "contexts/auth-context";
import { axios } from "config/axios";

export const RegisterForm = ({ history }) => {
  const { register } = useContext(AuthContext);

  const schema = Yup.object().shape({
    displayName: Yup.string()
      .min(2, "Too Short!")
      .max(50, "Too Long!")
      .required("Display Name required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    acceptTerms: Yup.bool().oneOf(
      [true],
      "Accept Terms & Conditions is required"
    ),
    password: Yup.string()
      //.min(6, "Password should be at least 6 characters!")
      //.uppercase("Password must contain at least 1 uppercase!")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password Confirmation is required"),
  });

  return (
    <Formik
      initialValues={{
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        acceptTerms: false,
      }}
      validationSchema={schema}
      onSubmit={(values) => {
        register({
          displayName: values.displayName,
          email: values.email,
          password: values.password,
        })
          .then(async (response) => {
            console.log(response);
            await axios.post("/accounts/", {
              uid: response.user.uid,
              email: response.user.email,
              displayName: values.displayName,
              role: "Free",
            });
          })
          .then(async (response) => {
            //set the auth token AuthService.setToken(res.data.token);
            history.push("/auth/login");
          })
          .catch((error) => {
            console.log(error);
          });
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="displayName"
            >
              Display Name
            </label>
            <Field
              name="displayName"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="text"
            />

            {errors.displayName && touched.displayName ? (
              <div>{errors.displayName}</div>
            ) : null}
          </div>

          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="email"
            >
              Email Address
            </label>
            <Field
              name="email"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="email"
            />

            {errors.email && touched.email ? <div>{errors.email}</div> : null}
          </div>

          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="password"
            >
              Password
            </label>

            <Field
              name="password"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="password"
            />

            {errors.password && touched.password ? (
              <div>{errors.password}</div>
            ) : null}
          </div>

          <div className="mt-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>

            <Field
              name="confirmPassword"
              className="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
              type="password"
            />

            {errors.confirmPassword && touched.confirmPassword ? (
              <div>{errors.confirmPassword}</div>
            ) : null}
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              <Field type="checkbox" name="acceptTerms" /> I Accept the terms
              and conditions.
            </label>

            {errors.acceptTerms && touched.acceptTerms ? (
              <div>{errors.acceptTerms}</div>
            ) : null}
          </div>

          <div className="mt-8">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              type="submit"
            >
              Sign up
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
