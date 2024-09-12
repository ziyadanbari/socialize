import { combineReducers } from "@reduxjs/toolkit";
import { registerStepsReducer } from "./registerReducer";

export const rootReducer = combineReducers({
  registerStepsReducer,
});
