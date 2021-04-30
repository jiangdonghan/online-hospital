import { PatientModel, Sex } from "../../models";
import React, { useEffect, useState } from "react";
import { Form, Input, InputNumber, Radio } from "antd";
import { BottomWideButton } from "./index";
import { useHttp } from "../../hooks/http";
import { useAsync } from "../../hooks/use-async";
import { error, success } from "../../hooks/utils";
import { handleUpdateProfileResponse } from "../../providers/auth-provider";
import { useAuth } from "../../context/auth-context";
import { getUser } from "../../hooks/user";
import { ImageUploader } from "../../components/avatar-uploader";
import { Avatar } from "./doctor-form";

export const PatientProfileForm = () => {
  const user = getUser();
  const [profile, setProfile] = useState<Partial<PatientModel>>({
    sex: Sex.Male,
    age: 0,
    ...user,
  });
  const { setToken } = useAuth();
  const [imageUrl, setImageUrl] = useState(user.avatar);
  const client = useHttp();
  const { run } = useAsync<PatientModel>();
  const onSubmit = (val: PatientModel) => {
    run(
      client(`patient/${user?.id}`, {
        data: val,
        method: "PUT",
      })
    )
      .then((value) => {
        handleUpdateProfileResponse(value.token);
        setToken(value.token);
      })
      .then(() => success("Successfully Updated"))
      .catch((e) => error(e.message));
  };

  useEffect(() => {
    client(`me/role/${user.role}/id/${user.id}`).then((value) => {
      handleUpdateProfileResponse(value.token);
      setToken(value.token);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl, user.id, user.role]);

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        initialValues={profile}
        size={"large"}
        onValuesChange={setProfile}
        onFinish={onSubmit}
      >
        <Avatar>
          <p>Avatar:</p>
          <ImageUploader
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            api={`avatar/patient/${user?.id}`}
          />
        </Avatar>
        <Form.Item label="Sex" name="sex" className={"align-left"}>
          <Radio.Group>
            <Radio.Button value={Sex.Male}>{Sex.Male}</Radio.Button>
            <Radio.Button value={Sex.Female}>{Sex.Female}</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Age" name={"age"} className={"align-left"}>
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="Name"
          name={"name"}
          rules={[
            { required: true, message: "Please enter your name", min: 3 },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name={"email"}
          rules={[{ required: true, message: "Please enter your email" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label={"Password"}
          name={"password"}
          rules={[
            { required: true, message: "Please enter your password", min: 6 },
          ]}
        >
          <Input type="password" id={"password"} placeholder={"password"} />
        </Form.Item>

        <BottomWideButton type={"primary"} size={"large"} htmlType={"submit"}>
          Save
        </BottomWideButton>
      </Form>
    </>
  );
};
