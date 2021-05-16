import React, { useEffect, useState } from "react";
import { ContainerBase, PageHeader } from "../../components/page-header";
import PageFooter from "../../components/page-footer";
import styled from "@emotion/styled";
import BannerImg from "../../assets/banner-dashboard.png";
import { Button, Space, Table } from "antd";
import { useHttp } from "../../hooks/http";
import { useAuth } from "../../context/auth-context";
import { Link } from "react-router-dom";
import { useAsync } from "../../hooks/use-async";
export const AppointmentPage = () => {
  return (
    <div>
      <PageHeader />
      <Banner>
        <ContainerBase>
          <BannerText>My Appointment</BannerText>
        </ContainerBase>
      </Banner>
      <UpcomingAppointment />
      <ContainerBase> </ContainerBase>
      <AppointmentHistory />
      <PageFooter />
    </div>
  );
};

const UpcomingAppointment = () => {
  const client = useHttp();
  const { user } = useAuth();
  const { run, isLoading } = useAsync();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "name",
      key: "name",
      width: 320,
    },
    {
      title: "Specialist",
      dataIndex: "specialist",
      key: "specialist",
      width: 320,
    },
    {
      title: "Start Time",
      key: "startTs",
      dataIndex: "startTs",
      width: 320,
      render: (value: string) => (
        <>
          <div>{value}</div>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Link to={`/appointment/${record.id}`}>
            <Button type={"primary"}>Join</Button>
          </Link>
          <Button type={"default"}>Cancel</Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (!user) {
      return;
    }
    run(
      client(`appointments/upcoming/role/${user?.role}/userId/${user?.id}`)
    ).then((result: any) => {
      setData(result.elements);
      setCount(result.count);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <Container>
      <Title>Upcoming {count} Appointments</Title>{" "}
      <Table
        columns={columns}
        dataSource={data}
        bordered={false}
        loading={isLoading}
        pagination={false}
      />
    </Container>
  );
};

const AppointmentHistory = () => {
  const client = useHttp();
  const { user } = useAuth();
  const { run, isLoading } = useAsync();
  const [data, setData] = useState([]);
  const [count, setCount] = useState(0);

  const columns = [
    {
      title: "Doctor Name",
      dataIndex: "name",
      key: "name",
      width: 320,
    },
    {
      title: "Specialist",
      dataIndex: "specialist",
      key: "specialist",
      width: 320,
    },
    {
      title: "End Time",
      key: "endTs",
      dataIndex: "endTs",
      width: 320,
      render: (value: string) => (
        <>
          <div>{value}</div>
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Link to={`/appointment/${record.id}/detail`}>
            <Button type={"primary"}>Details</Button>
          </Link>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    if (!user) {
      return;
    }
    run(
      client(`appointments/history/role/${user?.role}/userId/${user?.id}`)
    ).then((result: any) => {
      setData(result.elements);
      setCount(result.count);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  return (
    <Container>
      <Title>Passed {count} Appointments</Title>{" "}
      <Table
        columns={columns}
        dataSource={data}
        bordered={false}
        loading={isLoading}
      />
    </Container>
  );
};

const Banner = styled.div`
  position: relative;
  height: 500px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${BannerImg});
`;

const BannerText = styled.h1`
  position: absolute;
  right: 26rem;
  top: 10rem;
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-size: 6rem;
  font-weight: 400;
  line-height: 8rem;
`;

const Container = styled(ContainerBase)`
  min-height: 30rem;
`;

const Title = styled.h1`
  color: black;
  font-family: "Roboto", sans-serif;
  font-size: 3rem;
  font-weight: 400;
  text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  line-height: 8rem;
`;
