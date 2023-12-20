import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import { AddressBook } from "./AddressBooksList";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import AddressBookForm from "../../components/AddressBookForm";

const EditAddressBook = () => {
  const [addressBook, setAddressBook] = useState<AddressBook>();
  const [loading, setLoading] = useState(false);
  const { addressBookId } = useParams();

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/address-books/${addressBookId}`)
      .then(({ data }) => {
        setAddressBook(data.data.addressBook);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [addressBookId]);

  if (!loading) {
    return <AddressBookForm addressBook={addressBook} />;
  } else {
    <Loader />;
  }
};

export default EditAddressBook;
