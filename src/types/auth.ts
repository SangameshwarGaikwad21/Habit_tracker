
export interface IUser {
  _id: string;
  name: string;
  email: string;
  image?: string;
  isEmailVerified?: boolean;
}

export interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isInitialized: boolean;
  error: string | null;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface VerifyEmailPayload {
  email: string;
  otp: string;
}

export interface AuthResponse {
  message: string;
  user?: IUser;
}
