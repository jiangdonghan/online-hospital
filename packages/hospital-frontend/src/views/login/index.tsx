import React, { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";
import SoftwareLogo from "assets/logo.svg";
import Left from "assets/login/left.svg";
import Right from "assets/login/right.svg";
import { Button, Card, Divider, Typography } from "antd";
import styled from "@emotion/styled";

export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        {isRegister ? (
          <RegisterScreen onError={setError} />
        ) : (
          <LoginScreen onError={setError} />
        )}
        {error ? (
          <Typography.Text type={"danger"}>{error.message}</Typography.Text>
        ) : null}
        <Divider />
        <Button
          type={"link"}
          style={{ marginTop: "20px" }}
          onClick={() => {
            setIsRegister(!isRegister);
          }}
        >
          {isRegister
            ? " Already have an account？Login "
            : "No account？Register"}
        </Button>
      </ShadowCard>
    </Container>
  );
};

const Header = styled.div`
  background: url(${SoftwareLogo}) no-repeat center;
  padding: 5rem 0;
  background-size: 8rem;
  width: 100%;
`;

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${Right}), url(${Left});
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const ShadowCard = styled(Card)`
  width: 40rem;
  min-height: 56rem;
  padding: 3.2rem 4rem;
  border-radius: 0.3rem;
  box-sizing: border-box;
  box-shadow: raba(0, 0, 0, 0.1) 0 0 10px;
  text-align: center;
`;

export const LongButton = styled(Button)`
  width: 100%;
`;
