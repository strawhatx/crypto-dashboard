import React from "react";
import { useTheme } from "@mui/system";
import { Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import { matchPath, useLocation } from "react-router-dom";

const NavbarNavItems = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const theme = useTheme();

  const match = (path) =>
    path ? !!matchPath({ path, exact: true }, pathname) : false;

  const navItems = [
    { name: "Home", url: "/" },
    { name: "Currencies", url: "/currencies" },
    { name: "Portfolio", url: "/portfolios" },
    { name: "Watchlist", url: "/watchlists" },
  ];

  return navItems.map((item, index) => {
    const isActive = match(item.url);

    return (
      <Link
        key={item.name}
        href={item.url}
        sx={{
          ml: index > 0 ? 4 : 0,
          padding: theme.spacing(0.5, 1.5, 0.5, 2.5),
          textDecoration: "none",
          borderRadius: 5,
          backgroundColor: isActive ? theme.palette.secondary.main : "inherit",
          color: isActive ? theme.palette.secondary.contrastText : "inherit",
          cursor: "pointer",
          fontWeight: 500,
          lineHeight: 1.85714,
          fontSize: 14,
          display: "flex",
          position: "relative",
          alignItems: "center",
          transition: "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          "&:before": {
            content: '""',
            position: "absolute",
            width: isActive ? "10px" : 0,
            borderRadius: 5,
            height: "10px",
            left: 6,
            backgroundColor: theme.palette.secondary.contrastText,
            visibility: isActive ? "visible" : "hidden",
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        {t(item.name)}
      </Link>
    );
  });
};

export default NavbarNavItems;
