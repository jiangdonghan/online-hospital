import React from "react";
import styled from "@emotion/styled";
import { useAuth } from "../../context/auth-context";
import { Role } from "../../models";
import { Button, Divider, Form, Input, Spin } from "antd";
import { usePrescription } from "../../hooks/use-prescription";
import { useParams } from "react-router-dom";

export interface Prescription {
  symptom: string;
  advice: string;
  diagnosis: string;
}
export const DoctorPrescriptionFragment = () => {
  // @ts-ignore
  const { appointmentId } = useParams();
  //TODO use nexttick
  let {
    data: prescription,
    setData: setPrescription,
    isLoading,
    savePrescription,
  } = usePrescription(appointmentId);

  const onSubmit = (val: Prescription) => {
    savePrescription(val);
  };
  return (
    <div>
      <Title>Prescription</Title>
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        size={"middle"}
        initialValues={prescription as Prescription}
        onValuesChange={setPrescription}
        onFinish={onSubmit}
      >
        <Spin spinning={isLoading}>
          <Form.Item label="symptom" name={"symptom"}>
            <Input.TextArea size={"large"} style={{ height: 150 }} />
          </Form.Item>
          <Form.Item label="advice" name={"advice"}>
            <Input.TextArea size={"large"} style={{ height: 150 }} />
          </Form.Item>
          <Form.Item label="diagnosis" name={"diagnosis"}>
            <Input.TextArea size={"large"} style={{ height: 150 }} />
          </Form.Item>
        </Spin>
        <SaveBar>
          <Button htmlType={"submit"}>Save</Button>
        </SaveBar>
      </Form>
    </div>
  );
};

export const PatientPrescriptionFragment = () => {
  // @ts-ignore
  const { appointmentId } = useParams();
  let { data: prescription, isLoading } = usePrescription(appointmentId, 5000);
  return (
    <div>
      <Title>Prescription</Title>
      <Spin spinning={isLoading}>
        <PrescriptionContent>
          <div>
            symptom: {prescription?.symptom} <Divider />
          </div>

          <div>
            diagnosis: {prescription?.diagnosis} <Divider />
          </div>

          <div>advice: {prescription?.advice}</div>
        </PrescriptionContent>
      </Spin>
    </div>
  );
};

export const PrescriptionFragment = () => {
  const { user } = useAuth();
  return (
    <div>
      {user?.role === Role.DOCTOR ? (
        <DoctorPrescriptionFragment />
      ) : (
        <PatientPrescriptionFragment />
      )}
    </div>
  );
};
const Title = styled.h1`
  text-align: center;
`;

const PrescriptionContent = styled.div`
  padding: 5rem 5rem 10rem 5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60rem;
  font-size: 2rem;
`;

const SaveBar = styled.div`
  background: #716f6f;
  height: 6rem;
  position: absolute;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
