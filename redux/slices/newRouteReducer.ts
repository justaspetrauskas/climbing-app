import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "../../lib/types";

interface newRouteState {
  imagePreview: string;
  routeLocation: Location | null;
  // filteredGenres: string[] | [];
}

const initialState: newRouteState = {
  //W initialGenres: genres,
  imagePreview: "",
  routeLocation: null,
};

export const newRouteSlice = createSlice({
  name: "newRoute",
  initialState,
  reducers: {
    setPreviewImage: (state, action: PayloadAction<string>) => {
      state.imagePreview = action.payload;
    },
    setRouteLocation: (state, action: PayloadAction<Location>) => {
      state.routeLocation = action.payload;
      console.log(
        "current location: " + state.routeLocation.lat + state.routeLocation.lng
      );
    },
  },
  extraReducers: {},
});

export const { setPreviewImage, setRouteLocation } = newRouteSlice.actions;

export default newRouteSlice.reducer;
