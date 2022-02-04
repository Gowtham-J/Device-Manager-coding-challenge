// import { Icon } from "@iconify/react";
// import appleFilled from "@iconify/icons-ant-design/apple-filled";
// material
import { alpha, styled } from "@mui/material/styles";
import { Card, Typography, Box, Grid, Container, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import React from "react";
import Moment from "react-moment";
import axios from "axios";
import Cookies from "js-cookie";
import Alerts from "../components/alerts/alerts";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// import { config } from "../helper/HeaderConfigFile";
// import "moment-timezone";
// utils
// import { fShortenNumber } from "../../../utils/formatNumber";

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "left",
  padding: theme.spacing(5, 2),
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter,
  marginTop: "20px",
}));
const TypeStyle = styled(Typography)(({ theme }) => ({
  textTransform: "capitalize",
}));
const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.info.dark,
    0
  )} 0%, ${alpha(theme.palette.info.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

const TOTAL = 1352831;

export default function AppNewUsers() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { model, user } = state;
  const [errors, setErrors] = React.useState("");
  //   const token = sessionStorage.getItem("jwt");
  const [message, setMessage] = React.useState({});
  const [checkIn, setCheckIn] = React.useState(
    model.userId === user.id && model.isCheckedOut === false
  );
  const [open, setOpen] = React.useState(false);
  // const model = state.user;
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
      setErrors("");
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
      setErrors(error.response.data.errors[0].message);
    }
  };

  const handleBack = () => {
    navigate("/dashboard/app");
  };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={12}>
          <RootStyle>
            {/* <Typography variant="h3">{fShortenNumber(TOTAL)}</Typography> */}
            <Typography variant="subtitle1" sx={{ opacity: 0.72 }}>
              Device Manager
            </Typography>
            <Typography variant="p">
              Let us help you to view and control the current device
            </Typography>
            <Button
              onClick={handleBack}
              variant="contained"
              color="info"
              sx={{ float: "right" }}
            >
              <ArrowBackIcon /> To Dashboard
            </Button>
          </RootStyle>
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
                  // disabled={model.isCheckedOut ? false : true}
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
      <Alerts open={open} message={message} setOpen={setOpen} />
    </Container>
  );
}
