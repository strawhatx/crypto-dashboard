import React from "react";
import { Box, Container } from "@mui/material";
import RegisterForm from "../../../components/authentication/Register";

const Register = () => {
  return (
    <>
      <Box sx={{ py: 10 }}>
        <Container maxWidth="xs">
          <RegisterForm />
        </Container>
      </Box>
    </>
  );
};

export default Register;
