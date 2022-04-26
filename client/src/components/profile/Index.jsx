import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import UserProfileBasicInfo from "./basic-info/Index";
import UserProfileBasicInfoImage from "./basic-info/components/Image";
import UserProfileDelete from "./delete/Index";

const UserProfileView = () => {
  const theme = useTheme();
  const { t } = useTranslation();

  return (
    <>
      {/** Hero */}
      <Box
        className="hero"
        sx={{
          pt: theme.spacing(12),
          pb: theme.spacing(15),
          bgcolor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h4"
            component="div"
            sx={{
              mb: theme.spacing(0.6),
              py: theme.spacing(5),
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            {t("Account")}
          </Typography>
        </Container>
      </Box>

      {/** Settings */}
      <Box sx={{ mt: -8, pb: 1 }}>
        <Container maxWidth="md">
          <UserProfileBasicInfo />

          <UserProfileDelete />
        </Container>
      </Box>
    </>
  );
};

export default UserProfileView;
