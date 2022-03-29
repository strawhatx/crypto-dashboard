import React, { useState } from "react";
import { Box, Typography, Avatar } from "@mui/material";
import { useTheme } from "@mui/system";
import BasicDialog from "../dialog/Index";
import { useAuthStore } from "../../stores/authentication";
import { Notification } from "../Notification";

const Login = () => {
  const [message, setMessage] = useState({});
  const theme = useTheme();

  const { login } = useAuthStore((state) => ({ login: state.login }));

  return (
    <>
      <BasicDialog
        btnTitle="Login"
        type="login"
        size="xs"
        children={
          <Box sx={{ pb: theme.spacing(5) }}>
            <Avatar src="logo" alt="logo" width={24} height={24} />
            <Typography variant="h4">Login</Typography>
            <Typography variant="p" sx={{ pb: theme.spacing(2) }}>
              To start using CryptoWatch
            </Typography>

            {message && (
              <Notification
                title={message.title}
                color={message.color}
                message={message.text}
              />
            )}

            <Box></Box>

            <Box></Box>
          </Box>
        }
      />
    </>
  );
};

export default Login;
