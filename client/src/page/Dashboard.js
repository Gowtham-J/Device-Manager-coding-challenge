// modules
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// material
import { Box, Grid, Container } from "@mui/material";

// components
import Intro from "../components/dashboard/intro";
import DeviceTable from "../components/dashboard/deviceTable/deviceTable";
// ----------------------------------------------------------------------

export default function Dashboard() {
  // to fetch token from the browser
  const token = Cookies.get("jwt");
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [devices, setDevices] = useState([]);

  // Function to check the user is valid and show him the data in the application
  const fetchUser = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Credentials": true,
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const userData = await axios.get(
        `${process.env.REACT_APP_DEVICE_URL}/users/currentuser`,
        config
      );
      setUser(userData.data.currentUser);

      const fetchDevice = await axios.get(
        `${process.env.REACT_APP_DEVICE_URL}/devices`,
        config
      );
      setDevices(fetchDevice.data);
    } catch (error) {
      console.log("from dash board", error);
    }
  };

  // if no valid user the user will be redirected to a login page
  useEffect(() => {
    fetchUser();
    if (!token) {
      navigate("/login");
    }
  }, [devices.length]);
  return (
    <>
      <Container maxWidth="xl">
        <Box sx={{ pb: 5, mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <Intro devices={devices} user={user} />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <DeviceTable
                setDevices={setDevices}
                devices={devices}
                user={user}
              />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
}
