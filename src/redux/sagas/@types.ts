import { CardListType } from "../../utils/@globalTypes";

export type AllPostsResponse = {
  count: number;
  next: string;
  previous: string;
  results: CardListType;
};

export type SignUpUserResponse = {
  username: string;
  email: string;
  id: number;
};

export type SignInUserResponse = {
  access: string;
  refresh: string;
};

export type getUserInfoResponse = {
  username: string;
  id: number;
  email: string;
};

export type UserInfoResponse = {
  username: string;
  id: number;
  email: string;
};
