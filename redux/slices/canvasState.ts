import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CanvasState {
  jointCoords: number[][];
  editMode: boolean;
  validated: boolean;
  howToEdit: boolean;
}

const initialState: CanvasState = {
  jointCoords: [],
  editMode: false,
  validated: false,
  howToEdit: false,
};

export const canvasSlice = createSlice({
  name: "canvasState",
  initialState,
  reducers: {
    setJointCoords: (state, action: PayloadAction<number[]>) => {
      state.jointCoords.push(action.payload);
      // filter out all empty arrays
      // const onlyFullArrs = state.jointCoords.filter(
      //   (joint) => joint.length > 1
      // );
      // state.jointCoords = onlyFullArrs;
    },
    updateJointCoords: (state, action: PayloadAction<number[][]>) => {
      state.jointCoords = action.payload;
    },
    setToggleEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;
    },
    setValidated: (state, action: PayloadAction<boolean>) => {
      state.validated = action.payload;
    },
    setToggleHowToEdit: (state, action: PayloadAction<boolean>) => {
      state.howToEdit = action.payload;
    },
  },
});

export const {
  setJointCoords,
  updateJointCoords,
  setToggleHowToEdit,
  setToggleEditMode,
  setValidated,
} = canvasSlice.actions;

export default canvasSlice.reducer;
