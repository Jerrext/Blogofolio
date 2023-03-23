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
