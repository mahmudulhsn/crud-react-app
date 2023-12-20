import { Link, NavLink, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../utils/axiosClient";
import { useEffect } from "react";
import Toast from "../components/Toast";

const DashboardLayout = () => {
  const { userToken, setCurrentUser, setUserToken } = useStateContext();

  const logout = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axiosClient
      .post("logout")
      .then(() => {
        setCurrentUser({});
        setUserToken(null);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axiosClient
      .get("/me")
      .then(({ data }) => {
        setCurrentUser(data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!userToken) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <>
      <div className="bg-gray-200 min-h-screen w-full">
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link
              to="/dashboard/users"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                Dashboard
              </span>
            </Link>

            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    to="/dashboard/users"
                    className={({ isActive }) =>
                      `block py-2 px-3   rounded md:bg-transparent ${
                        isActive ? "text-blue-700" : "text-gray-900"
                      } md:p-0 md:dark:text-blue-500`
                    }
                    aria-current="page"
                  >
                    Users
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard/address-books"
                    className={({ isActive }) =>
                      `block py-2 px-3   rounded md:bg-transparent ${
                        isActive ? "text-blue-700" : "text-gray-900"
                      } md:p-0 md:dark:text-blue-500`
                    }
                  >
                    Address Books
                  </NavLink>
                </li>

                <li>
                  <a
                    href="#"
                    onClick={(event) => logout(event)}
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Outlet />
          <Toast />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
