// components/login/components/form.js

import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AuthContext from "contexts/auth-context";
import { setAuthToken } from "config/axios";

const LoginForm = ({ history }) => {
  // login method for loggin in the user
  // schema for validation
  const { login, currentUser } = useContext(AuthContext);

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password shold be at least 6 characters!")
      .uppercase("Password must contain at least 1 uppercase!")
      .required("Password is required"),
    rememberMe: Yup.boolean(),
  });

  //the form using formik to handle the submission
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        rememberMe: false,
      }}
      validationSchema={schema}
      onSubmit={async (values) => {
        await login({
          email: values.email,
          password: values.password,
          rememberMe: values.rememberMe || false,
        })
          .then(() => {
            setAuthToken(currentUser);
          })
          .then(() => {
            history.push("/dashboard");
          })
          .catch((error) => console.log(error));
      }}
    >
      {({ errors, touched }) => (
        <Form>
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
            <div className="flex justify-between">
              <label
                className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                htmlFor="password"
              >
                Password
              </label>
              <a
                href="/auth/forgot-password"
                className="text-xs text-gray-500 dark:text-gray-300 hover:underline"
              >
                Forgot Password?
              </a>
            </div>
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
            <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">
              <Field type="checkbox" name="rememberMe" />
              Remember Me
            </label>
          </div>

          <div className="mt-8">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              type="submit"
            >
              Login
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
