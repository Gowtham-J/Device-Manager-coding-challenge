import { Navigate, useRoutes } from "react-router-dom";

// layouts
import Login from "./page/Login";
import SignUp from "./page/SIgnUp";

import NotFound from "./page/Page404";

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
