import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchUser from "../services/fetchUser";
import { UserData } from "@/lib/utils";

export const getUserData = createAsyncThunk("auth/getUserData", async () => {
  try {
    const userData = await fetchUser();
    return userData;
  } catch (error: any) {
    console.error("Error fetching user data:", error);
    throw new Error("Error fetching user data:", error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null as UserData | null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state) => {
      const newState = { ...state, loading: true };
      return newState;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      const newState = { ...state, user: action.payload, loading: false };
      return newState;
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
