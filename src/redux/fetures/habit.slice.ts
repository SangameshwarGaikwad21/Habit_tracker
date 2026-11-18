import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import type { AxiosError } from "axios";

import type {
  Habit,
  HabitState,
  CreateHabitPayload,
} from "@/types/habit";

interface CreateHabitResponse {
  success: boolean;
  message: string;
  habit: Habit;
}

const initialState: HabitState = {
  habits: [],
  isLoading: false,
  isFetching: false,
  isUpdating: false,
  deletingHabitId: null,
  error: null,
  successMessage: null,
};


export const createHabit = createAsyncThunk<
  CreateHabitResponse,
  CreateHabitPayload,
  { rejectValue: string }
>("habit/createHabit", async (habitData, { rejectWithValue }) => {
  try {
    const response = await axios.post<CreateHabitResponse>(
      "/habit/add-habit",
      habitData
    );

    if (!response.data.success) {
      return rejectWithValue(response.data.message || "Failed to create habit.");
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ message?: string }>;

    return rejectWithValue(
      axiosError.response?.data?.message ||
        "Something went wrong while creating your habit."
    );
  }
});

const habitSlice = createSlice({
  name: "habit",
  initialState,

  reducers: {
    clearHabitMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // PENDING
      .addCase(createHabit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })

      // SUCCESS
      .addCase(createHabit.fulfilled, (state, action) => {
        state.isLoading = false;

        state.habits.unshift(action.payload.habit);

        state.successMessage = action.payload.message;
      })

      // ERROR
      .addCase(createHabit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to create habit.";
      });
  },
});

export const { clearHabitMessages } = habitSlice.actions;

export default habitSlice.reducer;