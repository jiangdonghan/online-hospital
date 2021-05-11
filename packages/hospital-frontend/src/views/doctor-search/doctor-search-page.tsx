import React from "react";
import { ContainerBase, PageHeader } from "../../components/page-header";
import PageFooter from "../../components/page-footer";
import styled from "@emotion/styled";

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
  return (
    <Container>
      <SearchBar>search</SearchBar>
      <DoctorWrapper>doctor</DoctorWrapper>
    </Container>
  );
};

const Container = styled(ContainerBase)`
  min-height: 50rem;
`;

const SearchBar = styled.div`
  min-height: 10rem;
`;

const DoctorWrapper = styled.div`
  min-height: 10rem;
`;
