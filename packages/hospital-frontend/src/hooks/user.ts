import { useAsync } from "./use-async";
import { useHttp } from "./http";
import { useEffect } from "react";
import { cleanObject } from "./index";

export interface User {
  name: string;
  email: string;
  passwordHash: string;
  role: Role;
  token: string;
}

export enum Role {
  "PATIENT" = "PATIENT",
  "DOCTOR" = "DOCTOR",
}

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(client("users", { data: cleanObject(param || {}) }));
  }, [client, param, run]);

  return result;
};
