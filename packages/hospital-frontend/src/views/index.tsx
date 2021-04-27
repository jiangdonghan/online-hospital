import React from "react";
import { ContainerBase, PageHeader } from "../components/page-header";
import BannerImg from "assets/banner.png";
import styled from "@emotion/styled";
import { ServiceProps, SingleService } from "../components/single-service";
import Logo1 from "assets/svg-icons/1.svg";
import Logo2 from "assets/svg-icons/2.svg";
import Logo3 from "assets/svg-icons/3.svg";
import About1 from "assets/about/about.png";
import About2 from "assets/about/work.png";
import Team1 from "assets/team/1.png";
import Team2 from "assets/team/2.png";
import Team3 from "assets/team/3.png";
import Team4 from "assets/team/4.png";
import { TeamMember, TeamMemberProps } from "../components/team-member";
import PageFooter from "../components/page-footer";

const Main: React.FC = () => {
  const Services: ServiceProps[] = [
    {
      logo: Logo1,
      header: "Flexible appointment",
      content:
        "Once you join the platform, you can initiate an appointment anytime, anywhere.",
    },
    {
      logo: Logo2,
      header: "Instant consulting",
      content:
        "Need a hurry? Try Instant Consulting to find a doctor to have an Instant video consultation with you.",
    },

    {
      logo: Logo3,
      header: "Consultation recording",
      content:
        "You can simply review the recording of every previous consultations to avoid missing important information.",
    },
  ];

  const teams: TeamMemberProps[] = [
    {
      logo: Team1,
      name: "Brandon Yeald",
      spcialist: "Psychologist",
    },
    {
      logo: Team2,
      name: "Calvin Anderson",
      spcialist: "Surgeon",
    },
    {
      logo: Team3,
      name: "Roman Solo",
      spcialist: "Pediatrician",
    },
    {
      logo: Team4,
      name: "Yeald Kin",
      spcialist: "Preventive Medicine",
    },
  ];
  return (
    <div>
      <Banner>
        <ContainerBase>
          <BannerText>
            Meet professional Doctors online, more safer and effective way to
            see a doctor.
          </BannerText>
          <JoinButton>Join Us</JoinButton>
        </ContainerBase>
      </Banner>
      <Service>
        <TopText>Services</TopText>
        <ServiceHeader>Anytime and anywhere to see</ServiceHeader>
        <ServiceHeader> a professional doctor.</ServiceHeader>
        <ServiceWrapper>{Services.map(SingleService)}</ServiceWrapper>
      </Service>
      <AboutWrapper>
        <AboutImage image={About1} />
        <AboutTopRight>
          <h3>Internet-based clinic</h3>
          <p>
            With the development of the Internet, some Internet-based products
            such as Uber and online shopping are gradually occupying the market
            because of their high efficiency and speed.
          </p>
          <p>
            Doctors and patients are seeking a more efficient working model and
            medical experience.
          </p>
        </AboutTopRight>
        <AboutTopLeft>
          <h3>How we work</h3>
          <p>
            Online video consultation can provide doctors and patients with the
            same effect as face-to-face consultation.
          </p>
          <p>
            The more flexible appointment time and instant consultation function
            of online clinics can bring patients effective way with a better
            medical experience.
          </p>
        </AboutTopLeft>
        <AboutImage image={About2} />
      </AboutWrapper>
      <Team>
        <h2>Our Professional Doctor's </h2>
        <h2>Team</h2>
        <div className={"team-wrapper"}>{teams.map(TeamMember)}</div>
      </Team>
    </div>
  );
};

const Index = () => {
  return (
    <div style={{ position: "relative" }}>
      <PageHeader />
      <Main />
      <PageFooter />
    </div>
  );
};
export default Index;

const Banner = styled.div`
  position: relative;
  height: 700px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url(${BannerImg});
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

const JoinButton = styled.div`
  background: #615cfd;
  color: #fff;
  display: inline-block;
  padding: 12px 33px;
  font-family: "Muli", sans-serif;
  font-size: 16px;
  font-weight: 500;
  -webkit-border-radius: 30px;
  -moz-border-radius: 30px;
  border-radius: 30px;
  text-align: center;
  text-transform: capitalize;
  cursor: pointer;
  :hover {
    background: rgba(97, 92, 253, 0.6);
  }
`;

const TopText = styled.div`
  position: relative;
  z-index: 3;
  font-size: 14px;
  font-weight: 500;
  color: #615cfd;
  text-transform: capitalize;
  margin-bottom: 19px;
  display: block;
  font-family: "Roboto", sans-serif;
`;

const ServiceHeader = styled.div`
  font-size: 40px;
  line-height: 52px;
  font-weight: 400;
  color: #1f1f1f;
  position: relative;
  z-index: 0;
  padding-bottom: 15px;
`;

const ServiceWrapper = styled.div`
  margin-top: 10rem;
  display: flex;
  justify-content: space-between;
`;

const Service = styled(ContainerBase)`
  text-align: center;
  margin-top: 12rem;
  min-height: 50rem;
`;

const AboutWrapper = styled.div`
  margin-top: 13rem;
  min-height: 400px;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  > div {
    width: 50vw;
    height: 35vw;
  }
`;

const AboutTopRight = styled.div`
  padding: 13rem 30rem 10rem 10rem;
  h3 {
    color: white;
    font-size: 4rem;
    margin-bottom: 6rem;
  }
  p {
    color: #c9c9c9;
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 14px;
  }
  background: #1f1f1f;
  color: white;
`;

const AboutTopLeft = styled.div`
  padding: 13rem 15rem 10rem 15rem;
  h3 {
    color: black;
    font-size: 4rem;
    margin-bottom: 6rem;
  }
  p {
    font-size: 18px;
    font-family: "Muli", sans-serif;
    color: #1f1f1f;
    font-weight: 400;
    margin-bottom: 25px;
  }
`;

const AboutImage = styled.div<{ image: string }>`
  background-image: url(${(props) => props.image});
  background-size: cover;
  height: 500px;
  background-repeat: no-repeat;
  background-position: center center;
`;

const Team = styled(ContainerBase)`
  text-align: center;
  margin-top: 10rem;
  min-height: 50rem;
  margin-bottom: 20rem;
  .team-wrapper {
    display: flex;
    justify-content: space-between;
    margin-top: 9rem;
  }

  h2 {
    font-size: 40px;
    line-height: 52px;
    font-weight: 400;
    color: #1f1f1f;
    margin-bottom: 5px;
    position: relative;
    z-index: 0;
  }
`;
