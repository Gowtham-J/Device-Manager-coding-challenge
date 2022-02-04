import { Navigate, useRoutes, Outlet } from "react-router-dom";
// layouts
// import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";
//
import Login from "./page/Login";
import SignUp from "./page/SIgnUp";
// import Register from "./pages/Register";
// import DashboardApp from "./pages/DashboardApp";
// import Products from "./pages/Products";
import NotFound from "./page/Page404";
// import Tickets from "./pages/Ticket";
// import Regards from "./pages/Regards";
// import OrderPlace from "./pages/OrderPlace";
// import Payment from "./pages/Payment";
// import OrderRegards from "./pages/OrderRegards";
// import Orders from "./pages/orders";
import { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./page/Dashboard";
import DeviceInfo from "./page/DeviceInfo";
import DeviceForm from "./page/DeviceForm";
import Navbar from "./components/navbar/navbar";
// ----------------------------------------------------------------------

export default function Router({ user }) {
  return useRoutes([
    {
      path: "/dashboard",
      element: <Navbar />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: "app", element: <Dashboard /> },
        { path: "info", element: <DeviceInfo /> },
        { path: "deviceform", element: <DeviceForm /> },
      ],
      // element: <Dashboard />,
      // children: [
      // { element: <Navigate to="/dashboard/app" replace /> },
      // { path: "app", element: <Dashboard /> },
      // { path: "orders", element: <Orders /> },
      // { path: "products", element: <Products /> },
      // { path: "products/orderPlace", element: <OrderPlace /> },
      // { path: "products/payment", element: <Payment /> },
      // { path: "products/payment/regards", element: <OrderRegards /> },
      // { path: "tickets", element: <Tickets /> },
      // { path: "tickets/regards", element: <Regards /> },
      // ],
    },
    {
      path: "/",
      children: [
        { path: "login", element: <Login /> },
        { path: "signup", element: <SignUp /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/dashboard/app" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
