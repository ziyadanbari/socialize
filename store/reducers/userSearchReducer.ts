import { UserProfile } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = { users: undefined } as {
  users: UserProfile[] | undefined;
};

const userSearch = createSlice({
  name: "userSearch",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<UserProfile[]>) {
      return { users: [...action.payload] };
    },
    addUsers(state, action: PayloadAction<UserProfile[]>) {
      return { users: [...(state.users || []), ...action.payload] };
    },
  },
});

export const { setUsers, addUsers } = userSearch.actions;

export const userSearchReducer = userSearch.reducer;
