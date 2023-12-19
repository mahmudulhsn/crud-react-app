import { useEffect, useMemo } from "react";
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef,
} from "mantine-react-table";
import axiosClient from "../../utils/axiosClient";
import { useStateContext } from "../../contexts/ContextProvider";
import { Link } from "react-router-dom";

export type AddressBook = {
  id: number;
  name: string;
  email: string;
  website: string;
  phone: string;
  gender: string;
  user: {
    id: string;
    name: string;
  };
  age: string;
  nationality: string;
  created_by: number;
};

const AddressBooksList = () => {
  const { addressBookList, setAddressBookList, showToast } = useStateContext();

  const getAddressBooks = () => {
    axiosClient
      .get("/address-books")
      .then(({ data }) => {
        setAddressBookList(data.data.addressBooks);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getAddressBooks();
  }, []);

  const deleteUser = (userId: number) => {
    axiosClient
      .delete(`/address-books/${userId}`)
      .then(({ data }) => {
        showToast(data.message);
        getAddressBooks();
      })
      .catch((err) => console.error(err));
  };

  const columns = useMemo<MRT_ColumnDef<AddressBook>[]>(
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
        header: "Phone",
      },

      {
        accessorKey: "user.name",
        header: "Created By",
      },
    ],
    []
  );

  const table = useMantineReactTable({
    data: addressBookList,
    columns,
    enableRowActions: true,
    positionActionsColumn: "last",
    renderRowActionMenuItems: ({ row }) => (
      <div className=" text-center">
        <Link
          to={`/dashboard/address-books/edit/${row.original.id}`}
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
      <div className="flex justify-between">
        <h1 className="py-6 text-2xl">Address Books List</h1>
        <div className="flex justify-center items-center">
          <Link
            to="/dashboard/address-books/create"
            className="py-2 px-2 bg-green-500 text-xl rounded text-white"
          >
            Create
          </Link>
        </div>
      </div>
      <MantineReactTable table={table} />
    </div>
  );
};

export default AddressBooksList;
