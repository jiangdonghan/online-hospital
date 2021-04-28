import { message } from "antd";

export const resetRoute = () => (window.location.href = window.location.origin);

export const info = (info: string) => {
  message.info(info);
};

export const success = (s: string) => {
  message.success(s);
};

export const error = (s: string) => {
  message.error(s);
};

export const warning = (s: string) => {
  message.warning(s);
};
