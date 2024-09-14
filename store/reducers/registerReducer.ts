import { ICreationUserStatus, IRegisterStepsReducer } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  userCreated: false,
} as IRegisterStepsReducer;

const registerStepsSlice = createSlice({
  name: "registerReducer",
  initialState,
  reducers: {
    setFirstStepData(
      state,
      action: PayloadAction<
        Pick<
          IRegisterStepsReducer,
          "email" | "password" | "firstname" | "lastname"
        >
      >
    ) {
      const { email, password, firstname, lastname } = action.payload;

      Object.assign(state, {
        email,
        password,
        firstname,
        lastname,
      });
    },
    setSecondStepData(
      state,
      action: PayloadAction<
        Pick<IRegisterStepsReducer, "username" | "profilePic">
      >
    ) {
      const { username, profilePic } = action.payload;
      state.username = username;
      state.profilePic = profilePic;
    },
    setCurrentStep(state, action: PayloadAction<number>) {
      state.currentStep = action.payload;
    },
    setCreationUserStatus(state, action: PayloadAction<ICreationUserStatus>) {
      state.userCreated = action.payload.userCreated;
      state.error = action.payload.error || "";
    },
  },
});

export const { setFirstStepData, setSecondStepData, setCurrentStep } =
  registerStepsSlice.actions;
export const registerStepsReducer = registerStepsSlice.reducer;
