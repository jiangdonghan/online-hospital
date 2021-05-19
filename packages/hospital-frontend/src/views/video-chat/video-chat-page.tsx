import React from "react";
import { ContainerBase, PageHeader } from "../../components/page-header";
import PageFooter from "../../components/page-footer";
import { VideoChatFragment } from "./video-chat-fragment";
import styled from "@emotion/styled";

export const VideoChatPage = () => {
  return (
    <>
      <PageHeader />
      <VideoWrapper>
        <VideoChatFragment />
      </VideoWrapper>
      <PageFooter />
    </>
  );
};

const VideoWrapper = styled(ContainerBase)`
  min-height: 70rem;
`;
