import { createContext, useReducer, useEffect } from "react";
import Props from "../interfaces/children";
import { AuthAction, AuthState, AuthContextType } from "../interfaces/user";

export const AuthContext = createContext<AuthContextType>({
  state: {
    user: null,
  },
  dispatch: () => {},
});

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
      };
    case "LOGOUT":
      return {
        user: null,
      };
    default:
      return {
        ...state,
      };
  }
};

const AuthContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user) {
      dispatch({ type: "LOGIN", payload: JSON.parse(user) });
    }
  }, []);

  console.log(state.user);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
