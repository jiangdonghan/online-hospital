import useAgora from "../../hooks/useAgora";
import { useParams } from "react-router-dom";
import { Button } from "antd";
import MediaPlayer from "../../components/media-player";
import React from "react";
import AgoraRTC from "agora-rtc-sdk-ng";

const client = AgoraRTC.createClient({ codec: "h264", mode: "rtc" });
const appid = "aad5eefdd7f9441aa461f7c0ce824e8c";

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
  return (
    <div>
      <Button onClick={() => join(appid, String(appointmentId))}>Join</Button>
      <Button onClick={() => leave()}>Join</Button>
      <div className="player-container">
        <div className="local-player-wrapper">
          <p className="local-player-text">
            {localVideoTrack && `localTrack`}
            {joinState && localVideoTrack ? `(${client.uid})` : ""}
          </p>
          <MediaPlayer
            videoTrack={localVideoTrack}
            audioTrack={localAudioTrack}
          ></MediaPlayer>
        </div>
        {remoteUsers.map((user) => (
          <div className="remote-player-wrapper" key={user.uid}>
            <p className="remote-player-text">{`remoteVideo(${user.uid})`}</p>
            <MediaPlayer
              videoTrack={user.videoTrack}
              audioTrack={user.audioTrack}
            ></MediaPlayer>
          </div>
        ))}
      </div>
    </div>
  );
};
