import React from "react";
import PropTypes from "prop-types";
import { Tabs, Tab, Box, Typography } from "@mui/material";
import TabPanel from "./Panel";
import { useTheme } from "@mui/system";

const NavTabs = ({ title, tabItems = [] }) => {
  const [value, setValue] = React.useState(0);

  const theme = useTheme();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: theme.spacing(1),
        }}
      >
        <Typography variant="h4">{title}</Typography>
        <Box
          sx={{
            height: "38px",
            width: theme.spacing(0.1),
            background: "rgb(216, 216, 216)",
            mx: theme.spacing(3.4),
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {tabItems.map((item, index) => (
              <Tab key={item.title} label={item.title} {...tabProps(index)} />
            ))}
          </Tabs>
        </Box>
      </Box>

      {tabItems.map((item, index) => (
        <TabPanel key={item.title} value={value} index={index}>
          {item.content}
        </TabPanel>
      ))}
    </Box>
  );
};

NavTabs.propTypes = {
  title: PropTypes.string.isRequired,
  tabItems: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      content: PropTypes.node,
    })
  ),
};

export default NavTabs;
