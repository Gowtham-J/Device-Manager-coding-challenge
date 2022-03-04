import React, { useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

// importing context api
import { dashboardPage } from "../../../page/Dashboard";

export default function DeviceLimit() {
  const { limit, setLimit } = useContext(dashboardPage);

  const handleChange = (event) => {
    setLimit(event.target.value);
  };

  return (
    <Box sx={{ minWidth: 8 }}>
      <FormControl fullWidth size="small">
        <InputLabel id="demo-simple-select-label">Limit</InputLabel>
        <Select
          size="small"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={limit}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={5}>Five</MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
