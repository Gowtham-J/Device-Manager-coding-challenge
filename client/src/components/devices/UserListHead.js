import PropTypes from "prop-types";
// material
import { visuallyHidden } from "@mui/utils";
import {
  Box,
  TableRow,
  TableCell,
  TableHead,
  TableSortLabel,
} from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
// components
import DeviceLimit from "./../dashboard/deviceTable/deviceLimit";
// ----------------------------------------------------------------------

// assigning typeOf the value
UserListHead.propTypes = {
  order: PropTypes.oneOf(["ASC", "DSC"]),
  orderBy: PropTypes.string,
  rowCount: PropTypes.number,
  headLabel: PropTypes.array,
  numSelected: PropTypes.number,
  onRequestSort: PropTypes.func,
  onSelectAllClick: PropTypes.func,
};

export default function UserListHead({ headLabel, handleSorting }) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? "right" : "left"}
            onClick={() => handleSorting(headCell.id)}
          >
            <TableSortLabel hideSortIcon>{headCell.label}</TableSortLabel>
            {headCell.sort ? (
              <CompareArrowsIcon
                color="disabled"
                fontSize="string"
                sx={{ transform: "rotate(90deg)" }}
              />
            ) : null}
          </TableCell>
        ))}
        <TableCell>
          <DeviceLimit />
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
