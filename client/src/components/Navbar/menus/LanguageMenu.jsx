import React, { useState } from "react";
import { languages } from "../../../assets/i18n/languages";
import { useLanguageStore } from "../../../stores";
import shallow from "zustand/shallow";
import { Button, Menu, MenuItem } from "@mui/material";

const LanguageMenu = () => {
  const [data, setData] = useState([...languages]);
  const [isOpen, setIsOpen] = useState(false);
  const { selected, update } = useLanguageStore(
    (state) => ({ selected: state.selected, update: state.update }),
    shallow
  );

  const handleSelect = (value) => {
    update(value);
    setIsOpen(false);
  };

  return (
    <>
      <Button
        id="basic-button"
        aria-controls={isOpen ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={isOpen ? "true" : undefined}
        onClick={() => setIsOpen(true)}
      >
        {selected}
      </Button>
      <Menu
        id="basic-menu"
        open={isOpen}
        onClose={setIsOpen(false)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {data.map((e, i) => (
          <MenuItem key={i} onClick={handleSelect(e.code?.toUpperCase())}>
            {e.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default LanguageMenu;
