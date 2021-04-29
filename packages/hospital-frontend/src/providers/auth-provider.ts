import { User } from "../../../common/model/userModel";
import { LoginForm, RegisterForm } from "../context/auth-context";

const localStorageKey = "user_token";
const apiUrl = process.env.REACT_APP_API_URL;

//暂时使用 local storage 存储 jwt token
export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = (user: User) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: LoginForm) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      const result = await response.json();
      return handleUserResponse(result);
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const register = (data: RegisterForm) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(await response.json());
    }
  });
};

export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
