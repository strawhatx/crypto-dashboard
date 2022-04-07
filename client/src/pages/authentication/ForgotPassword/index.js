// components/forgotpassword/index.js

import React, { useEffect, useContext } from "react";
import AuthContext from "contexts/auth-context";
import ForgotPasswordForm from "components/ForgotPassword/components/form";
import { Notification } from "components/_Shared/Notification";

const ForgotPasswordPage = ({ history }) => {
  const { passwordResetMessage, setPasswordResetMessage } =
    useContext(AuthContext);
  const [message, setMessage] = React.useState(null);
  //const [referrer, setReferrer] = React.useState("auth");

  useEffect(() => {
    if (passwordResetMessage) {
      setMessage(passwordResetMessage);

      //remove the message after the display
      setPasswordResetMessage(null);
    }
  }, [passwordResetMessage, setPasswordResetMessage]);

  return (
    <>
      <div className="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-xl">
        <div className="w-full px-6 py-8 md:px-8">
          <p className="text-xl font-semibold text-center text-gray-600 dark:text-gray-200">
            Forgot password
          </p>

          {message && (
            <Notification
              color={message.color}
              message={message.text}
              close={false}
            />
          )}

          <ForgotPasswordForm history={history} />
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
