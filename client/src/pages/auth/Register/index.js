// components/register/index.js

import React, { useEffect, useContext } from "react";
import AuthContext from "contexts/auth-context";
import { RegisterForm } from "components/Register/components/form";
import { Notification } from "components/_Shared/Notification";

const RegisterPage = ({ history }) => {
  const { registerMessage, setRegisterMessage } = useContext(AuthContext);
  const [message, setMessage] = React.useState(null);
  //const [referrer, setReferrer] = React.useState("auth");

  useEffect(() => {
    if (registerMessage) {
      setMessage(registerMessage);

      //remove the message after the display
      setRegisterMessage(null);
    }
  }, [registerMessage, setRegisterMessage]);

  return (
    <>
      <div className="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:min-w-2xl">
        <div className="w-full px-6 py-8 md:px-8">
          <p className="text-xl text-center text-gray-600 dark:text-gray-200">
            Register
          </p>

          {message && (
            <Notification
              color={message.color}
              message={message.text}
              close={false}
            />
          )}

          <RegisterForm history={history} />
          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <a
              href="/auth/login"
              className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
            >
              Sign in
            </a>

            <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
