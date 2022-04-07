import React from "react";
import { Box, Container } from "@mui/material";
import LoginForm from "../../../components/authentication/Login";

const Login = () => {
  return (
    <>
      <Box sx={{ py: 10 }}>
        <Container maxWidth="xs">
          <LoginForm />
        </Container>
      </Box>
    </>
  );
};

export default Login;
