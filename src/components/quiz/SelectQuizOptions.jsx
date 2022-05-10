import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

const SelectQuizOptions = ({ id, text, value, onChange, items, color }) => {
  return (
    <FormControl
      sx={{ maxWidth: 350 }}
      margin="normal"
      color={color ? color : "primary"}
    >
      <InputLabel id={id}>{text}</InputLabel>
      <Select id={id} value={value} label={text} onChange={onChange}>
        {items.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.text}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectQuizOptions;
