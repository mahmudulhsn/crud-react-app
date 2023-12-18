import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import { User } from "../views/users/UsersList";

interface Toast {
  message: string;
  show: boolean;
}

interface StateContextType {
  currentUser: any;
  userToken: string | null;
  userList: User[];
  toast: Toast;
  setCurrentUser: Dispatch<SetStateAction<any>>;
  setUserList: (users: User[]) => void;
  setUserToken: (token: string) => void;
  showToast: (message: string) => void;
}

const defaultState: StateContextType = {
  currentUser: {},
  userToken: "",
  userList: [],
  toast: {
    message: "",
    show: false,
  },
  setCurrentUser: () => {},
  setUserList: () => {},
  setUserToken: () => {},
  showToast: () => {},
};

const StateContext = createContext<StateContextType>(defaultState);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<any>({});
  const [userList, setUserList] = useState<User[]>([]);
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
