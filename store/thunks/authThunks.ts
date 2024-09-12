import { createUser } from "@/actions/createUser";
import { CREATE_USER_FAILED_MESSAGE } from "@/constants";
import { RegisterForm } from "@/types";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const registerStepsSubmit = createAsyncThunk(
  "user/register",
  async (data: RegisterForm, thunkApi) => {
    try {
      const user = await createUser({
        ...data,
      });
      return user;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        error?.message || CREATE_USER_FAILED_MESSAGE
      );
    }
  }
);
