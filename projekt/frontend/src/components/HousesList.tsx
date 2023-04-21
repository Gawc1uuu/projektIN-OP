import React from "react";
import HouseItem from "./HouseItem";

interface HousesListProps {
  houses: [] | undefined;
}

const HousesList = ({ houses }: HousesListProps) => {
  return (
    <div>
      <div className="container max-w-6xl mx-auto bg-white p-6 rounded-xl mt-10">
        {houses?.map((house) => {
          return <HouseItem data={house} />;
        })}
      </div>
    </div>
  );
};

export default HousesList;
