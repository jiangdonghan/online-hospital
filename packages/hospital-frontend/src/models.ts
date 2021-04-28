export enum Sex {
  "Male" = "Male",
  "Female" = "Female",
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
