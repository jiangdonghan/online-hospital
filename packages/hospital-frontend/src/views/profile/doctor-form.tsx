import { DoctorModel, Sex, Specialist } from "../../models";
import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import { BottomWideButton } from "./index";
import { useHttp } from "../../hooks/http";
import { useAsync } from "../../hooks/use-async";
import { error, success } from "../../hooks/utils";
import { handleUpdateProfileResponse } from "../../providers/auth-provider";
import { useAuth } from "../../context/auth-context";
import { ImageUploader } from "../../components/avatar-uploader";
import styled from "@emotion/styled";
import { getUser } from "../../hooks/user";

export const DoctorProfileForm = () => {
  const user = getUser();
  const { setToken } = useAuth();

  const [profile, setProfile] = useState<Partial<DoctorModel>>({
    sex: Sex.Male,
    age: 0,
    ...user,
  });
  const [imageUrl, setImageUrl] = useState(user.avatar);
  const [certification, setCertification] = useState(user.certification);
  const SpecialistOptions = Object.keys(Specialist).map((item) => {
    return (
      <Select.Option key={item} value={item}>
        {item}
      </Select.Option>
    );
  });

  useEffect(() => {
    client(`me/role/${user.role}/id/${user.id}`).then((value) => {
      handleUpdateProfileResponse(value.token);
      setToken(value.token);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrl, user.id, user.role, certification]);

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
      <Avatar>
        <p>Avatar:</p>
        <ImageUploader
          imageUrl={imageUrl}
          setImageUrl={setImageUrl}
          api={`avatar/doctor/${user?.id}`}
        />
      </Avatar>
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
        <Form.Item label="Specialty" name={"specialty1"}>
          <Select>{SpecialistOptions}</Select>
        </Form.Item>
        <Form.Item label="Clinic Name" name="clinicName">
          <Input />
        </Form.Item>
        <Certification>
          <p>Certification:</p>
          <ImageUploader
            imageUrl={certification}
            setImageUrl={setCertification}
            api={`avatar/doctor/${user?.id}/certification`}
          />
        </Certification>
        <Form.Item label="Clinic Location" name={"clinicLocation"}>
          <Input />
        </Form.Item>
        <BottomWideButton type={"primary"} size={"large"} htmlType={"submit"}>
          Save
        </BottomWideButton>
      </Form>
    </>
  );
};

export const Avatar = styled.div`
  text-align: left;
  margin: 0 0 3rem 14rem;
  display: flex;
  justify-content: flex-start;
  p {
    align-self: center;
    margin-right: 1rem;
  }
  .avatar-uploader > .ant-upload {
    width: 200px;
    height: 200px;
  }
`;

export const Certification = styled.div`
  text-align: left;
  margin: 0 0 3rem 9.9rem;
  display: flex;
  justify-content: flex-start;
  p {
    align-self: center;
    margin-right: 1rem;
  }
  .avatar-uploader > .ant-upload {
    width: 200px;
    height: 200px;
  }
`;
