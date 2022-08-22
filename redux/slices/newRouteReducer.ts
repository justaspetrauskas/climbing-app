import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface newRouteState {
  imagePreview: string;
  // filteredGenres: string[] | [];
}

const initialState: newRouteState = {
  //W initialGenres: genres,
  imagePreview: "",
};

export const newRouteSlice = createSlice({
  name: "newRoute",
  initialState,
  reducers: {
    setPreviewImage: (state, action: PayloadAction<string>) => {
      state.imagePreview = action.payload;
    },
  },
  extraReducers: {},
});

export const { setPreviewImage } = newRouteSlice.actions;

export default newRouteSlice.reducer;
