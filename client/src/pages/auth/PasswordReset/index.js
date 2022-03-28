// components/passwordreset/index.js

import React, { useEffect, useContext } from "react";
import AuthContext from "contexts/auth-context";
import PasswordResetForm from "components/PasswordReset/components/form";
import { Notification } from "components/_Shared/Notification";
import { useLocation } from "react-router-dom";

const PasswordResetPage = ({ history }) => {
  const { passwordResetMessage, setPasswordResetMessage, verifyPasswordReset } =
    useContext(AuthContext);
  const [message, setMessage] = React.useState(null);
  const location = useLocation();
  const search = location.search;
  const oobCode = new URLSearchParams(search).get("oobCode");

  document.addEventListener("DOMContentLoaded", () => {
    if (oobCode) {
      verifyPasswordReset(oobCode);
      console.log("router ready");
    }
  });

  useEffect(() => {
    if (passwordResetMessage) {
      setMessage(passwordResetMessage);

      //remove the message after the display
      setPasswordResetMessage(null);
    }
  }, [
    passwordResetMessage,
    setPasswordResetMessage,
    setMessage,
    oobCode,
    verifyPasswordReset,
  ]);

  return (
    <>
      <div className="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-2xl">
        <div className="w-full px-6 py-8 md:px-8">
          <p className="text-xl text-center text-gray-600 dark:text-gray-200">
            Reset password
          </p>

          {message && (
            <Notification
              color={message.color}
              message={message.text}
              close={false}
            />
          )}

          <PasswordResetForm history={history} />
        </div>
      </div>
    </>
  );
};

export default PasswordResetPage;
