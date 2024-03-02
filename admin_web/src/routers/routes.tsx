import { Navigate, createBrowserRouter } from "react-router-dom";

import Dashboard from "@/pages/admin/dashboard/dashboard";
import Loader from "@/components/ui/Loader";

import Login from "@/pages/auth/Login";
import PageNotFound from "@/pages/404";
import AppLayout from "@/layout/appLayout";
import Home from "@/pages/home";
import Location from "@/pages/admin/location";
import Picker from "@/pages/admin/picker";
import Analytic from "@/pages/admin/analytics";
const isLoggedin = true;
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    loader: Loader,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/centers",
        element: <Location />,
      },
      {
        path: "/pickers",
        element: <Picker />,
      },
      {
        path: "/analytics",
        element: <Analytic />,
      },
    ],
  },
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);
