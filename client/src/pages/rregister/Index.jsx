import React from "react";
import { Box, Container } from "@mui/material";
import RegisterView from "../../components/register/Index";

const Register = () => {
  return (
    <>
      <Box sx={{ py: 10 }}>
        <Container maxWidth="xs">
          <RegisterView />
        </Container>
      </Box>
    </>
  );
};

export default Register;
