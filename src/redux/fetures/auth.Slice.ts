import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import type { AxiosError } from "axios";

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

interface RegisteredUser {
  id: string;
  username: string;
  email: string;
  isVerified: boolean;
}

interface RegisterResponse {
  success: boolean;
  message: string;
  user: RegisteredUser;
}

interface AuthState {
  user: RegisteredUser | null;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  successMessage: null,
};

export const registerUser = createAsyncThunk<
  RegisterResponse,
  RegisterPayload,
  { rejectValue: string }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post<RegisterResponse>(
      "/users/signup",
      userData
    );

    if (!response.data.success) {
      return rejectWithValue(
        response.data.message || "Registration failed."
      );
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data?.message ||
        "Something went wrong. Please try again."
    );
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.successMessage = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || "Registration failed. Please try again.";
      });
  },
});

export const { clearAuthMessages } = authSlice.actions;

export default authSlice.reducer;
