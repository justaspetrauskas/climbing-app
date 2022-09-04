import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "../../lib/types";

interface newRouteState {
  imageUrl: string;
  routeLocation: Location | null;
  jointCoords: number[][];
  // filteredGenres: string[] | [];
}

const initialState: newRouteState = {
  //W initialGenres: genres,
  imageUrl: "",
  routeLocation: null,
  jointCoords: [[]],
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
    setJointCoords: (state, action: PayloadAction<number[]>) => {
      state.jointCoords.push(action.payload);
      // filter out all empty arrays
      const onlyFullArrs = state.jointCoords.filter(
        (joint) => joint.length > 1
      );
      state.jointCoords = onlyFullArrs;
    },
    updateJointCoords: (state, action: PayloadAction<number[][]>) => {
      state.jointCoords = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setImageUrl,
  setRouteLocation,
  setJointCoords,
  updateJointCoords,
} = newRouteSlice.actions;

export default newRouteSlice.reducer;
