// modules
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

// material
import { styled } from "@mui/material/styles";
import { Button, Card, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// components
import { ReactComponent as DashboardPageImage } from "../../assets/images/dashboardPage.svg";

// importing context from parent page
import { dashboardPage } from "../../page/Dashboard";
import { AlertProvider } from "../../App";

// ----------------------------------------------------------------------

// A styled block from material UI
const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "left",
  padding: theme.spacing(5, 2),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter,
  position: "relative",
  display: "flex",
  justifyContent: "space-between",
}));

// ----------------------------------------------------------------------

export default function Intro() {
  const { user, devices } = useContext(dashboardPage);
  const { alertMessage, alertOpen } = useContext(AlertProvider);
  const { open, setOpen } = alertOpen;
  const { message, setMessage } = alertMessage;

  // used for navigate to another page also can pass data
  const navigate = useNavigate();

  // function which blocks when device count is more than or equal to 10
  const handleAdd = () => {
    if (devices.length >= 10) {
      setMessage({
        status: 400,
        info: "The number of device has already been reached the limit",
      });
      setOpen(true);
      return;
    }
    navigate("/dashboard/deviceform");
  };

  return (
    <>
      <RootStyle>
        <Typography
          variant="subtitle2"
          sx={{ textTransform: "capitalize", opacity: 0.72, fontSize: "20px" }}
        >
          Hi {user.firstName} {user.lastName},
          <Typography
            variant="subtitle2"
            sx={{ opacity: 0.72, fontSize: "15px" }}
          >
            Welcome Back
          </Typography>
        </Typography>
        <DashboardPageImage
          style={{ float: "right", width: "40%", height: "40%" }}
        />
        <Button
          sx={{
            width: "auto",
            height: "2.5rem",
            alignSelf: "flex-end",
          }}
          variant="contained"
          onClick={handleAdd}
        >
          <AddIcon /> Add Device
        </Button>
      </RootStyle>
    </>
  );
}
