import React from "react";
import { ButtonNoPadding, MyRow } from "./lib";
import styled from "@emotion/styled";
import { resetRoute } from "../hooks/utils";
import { ReactComponent as SoftwareLogo } from "assets/logo.svg";
import { Button, Dropdown, Menu } from "antd";
import { useAuth } from "context/auth-context";
import { Link } from "react-router-dom";

//TODO Move to common package
enum Role {
  "PATIENT" = "PATIENT",
  "DOCTOR" = "DOCTOR",
}

export const PageHeader = () => {
  const { user } = useAuth();
  return (
    <ContainerBase>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <ButtonNoPadding
            type={"link"}
            onClick={resetRoute}
            style={{ marginRight: "10rem" }}
          >
            <SoftwareLogo
              width={"3rem"}
              height={"3rem"}
              color={"rgb(38, 132, 255)"}
            />
          </ButtonNoPadding>
          <Link to={"/doctors"}>Browse Doctors</Link>
          <Link to={"/about"}>About</Link>
        </HeaderLeft>
        <HeaderRight>
          {user ? (
            <UserNav />
          ) : (
            <Link to="/login">
              <ButtonNoPadding type={"link"}>Login</ButtonNoPadding>
            </Link>
          )}
        </HeaderRight>
      </Header>
    </ContainerBase>
  );
};

const UserNav = () => {
  const { logout, user } = useAuth();
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"logout"}>
            <Button onClick={logout} type={"link"}>
              Log Out
            </Button>
          </Menu.Item>
          <Menu.Item key={"info"}>
            <Link to="/profile">
              <Button type={"link"}>My Profile</Button>
            </Link>
          </Menu.Item>
          <Menu.Item key={"dashboard"}>
            <Link to="/dashboard">
              <Button type={"link"}>My Dashboard</Button>
            </Link>
          </Menu.Item>
        </Menu>
      }
    >
      <Button type={"link"} onClick={(e) => e.preventDefault()}>
        Hi, {user?.role === Role.DOCTOR ? "Dr." + user?.name : user?.name}
      </Button>
    </Dropdown>
  );
};

const Header = styled(MyRow)`
  padding: 3.2rem 0;
  z-index: 1;
`;
const HeaderLeft = styled(MyRow)`
  div {
    margin-right: 5rem;
  }
`;
const HeaderRight = styled.div``;
export const ContainerBase = styled.div`
  width: 1200px;
  margin: 0 auto;
`;
