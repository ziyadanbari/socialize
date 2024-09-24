import { configureStore } from "@reduxjs/toolkit";
import { registerStepsReducer } from "./reducers/registerReducer";
import { sidebarReducer } from "./reducers/sidebarReducer";
import { postsReducer } from "./reducers/postsReducer";
import { userSearchReducer } from "./reducers/userSearchReducer";
export const store = configureStore({
  reducer: {
    registerStepsReducer,
    sidebarReducer,
    postsReducer,
    userSearchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
