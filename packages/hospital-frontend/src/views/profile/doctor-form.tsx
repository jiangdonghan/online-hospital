import { DoctorModel, Sex, Specialist, User } from "../../models";
import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import { BottomWideButton } from "./index";
import { useHttp } from "../../hooks/http";
import { useAsync } from "../../hooks/use-async";
import { error, success } from "../../hooks/utils";
import { handleUpdateProfileResponse } from "../../providers/auth-provider";
import { useAuth } from "../../context/auth-context";

export const DoctorProfileForm = ({ user }: { user: User | null }) => {
  const [profile, setProfile] = useState<Partial<DoctorModel>>({
    sex: Sex.Male,
    age: 0,
    ...user,
  });
  const { setToken } = useAuth();
  // const onFormLayoutChange = ({ size }: { size: SizeType }) => {
  //   setComponentSize(size);
  // };

  // const normFile = (e: any) => {
  //   console.log("Upload event:", e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // };

  const SpecialistOptions = Object.keys(Specialist).map((item) => {
    return (
      <Select.Option key={item} value={item}>
        {item}
      </Select.Option>
    );
  });
  const client = useHttp();
  const { run } = useAsync<DoctorModel>();
  const onSubmit = (val: DoctorModel) => {
    run(
      client(`doctor/${user?.id}`, {
        data: {
          doctorInfo: {
            clinicName: val.clinicName,
            clinicLocation: val.clinicLocation,
            specialty1: val.specialty1,
          },
          name: val.name,
          password: val.password,
          email: val.email,
        },
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
        <Form.Item label="Clinic Name" name="clinicName">
          <Input />
        </Form.Item>
        <Form.Item label="Clinic Location" name={"clinicLocation"}>
          <Input />
        </Form.Item>
        {/*<Form.Item*/}
        {/*  name="avatar"*/}
        {/*  label="Avatar"*/}
        {/*  valuePropName="fileList"*/}
        {/*  getValueFromEvent={normFile}*/}
        {/*>*/}
        {/*  <Upload name="logo" action="/upload.avatar" listType="picture">*/}
        {/*    <Button icon={<UploadOutlined />}>Click to upload</Button>*/}
        {/*  </Upload>*/}
        {/*</Form.Item>*/}
        <Form.Item label="Specialty" name={"specialty1"}>
          <Select>{SpecialistOptions}</Select>
        </Form.Item>
        {/*<Form.Item*/}
        {/*  name="certificate"*/}
        {/*  label="Certificates"*/}
        {/*  valuePropName="fileList"*/}
        {/*  getValueFromEvent={normFile}*/}
        {/*>*/}
        {/*  <Upload name="logo" action="/upload.certificate" listType="picture">*/}
        {/*    <Button icon={<UploadOutlined />}>Click to upload</Button>*/}
        {/*  </Upload>*/}
        {/*</Form.Item>*/}
        <BottomWideButton type={"primary"} size={"large"} htmlType={"submit"}>
          Save
        </BottomWideButton>
      </Form>
    </>
  );
};
