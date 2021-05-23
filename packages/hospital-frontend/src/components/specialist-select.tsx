import { Specialist } from "../models";
import { Select } from "antd";
import React from "react";

type SelectProps = React.ComponentProps<typeof Select>;

interface SpecialistSelectProps extends SelectProps {
  defaultoptionname?: string;
  width: string;
}

export const SpecialistSelect = (props: SpecialistSelectProps) => {
  const { defaultoptionname, width } = props;
  const SpecialistOptions = Object.keys(Specialist).map((item) => {
    return (
      <Select.Option key={item} value={item}>
        {item}
      </Select.Option>
    );
  });

  return (
    <Select
      {...props}
      style={{ width: width }}
      defaultValue={defaultoptionname ? defaultoptionname : ""}
    >
      {defaultoptionname ? (
        <Select.Option value={"All"}>{defaultoptionname}</Select.Option>
      ) : null}
      {SpecialistOptions}
    </Select>
  );
};
