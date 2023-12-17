import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import GuestLayout from "./layouts/GuestLayout";
import Login from "./components/Login";
import UsersList from "./components/users/UsersList";
import DashboardLayout from "./layouts/DashboardLayout";
import CreateUser from "./components/users/CreateUser";

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
        path: "users",
        element: <UsersList />,
      },
      {
        path: "users/create",
        element: <CreateUser />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
