import React, { ReactNode, useContext, useState } from "react";
import { parseLocalUser, writeLocalUser } from "../utils/user";
import { AuthService } from "../services/auth";

interface UserContextType {
  user: User | null;
  create: (email: string, password: string) => Promise<User | Error>;
  login: (email: string, password: string) => Promise<User | Error>;
}

type Props = {
  children: ReactNode
}

export const UserContext = React.createContext<UserContextType>(null as unknown as UserContextType)

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState(parseLocalUser());

  const create = async (email: string, password: string): Promise<User | Error> => {
    try {
      return AuthService.create(email, password);
    } catch (error: unknown) {
      return (error as Error);
    }
  }

  const login = async (email: string, password: string): Promise<User | Error> => {
    try {
      const data = await AuthService.login(email, password);
      writeLocalUser(data)
      setUser(data);
      return data;
    } catch (error: unknown) {
      return (error as Error);
    }
  }

  const value = {
    user,
    create,
    login,
  }

  return <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
}

export const useUserContext = () => useContext(UserContext);