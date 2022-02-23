// modules
import React, { useContext } from "react";
import Moment from "react-moment";
import axios from "axios";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
// material ui
import { styled } from "@mui/material/styles";
import { Card, Typography, Box, Grid, Container, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// Components
import Alerts from "../components/alerts/alerts";

// adding context
import { AlertProvider } from "../App";

// A styled block from material UI
// ----------------------------------------------------------------------
const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "left",
  padding: theme.spacing(5, 2),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter,
  marginTop: "20px",
}));

const RootStyleInactive = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "left",
  padding: theme.spacing(5, 2),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter,
  marginTop: "20px",
}));

const TypeStyle = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
}));

// ----------------------------------------------------------------------

export default function AppNewUsers() {
  const { state } = useLocation();
  const { model, user } = state;
  const navigate = useNavigate();
  // const [message, setMessage] = React.useState({});
  // context api
  const { alertMessage, alertOpen } = useContext(AlertProvider);
  const { open, setOpen } = alertOpen;
  const { message, setMessage } = alertMessage;
  // ----

  // A state to check wether the user is checked-in or not
  const [checkIn, setCheckIn] = React.useState(
    model.userId === user.id && model.isCheckedOut === false
  );
  // const [open, setOpen] = React.useState(false);

  // function to view the details of the device
  const handleClick = async () => {
    const token = await Cookies.get("jwt");
    const article = { title: "React PUT Request " };
    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
    };

    try {
      const currentUser = await axios.put(
        `${process.env.REACT_APP_DEVICE_URL}/devices/checkout/${model.id}`,
        article,
        { headers }
      );
      setCheckIn(!checkIn);
      if (checkIn) {
        setMessage({ status: 200, info: "User successfully checked-Out" });
      } else {
        setMessage({ status: 200, info: "User successfully checked-In" });
      }
      setOpen(true);
    } catch (error) {
      setMessage({ status: 400, info: error.response.data.errors[0].message });
      setOpen(true);
    }
  };

  // function which directs to a dashboard
  const handleBack = () => {
    navigate("/dashboard/app");
  };

  const header = (
    <>
      <Typography variant="subtitle1" sx={{ opacity: 0.72 }}>
        Device Manager
      </Typography>
      <Typography variant="p">
        Let us help you to view and control the current device
      </Typography>
      {model.status === "active" ? null : (
        <Typography component="p" color="text.secondary" variant="span">
          Check-in to re-activate the device
        </Typography>
      )}

      <Button
        onClick={handleBack}
        variant="contained"
        color="info"
        sx={{ float: "right" }}
      >
        <ArrowBackIcon /> To Dashboard
      </Button>
    </>
  );

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={12}>
          {model.status === "active" ? (
            <RootStyle>{header}</RootStyle>
          ) : (
            <RootStyleInactive>{header}</RootStyleInactive>
          )}
        </Grid>

        <Grid item xs={12} md={6} lg={12}>
          <Card>
            <Box sx={{ p: 5 }}>
              <Box sx={{ pb: 2, mt: 2 }}>
                <Typography color={"GrayText"} variant="h6">
                  Model Details
                </Typography>
              </Box>
              <Box sx={{ margin: "0 5rem" }}>
                <Typography variant="h3">{model.device}</Typography>
                <TypeStyle>
                  <Typography variant="subtitle1">
                    From: {model.manufacturer}
                  </Typography>
                  <Typography variant="subtitle1">os: {model.os}</Typography>
                  <Typography variant="subtitle1">
                    last checked out by: {model.lastCheckedOutBy}
                  </Typography>
                  <Typography variant="subtitle1">
                    last Checked Out Date:{" "}
                    <Moment
                      format="YYYY/MM/DD"
                      date={model.lastCheckedOutDate}
                    />
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color={model.status === "active" ? "#54D62C" : "error"}
                  >
                    Status: {model.status}
                  </Typography>
                </TypeStyle>
                <Button
                  sx={{ mt: 2 }}
                  variant="contained"
                  onClick={handleClick}
                  color={checkIn ? "error" : "primary"}
                >
                  {checkIn ? "Check out" : "Check In"}
                </Button>
              </Box>
            </Box>
          </Card>
        </Grid>
      </Grid>
      <Alerts />
    </Container>
  );
}
