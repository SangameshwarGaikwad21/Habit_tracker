import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./fetures/auth.Slice";
import habitReducer from "./fetures/habit.slice";
import routineReducer from "./fetures/routine.slice";


export const store = configureStore({
  reducer: {
      auth: authReducer,
      habit: habitReducer,
      routine:routineReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
