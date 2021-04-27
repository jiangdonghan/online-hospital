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
          <ButtonNoPadding type={"link"} onClick={resetRoute}>
            <SoftwareLogo
              width={"3rem"}
              height={"3rem"}
              color={"rgb(38, 132, 255)"}
            />
          </ButtonNoPadding>
          <div>Browse Doctors</div>
          <div>About</div>
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
            <Button
              onClick={() => {
                console.log("ingo");
              }}
              type={"link"}
            >
              User Info
            </Button>
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
const HeaderLeft = styled(MyRow)``;
const HeaderRight = styled.div``;
export const ContainerBase = styled.div`
  width: 1200px;
  margin: 0 auto;
`;
