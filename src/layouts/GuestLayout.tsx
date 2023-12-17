import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";

const GuestLayout = () => {
  const { userToken } = useStateContext();

  if (userToken) {
    return <Navigate to="/dashboard/users/list" />;
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <Outlet />
      </section>
    </>
  );
};

export default GuestLayout;
