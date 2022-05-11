import React from "react";
import { Box, Container } from "@mui/material";
import LoginView from "../../components/login/Index";

const Login = () => {
  return (
    <>
      <Box sx={{ py: 10 }}>
        <Container maxWidth="xs">
          <LoginView />
        </Container>
      </Box>
    </>
  );
};

export default Login;
