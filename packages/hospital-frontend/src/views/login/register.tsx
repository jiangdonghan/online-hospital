import { RegisterForm, useAuth } from "../../context/auth-context";
import React from "react";
import { Form, Input, Radio } from "antd";
import { LongButton } from "./index";
import { LoginHead, LoginTitle } from "./login";
import { useHistory } from "react-router-dom";
import { Role } from "../../models";

export const RegisterScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { register } = useAuth();
  let history = useHistory();
  const userOptions = [
    { label: "Patient", value: "PATIENT" },
    { label: "Doctor", value: "DOCTOR" },
  ];
  const handleSubmit = (values: RegisterForm) => {
    register(values)
      .then(() => {
        history.replace("/");
      })
      .catch((e) => {
        onError(e);
      });
  };

  return (
    <div>
      <Form onFinish={handleSubmit}>
        <LoginHead>
          <LoginTitle>{"Register"}</LoginTitle>
          <Form.Item name={"role"} initialValue={Role.PATIENT}>
            <Radio.Group
              options={userOptions}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>
        </LoginHead>
        <Form.Item
          name={"name"}
          rules={[{ required: true, message: "Please enter your username" }]}
        >
          <Input type="text" placeholder={"username"} id={"name"} />
        </Form.Item>
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
          Register
        </LongButton>
      </Form>
    </div>
  );
};
