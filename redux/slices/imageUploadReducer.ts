import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface imageUploadState {
  imagePreview: string;

  // filteredGenres: string[] | [];
}

const initialState: imageUploadState = {
  //W initialGenres: genres,
  imagePreview: "",
};

export const imageUploadSlice = createSlice({
  name: "imageUpload",
  initialState,
  reducers: {
    setImagePreview: (state, action: PayloadAction<string>) => {
      state.imagePreview = action.payload;
    },
  },
  extraReducers: {},
});

export const { setImagePreview } = imageUploadSlice.actions;

export default imageUploadSlice.reducer;
