import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import axios, { AxiosError } from "axios";

const CreateHouse = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { state: AuthState } = useAuthContext();

  const [adress, setAdress] = useState("");
  const [beds, setBeds] = useState("");

  // error and loading states
  const [error, setError] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!AuthState.user) {
      setError("You must be logged in to add recipes!");
      setIsLoading(false);
      return;
    }

    console.log(adress, beds);
    axios
      .post(
        `/api/trips/${id}/houses`,
        { adress, beds },
        {
          headers: {
            Authorization: `Bearer ${AuthState.user?.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate(`/`);
      })
      .catch((error) => {
        console.log((error as AxiosError).message);
      });
  };

  return (
    <div className="container max-w-lg mx-auto">
      <div className="mb-10">
        <form onSubmit={submitHandler} className="my-14 space-y-8">
          <div>
            <div>
              <label
                className="text-gray-600 text-lg font-poppins dark:text-white"
                htmlFor="adress"
              >
                Adress
              </label>
            </div>
            <input
              onChange={(e) => setAdress(e.target.value)}
              value={adress}
              className="w-full rounded px-4 py-1 text-gray-600 focus:outline-none dark:text-white dark:bg-gray-500 dark:placeholder:text-white"
              id="adress"
              type="text"
              maxLength={55}
              required
            />
          </div>
          <div>
            <div>
              <label
                className="text-gray-600 text-lg font-poppins dark:text-white"
                htmlFor="beds"
              >
                Beds
              </label>
            </div>
            <input
              onChange={(e) => setBeds(e.target.value)}
              value={beds}
              className="w-full rounded px-4 py-1 text-gray-600 focus:outline-none dark:text-white dark:bg-gray-500 dark:placeholder:text-white"
              id="beds"
              type="number"
              min={1}
              max={10}
              required
            />
          </div>
          <div>
            {!isLoading && (
              <button
                disabled={isLoading}
                type="submit"
                className="w-full text-center py-1 bg-violet-500 rounded text-white font-semibold hover:bg-violet-400"
              >
                Add recipe
              </button>
            )}
            {isLoading && (
              <button
                disabled={isLoading}
                type="submit"
                className="flex items-center justify-center w-1/2 text-center py-1 bg-violet-500 rounded text-white font-semibold hover:bg-violet-400 opacity-80"
              >
                <ClipLoader
                  color={"white"}
                  loading={isLoading}
                  size={20}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </button>
            )}
          </div>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default CreateHouse;
