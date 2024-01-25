import { Navigate, createBrowserRouter } from "react-router-dom";

import Dashboard from "@/pages/admin/dashboard/dashboard";
import Loader from "@/components/ui/Loader";
import { useSelector } from "react-redux";
import Login from "@/pages/auth/Login";
import PageNotFound from "@/pages/404";
const { loginStatus } = useSelector((state: any) => state.user);
export const router = createBrowserRouter([
  {
    path: "/",
    element: loginStatus ? <Dashboard /> : <Navigate to={"/login"} />,
    loader: Loader,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/users",
        element: <Dashboard />,
      },
      {
        path: "/pickers",
        element: <Dashboard />,
      },
    ],
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
