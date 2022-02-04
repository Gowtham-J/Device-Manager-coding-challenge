// import { Icon } from "@iconify/react";
// import androidFilled from "@iconify/icons-ant-design/android-filled";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

// material
import { alpha, styled } from "@mui/material/styles";
import { Button, Card, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// utils
// import { fShortenNumber } from "../../../utils/formatNumber";
import Alerts from "../alerts/alerts";
import { ReactComponent as DashboardPageImage } from "../../assets/images/dashboardPage.svg";

// ----------------------------------------------------------------------

// const buttonStyle = {
//   position: "relative",
//   right: "20px",
//   top: "275px",
//   margin: "1rem",
// };

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

const IconWrapperStyle = styled("div")(({ theme }) => ({
  margin: "auto",
  display: "flex",
  borderRadius: "50%",
  alignItems: "center",
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: "center",
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(
    theme.palette.primary.dark,
    0
  )} 0%, ${alpha(theme.palette.primary.dark, 0.24)} 100%)`,
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function Intro({ user, devices }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({});
  const navigate = useNavigate();
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
      <Alerts open={open} message={message} setOpen={setOpen} />
    </>
  );
}
