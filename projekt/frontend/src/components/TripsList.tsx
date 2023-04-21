import { useContext } from "react";
import { RecipesContext } from "../context/TripsContext";
import trip from "../interfaces/trip";
import TripItem from "./TripItem";

interface TripListProps {
  data: trip[] | undefined;
}

const TripsList = ({ data }: TripListProps) => {
  const { state } = useContext(RecipesContext);

  const filteredData = data?.filter((trip) => {
    return state.searchTerm
      ? trip.name.toLowerCase().includes(state.searchTerm.toLowerCase())
      : data;
  });

  return (
    <div className="container mx-auto w-full my-16 flex flex-col items-center justify-between space-y-8 min-h-screen md:space-y-0 md:flex-row md:flex-wrap md:items-start md:max-w-6xl md:gap-6">
      {filteredData &&
        filteredData.length > 0 &&
        filteredData.map((trip: trip) => {
          return <TripItem key={trip._id} data={trip} />;
        })}
    </div>
  );
};

export default TripsList;
