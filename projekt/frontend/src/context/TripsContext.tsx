import React, { createContext, useReducer } from "react";
import { MyState, MyAction, MyContextType } from "../interfaces/trip";
import Props from "../interfaces/children";

const initialState: MyState = {
  trips: undefined,
  trip: null,
  searchTerm: null,
};

export const RecipesContext = createContext<MyContextType>({
  state: initialState,
  dispatch: () => {},
});

const tripsReducer = (state: MyState, action: MyAction): MyState => {
  switch (action.type) {
    case "SET_TRIPS":
      return {
        ...state,
        trips: action.payload.trips ?? state.trips,
        trip: action.payload.trip ?? state.trip,
      };
    case "ADD_TRIP":
      return {
        ...state,
        trip: action.payload.trip ?? state.trip,
        trips: [action.payload.trip!, ...state.trips!] ?? state.trips,
      };
    case "DELETE_TRIP":
      return {
        ...state,
        trips:
          state.trips?.filter(
            (recipe) => recipe._id !== action.payload.trip?._id
          ) ?? state.trips,
        trip: action.payload.trip ?? state.trip,
      };
    case "SEARCH":
      return {
        ...state,
        searchTerm: action.payload.searchTerm ?? state.searchTerm,
      };
    default:
      return state;
  }
};

const RecipesContextProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(tripsReducer, initialState);

  return (
    <RecipesContext.Provider value={{ state, dispatch }}>
      {children}
    </RecipesContext.Provider>
  );
};

export default RecipesContextProvider;
