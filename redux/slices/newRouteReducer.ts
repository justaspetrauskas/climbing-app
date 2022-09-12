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
  routeCoordinates: number[][];
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
  routeCoordinates: [],
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
    setRoute: (state, action: PayloadAction<number[][]>) => {
      state.routeCoordinates = action.payload;
      // filter out all empty arrays
      // const onlyFullArrs = state.jointCoords.filter(
      //   (joint) => joint.length > 1
      // );
      // state.jointCoords = onlyFullArrs;
    },
    setRouteDetails: (state, action: PayloadAction<Record<string, any>>) => {
      const { title, description, grade, features } = action.payload;
      state.title = title;
      state.description = description;
      state.difficulty = +grade;
      state.features = features;
    },
    updateJointCoords: (state, action: PayloadAction<number[][]>) => {
      state.routeCoordinates = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setImageUrl,
  setRouteDetails,
  setRouteLocation,
  setRoute,
  updateJointCoords,
} = newRouteSlice.actions;

export default newRouteSlice.reducer;
