import { filter } from "lodash";
import { sentenceCase } from "change-case";
import { useEffect, useState } from "react";
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
  TablePagination,
  Link,
  Button,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// components
import Page from "../../page/Page";
import Label from "../../page/Label";
import Scrollbar from "../../page/Scrollbar";
import {
  UserListHead,
  UserListToolbar,
  UserMoreMenu,
} from "../../../components/devices";
//
import Alerts from "../../alerts/alerts";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "deviceId", label: "Device ID", alignRight: false },
  { id: "model", label: "Model", alignRight: false },
  { id: "status", label: "Status", alignRight: false },
  { id: "lastCheckedInBy", label: "Last CheckedOut By", alignRight: false },
  { id: "" },
];

// ----------------------------------------------------------------------

export default function DeviceTable({ devices, user, setDevices }) {
  const navigate = useNavigate();
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [message, setMessage] = useState({});
  const [alertOpen, setAlertOpen] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleClick = async (id) => {
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
              order={order}
              orderBy={orderBy}
              headLabel={TABLE_HEAD}
              onRequestSort={handleRequestSort}
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
                      <UserMoreMenu
                        setAlertOpen={setAlertOpen}
                        alertOpen={alertOpen}
                        setMessage={setMessage}
                        setDevices={setDevices}
                        deviceId={row.id}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
      <Alerts open={alertOpen} message={message} setOpen={setAlertOpen} />
    </Container>
  );
}
