import React, { useState, useEffect } from "react";
import { ListItemButton, ListItemText } from "@mui/material";
import { useTheme } from "@mui/system";
import { matchPath, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "../../../../../stores/authentication";

const MobileDrawerNavItems = () => {
  const [navItems, setNavItems] = useState([]);
  const { pathname } = useLocation();
  const theme = useTheme();
  const navigate = useNavigate();

  const { currentUser } = useAuthStore((state) => ({
    currentUser: state.currentUser,
  }));

  const match = (path) =>
    path ? !!matchPath({ path, exact: true }, pathname) : false;

  const authItems = [
    { name: "Home", url: "/" },
    { name: "Currencies", url: "/currencies" },
    { name: "Watchlist", url: "/watchlists" },
    { name: "My Account", url: "/my-account" },
  ];

  const publicItems = [
    { name: "Home", url: "/" },
    { name: "Currencies", url: "/currencies" },
  ];

  useEffect(() => {
    setNavItems(!!currentUser ? authItems : publicItems);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return navItems.map((item) => {
    const isActive = match(item.url);

    return (
      <ListItemButton
        key={item.name}
        onClick={() => navigate(item.url)}
        sx={{
          verticalAlign: "middle",
          display: "flex",
          backgroundColor: isActive
            ? theme.palette.secondary.lighter
            : "inherit",
          color: isActive ? theme.palette.secondary.dark : "rgb(99, 115, 129)",
          padding: theme.spacing(1, 2.5),
          transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          fontWeight: isActive ? 500 : 400,
          height: 48,
        }}
      >
        <ListItemText
          primary={item.name}
          sx={{
            fontSize: 12,
            textTransform: "capitalize",
            fontWeight: 600,
            lineHeight: 1.85714,
          }}
        />
      </ListItemButton>
    );
  });
};

export default MobileDrawerNavItems;
