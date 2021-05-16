import { Button, Card } from "antd";
import React from "react";
import styled from "@emotion/styled";
import { success, warning } from "../hooks/utils";
import { useAuth } from "../context/auth-context";
import { useHttp } from "../hooks/http";
import { Role } from "../models";

const path = process.env.REACT_APP_SOURCE_PATH;

export interface DoctorProps {
  avatar: string;
  name: string;
  doctorInfo: {
    specialty1: string;
    introduction: string;
  };
  id: number;
  description: string;
}
export const AppointCard = (props: DoctorProps) => {
  const { avatar, name, doctorInfo, id: doctorId } = props;
  const { user } = useAuth();
  const client = useHttp();
  const makeAppointments = () => {
    if (!user) {
      warning("please login first");
      return;
    }
    if (user.role === Role.DOCTOR) {
      warning("only patient can make an appointment");
      return;
    }
    client("appointment", {
      method: "post",
      data: { patientId: user.id, doctorId: doctorId },
    })
      .then(() => {
        success(
          "successfully reserved,please go to your dashboard to check detail"
        );
      })
      .catch((error) => warning(error.message));
  };
  return (
    <MemberCard
      key={name}
      cover={
        <img
          alt="example"
          src={`${path}/${avatar}`}
          style={{ height: 300, width: 260 }}
        />
      }
    >
      <InfoWrapper>
        {" "}
        <div>
          <Header>{name}</Header>
          <Intro>{doctorInfo.specialty1}</Intro>
        </div>
        <ReserveButton
          type={"primary"}
          onClick={() => {
            makeAppointments();
          }}
        >
          Reserve
        </ReserveButton>
      </InfoWrapper>
    </MemberCard>
  );
};

const MemberCard = styled(Card)`
  border: 0px solid #e8e8e8;
  margin-right: 3rem;
`;

const Header = styled.h3`
  font-size: 18px;
  font-weight: 400;
  color: #1f1f1f;
  margin: 0;
`;

const Intro = styled.p`
  color: #727272;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  margin-bottom: 0;
`;

const InfoWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  text-align: center;
  position: relative;
`;

const ReserveButton = styled(Button)`
  text-align: center;
  position: absolute;
  top: 1.3rem;
  left: 15rem;
`;
