import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCompanyInfo } from "../services/apis";
import axios from "../services/axios";

const initialState = {
  company: {
    name: "",
    address: "",
    phone: "",
    hotline: "",
    email: "",
    website: "",
    license_name: "",
    license_agency: "",
    license_number: "",
    license_date: "",
  },
  status: "idle", // idle | pending | succeeded | failed
  error: null,
};

export const getCompanyInfo = createAsyncThunk(
  "companyInfo/fetchCompanyInfo",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(fetchCompanyInfo());
      return response.data.data;
    } catch (error) {
      if (error.response?.data) {
        return rejectWithValue({
          httpCode: error.response.status,
          message: error.response.data.message,
        });
      } else {
        return rejectWithValue({
          httpCode: null,
          message: error.message,
        });
      }
    }
  }
);

const companySlice = createSlice({
  name: "companyInfo",
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCompanyInfo.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getCompanyInfo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.company = action.payload;
      })
      .addCase(getCompanyInfo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default companySlice.reducer;
