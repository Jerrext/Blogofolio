import { takeLatest, all, call, put } from "redux-saga/effects";
import { ApiResponse } from "apisauce";
import { PayloadAction } from "@reduxjs/toolkit";

import API from "../api";
import {
  activateUser,
  getUserInfo,
  logOutUser,
  setLoggedIn,
  setUserInfo,
  signInUser,
  signUpUser,
} from "../reducers/authSlice";
import {
  ActivateUserPayload,
  SignInUserDataPayload,
  SignUpUserPayload,
} from "../reducers/@types";
import {
  getUserInfoResponse,
  SignInUserResponse,
  SignUpUserResponse,
} from "./@types";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../../utils/constants";
import callCheckingAuth from "./callCheckingAuth";
import { setMyPosts } from "../reducers/postSlice";

function* signUpUserWorker(action: PayloadAction<SignUpUserPayload>) {
  const { data, callback } = action.payload;
  const { ok, problem }: ApiResponse<SignUpUserResponse> = yield call(
    API.signUpUser,
    data
  );
  if (ok) {
    callback();
  } else {
    console.warn("Error sign up user", problem);
  }
}

function* activateUserWorker(action: PayloadAction<ActivateUserPayload>) {
  const { data, callback } = action.payload;
  const { ok, problem }: ApiResponse<undefined> = yield call(
    API.activateUser,
    data
  );
  if (ok) {
    callback();
  } else {
    console.warn("Error activate user", problem);
  }
}

function* signInUserWorker(action: PayloadAction<SignInUserDataPayload>) {
  const { data, callback } = action.payload;
  const {
    ok,
    problem,
    data: responseData,
  }: ApiResponse<SignInUserResponse> = yield call(API.signInUser, data);
  if (responseData && ok) {
    localStorage.setItem(ACCESS_TOKEN_KEY, responseData.access);
    localStorage.setItem(REFRESH_TOKEN_KEY, responseData.refresh);
    yield put(setLoggedIn(true));
    callback();
  } else {
    console.warn("Error sign in user", problem);
  }
}

function* logOutUserWorker() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  yield put(setLoggedIn(false));
  yield put(setUserInfo(null));
  yield put(setMyPosts([]));
}

function* getUserInfoWorker() {
  const { ok, problem, data }: ApiResponse<getUserInfoResponse> =
    yield callCheckingAuth(API.getUserInfo);
  if (data && ok) {
    yield put(setUserInfo(data));
  } else {
    console.warn("Error get user info", problem);
  }
}

export default function* authSaga() {
  yield all([
    takeLatest(signUpUser, signUpUserWorker),
    takeLatest(activateUser, activateUserWorker),
    takeLatest(signInUser, signInUserWorker),
    takeLatest(logOutUser, logOutUserWorker),
    takeLatest(getUserInfo, getUserInfoWorker),
  ]);
}
