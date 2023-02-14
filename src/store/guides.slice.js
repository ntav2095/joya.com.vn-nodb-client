import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGuides as fetchGuidesApi } from "../services/apis";
import axios from "../services/axios";

const initialState = {
  guides: [],
  category: [],
  status: "idle", // idle | pending | succeeded | failed
  error: null,
};

export const fetchGuides = createAsyncThunk(
  "guides/fetchGuides",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(fetchGuidesApi());
      return {
        guides: response.data.data,
        category: response.data.metadata.category,
      };
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

const guidesSlice = createSlice({
  name: "guides",
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGuides.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchGuides.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.guides = action.payload.guides;
        state.category = action.payload.category;
      })
      .addCase(fetchGuides.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default guidesSlice.reducer;

// selectors
export const selectGuides = (state) => state.guides.articles;

export const selectGuidesExperiences = (state) => state.guides.articles;
export const selectGuidesHandbooks = (state) => state.guides.articles;
export const selectGuidesNicePlaces = (state) => state.guides.articles;
export const selectGuidesDiaries = (state) => state.guides.articles;

export const selectGuidesStatus = (state) => state.guides.status;
export const selectGuidesError = (state) => state.guides.error;

export const selectGuidesSliders = (state) =>
  state.guides.articles.filter((article) => article.layout.includes("guides"));
export const selectHandbookSliders = (state) =>
  state.guides.articles.filter((article) =>
    article.layout.includes("cam-nang")
  );
export const selectDiarySliders = (state) =>
  state.guides.articles.filter((article) => article.layout.includes("nhat-ky"));
export const selectExperienceSliders = (state) =>
  state.guides.articles.filter((article) =>
    article.layout.includes("trai-nghiem")
  );
export const selectNicePlaceSliders = (state) =>
  state.guides.articles.filter((article) =>
    article.layout.includes("diem-den")
  );

// category
export const selectGuidesCategory = (state) => state.guides.category;
