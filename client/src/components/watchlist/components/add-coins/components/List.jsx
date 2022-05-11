import React from "react";
import PropType from "prop-types";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Checkbox,
  Avatar,
  Chip,
  Button,
} from "@mui/material";
import { axios } from "../../../../../config/axios";
import useAuthStore from "../../../../../stores/authentication";
import { useWatchlistStore } from "../../../../../stores/app-settings";

const WatchlistAddCoinsList = ({ currencies }) => {
  const [checked, setChecked] = React.useState([]);

  const { currentUser } = useAuthStore((state) => ({
    currentUser: state.currentUser,
  }));

  const { setIsAddOpen, setResetNum } = useWatchlistStore((state) => ({
    setIsAddOpen: state.setIsAddOpen,
    setResetNum: state.setResetNum,
  }));

  const handleSubmit = async () => {
    await axios
      .post("/watchlists/addmany", {
        coins: checked,
      })
      .then(async () => {
        setChecked([]);
        setResetNum();
        setIsAddOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleToggle = (coin) => () => {
    const currentIndex = checked.findIndex((c) => c.name === coin.name);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(coin);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <>
      <List dense sx={{ width: "100%", mb: 2, bgcolor: "background.paper" }}>
        {currencies.map((coin, index) => {
          const labelId = `checkbox-list-secondary-label-${coin.uuid}`;
          return (
            <ListItem
              key={coin.uuid}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={handleToggle({
                    uid: currentUser?.uid,
                    cuuid: coin.uuid,
                    name: coin.name,
                    url: coin.iconUrl,
                  })}
                  checked={checked.some((c) => c.name === coin.name)}
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

      {checked?.map((coin, index) => {
        return (
          <Chip
            key={index}
            sx={{ mt: 0.5, mr: 0.5 }}
            avatar={<Avatar alt={coin?.name} src={coin?.url} />}
            label={coin.name}
            onDelete={handleToggle(coin)}
          />
        );
      })}

      <Button
        fullWidth
        size="large"
        variant="contained"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Add {checked?.length} Coins
      </Button>
    </>
  );
};

WatchlistAddCoinsList.propType = {
  currencies: PropType.array,
};

export default WatchlistAddCoinsList;
