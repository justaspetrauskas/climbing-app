import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "../../lib/types";

interface mapLocationState {
  currentLocation: Location | null;
}

const initialState: mapLocationState = {
  currentLocation: null,
};

export const mapLocationSlice = createSlice({
  name: "mapLocation",
  initialState,
  reducers: {
    setCurrentLocation: (state, action: PayloadAction<Location>) => {
      state.currentLocation = action.payload;
    },
  },
  extraReducers: {},
});

export const { setCurrentLocation } = mapLocationSlice.actions;

export default mapLocationSlice.reducer;
