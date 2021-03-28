export interface UserModel {
  id: string;
  name: string;
  email: string;
  passwordHash: string;
  createdAt: string;
  updatedAt: string;
}

export enum Role {
  "PATIENT" = "PATIENT",
  "DOCTOR" = "DOCTOR",
}
