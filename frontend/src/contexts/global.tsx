import { UserType } from "@/types";
import React, { Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type GlobalContextType = {
  user: UserType | null;
  setUser: Dispatch<SetStateAction<UserType | null>>;
  count: number;
  setCount: Dispatch<SetStateAction<number>>;
};

const initialGlobalContext = {
  user: null,
  setUser: () => {},
  count: 0,
  setCount: () => {},
};

export const GlobalContext = React.createContext<GlobalContextType>(initialGlobalContext);

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw "Global Context Error";
  }

  return context;
};

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [count, setCount] = useState<number>(0);

  return (
    <GlobalContext.Provider value={{ user, setUser, count, setCount }}>{children}</GlobalContext.Provider>
  );
};
