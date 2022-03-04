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
  const [next, setNext] = useState(false);
  const [prev, setPrev] = useState(true);
  const [limit, setLimit] = useState(5);
  const [page, setPage] = useState(1);
  // let page = 1;
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

      // const fetchDevice = await axios.get(
      //   `${process.env.REACT_APP_DEVICE_URL}/devices`,
      //   config
      // );
      // console.log(fetchDevice);
      // setDevices(fetchDevice.data.result);
      // if (!fetchDevice.data.previous) setPrev(true);
      // if (!fetchDevice.data.next) setNext(true);

      const fetchDevice = await axios.get(
        `${process.env.REACT_APP_DEVICE_URL}/devices?page=${page}&limit=${limit}`,
        config
      );
      setDevices(fetchDevice.data.result);
      if (!fetchDevice.data.previous) setPrev(true);
      else setPrev(false);
      if (!fetchDevice.data.next) setNext(true);
      else setNext(false);
    } catch (error) {
      console.log("from dash board", error);
    }
  };

  const handleNext = async () => {
    setPage(page + 1);
  };
  const handlePrev = async () => {
    setPage(page - 1);
  };

  // if no valid user the user will be redirected to a login page
  useEffect(() => {
    fetchUserAndDevice();
    if (!token) {
      navigate("/login");
    }
  }, [devices]);

  const props = {
    user,
    devices,
    setDevices,
    handleNext,
    handlePrev,
    next,
    prev,
    page,
    limit,
    setLimit,
  };
  return (
    <dashboardPage.Provider value={props}>
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
