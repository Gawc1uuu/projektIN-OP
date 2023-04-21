interface image {
  public_id: string;
  url: string;
}

export default interface trip {
  _id: string;
  name: string;
  startDate: string;
  price: number;
  endDate: string;
  image: image;
  transport: string;
  destination: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    user_id: string;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
  };
  houses: [];
  participans: [];
}

export interface MyState {
  trips: trip[] | undefined;
  trip: trip | null;
  searchTerm: string | null;
}

export interface MyAction {
  type: "ADD_TRIP" | "UPDATE_TRIP" | "DELETE_TRIP" | "SET_TRIPS" | "SEARCH";
  payload: {
    trips?: trip[];
    trip?: trip;
    searchTerm?: string | null;
  };
}

export interface MyContextType {
  state: MyState;
  dispatch: React.Dispatch<MyAction>;
}
export interface IComment {
  _id: string;
  text: string;
  rating: number;
  createdBy: {
    username: string;
    user_id: string;
  };
  createdAt: string;
}
