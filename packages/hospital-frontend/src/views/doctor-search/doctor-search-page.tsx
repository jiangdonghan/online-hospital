import React, { useEffect, useState } from "react";
import { ContainerBase, PageHeader } from "../../components/page-header";
import PageFooter from "../../components/page-footer";
import styled from "@emotion/styled";
import BannerImg from "../../assets/banner-search.jpeg";
import { SpecialistSelect } from "../../components/specialist-select";
import { Button, Input } from "antd";
import { AppointCard, DoctorProps } from "../../components/appoint-card";
import { useDoctors } from "../../hooks/role";

export const DoctorSearchPage = () => {
  return (
    <div style={{ position: "relative" }}>
      <PageHeader />
      <Main />
      <PageFooter />
    </div>
  );
};

const Main = () => {
  const [params, setParams] = useState<{
    specialist: string;
    name: string;
  }>({ specialist: "All", name: "" });
  const { data: originalData } = useDoctors();
  useEffect(() => {
    setDoctors(originalData);
  }, [originalData]);

  const [doctors, setDoctors] = useState<DoctorProps[]>(originalData);

  const searchDoctor = () => {
    const data = originalData.filter((doctor: DoctorProps) => {
      if (params.specialist === "All") {
        return doctor.name.includes(params.name);
      } else
        return (
          doctor.name.includes(params.name) &&
          doctor.doctorInfo.specialty1.includes(params.specialist)
        );
    });
    setDoctors(data);
  };

  return (
    <>
      <Banner>
        <ContainerBase>
          <BannerText>
            Book professional <br />
            Doctors
          </BannerText>
        </ContainerBase>
      </Banner>
      <SearchBar>
        <SpecialistSelect
          defaultoptionname={"All"}
          width={"300px"}
          value={params.specialist}
          onChange={(value) => {
            setParams({ ...params, specialist: String(value) });
          }}
        />
        <Input
          placeholder="Name"
          style={{ width: "300px", marginRight: "7rem", marginLeft: "3rem" }}
          type="text"
          value={params.name}
          onChange={(e) => {
            setParams({ ...params, name: e.target.value });
          }}
        />
        <Button
          type={"primary"}
          style={{ marginRight: "2rem" }}
          onClick={() => {
            searchDoctor();
          }}
        >
          Search
        </Button>
        <Button
          type={"default"}
          onClick={() => {
            setParams({ specialist: "All", name: "" });
            setDoctors(originalData);
          }}
        >
          Clear
        </Button>
      </SearchBar>
      <DoctorWrapper>
        <h1>Doctors</h1>
        <ResultWrapper>
          {doctors && doctors.length
            ? doctors.map((item) => {
                return AppointCard(item);
              })
            : null}
        </ResultWrapper>
      </DoctorWrapper>
    </>
  );
};

const SearchBar = styled(ContainerBase)`
  margin-top: 5rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-start;
`;

const DoctorWrapper = styled(ContainerBase)`
  min-height: 70rem;
`;

const Banner = styled.div`
  position: relative;
  height: 500px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${BannerImg});
`;

const ResultWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const BannerText = styled.h1`
  padding-top: 13rem;
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-size: 6rem;
  font-weight: 400;
  line-height: 8rem;
  width: 800px;
`;
