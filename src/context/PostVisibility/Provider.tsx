import React, { FC, ReactNode } from "react";
import { CardType } from "../../components/Card";
import { LikeStatus } from "../../redux/reducers/postSlice";
import { PostVisibilityContext } from "./Context";

type PostVisibilityProviderProps = {
  children: ReactNode;
  postVisibility: boolean;
  onChangePostVisibility: (
    post: CardType | null,
    isPostOpened: boolean
  ) => void;
  onChangeStatus: (status: LikeStatus, card: CardType) => void;
  likedPosts: CardType[];
  dislikedPosts: CardType[];
  onChangeBookmarkStatus: (card: CardType) => void;
  bookmarkPosts: CardType[];
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
