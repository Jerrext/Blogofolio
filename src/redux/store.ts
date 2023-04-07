import { combineReducers, configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";

import themeReducer, { themeName } from "./reducers/themeSlice";
import postReducer, { postName } from "./reducers/postSlice";
import authReducer, { authName } from "./reducers/authSlice";
import rootSaga from "./sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  [themeName]: themeReducer,
  [postName]: postReducer,
  [authName]: authReducer,
});

// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
// export let persistor = persistStore(store);

export default store;
