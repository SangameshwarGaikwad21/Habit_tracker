export interface RoutineActivity {
  title: string;
  startTime: string;
  endTime: string;
}

export interface Routine {
  _id?: string;
  userId?: string;
  routine: RoutineActivity[];
}

export interface SaveRoutinePayload {
  routine: RoutineActivity[];
}

export interface RoutineState {
  routine: RoutineActivity[];
  isLoading: boolean;
  error: string | null;
  successMessage: string | null;
}