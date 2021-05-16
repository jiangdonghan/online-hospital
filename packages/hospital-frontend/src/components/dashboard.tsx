import React from "react";

export interface AppointmentProps {
  avatar: string;
  name: string;
  doctorInfo: {
    specialty1: string;
    introduction: string;
  };
  id: number;
  description: string;
}

export const UpcomingAppointmentTable = () => {
  return <div>aas</div>;
};

export const AppointmentHistoryTable = () => {
  return <div>aas</div>;
};
