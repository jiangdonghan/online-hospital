import React, { ReactNode, useState } from "react";
import * as auth from "../providers/auth-provider";
import { useMount } from "../hooks";
import { User } from "../../../common/model/userModel";
import { Role } from "../hooks/user";
import { info, success } from "../hooks/utils";
const jwt = require("jsonwebtoken");
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: RegisterForm) => Promise<void>;
      login: (form: LoginForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);
AuthContext.displayName = "AuthContext";

export interface RegisterForm {
  name: string;
  password: string;
  email: string;
  role: Role;
}

export interface LoginForm {
  email: string;
  password: string;
  role: Role;
}

const bootstrapUser = async () => {
  let user: User | null = null;
  const token = auth.getToken();
  if (token) {
    user = jwt.decode(token);
  }
  return user;
};
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (form: LoginForm) => {
    return auth
      .login(form)
      .then(setUser)
      .then(() => {
        success("Successfully Logged In");
      });
  };

  const register = (form: RegisterForm) => {
    return auth
      .register(form)
      .then(setUser)
      .then(() => {
        success("Successfully Registered");
      });
  };

  const logout = () => {
    return auth
      .logout()
      .then(() => {
        setUser(null);
      })
      .then(() => {
        success("Successfully Logged Out");
      });
  };

  useMount(() => {
    bootstrapUser().then(setUser);
  });
  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must use in AuthProvider");
  }
  return context;
};
