import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import {
  addNewPost,
  getAllPosts,
  getMyPosts,
  getSearchPosts,
  getSinglePost,
  setAllPosts,
  setAllPostsLoading,
  setMyPosts,
  setSearchPosts,
  setSearchPostsLoading,
  setSinglePost,
  setSinglePostLoading,
} from "../reducers/postSlice";
import API from "../api";
import { AllPostsResponse } from "./@types";
import { CardType } from "../../utils/@globalTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import callCheckingAuth from "./callCheckingAuth";
import {
  AddPostPayload,
  GetAllPostsPayload,
  GetMyPostsPayload,
} from "../reducers/@types";

function* getAllPostsWorker(action: PayloadAction<GetAllPostsPayload>) {
  yield put(setAllPostsLoading(true));
  const { offset, ordering } = action.payload;
  const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield call(
    API.getPosts,
    offset,
    undefined,
    ordering
  );
  if (ok && data) {
    yield put(setAllPosts({ postsCount: data.count, cardList: data.results }));
  } else {
    console.warn("Error getting all posts", problem);
  }
  yield put(setAllPostsLoading(false));
}

function* getSinglePostWorker(action: PayloadAction<string>) {
  yield put(setSinglePostLoading(true));
  const { ok, data, problem }: ApiResponse<CardType> = yield call(
    API.getPost,
    action.payload
  );
  if (ok && data) {
    yield put(setSinglePost(data));
  } else {
    console.warn("Error getting single post", problem);
  }
  yield put(setSinglePostLoading(false));
}

function* getMyPostsWorker(action: PayloadAction<GetMyPostsPayload>) {
  const { offset } = action.payload;
  const { ok, problem, data }: ApiResponse<AllPostsResponse> =
    yield callCheckingAuth(API.getMyPosts, offset);
  if (ok && data) {
    yield put(setMyPosts({ postsCount: data.count, cardList: data.results }));
  } else {
    console.warn("Error getting my posts", problem);
  }
}

function* getSearchPostsWorker(action: PayloadAction<string>) {
  yield put(setSearchPostsLoading(true));
  const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield call(
    API.getPosts,
    0,
    action.payload
  );
  if (ok && data) {
    yield put(setSearchPosts(data.results));
  } else {
    console.warn("Error getting search posts", problem);
  }
  yield put(setSearchPostsLoading(false));
}

function* addNewPostWorker(action: PayloadAction<AddPostPayload>) {
  const { data, callback } = action.payload;
  const { ok, problem }: ApiResponse<undefined> = yield callCheckingAuth(
    API.addNewPost,
    data
  );
  if (ok) {
    callback();
  } else {
    console.warn("Error adding post", problem);
  }
}

export default function* postsSaga() {
  yield all([
    takeLatest(getAllPosts, getAllPostsWorker),
    takeLatest(getSinglePost, getSinglePostWorker),
    takeLatest(getMyPosts, getMyPostsWorker),
    takeLatest(getSearchPosts, getSearchPostsWorker),
    takeLatest(addNewPost, addNewPostWorker),
  ]);
}
