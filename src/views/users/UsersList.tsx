import { useEffect, useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import axiosClient from "../../utils/axiosClient";
import { useStateContext } from "../../contexts/ContextProvider";

export type User = {
  id: number;
  name: string;
  email: string;
  website: string;
};

const UsersList = () => {
  const { userList, setUserList } = useStateContext();

  useEffect(() => {
    axiosClient
      .get("/users")
      .then(({ data }) => {
        setUserList(data.data.users);
      })
      .catch((err) => console.error(err));
  }, []);

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
    ],
    []
  );

  const table = useMantineReactTable({
    data: userList,
    columns,
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActionMenuItems: ({ row }) => (
      <>
        <button
          className="w-full"
          onClick={() => console.log(row.original?.id)}
        >
          Edit
        </button>
        <button className="w-full">Delete</button>
      </>
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
