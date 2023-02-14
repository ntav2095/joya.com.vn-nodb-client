import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  types: null,
  availableContinents: [],
  availableCountries: [],
};

const visaSlice = createSlice({
  name: "visa",
  initialState,
  reducers: {
    setVisaTypes(state, action) {
      const types = action.payload;
      state.types = action.payload;

      const availableContinents = Object.entries(types)
        .filter(([key, value]) => value.length > 0)
        .map(([key, value]) => key);

      state.availableContinents = availableContinents;

      const availableCountries = Object.entries(types).reduce(
        (prev, [key, value]) => [...prev, ...value],
        []
      );

      state.availableCountries = availableCountries;
    },
  },
});

export const { setVisaTypes } = visaSlice.actions;

export default visaSlice.reducer;
