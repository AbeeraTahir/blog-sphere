import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fetchUser from "../services/fetchUser";
import { UserData } from "@/lib/utils";

export const getUserData = createAsyncThunk<UserData, void>(
  "auth/getUserData",
  async () => {
    try {
      const userData = await fetchUser();
      return userData;
    } catch (error: any) {
      console.error("Error fetching user data:", error);
      throw new Error("Error fetching user data:", error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null as UserData | null,
    loading: false,
    error: null as string | null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getUserData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.loading = false;
      state.user = null;
      state.error = action.error.message ?? "Unknown error";
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
