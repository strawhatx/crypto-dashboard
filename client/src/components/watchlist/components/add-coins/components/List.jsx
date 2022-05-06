import React, { useState } from "react";
import { useTheme } from "@mui/system";
import { Button, Box, Grid, Typography, Pagination } from "@mui/material";
import PropType from "prop-types";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Checkbox from "@mui/material/Checkbox";
import Avatar from "@mui/material/Avatar";

const WatchlistAddCoinsList = ({ currencies }) => {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {currencies.map((coin, index) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <ListItem
            key={coin.uuid}
            secondaryAction={
              <Checkbox
                edge="end"
                onChange={handleToggle(index)}
                checked={checked.indexOf(index) !== -1}
                inputProps={{ "aria-labelledby": labelId }}
              />
            }
            disablePadding
          >
            <ListItemButton>
              <ListItemAvatar>
                <Avatar
                  src={coin.iconUrl}
                  alt="currency-tag"
                  width={40}
                  height={40}
                  style={{ marginRight: "1rem" }}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`${coin.name}`} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

WatchlistAddCoinsList.propType = {
  currencies: PropType.array,
};

export default WatchlistAddCoinsList;
