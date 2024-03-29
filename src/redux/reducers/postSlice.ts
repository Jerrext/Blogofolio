import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardListType, CardType } from "../../utils/@globalTypes";
import { SEARCH_VALUE } from "../../utils/constants";

import { RootState } from "../store";
import {
  AddPostPayload,
  GetAllPostsPayload,
  GetMyPostsPayload,
  GetSearchPostsPayload,
  SetPostsPayload,
  SetSearchedPostsPayload,
} from "./@types";

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
  myPosts: CardListType;
  searchList: CardListType;
  searchValue: string;
  postsCount: number;
  myPostsCount: number;
  isAllPostsLoading: boolean;
  isSearchPostsLoading: boolean;
  isSinglePostLoading: boolean;
  searchedPostsCount: number;
};

const initialState: PostState = {
  postValue: null,
  isModalPostOpened: false,
  likedPosts: [],
  dislikedPosts: [],
  savedPosts: [],
  postsList: [],
  singlePost: null,
  myPosts: [],
  searchList: [],
  searchValue: "",
  postsCount: 0,
  myPostsCount: 0,
  isAllPostsLoading: false,
  isSearchPostsLoading: false,
  isSinglePostLoading: false,
  searchedPostsCount: 0,
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    getAllPosts: (_, __: PayloadAction<GetAllPostsPayload>) => {},
    setAllPosts: (
      state,
      { payload: { postsCount, cardList } }: PayloadAction<SetPostsPayload>
    ) => {
      state.postsList = cardList;
      state.postsCount = postsCount;
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
    getMyPosts(_, __: PayloadAction<GetMyPostsPayload>) {},
    setMyPosts(
      state,
      { payload: { postsCount, cardList } }: PayloadAction<SetPostsPayload>
    ) {
      state.myPosts = cardList;
      state.myPostsCount = postsCount;
    },
    getSearchPosts(state, action: PayloadAction<GetSearchPostsPayload>) {
      state.searchValue = action.payload.searchValue;
    },
    setSearchPosts(state, action: PayloadAction<SetSearchedPostsPayload>) {
      const { isOverwrite, cardList, postsCount } = action.payload;
      state.searchedPostsCount = postsCount;
      if (isOverwrite) {
        state.searchList = cardList;
      } else {
        state.searchList.push(...cardList);
      }
    },
    addNewPost: (_, __: PayloadAction<AddPostPayload>) => {},
    setAllPostsLoading: (state, action: PayloadAction<boolean>) => {
      state.isAllPostsLoading = action.payload;
    },
    setSearchPostsLoading: (state, action: PayloadAction<boolean>) => {
      state.isSearchPostsLoading = action.payload;
    },
    setSinglePostLoading: (state, action: PayloadAction<boolean>) => {
      state.isSinglePostLoading = action.payload;
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
  getMyPosts,
  setMyPosts,
  getSearchPosts,
  setSearchPosts,
  addNewPost,
  setAllPostsLoading,
  setSearchPostsLoading,
  setSinglePostLoading,
} = postSlice.actions;
export default postSlice.reducer;
export const postName = postSlice.name;

export const PostSelectors = {
  getPostValue: (state: RootState) => state.post.postValue,
  getPostVisibility: (state: RootState) => state.post.isModalPostOpened,
  getLikedPosts: (state: RootState) => state.post.likedPosts,
  getDislikedPosts: (state: RootState) => state.post.dislikedPosts,
  getBookmarkPosts: (state: RootState) => state.post.savedPosts,
  getAllPosts: (state: RootState) => state.post.postsList,
  getSinglePost: (state: RootState) => state.post.singlePost,
  getMyPosts: (state: RootState) => state.post.myPosts,
  getSearchValue: (state: RootState) => state.post.searchValue,
  getSearchPosts: (state: RootState) => state.post.searchList,
  getAllPostsCount: (state: RootState) => state.post.postsCount,
  getMyPostsCount: (state: RootState) => state.post.myPostsCount,
  getAllPostsLoading: (state: RootState) => state.post.isAllPostsLoading,
  getSearchPostsLoading: (state: RootState) => state.post.isSearchPostsLoading,
  getSinglePostLoading: (state: RootState) => state.post.isSinglePostLoading,
  getSearchedPostsCount: (state: RootState) => state.post.searchedPostsCount,
};
