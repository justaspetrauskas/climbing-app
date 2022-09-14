import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RouteGrade } from "../../lib/types";

interface FeaturesState {
  features: string[];
  grades: RouteGrade[];
}

const routeGrades = [
  { label: "4a", value: 1, colorValue: "" },
  { label: "4b", value: 2, colorValue: "" },
  { label: "4c", value: 3, colorValue: "" },
  { label: "5a", value: 4, colorValue: "" },
  { label: "5b", value: 5, colorValue: "" },
  { label: "5c", value: 6, colorValue: "" },
  { label: "6a", value: 7, colorValue: "" },
  { label: "6a+", value: 8, colorValue: "" },
  { label: "6b", value: 9, colorValue: "" },
  { label: "6b+", value: 10, colorValue: "" },
  { label: "6c", value: 11, colorValue: "" },
  { label: "6c+", value: 12, colorValue: "" },
  { label: "7a", value: 13, colorValue: "" },
  { label: "7a+", value: 14, colorValue: "" },
  { label: "7b", value: 15, colorValue: "" },
  { label: "7b+", value: 16, colorValue: "" },
  { label: "7c", value: 17, colorValue: "" },
  { label: "7c+", value: 18, colorValue: "" },
  { label: "8a", value: 19, colorValue: "" },
  { label: "8a+", value: 20, colorValue: "" },
  { label: "8b", value: 21, colorValue: "" },
  { label: "8b+", value: 22, colorValue: "" },
  { label: "8c", value: 23, colorValue: "" },
  { label: "8c+", value: 24, colorValue: "" },
  { label: "9a", value: 25, colorValue: "" },
  { label: "9a+", value: 26, colorValue: "" },
  { label: "9b", value: 27, colorValue: "" },
];

const features = [
  "morpho",
  "dyno",
  "sketchy topping",
  "dangerous landing",
  "compression",
  "tall",
  "slab",
  "very overhang",
  "sit start",
  "crimbs",
  "slopers",
  "pumpy",
  "scary",
  "cave",
  "mossy",
  "sharp",
];

const initialState: FeaturesState = {
  features: features,
  grades: routeGrades,
};

export const featuresSlice = createSlice({
  name: "featuresState",
  initialState,
  reducers: {},
});

export default featuresSlice.reducer;
