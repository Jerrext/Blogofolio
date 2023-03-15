import { CardListType } from "../../utils/@globalTypes";

export type AllPostsResponse = {
  count: number;
  next: string;
  previous: string;
  results: CardListType;
};
