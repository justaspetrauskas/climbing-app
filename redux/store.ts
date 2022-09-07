import { configureStore } from "@reduxjs/toolkit";

import NewRouteReducer from "./slices/newRouteReducer";
import MapLocationReducer from "./slices/mapLocationReducer";
import ImageUploadReducer from "./slices/imageUploadReducer";
import RouteComposerReducer from "./slices/routeComposerReducer";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    newRoute: NewRouteReducer,
    mapLocation: MapLocationReducer,
    imageUpload: ImageUploadReducer,
    routeComposer: RouteComposerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const selectNewRouteState = (state: RootState) => state.newRoute;
export const selectJointCoords = (state: RootState) =>
  state.newRoute.jointCoords;
export const selectMapLocationState = (state: RootState) => state.mapLocation;
export const selectImageUploadState = (state: RootState) => state.imageUpload;
export const selectRouteComposerState = (state: RootState) =>
  state.routeComposer;
