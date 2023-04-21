import React from "react";
import axios, { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

interface HouseItemProps {
  data: any;
}

const HouseItem = ({ data }: HouseItemProps) => {
  const { state: AuthState } = useAuthContext();
  const { id } = useParams();
  const navigate = useNavigate();
  const clickHandler = async () => {
    axios
      .post(
        `/api/trips/${id}/houses/${data._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${AuthState.user?.token}`,
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/");
      })
      .catch((error) => {
        console.log((error as AxiosError).message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-between md:flex-row">
      <div className="flex flex-col items-center md:flex-row md:space-x-10">
        <p>{data.adress}</p>
        <p>
          Quantity of beds: {data.guests.length}/{data.beds}
        </p>
      </div>
      <div>
        <button
          disabled={
            data.guests.length === data.beds ||
            data.guests.includes(AuthState.user?.user_id)
          }
          onClick={clickHandler}
          className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-500 disabled:bg-opacity-70 disabled:cursor-not-allowed"
        >
          Choose this house and book a trip
        </button>
      </div>
    </div>
  );
};

export default HouseItem;
