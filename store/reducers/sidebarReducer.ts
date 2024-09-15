import { SIDEBAR_OPTIONS, sidebarKeysArray } from "@/constants";
import { type ISidebarKeys, ISidebarReducer } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

function getCurrentActivePage(): ISidebarKeys {
  const path = window.location.pathname;
  const activePage = sidebarKeysArray.find((key) => path.includes(key));
  return activePage || "explore";
}

const initialState = {
  open: true,
  activePage: getCurrentActivePage(),
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
