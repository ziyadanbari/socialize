import { Post } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
} as { posts: Post[] };

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost(state, action: PayloadAction<Post[]>) {
      state.posts = [...state.posts, ...action.payload];
    },
    removePostById(state, action: PayloadAction<string>) {
      state.posts = state.posts.filter((post) => post.id !== action.payload);
    },
    setPosts(state, action: PayloadAction<Post[]>) {
      state.posts = action.payload;
    },
    editPost(state, action: PayloadAction<{ id: string; post: Post }>) {
      const { id, post: updatedPost } = action.payload;
      state.posts = state.posts.map((post) =>
        post.id === id ? updatedPost : post
      );
    },
  },
});

export const { addPost, removePostById, setPosts, editPost } =
  postsSlice.actions;

export const postsReducer = postsSlice.reducer;
