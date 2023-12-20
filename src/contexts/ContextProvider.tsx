import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { User } from "../views/users/UsersList";
import { AddressBook } from "../views/addressBooks/AddressBooksList";

interface Toast {
  message: string;
  show: boolean;
}

interface StateContextType {
  currentUser: any;
  userToken: string | null;
  userList: User[];
  addressBookList: AddressBook[];
  toast: Toast;
  setCurrentUser: Dispatch<SetStateAction<any>>;
  setUserList: (users: User[]) => void;
  setAddressBookList: (addressBooks: AddressBook[]) => void;
  setUserToken: (token: string) => void;
  showToast: (message: string) => void;
}

const defaultState: StateContextType = {
  currentUser: {},
  userToken: "",
  userList: [],
  addressBookList: [],
  toast: {
    message: "",
    show: false,
  },
  setCurrentUser: () => {},
  setUserList: () => {},
  setAddressBookList: () => {},
  setUserToken: () => {},
  showToast: () => {},
};

const StateContext = createContext<StateContextType>(defaultState);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<any>({});
  const [userList, setUserList] = useState<User[]>([]);
  const [addressBookList, setAddressBookList] = useState<User[]>([]);
  const [userToken, _setUserToken] = useState<string>(
    localStorage.getItem("TOKEN") || ""
  );
  const [toast, setToast] = useState<Toast>({ message: "", show: false });

  const showToast = (message: string) => {
    setToast({ message, show: true });
    setTimeout(() => {
      setToast({ message: "", show: false });
    }, 5000);
  };

  const setUserToken = (token: string) => {
    if (token) {
      localStorage.setItem("TOKEN", token);
    } else {
      localStorage.removeItem("TOKEN");
    }
    _setUserToken(token);
  };

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        toast,
        showToast,
        userList,
        setUserList,
        addressBookList,
        setAddressBookList,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
