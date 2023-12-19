import { useEffect, useState } from "react";
import axiosClient from "../../utils/axiosClient";
import UserForm from "../../components/UserForm";
import { User } from "./UsersList";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";

const EditUser = () => {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/users/${userId}`)
      .then(({ data }) => {
        setUser(data.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId]);

  if (!loading) {
    return <UserForm user={user} />;
  } else {
    <Loader />;
  }
};

export default EditUser;
