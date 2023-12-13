import { Outlet } from "react-router-dom";

const GuestLayout = () => {
  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <Outlet />
      </section>
    </>
  );
};

export default GuestLayout;
