import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardListType, CardType } from "../../utils/@globalTypes";

import { RootState } from "../store";

export enum LikeStatus {
  Like = "like",
  Dislike = "dislike",
}

type PostState = {
  postValue: CardType | null;
  isModalPostOpened: boolean;
  likedPosts: CardListType;
  dislikedPosts: CardListType;
  savedPosts: CardListType;
  postsList: CardListType;
  singlePost: CardType | null;
};

const initialState: PostState = {
  postValue: null,
  isModalPostOpened: false,
  likedPosts: [],
  dislikedPosts: [],
  savedPosts: [],
  postsList: [],
  singlePost: null,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getAllPosts: (_, __: PayloadAction<undefined>) => {},
    setAllPosts: (state, action: PayloadAction<CardListType>) => {
      state.postsList = action.payload;
    },
    getSinglePost: (_, __: PayloadAction<string>) => {},
    setSinglePost: (state, action: PayloadAction<CardType | null>) => {
      state.singlePost = action.payload;
    },
    setSelectedPost(state, action: PayloadAction<CardType | null>) {
      state.postValue = action.payload;
    },
    setPostVisibility(state, action: PayloadAction<boolean>) {
      state.isModalPostOpened = action.payload;
    },
    setStatus(
      state,
      action: PayloadAction<{ status: LikeStatus; card: CardType }>
    ) {
      const { status, card } = action.payload;

      const likedIndex = state.likedPosts.findIndex(
        (post) => post.id === card.id
      );
      const dislikedIndex = state.dislikedPosts.findIndex(
        (post) => post.id === card.id
      );

      const isLike = status === LikeStatus.Like;

      const mainKey = isLike ? "likedPosts" : "dislikedPosts";
      const secondaryKey = isLike ? "dislikedPosts" : "likedPosts";
      const mainIndex = isLike ? likedIndex : dislikedIndex;
      const secondaryIndex = isLike ? dislikedIndex : likedIndex;

      if (mainIndex === -1) {
        state[mainKey].push(card);
      } else {
        state[mainKey].splice(mainIndex, 1);
      }

      if (secondaryIndex > -1) {
        state[secondaryKey].splice(secondaryIndex, 1);
      }
    },
    setBookmarkStatus(state, action: PayloadAction<CardType>) {
      const bookmarkIndex = state.savedPosts.findIndex(
        (post) => action.payload.id === post.id
      );

      if (bookmarkIndex === -1) {
        state.savedPosts.push(action.payload);
      } else {
        state.savedPosts.splice(bookmarkIndex, 1);
      }
    },
  },
});

export const {
  setSelectedPost,
  setPostVisibility,
  setStatus,
  setBookmarkStatus,
  getAllPosts,
  setAllPosts,
  getSinglePost,
  setSinglePost,
} = postSlice.actions;
export default postSlice.reducer;

export const PostSelectors = {
  getPostValue: (state: RootState) => state.post.postValue,
  getPostVisibility: (state: RootState) => state.post.isModalPostOpened,
  getLikedPosts: (state: RootState) => state.post.likedPosts,
  getDislikedPosts: (state: RootState) => state.post.dislikedPosts,
  getBookmarkPosts: (state: RootState) => state.post.savedPosts,
  getAllPosts: (state: RootState) => state.post.postsList,
  getSinglePost: (state: RootState) => state.post.singlePost,
};
