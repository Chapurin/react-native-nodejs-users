import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import api, { ApiError } from "../../services/api/client";
import { storeToken, getToken, removeToken } from "../../services/storage/auth";

interface AuthState {
  token?: string;
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
}

const initialState: AuthState = {
  token: undefined,
  status: "idle",
  error: undefined,
};

const handleAuthSuccess = async (response: any) => {
  const { token } = response.data.data;
  await storeToken(token);
  return token;
};

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const token = await getToken();
  return { token };
});

export const register = createAsyncThunk(
  "auth/register",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post("/auth/register", credentials);
      const token = await handleAuthSuccess(response);
      return { token };
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      return rejectWithValue({
        message:
          axiosError.response?.data?.message ||
          axiosError.message ||
          "Registration failed",
        statusCode: axiosError.response?.status,
      });
    }
  },
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.post("/auth/login", credentials);
      const token = await handleAuthSuccess(response);
      return { token };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Обработка ошибок Axios
        const message = error.response?.data?.message || error.message;
        return rejectWithValue(message || "Login failed");
      } else if (error instanceof Error) {
        // Обработка нативных ошибок JavaScript
        return rejectWithValue(error.message);
      }
      return rejectWithValue("Unknown error occurred during login");
    }
  },
);

export const logout = createAsyncThunk("auth/logout", async () => {
  await removeToken();
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError: (state) => {
      state.error = undefined;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.token = action.payload.token || undefined;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = undefined;
      });
  },
});

export default authSlice.reducer;

export const { clearAuthError } = authSlice.actions;
