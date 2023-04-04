import { CardListType } from "../../utils/@globalTypes";

export type PayloadWithCallback<Data> = {
  data: Data;
  callback: () => void;
};

export type UserPayloadData = {
  username: string;
  email: string;
  password: string;
};

export type ActivateUserData = {
  uid: string;
  token: string;
};

export type SignInUserData = {
  email: string;
  password: string;
};

export type SignUpUserPayload = PayloadWithCallback<UserPayloadData>;
export type ActivateUserPayload = PayloadWithCallback<ActivateUserData>;
export type SignInUserDataPayload = PayloadWithCallback<SignInUserData>;

export type GetAllPostsPayload = {
  offset: number;
  ordering?: string;
};

export type SetAllPostsPayload = {
  cardList: CardListType;
  postsCount: number;
};