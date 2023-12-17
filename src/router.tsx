import GuestLayout from "./layouts/GuestLayout";
import Login from "./views/Login";
import UsersList from "./views/users/UsersList";
import DashboardLayout from "./layouts/DashboardLayout";
import CreateUser from "./views/users/CreateUser";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <GuestLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "users/list",
        element: <UsersList />,
      },
      {
        path: "users/create",
        element: <CreateUser />,
      },
    ],
  },
]);

export default router;
