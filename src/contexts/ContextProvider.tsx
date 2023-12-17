import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

interface Toast {
  message: string;
  show: boolean;
}

interface StateContextType {
  currentUser: any;
  userToken: string | null;
  toast: Toast;
  setCurrentUser: Dispatch<SetStateAction<any>>;
  setUserToken: (token: string) => void;
  showToast: (message: string) => void;
}

const defaultState: StateContextType = {
  currentUser: {},
  userToken: "",
  toast: {
    message: "",
    show: false,
  },
  setCurrentUser: () => {},
  setUserToken: () => {},
  showToast: () => {},
};

const StateContext = createContext<StateContextType>(defaultState);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<any>({});
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
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
