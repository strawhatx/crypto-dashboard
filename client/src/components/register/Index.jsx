import React, { useState } from "react";
import { Box, Typography, Card, CardHeader, CardContent } from "@mui/material";
import { useTheme } from "@mui/system";
import { Notification } from "../Notification";
import logo from "../../assets/images/logo.svg";
import RegisterForm from "./components/Form";

const RegisterView = () => {
  const [message, setMessage] = useState(null);
  const theme = useTheme();

  return (
    <>
      <Card>
        <CardHeader />
        <CardContent>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="span"
              sx={{
                width: theme.spacing(10),
                height: theme.spacing(10),
                backgroundImage: `url(${logo})`,
                backgroundSize: "100%",
                backgroundPosition: "center",
                boxShadow: "0px 3px 6px rgb(0 0 0 / 7%)",
                backgroundRepeat: "no-repeat",
                borderRadius: theme.spacing(12.4),
              }}
            ></Typography>
            <Typography
              variant="h6"
              sx={{ mt: theme.spacing(2), mb: theme.spacing(0.5) }}
            >
              Sign Up
            </Typography>
            <Typography
              variant="p"
              sx={{
                pb: theme.spacing(2),
                fontWeight: theme.typography.fontWeightMedium,
                color: theme.palette.grey[500],
              }}
            >
              To start using CryptoWatch
            </Typography>

            {message && (
              <Notification
                title={message.title}
                severity={message.severity}
                message={message.text}
              />
            )}

            <Box sx={{ width: "100%", pt: theme.spacing(1) }}>
              <RegisterForm setMessage={setMessage} />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default RegisterView;
