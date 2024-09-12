import { IRegisterStepsReducer } from "@/types";
import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { registerStepsSubmit } from "../thunks/authThunks";
import { CREATE_USER_FAILED_MESSAGE } from "@/constants";

const initialState = {
  currentStep: 1,
  userCreated: false,
  isFinish: false,
} as IRegisterStepsReducer;

export const registerStepsReducer = createSlice({
  name: "registerReducer",
  initialState,
  reducers: {
    setFirstStepData(
      state,
      payload: PayloadAction<
        Pick<
          IRegisterStepsReducer,
          "email" | "password" | "firstname" | "lastname"
        >
      >
    ) {
      state = { ...state, ...payload, currentStep: 2 };
    },
    setSecondStepData(
      state,
      payload: PayloadAction<
        Pick<IRegisterStepsReducer, "username" | "profile_pic">
      >
    ) {
      state = { ...state, ...payload, currentStep: 3 };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerStepsSubmit.fulfilled, (state, action) => {
      state.userCreated = action.payload.created;
    });
    builder.addCase(registerStepsSubmit.rejected, (state, action) => {
      state.error = action.error.message || CREATE_USER_FAILED_MESSAGE;
    });
    builder.addMatcher(
      isAnyOf(registerStepsSubmit.fulfilled, registerStepsSubmit.rejected),
      (state) => {
        // Set isFinish to true for both fulfilled and rejected cases
        state.isFinish = true;
      }
    );
  },
});
