import { useState } from "react";
import axios, { AxiosError } from "axios";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(false);

    axios
      .post("/api/user/login", {
        email,
        password,
      })
      .then((response) => {
        dispatch({ type: "LOGIN", payload: response.data });
        localStorage.setItem("user", JSON.stringify(response.data));
        setIsLoading(false);
        setError(false);
      })
      .catch((error: AxiosError) => {
        setIsLoading(false);
        setError(error.response?.data);
      });
  };

  return { login, isLoading, error };
};
