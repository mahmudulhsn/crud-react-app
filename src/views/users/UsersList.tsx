import { useEffect, useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import axiosClient from "../../utils/axiosClient";
import { useStateContext } from "../../contexts/ContextProvider";
import { Link } from "react-router-dom";

export type User = {
  id: number;
  name: string;
  email: string;
  website: string;
  phone: string;
  gender: string;
  age: string;
  nationality: string;
  created_by: number;
};

const UsersList = () => {
  const { userList, setUserList, showToast } = useStateContext();

  const getUsers = () => {
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setUserList(data.data.users);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getUsers();
  }, []);

  const deleteUser = (userId: number) => {
    axiosClient
      .delete(`/users/${userId}`)
      .then(({ data }) => {
        showToast(data.message);
        getUsers();
      })
      .catch((err) => console.error(err));
  };

  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "website",
        header: "Website",
      },
      {
        accessorKey: "phone",
        header: "phone",
      },
      // {
      //   accessorKey: "gender",
      //   header: "gender",
      // },
      // {
      //   accessorKey: "age",
      //   header: "age",
      // },
      // {
      //   accessorKey: "nationality",
      //   header: "nationality",
      // },
      {
        accessorKey: "created_by",
        header: "created_by",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    data: userList,
    columns,
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActionMenuItems: ({ row }) => (
      <div className=" text-center">
        <Link
          to={`/dashboard/users/edit/${row.original.id}`}
          className="w-full"
        >
          Edit
        </Link>
        <button className="w-full" onClick={() => deleteUser(row.original.id)}>
          Delete
        </button>
      </div>
    ),
  });

  return (
    <div className="w-full">
      <h1 className="py-6 text-2xl">Users List</h1>
      <MantineReactTable table={table} />
    </div>
  );
};

export default UsersList;
