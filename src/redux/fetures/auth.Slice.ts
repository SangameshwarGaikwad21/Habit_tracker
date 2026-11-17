import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import type { AxiosError } from "axios";

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

interface LoginPayload {
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

interface LoginResponse {
  success: boolean;
  requiresOtp: boolean;
  message: string;
  email: string;
}

interface AuthState {
  user: RegisteredUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
  pendingEmail: string | null;
  requiresOtp: boolean;
}

interface UserProfileResponse {
  success: boolean;
  message: string;
  user: RegisteredUser;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  successMessage: null,
  pendingEmail: null,
  requiresOtp: false,
};

export const registerUser = createAsyncThunk<RegisterResponse,RegisterPayload,{ rejectValue: string }>(
  "auth/register",
  async (userData, { rejectWithValue }) => {
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
  }
);

export const loginUser = createAsyncThunk<LoginResponse,LoginPayload, { rejectValue: string }>(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post<LoginResponse>(
        "/users/login",
        userData
      );

      if (!response.data.success) {
        return rejectWithValue(
          response.data.message || "Login failed."
        );
      }

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ||
          "Invalid email or password. Please try again."
      );
    }
  }
);

export const UserProfile = createAsyncThunk<UserProfileResponse, void, { rejectValue: string }>(
  "auth/userProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<UserProfileResponse>("/users/profile");

      if (!response.data.success) {
        return rejectWithValue(
          response.data.message || "Failed to fetch user profile."
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
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    clearAuthMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    });

    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.successMessage = action.payload.message;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error =
        action.payload || "Registration failed. Please try again.";
    });

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
      state.successMessage = null;
    });

    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.pendingEmail = action.payload.email;
      state.requiresOtp = action.payload.requiresOtp;
      state.successMessage = action.payload.message;

      // Do not authenticate the user yet.
      state.isAuthenticated = false;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.error =
        action.payload || "Login failed. Please try again.";
    });

    // USER PROFILE PENDING
    builder.addCase(UserProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });

    // USER PROFILE SUCCESS
    builder.addCase(UserProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    });

    // USER PROFILE FAILED
    builder.addCase(UserProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error =
        action.payload || "Failed to fetch user profile.";
    });
  },
});

export const { clearAuthMessages, logout } = authSlice.actions;

export default authSlice.reducer;
