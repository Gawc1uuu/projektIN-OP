import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios, { AxiosError } from "axios";
import trip from "../interfaces/trip";
import { useAuthContext } from "../hooks/useAuthContext";
import HousesList from "../components/HousesList";

const SignleTrip = () => {
  // function formatDate(dateStr: string) {
  //   const [year, month, day] = dateStr.split("-");
  //   return `${day}.${month}.${year}`;
  // }

  const { state } = useAuthContext();
  const { id } = useParams();
  const [trip, setTrip] = useState<trip | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = (e: React.MouseEvent) => {
    console.log("clicked");
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const getTrip = async () => {
      try {
        const response = await axios.get(`/api/trips/${id}`);
        console.log("Success", response.data);
        setTrip(response.data);
      } catch (error) {
        console.log("Error", (error as AxiosError).message);
      }
    };

    getTrip();
  }, [id]);

  return (
    <div className="mx-6 my-16 min-h-screen">
      <div className="container mx-auto max-w-6xl p-6 bg-white rounded-xl">
        <div className="flex flex-col md:flex-row items-center justify-between md:items-start">
          <div className="max-w-[500px] max-h-[500px]">
            <img src={trip?.image.url} alt="some nice place" />
          </div>
          <div className="flex-1">
            <h3 className="text-center text-4xl text-violet-500">
              {trip?.name}
            </h3>
            <div className="flex items-center justify-around text-gray-400">
              <p>Destination: {trip?.destination}</p>
              <p>Transport: {trip?.transport}</p>
            </div>
            <div className="text-center mt-6">
              <p className="font-bold text-lg tracking-wide text-gray-600">
                Date of a trip
              </p>
              <p className="text-sm">
                {trip?.startDate} - {trip?.endDate}
              </p>
            </div>
            <div className="text-center mt-6">
              <p className="font-bold text-lg text-gray-600">Tour operator</p>
              <p>
                {trip?.createdBy?.firstName} {trip?.createdBy?.lastName}
              </p>
              <p>Contact: {trip?.createdBy.email}</p>
            </div>
            <div className="text-center mt-6 text-2xl">
              <p className="text-gray-500">For only {trip?.price}$</p>
            </div>
            {trip?.createdBy.user_id === state.user?.user_id && (
              <div className="text-center md:px-10 mt-5">
                <Link
                  to={`/${trip?._id}/createhouse`}
                  className="block bg-violet-700 text-white py-2 w-full rounded hover:bg-violet-600"
                >
                  Add a house
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <HousesList houses={trip?.houses} />
    </div>
  );
};

export default SignleTrip;
