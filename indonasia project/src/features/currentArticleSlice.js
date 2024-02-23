import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lockArticle: {
    article: "null",
    catagory: "null",
    percentage: "null",
  },
  unLockArticle: {
    article: "null",
    catagory: "null",
    percentage: "null",
  },
};

export const currentArticleSlice = createSlice({
  name: "current_article",
  initialState,
  reducers: {
    addUnLockArticle: (state, action) => {
      state.unLockArticle.article = action.payload.article;
      state.unLockArticle.catagory = action.payload.catagory;
      state.unLockArticle.percentage = action.payload.percentage;
      localStorage.setItem(
        "unLockArticle",
        JSON.stringify({
          article: action.payload.article,
          catagory: action.payload.catagory,
          percentage: action.payload.percentage,
        })
      );
    },
    addLockArticle: (state, action) => {
        state.lockArticle.article = action.payload.article;
        state.lockArticle.catagory = action.payload.catagory;
        state.lockArticle.percentage = action.payload.percentage;
      localStorage.setItem(
        "lockArticle",
        JSON.stringify({
          article: action.payload.article,
          catagory: action.payload.catagory,
          percentage: action.payload.percentage,
        })
      );
    },
  },
});

export const { addUnLockArticle, addLockArticle } = currentArticleSlice.actions;

export default currentArticleSlice.reducer;
