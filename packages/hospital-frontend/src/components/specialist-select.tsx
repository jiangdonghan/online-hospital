import { Specialist } from "../models";
import { Select } from "antd";
import React from "react";

type SelectProps = React.ComponentProps<typeof Select>;

interface SpecialistSelectProps extends SelectProps {
  defaultOptionName?: string;
  width: string;
}

export const SpecialistSelect = (props: SpecialistSelectProps) => {
  const { defaultOptionName, width } = props;
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
      defaultValue={defaultOptionName ? defaultOptionName : ""}
    >
      {defaultOptionName ? (
        <Select.Option value={"All"}>{defaultOptionName}</Select.Option>
      ) : null}
      {SpecialistOptions}
    </Select>
  );
};
