import React from "react";
import { Box, Container } from "@mui/material";
import ForgotPasswordView from "../../components/forgot-password/Index";

const ForgotPassword = () => {
  return (
    <>
      <Box sx={{ py: 10 }}>
        <Container maxWidth="xs">
          <ForgotPasswordView />
        </Container>
      </Box>
    </>
  );
};

export default ForgotPassword;
