import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "../../lib/types";

interface mapLocationState {
  currentLocation: Location | null;
  userLocation: Location | null;
}

const initialState: mapLocationState = {
  currentLocation: null,
  userLocation: null,
};

export const mapLocationSlice = createSlice({
  name: "mapLocation",
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<Location>) => {
      state.currentLocation = action.payload;
    },
    setUserLocation: (state, action: PayloadAction<Location>) => {
      state.userLocation = action.payload;
    },
  },
  extraReducers: {},
});

export const { setCurrentLocation, setUserLocation } = mapLocationSlice.actions;

export default mapLocationSlice.reducer;
