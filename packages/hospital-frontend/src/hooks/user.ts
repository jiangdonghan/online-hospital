import * as auth from "../providers/auth-provider";
const jwt = require("jsonwebtoken");

export const getUser = () => {
  const token = auth.getToken();
  if (token) {
    return jwt.decode(token);
  }
  return "";
};
