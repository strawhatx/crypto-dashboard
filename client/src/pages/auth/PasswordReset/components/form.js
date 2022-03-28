// components/passwordreset/components/form.js

import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AuthContext from "contexts/auth-context";
import { useLocation } from "react-router-dom";

const PasswordResetForm = ({ history }) => {
  // login method for loggin in the user
  // schema for validation
  const { passwordReset } = useContext(AuthContext);
  const location = useLocation();
  const search = location.search;
  const oobCode = new URLSearchParams(search).get("oobCode");
  const continueUrl = new URLSearchParams(search).get("continueUrl");
  const lang = new URLSearchParams(search).get("lang");

  const schema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password should be at least 6 characters!")
      //.uppercase("Password must contain at least 1 uppercase!")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password Confirmation is required"),
  });

  return (
    <Formik
      initialValues={{
        //email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={schema}
      onSubmit={async (values) => {
        await passwordReset(values.password, oobCode, continueUrl, lang)
          .then((res) => {
            console.log("complete");
            history.push("/auth/login");
          })
          .catch((error) => {
            console.log("fail");
            //history.push("/auth/login");
          });
      }}
    >
      {({ errors, touched }) => (
        <Form>
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

          <div className="mt-8">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              type="submit"
            >
              Reset Password
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default PasswordResetForm;
