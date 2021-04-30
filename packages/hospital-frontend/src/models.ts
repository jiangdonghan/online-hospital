export enum Sex {
  "Male" = "Male",
  "Female" = "Female",
}

export interface User {
  id?: number;
  name: string;
  email: string;
  role: Role;
  token: string;
  password: string;
  avatar?: string;
}

export enum Role {
  "PATIENT" = "PATIENT",
  "DOCTOR" = "DOCTOR",
}

export enum Specialist {
  Cardiologist = "Cardiologist",
  Audiologist = "Audiologist",
  Dentist = "Dentist",
  ENT_specialist = "ENT specialist",
  Gynaecologist = "Gynaecologist",
  Paediatrician = "Paediatrician",
  Psychiatrists = "Psychiatrists",
  Veterinarian = "Veterinarian",
  Radiologist = "Radiologist",
  Pulmonologist = "Pulmonologist",
  Endocrinologist = "Endocrinologist",
  Oncologist = "Oncologist",
  Neurologist = "Neurologist",
}

export interface PatientModel extends User {
  sex: Sex;
  age: number;
  avatar?: string;
}

export interface DoctorModel extends User {
  sex: Sex;
  age: number;
  avatar?: string;
  clinicName?: string;
  clinicLocation?: string;
  specialty1: Specialist;
  specialty2: Specialist;
  specialty3: Specialist;
  certificate?: string;
}
