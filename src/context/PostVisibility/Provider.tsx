import React, { FC, ReactNode } from "react";
import { LikeStatus } from "../../redux/reducers/postSlice";
import { CardListType, CardType } from "../../utils/@globalTypes";
import { PostVisibilityContext } from "./Context";

type PostVisibilityProviderProps = {
  children: ReactNode;
  postVisibility: boolean;
  onChangePostVisibility: (
    post: CardType | null,
    isPostOpened: boolean
  ) => void;
  onChangeStatus: (status: LikeStatus, card: CardType) => void;
  likedPosts: CardListType;
  dislikedPosts: CardListType;
  onChangeBookmarkStatus: (card: CardType) => void;
  bookmarkPosts: CardListType;
};
const PostVisibilityProvider: FC<PostVisibilityProviderProps> = ({
  children,
  postVisibility,
  onChangePostVisibility,
  onChangeStatus,
  likedPosts,
  dislikedPosts,
  onChangeBookmarkStatus,
  bookmarkPosts,
}) => {
  return (
    <PostVisibilityContext.Provider
      value={{
        postVisibility,
        onChangePostVisibility,
        onChangeStatus,
        likedPosts,
        dislikedPosts,
        onChangeBookmarkStatus,
        bookmarkPosts,
      }}
    >
      {children}
    </PostVisibilityContext.Provider>
  );
};

export default PostVisibilityProvider;
