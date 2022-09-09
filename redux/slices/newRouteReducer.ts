import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location } from "../../lib/types";

interface newRouteState {
  title: string;
  description?: string;
  difficulty: number | null;
  features: string[];
  author: string; // userId
  imageUrl: string;
  routeLocation: Location | null;
  jointCoords: number[][];
  // filteredGenres: string[] | [];
}

const initialState: newRouteState = {
  //W initialGenres: genres,
  title: "",
  description: "",
  difficulty: null,
  features: [],
  author: "",
  imageUrl: "",
  routeLocation: null,
  jointCoords: [[]],
};

export const newRouteSlice = createSlice({
  name: "newRoute",
  initialState,
  reducers: {
    setImageUrl: (state, action: PayloadAction<string>) => {
      console.log("new image", action.payload);
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
