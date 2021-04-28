import { Sex, User } from "../../models";
import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Radio, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export const PatientProfileForm = ({ user }: { user: User | null }) => {
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
        <Form.Item label="Sex" name="sex">
          <Radio.Group>
            <Radio.Button value={Sex.Male}>{Sex.Male}</Radio.Button>
            <Radio.Button value={Sex.Female}>{Sex.Female}</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Age" name={"age"}>
          <InputNumber />
        </Form.Item>
        <Form.Item label="Name" name={"name"}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name={"email"}>
          <Input />
        </Form.Item>

        <Form.Item
          name="avatar"
          label="Avatar"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" action="/upload.do" listType="picture">
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
      </Form>
    </>
  );
};
