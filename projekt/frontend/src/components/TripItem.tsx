import { useNavigate } from "react-router-dom";
import trip from "../interfaces/trip";
import deleteIcon from "../assets/delete.svg";
import axios, { AxiosError } from "axios";
import { useContext } from "react";
import { RecipesContext } from "../context/TripsContext";
import { useAuthContext } from "../hooks/useAuthContext";

interface TripItemProps {
  data: trip;
}

const TripItem = ({ data }: TripItemProps) => {
  const { state: AuthState } = useAuthContext();
  const navigate = useNavigate();
  const { dispatch } = useContext(RecipesContext);

  const deleteHandler = async (e: React.MouseEvent) => {
    if (!AuthState.user) {
      return;
    }

    try {
      const response = await axios.delete(`/api/trips/${data._id}`, {
        headers: {
          Authorization: `Bearer ${AuthState.user?.token}`,
        },
      });
      console.log("Success", response.data);
      dispatch({ type: "DELETE_TRIP", payload: { trip: response.data } });
    } catch (error) {
      console.log((error as AxiosError).message);
    }
  };

  const clickHandler = (e: React.MouseEvent) => {
    navigate(`/${data._id}`);
  };

  return (
    <div className="group relative bg-white rounded-lg shadow px-6 py-3 pb-10 space-y-4 transition duration-150 hover:-translate-y-1 w-[75%] md:w-[330px] h-[450px] dark:bg-gray-500 dark:text-white">
      <div className="h-1/2 w-4/5 mx-auto md:w-full">
        <img
          src={data.image.url}
          alt="food"
          className="h-full w-full rounded-lg"
        />
      </div>
      <div className="flex flex-col items-center justify-between h-1/2 space-y-1">
        <div>
          <h3 className="text-lg text-violet-500 text-center font-semibold tracking-wider">
            {data.name}
          </h3>
          <p className="text-xs text-gray-400">
            created by:{data.createdBy.email}
          </p>
        </div>
        <p className="font-semibold text-lg text-gray-600">
          To: {data.destination}
        </p>
        <p className="text-sm text-gray-500">
          {data.startDate}-{data.endDate}
        </p>
        <p className="font-semibold text-lg text-gray-700">{data.price}$</p>
        <div className="text-center">
          <button
            onClick={clickHandler}
            className="px-8 py-2 rounded-full bg-violet-500 font-semibold text-sm text-white hover:bg-violet-400 hover:text-white  "
          >
            Details
          </button>
        </div>
      </div>
      {data.createdBy.user_id === AuthState.user?.user_id && (
        <div>
          <img
            onClick={deleteHandler}
            className="hidden absolute invert-[60%] bottom-1 right-2 w-6 transition-all group-hover:inline-block hover:invert-0 hover:cursor-pointer dark:invert-[70%] dark:hover:invert-[100%]"
            src={deleteIcon.toString()}
            alt=""
          />
        </div>
      )}
    </div>
  );
};

export default TripItem;
