export interface Habit {
  _id: string;
  title: string;
  description?: string;
  date: string;
  status: "pending" | "completed";
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHabitPayload {
  title: string;
}

export interface UpdateHabitPayload {
  id: string;
  title: string;
}

export interface DeleteHabitPayload {
  id: string;
}

export interface HabitState {
  habits: Habit[];
  isLoading: boolean;
  isFetching: boolean;
  isUpdating: boolean;
  deletingHabitId: string | null;
  error: string | null;
  successMessage: string | null;
}