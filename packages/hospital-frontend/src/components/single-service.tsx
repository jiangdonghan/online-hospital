import { Card } from "antd";
import React from "react";
import styled from "@emotion/styled";

export interface ServiceProps {
  logo: string;
  header: string;
  content: string;
}
export const SingleService = (props: ServiceProps) => {
  const { logo, header, content } = props;
  return (
    <ServiceCard hoverable key={header}>
      <img src={`${logo}`} alt={"logo"} />
      <Header>{header}</Header>
      <Intro>{content}</Intro>
    </ServiceCard>
  );
};

const ServiceCard = styled(Card)`
  width: 360px;
  height: 320px;
  padding: 2rem 3rem 4rem 3rem;
  border: 2px solid #e8e8e8;
  -webkit-transition: 0.3s;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  transition: 0.3s;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`;

export const Header = styled.h3`
  font-size: 24px;
  font-weight: 400;
  color: #1f1f1f;
  margin-top: 1rem;
`;

export const Intro = styled.p`
  color: #727272;
  font-size: 16px;
  font-weight: 400;
  line-height: 30px;
  margin-bottom: 0;
`;
