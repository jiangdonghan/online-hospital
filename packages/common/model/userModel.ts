export interface UserModel {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  name: string;
  email: string;
  role: Role;
  token: string;
}

export enum Role {
  "PATIENT" = "PATIENT",
  "DOCTOR" = "DOCTOR",
}
