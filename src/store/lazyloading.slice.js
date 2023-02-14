import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  statusHome:false
};

const lazy = createSlice({
  name: "lazy",
  initialState,
  reducers: {
    lazzyLoading(state, action) {
      state.status = true;
    },
    lazzyNotLoading(state, action) {
      state.status = false;
    },

  },
});

export const { lazzyLoading, lazzyNotLoading} =
  lazy.actions;
export default lazy.reducer;
