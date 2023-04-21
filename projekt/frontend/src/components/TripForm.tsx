import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { useAuthContext } from "../hooks/useAuthContext";
import ClipLoader from "react-spinners/ClipLoader";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const TripForm = () => {
  const navigate = useNavigate();
  const { state: AuthState } = useAuthContext();
  // form states
  const [name, setName] = useState("");
  const [destination, setDestination] = useState("");
  const [transport, setTransport] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<string | undefined>(
    undefined
  );
  const [selectedFileError, setSelectedFileError] = useState<
    string | undefined
  >(undefined);
  // error and loading states
  const [error, setError] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // handling file input to add images
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size <= MAX_IMAGE_SIZE) {
        const reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = () => {
          setSelectedFile(reader.result as string);
          setSelectedFileError(undefined);
        };
      } else {
        setSelectedFile(undefined);
        setSelectedFileError("This image is too large. Maximum 5mb");
      }
    } else {
      setSelectedFile(undefined);
      setSelectedFileError(undefined);
    }
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!AuthState.user) {
      setError("You must be logged in to add recipes!");
      setIsLoading(false);
      return;
    }

    const newTrip = {
      name,
      destination,
      transport,
      endDate,
      startDate,
      price,
      image: selectedFile,
    };
    console.log(newTrip);
    try {
      const response = await axios.post(
        "/api/trips",
        {
          ...newTrip,
        },
        {
          headers: {
            Authorization: `Bearer ${AuthState.user?.token}`,
          },
        }
      );
      setIsLoading(false);
      setError(false);
      navigate("/");
      console.log("Success", response.data);
    } catch (error) {
      console.log("ERRor", (error as AxiosError).response?.data);
      setIsLoading(false);
      setError("Wrong form data");
    }
  };

  return (
    <div className="min-h-screen mb-10">
      <form onSubmit={submitHandler} className="my-14 space-y-8">
        <div>
          <div>
            <label
              className="text-gray-600 text-lg font-poppins dark:text-white"
              htmlFor="title"
            >
              Trip Name
            </label>
          </div>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full rounded px-4 py-1 text-gray-600 focus:outline-none dark:text-white dark:bg-gray-500 dark:placeholder:text-white"
            id="title"
            type="text"
            maxLength={55}
            required
          />
        </div>
        <div>
          <div>
            <label
              className="text-gray-600 text-lg font-poppins dark:text-white"
              htmlFor="destination"
            >
              Destination
            </label>
          </div>
          <input
            onChange={(e) => setDestination(e.target.value)}
            value={destination}
            className="w-full rounded px-4 py-1 text-gray-600 focus:outline-none dark:text-white dark:bg-gray-500 dark:placeholder:text-white"
            id="destination"
            type="text"
            maxLength={55}
            required
          />
        </div>
        <div>
          <div>
            <label
              className="text-gray-600 text-lg font-poppins dark:text-white"
              htmlFor="tranport"
            >
              Type of Transport
            </label>
          </div>
          <input
            onChange={(e) => setTransport(e.target.value)}
            value={transport}
            className="w-full rounded px-4 py-1 text-gray-600 focus:outline-none dark:text-white dark:bg-gray-500 dark:placeholder:text-white"
            id="transport"
            type="text"
            maxLength={55}
            required
          />
        </div>
        <div>
          <div>
            <label
              className="text-gray-600 text-lg font-poppins dark:text-white"
              htmlFor="title"
            >
              Start Date
            </label>
          </div>
          <input
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded px-4 py-1 text-gray-600 focus:outline-none dark:text-white dark:bg-gray-500 dark:placeholder:text-white"
            id="start_date"
            type="date"
            min={new Date().toISOString().substr(0, 10)}
            required
          />
        </div>
        <div>
          <div>
            <label
              className="text-gray-600 text-lg font-poppins dark:text-white"
              htmlFor="title"
            >
              End Date
            </label>
          </div>
          <input
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full rounded px-4 py-1 text-gray-600 focus:outline-none dark:text-white dark:bg-gray-500 dark:placeholder:text-white"
            id="end_date"
            type="date"
            min={new Date().toISOString().substr(0, 10)}
            required
          />
        </div>

        <div>
          <label
            className="block mb-2 text-lg font-medium dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            onChange={handleFileChange}
            className="block w-full text-lg text-gray-900 border bg-white border-gray-300 rounded-lg cursor-pointer focus:outline-none dark:text-white dark:bg-gray-500 dark:placeholder:text-white dark:border-gray-300"
            id="file_input"
            accept="image/*"
            type="file"
          />
        </div>
        {selectedFileError && (
          <p className="px-6 py-2 bg-pink-300 border-red-600 text-red-500 rounded">
            {selectedFileError}
          </p>
        )}
        <div>
          <div>
            <label
              className="text-gray-600 text-lg font-poppins dark:text-white"
              htmlFor="time"
            >
              Price
            </label>
          </div>
          <div className="flex items-center space-x-8">
            <input
              required
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              className="w-1/2 rounded px-4 py-1 text-gray-600 focus:outline-none dark:text-white dark:bg-gray-500 dark:placeholder:text-white"
              id="time"
              type="number"
              min="1"
              max="9999"
              step="1"
            />
            {!isLoading && (
              <button
                disabled={isLoading}
                type="submit"
                className="w-1/2 text-center py-1 bg-[#e68fa9] rounded text-white font-semibold hover:bg-pink-400"
              >
                Add recipe
              </button>
            )}
            {isLoading && (
              <button
                disabled={isLoading}
                type="submit"
                className="flex items-center justify-center w-1/2 text-center py-1 bg-[#e68fa9] rounded text-white font-semibold hover:bg-pink-400 opacity-80"
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
        </div>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default TripForm;
