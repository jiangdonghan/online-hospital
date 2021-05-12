import { Button, Card } from "antd";
import React from "react";
import styled from "@emotion/styled";
import { success } from "../hooks/utils";

export interface DoctorProps {
  avatar: string;
  name: string;
  specialist: string;
  id: number;
  description: string;
}
export const AppointCard = (props: DoctorProps) => {
  const { avatar, name, specialist } = props;
  return (
    <MemberCard
      key={name}
      cover={<img alt="example" src={avatar} width={260} height={300} />}
    >
      <InfoWrapper>
        {" "}
        <div>
          <Header>{name}</Header>
          <Intro>{specialist}</Intro>
        </div>
        <ReserveButton
          type={"primary"}
          onClick={() => {
            success("successfully reserved");
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
  font-size: 24px;
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
  top: 1.7rem;
  left: 11rem;
`;
