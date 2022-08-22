import { configureStore } from "@reduxjs/toolkit";

import NewRouteReducer from "./slices/newRouteReducer";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    newRoute: NewRouteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const selectNewRouteState = (state: RootState) => state.newRoute;
