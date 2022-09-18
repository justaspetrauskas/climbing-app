import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Step {
  label: string;
  active: boolean;
  validated: boolean;
}

interface routeComposerState {
  steps: Step[];
  activeStep: Step;
  currentStepIndex: number;
  prevStepIndex: number | null;
  nextStepIndex: number | null;
}

const formSteps: Step[] = [
  {
    label: "Image of the crag",
    active: false,
    validated: false,
  },
  {
    label: "Draw a problem",
    active: false,
    validated: false,
  },
  {
    label: "Name it",
    active: false,
    validated: false,
  },
  {
    label: "Give it a Grade",
    active: false,
    validated: false,
  },
  {
    label: "Route Features",
    active: false,
    validated: false,
  },
  {
    label: "Route Location",
    active: false,
    validated: false,
  },
  {
    label: "Aditional notes",
    active: false,
    validated: false,
  },
];

const initialState: routeComposerState = {
  steps: formSteps,
  activeStep: formSteps[0],
  currentStepIndex: 0,
  prevStepIndex: null,
  nextStepIndex: 1,
};

export const routeComposerSlice = createSlice({
  name: "routeComposer",
  initialState,
  reducers: {
    goToNextStep: (state, action: PayloadAction) => {
      // check if current stepIndex is not larger than the length of steps
      if (state.currentStepIndex < state.steps.length - 1) {
        state.currentStepIndex += 1;
        // check if validated

        state.activeStep = formSteps[state.currentStepIndex];
        // prevStep
      } else {
        state.currentStepIndex = state.currentStepIndex;
      }
    },
    goToPrevStep: (state, action: PayloadAction) => {
      // check if current stepIndex is not larger than the length of steps
      if (state.currentStepIndex > 0) {
        state.currentStepIndex -= 1;
        state.activeStep = formSteps[state.currentStepIndex];
      } else {
        state.currentStepIndex = state.currentStepIndex;
      }
    },
    goToStep: (state, action: PayloadAction<number>) => {
      // check if current stepIndex is not larger than the length of steps
      // should be able to go only to validated step
      if (state.steps[action.payload].validated) {
        console.log("step is validated");
      } else {
        console.log("step is not validated");
      }

      state.currentStepIndex = action.payload;
      state.activeStep = formSteps[state.currentStepIndex];
    },
    setValidateStep: (state, action: PayloadAction<boolean>) => {
      // check if current stepIndex is not larger than the length of steps

      const activeStepIndex = state.steps.findIndex(
        (o) => o.label === state.activeStep.label
      );

      state.steps[activeStepIndex].validated = action.payload;
      state.activeStep.validated = action.payload;
    },
  },
});

export const { goToNextStep, goToPrevStep, goToStep, setValidateStep } =
  routeComposerSlice.actions;
export default routeComposerSlice.reducer;
