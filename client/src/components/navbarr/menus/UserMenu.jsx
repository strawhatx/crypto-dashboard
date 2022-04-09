import React from "react";
import useAuthStore from "../../../stores/authentication";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import { useTheme } from "@mui/system";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const theme = useTheme();

  const navigate = useNavigate();

  const { currentUser, logout } = useAuthStore((state) => ({
    currentUser: state.currentUser,
    logout: state.logout,
  }));

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        id="user-menu-button"
        color="primary"
        aria-controls={open ? "user-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{
          display: "inline-flex",
          backgroundColor: "transparent",
          border: 0,
          padding: 1,
          transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          color: "inherit",
          ml: 2,
        }}
      >
        <Avatar
          src={currentUser?.photoURL}
          alt={currentUser?.displayName}
          sx={{ width: 30, height: 30 }}
        />
      </IconButton>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiPaper-root": {
            px: theme.spacing(1),
            width: 220,
            boxShadow: "rgb(145 158 171 / 30%) -24px 24px 72px -8px",
            border: "1px solid",
            borderColor: "rgba(145, 158, 171, 0.08)",
          },
        }}
      >
        <MenuItem
          onClick={() => navigate("/my-account")}
          sx={{
            my: theme.spacing(1),
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            minHeight: 48,
            whiteSpace: "nowrap",
            lineHeight: 1.85714,
            fontSize: 14,
            padding: theme.spacing(1),
            borderRadius: 1,
          }}
        >
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => navigate("/my-account")}
          sx={{
            my: theme.spacing(1),
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            minHeight: 48,
            whiteSpace: "nowrap",
            lineHeight: 1.85714,
            fontSize: 14,
            padding: theme.spacing(1),
            borderRadius: 1,
          }}
        >
          My account
        </MenuItem>
        <MenuItem
          onClick={() => logout()}
          sx={{
            my: theme.spacing(1),
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            minHeight: 48,
            whiteSpace: "nowrap",
            lineHeight: 1.85714,
            fontSize: 14,
            padding: theme.spacing(1),
            borderRadius: 1,
          }}
        >
          Sign out
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
