import useAgora from "../../hooks/useAgora";
import { useHistory, useParams } from "react-router-dom";
import { Button, Modal } from "antd";
import MediaPlayer from "../../components/media-player";
import React, { useEffect, useState } from "react";
import AgoraRTC, {
  ILocalAudioTrack,
  ILocalVideoTrack,
  IRemoteAudioTrack,
  IRemoteVideoTrack,
} from "agora-rtc-sdk-ng";
import styled from "@emotion/styled";
import { success, warning } from "../../hooks/utils";
import { PrescriptionFragment } from "./prescription-fragment";
import { useHttp } from "../../hooks/http";

const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" });
const appid = "aad5eefdd7f9441aa461f7c0ce824e8c";

interface track {
  videoTrack: IRemoteVideoTrack | ILocalVideoTrack | undefined;
  audioTrack: ILocalAudioTrack | IRemoteAudioTrack | undefined;
}
export const VideoChatFragment = () => {
  const {
    localAudioTrack,
    localVideoTrack,
    leave,
    join,
    joinState,
    remoteUsers,
  } = useAgora(client);
  // @ts-ignore
  const { appointmentId } = useParams();
  const history = useHistory();
  const request = useHttp();
  const [largeTrack, setLargeTrack] = useState<track>({
    videoTrack: localVideoTrack,
    audioTrack: localAudioTrack,
  });
  const [smallTrack, setSmallTrack] = useState<track>({
    videoTrack: undefined,
    audioTrack: undefined,
  });
  const [cancelVisible, setCancelVisible] = useState(false);
  useEffect(() => {
    setLargeTrack({
      audioTrack: localAudioTrack,
      videoTrack: localVideoTrack,
    });
    if (remoteUsers && remoteUsers[0]) {
      setSmallTrack({
        videoTrack: remoteUsers[0].videoTrack,
        audioTrack: remoteUsers[0].audioTrack,
      });
    }
  }, [remoteUsers, localVideoTrack, localAudioTrack]);

  const switchScreen = () => {
    if (!(joinState && remoteUsers && remoteUsers[0])) {
      warning("user has not connected");
      return;
    }
    const largeTrackTemp = largeTrack;
    setLargeTrack(smallTrack);
    setSmallTrack(largeTrackTemp);
  };

  const finishMeeting = () => {
    request(`appointment/${appointmentId}/finish`, { method: "POST" })
      .then(() => {
        success("Appointment Finished");
      })
      .then(() => {
        history.replace("/dashboard");
      });
  };

  const ConfirmModal = () => {
    return (
      <Modal
        visible={cancelVisible}
        title={"Confirm"}
        onOk={() => finishMeeting()}
        onCancel={() => {
          setCancelVisible(false);
        }}
      >
        Are you sure you want to finish the appointment
      </Modal>
    );
  };

  return (
    <div>
      <PlayerContainer>
        <LargePlayerWrapper>
          {localVideoTrack ? (
            <MediaPlayer
              videoTrack={largeTrack.videoTrack}
              audioTrack={largeTrack.audioTrack}
            />
          ) : (
            <JoinRequest fontSize={6}>
              <p>Waiting for connect...</p>
            </JoinRequest>
          )}

          <SmallPlayerWrapper>
            {remoteUsers[0] ? (
              <MediaPlayer
                videoTrack={smallTrack.videoTrack}
                audioTrack={smallTrack.audioTrack}
              />
            ) : (
              <JoinRequest fontSize={3}>
                <p>Waiting for connect...</p>
              </JoinRequest>
            )}
          </SmallPlayerWrapper>
          <ToolBar>
            <Button onClick={() => join(appid, String(appointmentId))}>
              Join
            </Button>
            <Button onClick={() => leave()}>Leave</Button>
            <Button onClick={() => switchScreen()}>Switch</Button>
            <Button onClick={() => setCancelVisible(true)}>
              Finish Meeting
            </Button>
          </ToolBar>
          <ConfirmModal />
        </LargePlayerWrapper>

        <RecordWrapper>
          <PrescriptionFragment />
        </RecordWrapper>
      </PlayerContainer>
    </div>
  );
};

const PlayerContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const LargePlayerWrapper = styled.div`
  position: relative;
  width: 80rem;
  height: 60rem;
`;

const SmallPlayerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 30rem;
  height: 22.5rem;
  border: 1px solid #374545;
`;

const JoinRequest = styled.div<{ fontSize: number }>`
  height: 100%;
  width: 100%;
  background: #f1f1f1;
  padding-top: 30%;
  p {
    text-align: center;
    font-size: ${(props) => props.fontSize}rem;
  }
`;

const ToolBar = styled.div`
  background: #716f6f;
  height: 6rem;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const RecordWrapper = styled.div`
  position: relative;
  height: 66rem;
  width: 36rem;
  background: #f1f1f1;
`;
