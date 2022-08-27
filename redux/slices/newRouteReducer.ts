import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "../../lib/types";

interface newRouteState {
  imageUrl: string;
  routeLocation: Location | null;
  // filteredGenres: string[] | [];
}

const initialState: newRouteState = {
  //W initialGenres: genres,
  imageUrl: "",
  routeLocation: null,
};

export const newRouteSlice = createSlice({
  name: "newRoute",
  initialState,
  reducers: {
    setImageUrl: (state, action: PayloadAction<string>) => {
      state.imageUrl = action.payload;
    },
    setRouteLocation: (state, action: PayloadAction<Location>) => {
      state.routeLocation = action.payload;
    },
  },
  extraReducers: {},
});

export const { setImageUrl, setRouteLocation } = newRouteSlice.actions;

export default newRouteSlice.reducer;
