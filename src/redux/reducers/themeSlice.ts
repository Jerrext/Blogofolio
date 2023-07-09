import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Theme } from "../../context/Theme/Context";
import { RootState } from "../store";

const initialState = {
  themeValue: Theme.Light,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (state, action: PayloadAction<Theme>) => {
      state.themeValue = action.payload;
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;

export const ThemeSelectors = {
  getThemeValue: (state: RootState) => state.theme.themeValue,
};

// const changeThemeAction = (payload) => {
//   return {
//     type: "CHANGE_THEME",
//     payload,
//   };
// };

// const themeReducer = (state, action) => {
//     switch (action.type) {
//       case 'CHANGE_THEME':
//         return {...state, theme: action.payload}
//       default:
//         return state
//     }
// }

// const Comp = () => {
//   const dispatch = useDispatch()

//   const onChangeTheme = () => {
//     dispatch(changeThemeAction('DARK'))
//   }
// }
