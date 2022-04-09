import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const LoginMenu = () => {
  const { t } = useTranslation();

  return (
    <>
      <Link
        to="/signin"
        style={{
          marginLeft: 16,
          textDecoration: "none",
          color: "inherit",
          cursor: "pointer",
          fontWeight: 500,
          lineHeight: 1.85714,
          fontSize: "0.875rem",
          display: "flex",
          position: "relative",
          alignItems: "center",
          transition: "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }}
      >
        {t("Sign in")}
      </Link>
      <Link
        to="/signup"
        style={{
          marginLeft: 16,
          textDecoration: "none",
          color: "inherit",
          cursor: "pointer",
          fontWeight: 500,
          lineHeight: 1.85714,
          fontSize: "0.875rem",
          display: "flex",
          position: "relative",
          alignItems: "center",
          transition: "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        }}
      >
        {t("Sign up")}
      </Link>
    </>
  );
};

export default LoginMenu;
