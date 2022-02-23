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
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
// modules
import { useNavigate } from "react-router-dom";
import axios from "axios";
// components
import { UserListHead, UserMoreMenu } from "../../../components/devices";
import Label from "../../page/Label";
import Alerts from "../../alerts/alerts";

// importing context from parent page
import { dashboardPage } from "../../../page/Dashboard";

// ----------------------------------------------------------------------
// Table header for device logs
const TABLE_HEAD = [
  { id: "deviceId", label: "Device ID", alignRight: false },
  { id: "model", label: "Model", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "lastCheckedInBy", label: "Last CheckedOut By", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

export default function DeviceTable() {
  const navigate = useNavigate();
  const { user, devices } = useContext(dashboardPage);

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
            <UserListHead headLabel={TABLE_HEAD} />
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
          </Table>
        </TableContainer>
      </Card>
      <Alerts />
    </Container>
  );
}
