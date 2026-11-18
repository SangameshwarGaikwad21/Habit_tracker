
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import type { AxiosError } from "axios";

import type {
  Habit,
  HabitState,
  CreateHabitPayload,
} from "@/types/habit";

// API response types
interface HabitResponse {
  success: boolean;
  message: string;
  habit?: Habit;
  task?: Habit | Habit[];
}

interface UpdateHabitPayload {
  id: string;
  title: string;
}

interface DeleteHabitPayload {
  id: string;
}

interface DeleteHabitResponse {
  id: string;
  message: string;
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

// Common error handler
const getErrorMessage = (
  error: unknown,
  fallback: string
): string => {
  const axiosError = error as AxiosError<{ message?: string }>;

  return (
    axiosError.response?.data?.message || fallback
  );
};

// ==================================
// 1. CREATE HABIT
// POST /api/habit/add-habit
// ==================================

export const createHabit = createAsyncThunk<
  HabitResponse,
  CreateHabitPayload,
  { rejectValue: string }
>(
  "habit/createHabit",
  async (habitData, { rejectWithValue }) => {
    try {
      const response = await axios.post<HabitResponse>(
        "/habit/add-habit",
        habitData
      );

      if (!response.data.success || !response.data.habit) {
        return rejectWithValue(
          response.data.message || "Failed to create habit."
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to create habit.")
      );
    }
  }
);

// ==================================
// 2. FETCH ALL HABITS
// GET /api/habit/show-habit
// ==================================

export const fetchHabits = createAsyncThunk<
  Habit[],
  void,
  { rejectValue: string }
>(
  "habit/fetchHabits",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<HabitResponse>(
        "/habit/show-habit"
      );

      if (!response.data.success || !Array.isArray(response.data.task)) {
        return rejectWithValue(
          response.data.message || "Failed to fetch habits."
        );
      }

      return response.data.task;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to fetch habits.")
      );
    }
  }
);

// ==================================
// 3. UPDATE HABIT
// PATCH /api/habit/:id
// ==================================

export const updateHabit = createAsyncThunk<
  HabitResponse,
  UpdateHabitPayload,
  { rejectValue: string }
>(
  "habit/updateHabit",
  async ({ id, title }, { rejectWithValue }) => {
    try {
      const response = await axios.patch<HabitResponse>(
        `/habit/${id}`,
        { title }
      );

      if (!response.data.success || !response.data.task) {
        return rejectWithValue(
          response.data.message || "Failed to update habit."
        );
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to update habit.")
      );
    }
  }
);

// ==================================
// 4. DELETE HABIT
// DELETE /api/habit/:id
// ==================================

export const deleteHabit = createAsyncThunk<
  DeleteHabitResponse,
  DeleteHabitPayload,
  { rejectValue: string }
>(
  "habit/deleteHabit",
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await axios.delete<HabitResponse>(
        `/habit/${id}`
      );

      if (!response.data.success) {
        return rejectWithValue(
          response.data.message || "Failed to delete habit."
        );
      }

      return {
        id,
        message: response.data.message,
      };
    } catch (error) {
      return rejectWithValue(
        getErrorMessage(error, "Failed to delete habit.")
      );
    }
  }
);

// ==================================
// HABIT SLICE
// ==================================

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

      // CREATE
      .addCase(createHabit.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(createHabit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.habits.unshift(action.payload.habit!);
        state.successMessage = action.payload.message;
      })

      .addCase(createHabit.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Failed to create habit.";
      })

      // FETCH
      .addCase(fetchHabits.pending, (state) => {
        state.isFetching = true;
        state.error = null;
      })

      .addCase(fetchHabits.fulfilled, (state, action) => {
        state.isFetching = false;
        state.habits = action.payload;
      })

      .addCase(fetchHabits.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload || "Failed to fetch habits.";
      })

      // UPDATE
      .addCase(updateHabit.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(updateHabit.fulfilled, (state, action) => {
        state.isUpdating = false;

        const updatedHabit = action.payload.task;

        if (updatedHabit && !Array.isArray(updatedHabit)) {
          const index = state.habits.findIndex(
            (habit) => habit._id === updatedHabit._id
          );

          if (index !== -1) {
            state.habits[index] = updatedHabit;
          }
        }

        state.successMessage = action.payload.message;
      })

      .addCase(updateHabit.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload || "Failed to update habit.";
      })

      // DELETE
      .addCase(deleteHabit.pending, (state, action) => {
        state.deletingHabitId = action.meta.arg.id;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(deleteHabit.fulfilled, (state, action) => {
        state.deletingHabitId = null;

        state.habits = state.habits.filter(
          (habit) => habit._id !== action.payload.id
        );

        state.successMessage = action.payload.message;
      })

      .addCase(deleteHabit.rejected, (state, action) => {
        state.deletingHabitId = null;
        state.error = action.payload || "Failed to delete habit.";
      });
  },
});

export const { clearHabitMessages } = habitSlice.actions;

export default habitSlice.reducer;
