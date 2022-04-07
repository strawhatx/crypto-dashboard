import React from "react";
import { Box, Container } from "@mui/material";
import ForgotPasswordForm from "../../../components/authentication/ForgotPassword";

const ForgotPassword = () => {
  return (
    <>
      <Box sx={{ py: 10 }}>
        <Container maxWidth="xs">
          <ForgotPasswordForm />
        </Container>
      </Box>
    </>
  );
};

export default ForgotPassword;
