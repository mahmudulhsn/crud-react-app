import GuestLayout from "./layouts/GuestLayout";
import Login from "./views/Login";
import UsersList from "./views/users/UsersList";
import DashboardLayout from "./layouts/DashboardLayout";
import CreateUser from "./views/users/CreateUser";
import { createBrowserRouter } from "react-router-dom";
import EditUser from "./views/users/EditUser";
import AddressBooksList from "./views/addressBooks/AddressBooksList";
import CreateAddressBook from "./views/addressBooks/CreateAddressBook";
import EditAddressBook from "./views/addressBooks/EditAddressBook";

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
      {
        path: "users/edit/:userId",
        element: <EditUser />,
      },
      {
        path: "address-books",
        element: <AddressBooksList />,
      },
      {
        path: "address-books/create",
        element: <CreateAddressBook />,
      },
      {
        path: "address-books/edit/:addressBookId",
        element: <EditAddressBook />,
      },
    ],
  },
]);

export default router;
