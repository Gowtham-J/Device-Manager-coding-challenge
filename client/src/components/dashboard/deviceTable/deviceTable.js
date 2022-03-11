import { useState, useContext } from "react";
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Button,
  TableFooter,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// modules
import { useNavigate } from "react-router-dom";
import axios from "axios";
// components
import { UserListHead, UserMoreMenu } from "../../../components/devices";
import Label from "../../page/Label";
import FooterTable from "./footerTable";

// importing context from parent page
import { dashboardPage } from "../../../page/Dashboard";

// ----------------------------------------------------------------------
// Table header for device logs
const TABLE_HEAD = [
  { id: "deviceId", label: "Device ID", alignRight: false, sort: false },
  { id: "device", label: "Model", alignRight: false, sort: true },
  { id: "deviceStatus", label: "Status", alignRight: false, sort: false },
  {
    id: "lastCheckedOutBy",
    label: "Last CheckedOut By",
    alignRight: false,
    sort: true,
  },
  { id: "", sort: false },
];

// ----------------------------------------------------------------------

export default function DeviceTable() {
  const navigate = useNavigate();
  const { user, devices, setDevices } = useContext(dashboardPage);
  const [order, setOrder] = useState("ASC");

  console.log(devices);
  const handleSorting = (col) => {
    if (order === "ASC") {
      const sorted = [...devices].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setDevices(sorted);
      setOrder("DSC");
    }
    if (order === "DSC") {
      const sorted = [...devices].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setDevices(sorted);
      setOrder("ASC");
    }
  };

  const handleClick = async (id) => {
    // fetching devices by Id
    const response = await axios.get(
      `${process.env.REACT_APP_DEVICE_URL}/devices/${id}`
    );
    navigate("/dashboard/info", { state: { model: response.data, user } });
  };

  return (
    <Container>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        mb={5}
      >
        <Typography variant="h4" gutterBottom>
          Device logs
        </Typography>
      </Stack>

      <Card>
        <TableContainer sx={{ minWidth: 800 }}>
          <Table>
            <UserListHead
              handleSorting={handleSorting}
              headLabel={TABLE_HEAD}
            />
            <TableBody>
              {devices.map((row) => {
                return (
                  <TableRow hover key={row.id}>
                    <TableCell component="th" scope="row" padding="none">
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ padding: "0 15px" }}
                      >
                        #{row.id}
                        <Typography variant="subtitle2" noWrap></Typography>
                      </Stack>
                    </TableCell>
                    <TableCell
                      sx={{ textTransform: "capitalize" }}
                      align="left"
                    >
                      {row.device}
                    </TableCell>
                    <TableCell
                      sx={{ textTransform: "capitalize" }}
                      align="left"
                    >
                      <Label
                        variant="ghost"
                        color={
                          (row.isCheckedOut === true && "error") || "success"
                        }
                      >
                        {row.isCheckedOut === false
                          ? "checked-in"
                          : "checked-out"}
                      </Label>
                    </TableCell>
                    <TableCell
                      sx={{ textTransform: "capitalize" }}
                      align="left"
                    >
                      {row.lastCheckedOutBy}
                    </TableCell>
                    <TableCell
                      sx={{ textTransform: "capitalize" }}
                      align="left"
                    >
                      <Button onClick={() => handleClick(row.id)}>
                        view
                        <ArrowForwardIcon fontSize="small" />{" "}
                      </Button>
                    </TableCell>

                    <TableCell align="right">
                      <UserMoreMenu deviceId={row.id} />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
            <FooterTable />
          </Table>
        </TableContainer>
      </Card>
    </Container>
  );
}
