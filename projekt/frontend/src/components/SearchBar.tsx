import { useContext } from "react";
import { RecipesContext } from "../context/TripsContext";
import loop from "../assets/search.png";

interface Props {
  className: string;
}

const SearchBar = ({ className }: Props) => {
  const { dispatch } = useContext(RecipesContext);

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "SEARCH", payload: { searchTerm: e.target.value } });
  };

  return (
    <div className={`relative items-center ${className}`}>
      <input
        type="text"
        placeholder="Search..."
        className="px-3 py-1 rounded-lg border w-full focus:outline-none text-gray-700"
        onChange={searchHandler}
      />
      <img
        className="absolute right-3 top-2 w-4 h-4  invert-[50%] lg:absolute lg:right-2"
        src={loop.toString()}
        alt=""
      />
    </div>
  );
};

export default SearchBar;
