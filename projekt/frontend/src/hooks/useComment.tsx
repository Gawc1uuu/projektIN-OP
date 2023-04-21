import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useAuthContext } from "./useAuthContext";

const useComment = () => {
  const [error, setError] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { state } = useAuthContext();
  const { id } = useParams();
  const addComment = async (comment: any) => {
    setError(false);
    setIsLoading(true);
    if (!state.user) {
      setError("You must be logged in to add comments!");
      setIsLoading(false);
      return;
    }

    axios
      .post(
        `/api/trips/${id}/comments`,
        { ...comment },
        {
          headers: {
            Authorization: `Bearer ${state.user?.token}`,
          },
        }
      )
      .then((response) => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error", error);
        setIsLoading(false);
      });
  };

  return { addComment, isLoading, error };
};

export default useComment;
