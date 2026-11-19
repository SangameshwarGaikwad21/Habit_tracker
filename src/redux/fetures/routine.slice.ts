import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "@/lib/axios";
import type { AxiosError } from "axios";

import type {
  RoutineActivity,
  RoutineState,
  SaveRoutinePayload,
} from "@/types/routine";

interface RoutineResponse {
  success: boolean;
  message: string;
  routine: {
    _id?: string;
    userId?: string;
    routine: RoutineActivity[];
  };
}

const initialState: RoutineState = {
  routine: [],
  isLoading: false,
  error: null,
  successMessage: null,
};

// ADD ROUTINE API
export const addRoutine = createAsyncThunk<
  RoutineResponse,
  SaveRoutinePayload,
  { rejectValue: string }
>(
  "routine/addRoutine",
  async (routineData, { rejectWithValue }) => {
    try {
      const response = await axios.post<RoutineResponse>(
        "/routine/add-routine",
        routineData
      );

      if (!response.data.success) {
        return rejectWithValue(
          response.data.message || "Failed to add routine."
        );
      }

      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;

      return rejectWithValue(
        axiosError.response?.data?.message ||
          "Failed to add daily routine."
      );
    }
  }
);

const routineSlice = createSlice({
  name: "routine",
  initialState,

  reducers: {
    addRoutineActivity: (state, action) => {
      state.routine.push(action.payload);
    },

    removeRoutineActivity: (state, action) => {
      state.routine = state.routine.filter(
        (_, index) => index !== action.payload
      );
    },

    updateRoutineActivity: (state, action) => {
      const { index, activity } = action.payload;

      if (state.routine[index]) {
        state.routine[index] = activity;
      }
    },

    setRoutine: (state, action) => {
      state.routine = action.payload;
    },

    clearRoutineMessages: (state) => {
      state.error = null;
      state.successMessage = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(addRoutine.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })

      .addCase(addRoutine.fulfilled, (state, action) => {
        state.isLoading = false;
        state.routine = action.payload.routine.routine;
        state.successMessage = action.payload.message;
      })

      .addCase(addRoutine.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload || "Failed to add routine.";
      });
  },
});

export const {
  addRoutineActivity,
  removeRoutineActivity,
  updateRoutineActivity,
  setRoutine,
  clearRoutineMessages,
} = routineSlice.actions;

export default routineSlice.reducer;
