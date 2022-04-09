import React from "react";
import useAuthStore from "../../../stores/authentication";
import { useNavigate } from "react-router-dom";
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

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
    <div>
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
          fontSize: "1.5rem",
          padding: 1,
          transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
          color: "inherit",
        }}
      >
        <Avatar
          src={currentUser?.photoURL}
          alt={currentUser?.displayName}
          sx={{ ml: 2, width: 30, height: 30 }}
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
      >
        <MenuItem onClick={() => navigate("/my-account")}>Profile</MenuItem>
        <MenuItem onClick={() => navigate("/my-account")}>My account</MenuItem>
        <MenuItem onClick={() => logout()}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
