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
  path: number[][];
  // filteredGenres: string[] | [];
}

interface InputChange {
  key: string;
  value: any;
}

const initialState: newRouteState = {
  title: "",
  description: "",
  difficulty: 14,
  features: [],
  author: "",
  imageUrl: "",
  routeLocation: null,
  path: [],
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
      state.path = action.payload;
    },
    setAuthor: (state, action: PayloadAction<string>) => {
      state.author = action.payload;
    },
    setRouteName: (state, action: PayloadAction<string>) => {
      action.payload;

      state.title = action.payload;
    },
    setRouteGrade: (state, action: PayloadAction<string>) => {
      action.payload;

      state.difficulty = +action.payload;
    },
    setRouteFeatures: (state, action: PayloadAction<string>) => {
      if (!state.features.includes(action.payload)) {
        state.features.push(action.payload);
      } else {
        const tempFeatures = [...state.features];
        const filteredFeatures = tempFeatures.filter(
          (f) => f !== action.payload
        );
        state.features = filteredFeatures;
      }
    },
    setRouteDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setInitRouteState: (state) => {
      state.title = "";
      state.description = "";
      state.difficulty = 14;
      state.features = [];
      state.author = "";
      state.imageUrl = "";
      state.routeLocation = null;
      state.path = [];
    },
    updateJointCoords: (state, action: PayloadAction<number[][]>) => {
      state.path = action.payload;
    },
  },
  extraReducers: {},
});

export const {
  setImageUrl,
  setRouteName,
  setRouteLocation,
  setRoute,
  updateJointCoords,
  setAuthor,
  setRouteGrade,
  setRouteFeatures,
  setRouteDescription,
  setInitRouteState,
} = newRouteSlice.actions;

export default newRouteSlice.reducer;
