import { Sex, User } from "../../models";
import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Radio, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const DoctorProfileForm = ({ user }: { user: User | null }) => {
  const [profile, setProfile] = useState<any>({
    sex: Sex.Male,
    age: 0,
    ...user,
  });
  // const onFormLayoutChange = ({ size }: { size: SizeType }) => {
  //   setComponentSize(size);
  // };

  const normFile = (e: any) => {
    console.log("Upload event:", e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        initialValues={profile}
        size={"large"}
      >
        <Form.Item label="Name" name={"name"}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name={"email"}>
          <Input />
        </Form.Item>
        <Form.Item label="Clinic Name" name="clinicName">
          <Input />
        </Form.Item>
        <Form.Item label="Clinic Location" name={"clinicLocation"}>
          <Input />
        </Form.Item>
        <Form.Item label="Clinic Name" name="clinicName">
          <Input />
        </Form.Item>
        <Form.Item
          name="avatar"
          label="Avatar"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" action="/upload.avatar" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item label="First Specialty">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Second Specialty">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="First Specialty">
          <Select>
            <Select.Option value="demo">Demo</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="certificate"
          label="Certificates"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" action="/upload.certificate" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </>
  );
};
