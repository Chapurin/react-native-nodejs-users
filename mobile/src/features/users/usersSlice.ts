import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import api from "../../services/api/client";
import { RootState } from "../../store";

interface User {
  email: string;
}

interface UsersState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/users");
      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            error.message ||
            "Failed to fetch users",
        );
      } else if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error occurred");
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearUsers(state) {
      state.users = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearUsers } = usersSlice.actions;

export const selectAllUsers = (state: RootState) => state.users.users;
export const selectUsersStatus = (state: RootState) => state.users.status;
export const selectUsersError = (state: RootState) => state.users.error;

export default usersSlice.reducer;
