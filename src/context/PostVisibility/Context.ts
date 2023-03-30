import { createContext, useContext } from "react";
import { CardType } from "../../components/Card";
import { LikeStatus } from "../../redux/reducers/postSlice";

const initialState = {
  postVisibility: false,
  onChangePostVisibility: (post: CardType | null, isPostOpened: boolean) => {},
  onChangeStatus: (status: LikeStatus, card: CardType) => {},
  likedPosts: [<CardType>{}],
  dislikedPosts: [<CardType>{}],
  onChangeBookmarkStatus: (card: CardType) => {},
  bookmarkPosts: [<CardType>{}],
};

export const PostVisibilityContext = createContext(initialState);

export const usePostVisibilityContext = () => useContext(PostVisibilityContext);
