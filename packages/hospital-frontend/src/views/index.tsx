import React from "react";
import { Button, Card } from "antd";
import styled from "styled-components";
import { useAuth } from "../context/auth-context";
import { Link } from "react-router-dom";
const Index: React.FC = () => {
  const { user, logout } = useAuth();
  console.log(user);
  return user ? (
    <div>
      <Card>{user?.role}</Card>
      <Card>{user?.email}</Card>
      <Card>{user?.name}</Card>
      <Button onClick={logout}>Logout</Button>
    </div>
  ) : (
    <div>
      <Card>no user</Card>
      <Link to={"login"}>
        <Button onClick={logout}>Log In</Button>
      </Link>
    </div>
  );
};

export default Index;

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom || 0 + "rem"};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props: any) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;
