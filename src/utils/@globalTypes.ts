export type CardType = {
  id: number;
  image: string;
  text: string;
  date: string;
  lesson_num: number;
  title: string;
  description: string;
  author: number;
};

export type CardListType = CardType[];

export enum CardSize {
  Large,
  Medium,
  Small,
}

export enum ButtonType {
  Primary = "Primary",
  Secondary = "Secondary",
  Error = "Error",
}
