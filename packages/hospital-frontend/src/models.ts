export enum Sex {
  "Male" = "Male",
  "Female" = "Female",
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  token: string;
  password: string;
}

export enum Role {
  "PATIENT" = "PATIENT",
  "DOCTOR" = "DOCTOR",
}
