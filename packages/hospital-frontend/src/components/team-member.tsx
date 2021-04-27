import { Card } from "antd";
import React from "react";
import styled from "@emotion/styled";

export interface TeamMemberProps {
  logo: string;
  name: string;
  spcialist: string;
}
export const TeamMember = (props: TeamMemberProps) => {
  const { logo, name, spcialist } = props;
  return (
    <MemberCard
      key={name}
      cover={<img alt="example" src={logo} width={260} height={300} />}
    >
      <Header>{name}</Header>
      <Intro>{spcialist}</Intro>
    </MemberCard>
  );
};

const MemberCard = styled(Card)`
  width: 260px;
  height: 330px;
  border: 0px solid #e8e8e8;
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
