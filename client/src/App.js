import React, { useEffect, useLayoutEffect, useState } from "react";
// --- moment
import Moment from "react-moment";
import "moment-timezone";

import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

import logo from "./assets/logo.svg";
import "./assets/App.css";
import Router from "./routes";
import Navbar from "./components/navbar/navbar";
import Cookies from "js-cookie";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [validate, setValidate] = useState(false);
  const [user, setUser] = useState("");

  // const fetchUser = async () => {
  //   const token = await Cookies.get("jwt");

  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Access-Control-Allow-Credentials": true,
  //       jwt: token,
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   try {
  //     const user = await axios.get(
  //       `${process.env.REACT_APP_DEVICE_URL}/users/currentuser`,
  //       config
  //     );
  //     setUser(user.data.currentUser);
  //   } catch (error) {
  //     console.log(error.response);
  //     navigate("/login");
  //   }
  // };

  // useEffect(() => {
  //   fetchUser();
  //   // if (!fact) {
  //   //   navigate("/login");
  //   // }
  // }, []);

  // useLayoutEffect(() => {
  //   console.log("Layout effect");
  // }, [validate]);
  // useEffect(() => {
  //   const cookie = Cookies.get("jwt");
  //   console.log("effect", cookie);
  //   if (cookie) setValidate(true);
  //   else setValidate(false);
  // }, [validate]);
  return (
    <ThemeConfig>
      {/* <Navbar user={user} /> */}
      <GlobalStyles />
      <Router />
    </ThemeConfig>
  );
}

export default App;
