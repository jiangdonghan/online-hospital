import { Sex, User } from "../../models";
import React, { useState } from "react";
import { Form, Input, InputNumber, Radio } from "antd";

export const PatientProfileForm = ({ user }: { user: User | null }) => {
  const [profile, setProfile] = useState<any>({
    sex: Sex.Male,
    age: 0,
    ...user,
  });
  // const onFormLayoutChange = ({ size }: { size: SizeType }) => {
  //   setComponentSize(size);
  // };

  //
  // const normFile = (e: any) => {
  //   console.log("Upload event:", e);
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e && e.fileList;
  // };

  return (
    <>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 18 }}
        layout="horizontal"
        initialValues={profile}
        size={"large"}
        onValuesChange={setProfile}
      >
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

        {/*<Form.Item*/}
        {/*  name="avatar"*/}
        {/*  label="Avatar"*/}
        {/*  valuePropName="fileList"*/}
        {/*  getValueFromEvent={normFile}*/}
        {/*>*/}
        {/*  <Upload name="logo" action="/upload.do" listType="picture">*/}
        {/*    <Button icon={<UploadOutlined />}>Click to upload</Button>*/}
        {/*  </Upload>*/}
        {/*</Form.Item>*/}
      </Form>
    </>
  );
};
