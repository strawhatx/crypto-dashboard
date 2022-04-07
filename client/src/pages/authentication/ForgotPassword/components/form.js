// components/forgotpassword/components/form.js

import React, { useContext } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AuthContext from "contexts/auth-context";

const ForgotPasswordForm = ({ history }) => {
  // requestPasswordReset method for loggin in the user
  // schema for validation
  const { requestPasswordReset } = useContext(AuthContext);

  const schema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  //the form using formik to handle the submission
  return (
    <Formik
      initialValues={{
        email: "",
      }}
      validationSchema={schema}
      onSubmit={async (values) => {
        await requestPasswordReset(values.email)
          .then((res) => {
            console.log(res);
            console.log("User logged-in successfully!");

            //set the auth token AuthService.setToken(res.data.token);
            return history.push("/auth/login");
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

          <div className="mt-8">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
              type="submit"
            >
              Forgot password
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ForgotPasswordForm;
