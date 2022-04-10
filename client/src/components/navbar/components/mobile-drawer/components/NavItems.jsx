import React, { useState, useEffect } from "react";
import { ListItemButton, ListItemText } from "@mui/material";
import { useTheme } from "@mui/system";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../../../stores/authentication";

const MobileDrawerNavItems = () => {
  const [navItems, setNavItems] = useState([]);
  const theme = useTheme();
  const navigate = useNavigate();

  const { currentUser } = useAuthStore((state) => ({
    currentUser: state.currentUser,
  }));

  const authItems = [
    { name: "Home", url: "/" },
    { name: "Currencies", url: "/currencies" },
    { name: "Portfolio", url: "/portfolios" },
    { name: "Watchlist", url: "/watchlists" },
    { name: "My Account", url: "/my-account" },
  ];

  const publicItems = [
    { name: "Home", url: "/" },
    { name: "Currencies", url: "/currencies" },
    { name: "Portfolio", url: "/portfolios" },
    { name: "Watchlist", url: "/watchlists" },
  ];

  useEffect(() => {
    setNavItems(!!currentUser ? authItems : publicItems);
  }, [currentUser]);

  return navItems.map((item) => {
    return (
      <ListItemButton
        key={item.name}
        onClick={() => navigate(item.url)}
        sx={{
          verticalAlign: "middle",
          display: "flex",

          padding: theme.spacing(1, 2.5),
          transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          height: 48,
          color: "rgb(99, 115, 129)",
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
