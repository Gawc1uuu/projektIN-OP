import trip from "./trip";

export interface User {
  _id: string;
  user_id: string;
  frist_name: string;
  last_name: string;
  email: string;
  username: string;
  token: string;
  trips: trip[];
}

export interface AuthState {
  user: User | null;
}

export interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload: User | null;
}

export interface AuthContextType {
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}
