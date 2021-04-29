import React from "react";
import { Role } from "../../models";
import { ContainerBase, PageHeader } from "../../components/page-header";
import { useAuth } from "context/auth-context";
import { PatientProfileForm } from "./patient-form";
import { DoctorProfileForm } from "./doctor-form";
import PageFooter from "../../components/page-footer";
import styled from "@emotion/styled";
import { Button, Card } from "antd";

export const Profile = () => {
  const { user } = useAuth();

  return (
    <ContainerBase>
      {user ? (
        <FormWrapper>
          {" "}
          {user?.role === Role.PATIENT ? (
            <PatientProfileForm user={user} />
          ) : (
            <DoctorProfileForm user={user} />
          )}
          <BottomWideButton type={"primary"} size={"large"}>
            Save
          </BottomWideButton>
        </FormWrapper>
      ) : null}
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
  min-height: 50rem;
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
