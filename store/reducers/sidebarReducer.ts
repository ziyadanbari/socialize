import { SIDEBAR_OPTIONS } from "@/constants";
import { ISidebarKeys, ISidebarReducer } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  open: true,
  activePage: "explore",
  pages: SIDEBAR_OPTIONS,
} as ISidebarReducer;

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setActivePage(state, action: PayloadAction<ISidebarKeys>) {
      state.activePage = action.payload;
    },
  },
});

export const { setActivePage } = sidebarSlice.actions;

export const sidebarReducer = sidebarSlice.reducer;
