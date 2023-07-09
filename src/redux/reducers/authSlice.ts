import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { RootState } from "../store";
import { ActivateUserPayload, SignUpUserPayload } from "./@types";

const initialState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUpUser: (_, __: PayloadAction<SignUpUserPayload>) => {},
    activateUser: (_, __: PayloadAction<ActivateUserPayload>) => {},
  },
});

export const { signUpUser, activateUser } = authSlice.actions;
export default authSlice.reducer;

export const AuthSelectors = {
  getThemeValue: (state: RootState) => state.theme.themeValue,
};
