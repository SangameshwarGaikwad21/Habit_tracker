import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./fetures/auth.Slice";
import habitReducer from "./fetures/habit.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
     habit: habitReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
