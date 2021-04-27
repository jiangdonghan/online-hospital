import React from "react";
import { LoginForm, useAuth } from "../../context/auth-context";
import { Form, Input, Radio } from "antd";
import { LongButton } from "./index";
import { Role } from "../../hooks/user";
import { useHistory } from "react-router-dom";
import styled from "@emotion/styled";

export const LoginScreen = () => {
  const userOptions = [
    { label: "Patient", value: "PATIENT" },
    { label: "Doctor", value: "DOCTOR" },
  ];
  const { login } = useAuth();
  let history = useHistory();
  const handleSubmit = (values: LoginForm) => {
    login(values)
      .then(() => {
        history.replace("/");
      })
      .catch(() => {
        alert("Invalid password or password");
      });
  };
  return (
    <div>
      <Form onFinish={handleSubmit}>
        <LoginHead>
          <LoginTitle>{"Login"}</LoginTitle>
          <Form.Item name={"role"} initialValue={Role.PATIENT}>
            <Radio.Group
              options={userOptions}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
        </LoginHead>
        <Form.Item
          name={"email"}
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input type="text" placeholder={"email"} id={"email"} />
        </Form.Item>
        <Form.Item
          name={"password"}
          rules={[{ required: true, message: "Please enter your password" }]}
        >
          <Input type="password" id={"password"} placeholder={"password"} />
        </Form.Item>
        <LongButton htmlType={"submit"} type={"primary"}>
          Login
        </LongButton>
      </Form>
    </div>
  );
};

export const LoginTitle = styled.h2`
  margin-bottom: 2.4rem;
  color: rgb(94, 108, 132);
`;
export const LoginHead = styled.div`
  display: flex;
  justify-content: space-between;
`;
