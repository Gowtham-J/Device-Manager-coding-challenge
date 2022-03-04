import { useContext } from "react";
// material
import { TableRow, TableCell, Button, TableFooter } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

// importing context from parent page
import { dashboardPage } from "../../../page/Dashboard";

const FooterTable = () => {
  const { handleNext, handlePrev, next, prev, page } =
    useContext(dashboardPage);

  return (
    <TableFooter>
      <TableRow>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell></TableCell>
        <TableCell>Page: {page}</TableCell>
        <TableCell>
          <Button variant="text" onClick={handlePrev} disabled={prev}>
            <ArrowBackIosIcon fontSize="string" />
            Prev
          </Button>{" "}
          <Button variant="text" onClick={handleNext} disabled={next}>
            Next
            <ArrowForwardIosIcon fontSize="string" />{" "}
          </Button>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};

export default FooterTable;
