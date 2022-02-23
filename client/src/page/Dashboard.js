// modules
import { useEffect, useState, createContext } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

// material
import { Box, Grid, Container } from "@mui/material";

// components
import Intro from "../components/dashboard/intro";
import DeviceTable from "../components/dashboard/deviceTable/deviceTable";
// ----------------------------------------------------------------------

// Creating context
export const dashboardPage = createContext();

export default function Dashboard() {
  // to fetch token from the browser
  const token = Cookies.get("jwt");
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [devices, setDevices] = useState([]);
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Credentials": true,
      Authorization: `Bearer ${token}`,
    },
  };
  // Function to check the user is valid and show him the data in the application
  const fetchUserAndDevice = async () => {
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
    fetchUserAndDevice();
    if (!token) {
      navigate("/login");
    }
  }, [devices.length]);
  return (
    <dashboardPage.Provider
      value={{
        user,
        devices,
        setDevices,
      }}
    >
      <Container maxWidth="xl">
        <Box sx={{ pb: 5, mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <Intro />
            </Grid>
            <Grid item xs={12} md={6} lg={12}>
              <DeviceTable />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </dashboardPage.Provider>
  );
}
