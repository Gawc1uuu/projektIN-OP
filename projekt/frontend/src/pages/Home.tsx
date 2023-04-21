import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
// axios
import axios, { AxiosError } from "axios";
// components
import TripsList from "../components/TripsList";
import PaginationButtons from "../components/PaginationButtons";
import ClipLoader from "react-spinners/ClipLoader";
// context
import { RecipesContext } from "../context/TripsContext";
// assets
import plus from "../assets/plus.png";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { state, dispatch } = useContext(RecipesContext);

  useEffect(() => {
    const getTrips = async (page: number) => {
      try {
        setIsLoading(true);
        const res = await axios.get(`/api/trips?page=${page}&limit=6`);

        setCurrentPage(res.data.currentPage);
        setTotalPages(res.data.totalPages);
        dispatch({
          type: "SET_TRIPS",
          payload: { trips: res.data.trips },
        });
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        console.log((err as AxiosError).response?.data);
      }
    };

    getTrips(currentPage);
  }, [currentPage, dispatch]);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="mx-2">
      {!isLoading && state.trips?.length === 0 && (
        <p className="text-center min-h-screen flex items-center justify-center dark:text-white">
          No trips to load... Add some!
        </p>
      )}
      {isLoading && (
        <div className="text-center min-h-screen flex justify-center items-center">
          <ClipLoader
            color={"#c96382"}
            loading={isLoading}
            size={80}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {state.trips && state.trips?.length !== 0 && (
        <TripsList data={state.trips} />
      )}
      {/* Pagination buttons */}
      <PaginationButtons
        onChangePage={{
          handlePrevPage,
          handleNextPage,
          currentPage,
          totalPages,
        }}
      />
      <Link
        className="items-center justify-center w-14 h-14 rounded-full bg-white fixed bottom-10 right-10 group hidden md:flex"
        to="/create"
      >
        <img
          src={plus.toString()}
          alt="add sign"
          className="invert-[50%] group-hover:invert-0"
        />
      </Link>
    </div>
  );
};

export default Home;
