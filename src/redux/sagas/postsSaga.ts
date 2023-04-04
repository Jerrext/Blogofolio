import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";

import {
  getAllPosts,
  getMyPosts,
  getSearchPosts,
  getSinglePost,
  setAllPosts,
  setMyPosts,
  setSearchPosts,
  setSinglePost,
} from "../reducers/postSlice";
import API from "../api";
import { AllPostsResponse } from "./@types";
import { CardType } from "../../utils/@globalTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import callCheckingAuth from "./callCheckingAuth";
import { GetAllPostsPayload } from "../reducers/@types";

function* getAllPostsWorker(action: PayloadAction<GetAllPostsPayload>) {
  const { offset, ordering } = action.payload;
  const { ok, data, problem }: ApiResponse<AllPostsResponse> = yield call(
    API.getPosts,
    offset,
    ordering
  );
  if (ok && data) {
    yield put(setAllPosts({ postsCount: data.count, cardList: data.results }));
  } else {
    console.warn("Error getting all posts", problem);
  }
}

function* getSinglePostWorker(action: PayloadAction<string>) {
  const { ok, data, problem }: ApiResponse<CardType> = yield call(
    API.getPost,
    action.payload
  );
  if (ok && data) {
    yield put(setSinglePost(data));
  } else {
    console.warn("Error getting single post", problem);
  }
}

function* getMyPostsWorker() {
  const { ok, problem, data }: ApiResponse<AllPostsResponse> =
    yield callCheckingAuth(API.getMyPosts);
  if (ok && data) {
    yield put(setMyPosts(data.results));
  } else {
    console.warn("Error getting my posts", problem);
  }
}

function* getSearchPostsWorker(action: PayloadAction<string>) {
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
}

export default function* postsSaga() {
  yield all([
    takeLatest(getAllPosts, getAllPostsWorker),
    takeLatest(getSinglePost, getSinglePostWorker),
    takeLatest(getMyPosts, getMyPostsWorker),
    takeLatest(getSearchPosts, getSearchPostsWorker),
  ]);
}
