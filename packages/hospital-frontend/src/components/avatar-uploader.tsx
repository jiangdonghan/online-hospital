import { Upload } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { error, success } from "../hooks/utils";
import ImgCrop from "antd-img-crop";
import styled from "@emotion/styled";
const apiUrl = process.env.REACT_APP_API_URL;
const path = process.env.REACT_APP_SOURCE_PATH;

// function getBase64(img: any, callback: any) {
//   const reader = new FileReader();
//   reader.addEventListener("load", () => callback(reader.result));
//   reader.readAsDataURL(img);
// }

function beforeUpload(file: any) {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
}

export const ImageUploader = ({
  api,
  imageUrl,
  setImageUrl,
}: {
  api: string;
  imageUrl: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [loading, setLoading] = useState(false);
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>
        {imageUrl ? "Update Image" : "Upload Image"}
      </div>
    </div>
  );

  const handleChange = (info: any) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      setImageUrl(info.file.response.image);
      success("Successfully uploaded");
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      {imageUrl ? (
        <img
          src={`${path}/${imageUrl}`}
          alt="avatar"
          style={{ width: "100%" }}
        />
      ) : null}
      <ImgCrop rotate>
        <Upload
          name="image"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action={`${apiUrl}/${api}`}
          beforeUpload={beforeUpload}
          onChange={handleChange}
        >
          {uploadButton}
        </Upload>
      </ImgCrop>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 200px;
  height: 200px;
  img {
    margin-right: 2rem;
    width: 100%;
    height: 100%;
  }
`;
