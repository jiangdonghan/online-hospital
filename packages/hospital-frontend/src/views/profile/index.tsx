import React from "react";
import { Role } from "../../models";
import { ContainerBase, PageHeader } from "../../components/page-header";
import { PatientProfileForm } from "./patient-form";
import { DoctorProfileForm } from "./doctor-form";
import PageFooter from "../../components/page-footer";
import styled from "@emotion/styled";
import { Button, Card } from "antd";
import { getUser } from "../../hooks/user";

export const Profile = () => {
  const user = getUser();
  return (
    <ContainerBase>
      <FormWrapper>
        {" "}
        {user?.role === Role.PATIENT ? (
          <PatientProfileForm />
        ) : (
          <DoctorProfileForm />
        )}
      </FormWrapper>
    </ContainerBase>
  );
};

export const ProfilePage = () => {
  return (
    <>
      <PageHeader />
      <Profile />
      <PageFooter />
    </>
  );
};

const FormWrapper = styled(Card)`
  margin: 3rem auto;
  position: relative;
  width: 100%;
  min-height: 65vh;
  padding: 3.2rem 0;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: raba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
  .align-left {
    text-align: left;
  }
`;

export const BottomWideButton = styled(Button)`
  margin-top: 5rem;
  width: 15rem;
`;
