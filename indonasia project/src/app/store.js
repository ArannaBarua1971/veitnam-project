import { configureStore } from "@reduxjs/toolkit";
import currentUserSlice from "../features/currentUserSlice";
import currentArticleSlice from "../features/currentArticleSlice";

export const store = configureStore({
  reducer: {
    userData: currentUserSlice,
    articleData: currentArticleSlice,
  },
});
