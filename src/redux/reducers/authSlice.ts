import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";
import { getUserInfoResponse } from "../sagas/@types";

import { RootState } from "../store";
import {
  ActivateUserPayload,
  SignUpUserPayload,
  SignInUserDataPayload,
} from "./@types";

type AuthState = {
  isLoggedIn: boolean;
  userInfo: getUserInfoResponse | null;
};

const initialState: AuthState = {
  isLoggedIn: !!localStorage.getItem(ACCESS_TOKEN_KEY),
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUpUser: (_, __: PayloadAction<SignUpUserPayload>) => {},
    activateUser: (_, __: PayloadAction<ActivateUserPayload>) => {},
    signInUser: (_, __: PayloadAction<SignInUserDataPayload>) => {},
    logOutUser: (_, __: PayloadAction<undefined>) => {},
    setLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    getUserInfo: (_, __: PayloadAction<undefined>) => {},
    setUserInfo: (state, action: PayloadAction<getUserInfoResponse | null>) => {
      state.userInfo = action.payload;
    },
  },
});

export const {
  signUpUser,
  activateUser,
  signInUser,
  logOutUser,
  setLoggedIn,
  getUserInfo,
  setUserInfo,
} = authSlice.actions;
export default authSlice.reducer;
export const authName = authSlice.name;

export const AuthSelectors = {
  getLoggedIn: (state: RootState) => state.auth.isLoggedIn,
  getUserName: (state: RootState) => state.auth.userInfo?.username,
};
