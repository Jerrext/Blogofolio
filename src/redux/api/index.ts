import { create } from "apisauce";
import { ActivateUserData, UserPayloadData } from "../reducers/@types";

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

export default {
  getPosts,
  getPost,
  signUpUser,
  activateUser,
};
