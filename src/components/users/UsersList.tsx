import { useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";

type User = {
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  city: string;
  state: string;
};

//nested data is ok, see accessorKeys in ColumnDef below
const data: User[] = [
  {
    name: {
      firstName: "Zachary",
      lastName: "Davis",
    },
    address: "261 Battle Ford",
    city: "Columbus",
    state: "Ohio",
  },
  {
    name: {
      firstName: "Robert",
      lastName: "Smith",
    },
    address: "566 Brakus Inlet",
    city: "Westerville",
    state: "West Virginia",
  },
  {
    name: {
      firstName: "Kevin",
      lastName: "Yan",
    },
    address: "7777 Kuhic Knoll",
    city: "South Linda",
    state: "West Virginia",
  },
  {
    name: {
      firstName: "John",
      lastName: "Upton",
    },
    address: "722 Emie Stream",
    city: "Huntington",
    state: "Washington",
  },
  {
    name: {
      firstName: "Nathan",
      lastName: "Harris",
    },
    address: "1 Kuhic Knoll",
    city: "Ohiowa",
    state: "Nebraska",
  },
  {
    name: {
      firstName: "Nathan",
      lastName: "Harris",
    },
    address: "1 Kuhic Knoll",
    city: "Ohiowa",
    state: "Nebraska",
  },
];

const UsersList = () => {
  const columns = useMemo<MRT_ColumnDef<User>[]>(
    () => [
      {
        accessorKey: "name.firstName", //access nested data with dot notation
        header: "First Name",
      },
      {
        accessorKey: "name.lastName",
        header: "Last Name",
      },
      {
        accessorKey: "address", //normal accessorKey
        header: "Address",
      },
      {
        accessorKey: "city",
        header: "City",
      },
      {
        accessorKey: "state",
        header: "State",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActionMenuItems: ({ row }) => (
      <>
        <button className="w-full">Edit</button>
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
