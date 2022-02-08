import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import roundFilterList from "@iconify/icons-ic/round-filter-list";
// material
import { styled } from "@mui/material/styles";
import { Toolbar, Tooltip, IconButton, Typography } from "@mui/material";

// ----------------------------------------------------------------------
// A styled block from material UI
const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: "flex",
  justifyContent: "space-between",
  padding: theme.spacing(0, 1, 0, 3),
}));

// ----------------------------------------------------------------------
// assigning typeOf the value
UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar() {
  return (
    <RootStyle>
      <Typography component="div" variant="h4">
        Device
      </Typography>
      <Tooltip title="Filter list">
        <IconButton>
          <Icon icon={roundFilterList} />
        </IconButton>
      </Tooltip>
    </RootStyle>
  );
}
