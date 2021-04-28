import React from "react";
import { Role } from "../../models";
import { ContainerBase } from "../../components/page-header";
import { useAuth } from "context/auth-context";
import { PatientProfileForm } from "./patient-form";
import { DoctorProfileForm } from "./doctor-form";

export const Profile = () => {
  const { user } = useAuth();
  return (
    <ContainerBase>
      {user ? (
        <div>
          {" "}
          {user?.role === Role.PATIENT ? (
            <PatientProfileForm user={user} />
          ) : (
            <DoctorProfileForm user={user} />
          )}
        </div>
      ) : null}
    </ContainerBase>
  );
};
