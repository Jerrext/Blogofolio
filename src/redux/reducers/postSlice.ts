import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardType } from "../../components/Card";

import { RootState } from "../store";

export enum LikeStatus {
  Like = "like",
  Dislike = "dislike",
}

type PostState = {
  postValue: CardType | null;
  isModalPostOpened: boolean;
  likedPosts: CardType[];
  dislikedPosts: CardType[];
};

const initialState: PostState = {
  postValue: null,
  isModalPostOpened: false,
  likedPosts: [],
  dislikedPosts: [],
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    selectPost(state, action: PayloadAction<CardType | null>) {
      state.postValue = action.payload;
    },
    visibilityPost(state, action: PayloadAction<boolean>) {
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
  },
});

export const { selectPost, visibilityPost, setStatus } = postSlice.actions;
export default postSlice.reducer;

export const PostSelectors = {
  getPostValue: (state: RootState) => {
    if (state.post.postValue) {
      return state.post.postValue;
    }
    return {
      id: 0,
      image: "",
      text: "",
      date: "",
      lesson_num: 0,
      title: "",
      description: "",
      author: 0,
    };
  },
  getPostVisibility: (state: RootState) => state.post.isModalPostOpened,
  getLikedPosts: (state: RootState) => state.post.likedPosts,
  getDislikedPosts: (state: RootState) => state.post.dislikedPosts,
};