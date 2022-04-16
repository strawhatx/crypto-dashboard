import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { useTheme } from "@mui/system";
import { useTranslation } from "react-i18next";
import NavTabs from "../tabs/Index";
import UserProfileBilling from "./components/billing/Index";
import UserProfileGeneral from "./components/general/Index";
import UserProfileNotifications from "./components/notifications/Index";
import UserProfileSecurity from "./components/security/Index";

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

        <Box>
          <Container maxWidth="md">
            <NavTabs
              title="settings"
              tabItems={[
                { title: "General", content: <UserProfileGeneral /> },
                { title: "Billing", content: <UserProfileBilling /> },
                {
                  title: "Notifications",
                  content: <UserProfileNotifications />,
                },
                { title: "Security", content: <UserProfileSecurity /> },
              ]}
            />
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default UserProfileView;
