import { create } from "apisauce";
import {
  ActivateUserData,
  SignInUserData,
  UserPayloadData,
} from "../reducers/@types";

const API = create({
  baseURL: "https://studapi.teachmeskills.by",
});

const getPosts = () => {
  return API.get("/blog/posts/", { limit: 12 });
};

const getPost = (id: string) => {
  return API.get(`/blog/posts/${id}/`);
};

const signUpUser = (data: UserPayloadData) => {
  return API.post("/auth/users/", data);
};

const activateUser = (data: ActivateUserData) => {
  return API.post("/auth/users/activation/", data);
};

const signInUser = (data: SignInUserData) => {
  return API.post("/auth/jwt/create/", data);
};

const getUserInfo = (token: string) => {
  return API.get(
    "/auth/users/me/",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

const verifyToken = (token: string) => {
  return API.post("/auth/jwt/verify/", { token });
};

const refreshToken = (refresh: string) => {
  return API.post("/auth/jwt/refresh/", { refresh });
};

const getMyPosts = (token: string) => {
  return API.get(
    "/blog/posts/my_posts/",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default {
  getPosts,
  getPost,
  signUpUser,
  activateUser,
  signInUser,
  getUserInfo,
  verifyToken,
  refreshToken,
  getMyPosts,
};
